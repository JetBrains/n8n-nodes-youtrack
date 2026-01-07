import type { INodeProperties } from 'n8n-workflow';

export const projectGetDescription: INodeProperties[] = [
	// Additional Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Fields',
		default: {
			fields: 'id,name,shortName,description,archived,leader(login,name)',
		},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,name,shortName,description,archived,leader(login,name)',
				description: 'Comma-separated list of fields to return. If not specified, only entityID is returned.',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
		],
	},
]