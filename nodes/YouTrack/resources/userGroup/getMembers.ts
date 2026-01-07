import type { INodeProperties } from 'n8n-workflow';

const DEFAULT_FIELDS = 'users(id,login,fullName,email,avatarUrl,online,banned)';

export const userGroupGetMembersDescription: INodeProperties[] = [
	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: DEFAULT_FIELDS,
		},
		displayOptions: {
			show: {
				resource: ['userGroup'],
				operation: ['getMembers'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: DEFAULT_FIELDS,
				description: 'Comma-separated list of fields to return. Use users(...) to include user details. Example: "users(ID,login,fullName,email)" or "ID,name,users(ID,login)" to also include group info.',
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

