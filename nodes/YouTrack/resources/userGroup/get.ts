import type { INodeProperties } from 'n8n-workflow';

export const userGroupGetDescription: INodeProperties[] = [
	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,name,usersCount,users(id,login,fullName,email),teamForProject(name,shortName)',
		},
		displayOptions: {
			show: {
				resource: ['userGroup'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,name,usersCount,users(id,login,fullName,email),teamForProject(name,shortName)',
				description: 'Comma-separated list of fields to return. If not specified, only entityID is returned. Use users(...) to include user details.',
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

