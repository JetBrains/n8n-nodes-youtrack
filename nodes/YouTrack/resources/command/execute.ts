import type { INodeProperties } from 'n8n-workflow';

// Type definitions for command execute request body
interface CommandLimitedVisibility {
	$type: 'CommandLimitedVisibility';
	permittedGroups?: Array<{ id: string }>;
	permittedUsers?: Array<{ id: string }>;
}

interface CommandExecuteRequestBody {
	query: string;
	comment?: string;
	silent?: boolean;
	visibility?: CommandLimitedVisibility;
}

export const commandExecuteDescription: INodeProperties[] = [
	// Command: Query (required)
	{
		displayName: 'Command Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['command'],
				operation: ['execute'],
			},
		},
		default: '',
		placeholder: 'tag MyTag for me',
		description:
			'YouTrack command string. Examples: "tag MyTag", "for me", "tag To deploy for jane.doe", "vote+1", "star username", "work 2h Fixed bug". Note: "vote+1" cannot be used on your own issues. Any unrecognized words will be treated as tag names. For assignee commands, use "for me" (current user) or "for username" (must be a valid YouTrack username - if you get "Assignee expected" error, verify the username exists).',
		routing: {
			send: {
				type: 'body',
				property: 'query',
				preSend: [
					async function (this, requestOptions) {
						const query = this.getNodeParameter('query') as string;
						if (!query) {
							throw new Error('Command query is required');
						}

						// Trim whitespace and normalize the query string
						const normalizedQuery = query.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ');

						// Note: If query contains "comment" as a standalone word, YouTrack will treat it as a tag name.
						// Comments should be added via the Comment field in Additional Options instead.

						if (requestOptions.body && typeof requestOptions.body === 'object') {
							(requestOptions.body as CommandExecuteRequestBody).query = normalizedQuery;
						}

						return requestOptions;
					},
				],
			},
		},
	},

	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['command'],
				operation: ['execute'],
			},
		},
		options: [
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description:
					'Comment text to add along with the command. This is the correct way to add comments in YouTrack - do NOT use "comment" in the Command Query field (that will create a tag). Use this field to add comments with commands like "for me", "tag MyTag", etc.',
				routing: {
					send: {
						type: 'body',
						property: 'comment',
						preSend: [
							async function (this, requestOptions) {
								const comment = this.getNodeParameter('additionalOptions.comment') as string;
								if (comment && requestOptions.body && typeof requestOptions.body === 'object') {
									// Trim and normalize comment text
									(requestOptions.body as CommandExecuteRequestBody).comment = comment.trim();
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Fields to Return',
				name: 'fields',
				type: 'string',
				default: 'issues(id,idReadable),query',
				description:
					'Comma-separated list of fields to return in response. Common: issues(ID,idReadable),query,visibility(permittedGroups(ID,name),permittedUsers(ID,login)).',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
			{
				displayName: 'Silent',
				name: 'silent',
				type: 'boolean',
				default: false,
				description:
					'Whether enabled, suppresses update notifications. Useful for bulk updates. Requires "Apply Commands Silently" permission.',
				routing: {
					send: {
						type: 'body',
						property: 'silent',
					},
				},
			},
			{
				displayName: 'Visibility - Permitted Groups',
				name: 'permittedGroups',
				type: 'string',
				default: '',
				placeholder: '3-2, 3-5',
				description:
					'Optional: Comma-separated list of group database IDs (e.g., 3-2, 3-5) for restricted visibility. Can be used together with Permitted Users. Leave empty for unlimited visibility.',
				routing: {
					send: {
						type: 'body',
						property: 'visibility.permittedGroups',
						preSend: [
							async function (this, requestOptions) {
								const permittedGroups = this.getNodeParameter(
									'additionalOptions.permittedGroups',
								) as string;

								if (!permittedGroups || permittedGroups.trim() === '') {
									return requestOptions;
								}

								// Split by comma and trim, convert to array of group objects
								const groupIds = permittedGroups
									.split(',')
									.map((id) => id.trim())
									.filter((id) => id.length > 0 && /^\d+-\d+$/.test(id))
									.map((id) => ({ id }));

								if (groupIds.length === 0) {
									return requestOptions;
								}

								if (requestOptions.body && typeof requestOptions.body === 'object') {
									const body = requestOptions.body as CommandExecuteRequestBody;
									if (!body.visibility) {
										body.visibility = { $type: 'CommandLimitedVisibility' };
									}
									body.visibility.permittedGroups = groupIds;
								}

								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Visibility - Permitted Users',
				name: 'permittedUsers',
				type: 'string',
				default: '',
				placeholder: '2-10, 2-15',
				description:
					'Optional: Comma-separated list of user database IDs (e.g., 2-10, 2-15) for restricted visibility. Can be used together with Permitted Groups. Leave empty for unlimited visibility.',
				routing: {
					send: {
						type: 'body',
						property: 'visibility.permittedUsers',
						preSend: [
							async function (this, requestOptions) {
								const permittedUsers = this.getNodeParameter(
									'additionalOptions.permittedUsers',
								) as string;

								if (!permittedUsers || permittedUsers.trim() === '') {
									return requestOptions;
								}

								// Split by comma and trim, convert to array of user objects
								const userIds = permittedUsers
									.split(',')
									.map((id) => id.trim())
									.filter((id) => id.length > 0 && /^\d+-\d+$/.test(id))
									.map((id) => ({ id }));

								if (userIds.length === 0) {
									return requestOptions;
								}

								if (requestOptions.body && typeof requestOptions.body === 'object') {
									const body = requestOptions.body as CommandExecuteRequestBody;
									if (!body.visibility) {
										body.visibility = { $type: 'CommandLimitedVisibility' };
									}
									body.visibility.permittedUsers = userIds;
								}

								return requestOptions;
							},
						],
					},
				},
			},
		],
	},
];

