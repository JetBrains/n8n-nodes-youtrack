import type { INodeProperties } from 'n8n-workflow';

export const tagAddToIssueDescription: INodeProperties[] = [
	// Tag: Add to Issue - Tag ID
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['addToIssue'],
			},
		},
		default: '',
		placeholder: 'e.g. 6-4',
		description: 'Tag ID to add to the issue (e.g., 6-4). You can get tag IDs by listing tags first.',
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},

	// Tag: Add to Issue - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,name,owner(login,name)',
		},
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['addToIssue'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,name,owner(login,name)',
				description: 'Comma-separated list of fields to return in response',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
		],
	},
];

