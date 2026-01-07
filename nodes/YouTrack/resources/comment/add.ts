import type { INodeProperties } from 'n8n-workflow';

const DEFAULT_FIELDS = 'id,text,created,updated,author(login,name)';

export const commentAddDescription: INodeProperties[] = [
	// Comment: Add - Comment Text
	{
		displayName: 'Comment Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['add'],
			},
		},
		default: '',
		routing: {
			send: {
				type: 'body',
				property: 'text',
			},
		},
	},

	// Comment: Add - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Fields',
		default: {
			fields: DEFAULT_FIELDS,
		},
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['add'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: DEFAULT_FIELDS,
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

