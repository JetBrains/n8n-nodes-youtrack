import type { INodeProperties } from 'n8n-workflow';

import { userGroupSharedDescription } from './shared';
import { userGroupListDescription } from './list';
import { userGroupGetDescription } from './get';
import { userGroupGetMembersDescription } from './getMembers';

export const userGroupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['userGroup'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'list',
				description: 'Get many user groups',
				action: 'Get many user groups',
				routing: {
					request: {
						method: 'GET',
						url: '/groups',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific user group by ID',
				action: 'Get a user group',
				routing: {
					request: {
						method: 'GET',
						url: '=/groups/{{$parameter.groupId}}',
					},
				},
			},
			{
				name: 'Get Members',
				value: 'getMembers',
				description: 'Get members of a user group',
				action: 'Get user group members',
				routing: {
					request: {
						method: 'GET',
						url: '=/groups/{{$parameter.groupId}}',
					},
				},
			},
		],
		default: 'list',
		noDataExpression: true,
	},

	...userGroupSharedDescription,
	...userGroupListDescription,
	...userGroupGetDescription,
	...userGroupGetMembersDescription,
];

