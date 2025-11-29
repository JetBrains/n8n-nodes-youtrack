import type { INodeProperties } from 'n8n-workflow';
import type { CommandExecuteRequestBody } from '../types';
import { normalizeCommandQuery, validateCommandQuery, normalizeComment } from './utils';

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
			'YouTrack command string. Examples: "tag MyTag", "for me", "tag To deploy for jane.doe", "vote+1", "star username", "work 2h Fixed bug", "visible to Developers", "add visible to john.doe". Note: "vote+1" cannot be used on your own issues. Any unrecognized words will be treated as tag names. For assignee commands, use "for me" (current user) or "for username" (must be a valid YouTrack username - if you get "Assignee expected" error, verify the username exists).',
		routing: {
			send: {
				type: 'body',
				property: 'query',
				preSend: [
					async function (this, requestOptions) {
						const query = this.getNodeParameter('query') as string;
						validateCommandQuery(query, this);
						const normalizedQuery = normalizeCommandQuery(query);

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
								const normalizedComment = normalizeComment(comment);
								
								if (normalizedComment && requestOptions.body && typeof requestOptions.body === 'object') {
									(requestOptions.body as CommandExecuteRequestBody).comment = normalizedComment;
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
				default: 'issues(id,idReadable),query,visibility(permittedGroups(id,name),permittedUsers(id,login))',
				description:
					'Comma-separated list of fields to return in response. Example: issues(ID,idReadable,summary),query.',
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
			}
		],
	},
];

