import type { INodeProperties } from 'n8n-workflow';

import { issueSharedDescription } from './shared';
import { issueCreateDescription } from './create';
import { issueGetDescription } from './get';
import { issueListDescription } from './list';
import { issueUpdateDescription } from './update';

export const issueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['issue'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new issue',
				action: 'Create an issue',
				routing: {
					request: {
						method: 'POST',
						url: '=/admin/projects/{{$parameter.project}}/issues',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an issue',
				action: 'Delete an issue',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/issues/{{$parameter.issueId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an issue by ID',
				action: 'Get an issue',
				routing: {
					request: {
						method: 'GET',
						url: '=/issues/{{$parameter.issueId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List issues',
				action: 'List issues',
				routing: {
					request: {
						method: 'GET',
						url: '/issues',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an issue',
				action: 'Update an issue',
				routing: {
					request: {
						method: 'POST',
						url: '=/issues/{{$parameter.issueId}}',
					},
				},
			},
		],
		default: 'create',
		noDataExpression: true,
	},

	...issueSharedDescription,
	...issueCreateDescription,
	...issueGetDescription,
	...issueListDescription,
	...issueUpdateDescription,
]