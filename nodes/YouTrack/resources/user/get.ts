import type { INodeProperties } from 'n8n-workflow';

export const userGetDescription: INodeProperties[] = [
	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,login,fullName,email,avatarUrl,online,banned,guest,tags(id,name),savedQueries(id,name)',
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,login,fullName,email,avatarUrl,online,banned,guest,tags(id,name),savedQueries(id,name)',
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
];

