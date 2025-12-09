import type { INodeProperties } from 'n8n-workflow';

import { savedQueriesListDescription } from './list';
import { savedQueriesCreateDescription } from './create';

export const savedQueriesDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['savedQueries'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'list',
				description: 'Get many saved queries visible to the current user',
				action: 'Get many saved queries',
				routing: {
					request: {
						method: 'GET',
						url: '/savedQueries',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new saved query',
				action: 'Create saved query',
				routing: {
					request: {
						method: 'POST',
						url: '/savedQueries',
					},
				},
			},
		],
		default: 'list',
		noDataExpression: true,
	},

	...savedQueriesListDescription,
	...savedQueriesCreateDescription,
];



