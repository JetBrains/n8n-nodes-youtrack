import type { INodeProperties } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { CommandSharedRequestBody } from '../types';

export const commandSharedDescription: INodeProperties[] = [
	// Command: Issue IDs parameter
	{
		displayName: 'Issue IDs',
		name: 'issueIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['command'],
				operation: ['execute'],
			},
		},
		default: '',
		placeholder: 'PROJECT-123, PROJECT-124, 2-15',
		description:
			'Comma-separated list of issue IDs for bulk operations. Examples: "PROJECT-123, PROJECT-124" (readable IDs) or "2-15, 2-16" (database IDs). Supports mixing both formats. The command will be applied to all listed issues.',
		routing: {
			send: {
				type: 'body',
				property: 'issues',
				preSend: [
					/**
					 * Parses and validates comma-separated issue IDs.
					 * Automatically detects format: database ID (e.g., "2-15") vs readable ID (e.g., "PROJECT-123").
					 * Database IDs match the pattern "number-number" and are sent as { id: "..." }.
					 * Readable IDs are sent as { idReadable: "..." }.
					 * 
					 * @throws {NodeOperationError} If no issue IDs are provided
					 */
					async function (this, requestOptions) {
						const issueIds = this.getNodeParameter('issueIds') as string;
						if (!issueIds) {
							throw new NodeOperationError(
								this.getNode(),
								'Issue IDs are required',
								{ itemIndex: this.getItemIndex() }
							);
						}

						// Split by comma and trim
						const ids = issueIds
							.split(',')
							.map((id) => id.trim())
							.filter((id) => id.length > 0);

						// Convert to array of issue objects
						const issues = ids.map((id) => {
							// Check if it's a database ID (format: number-number)
							const isDatabaseId = /^\d+-\d+$/.test(id);
							if (isDatabaseId) {
								return { id };
							}
							// Otherwise, treat as readable ID
							return { idReadable: id };
						});

						if (requestOptions.body && typeof requestOptions.body === 'object') {
							(requestOptions.body as CommandSharedRequestBody).issues = issues;
						}

						return requestOptions;
					},
				],
			},
		},
	},
];

