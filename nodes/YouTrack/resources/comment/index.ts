import type { INodeProperties } from 'n8n-workflow';

import { commentSharedDescription } from './shared';
import { commentAddDescription } from './add';
import { commentListDescription } from './list';

export const commentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['comment'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Add a comment to an issue',
				action: 'Add a comment',
				routing: {
					request: {
						method: 'POST',
						url: '=/issues/{{$parameter.issueId}}/comments',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all comments on an issue',
				action: 'List comments',
				routing: {
					request: {
						method: 'GET',
						url: '=/issues/{{$parameter.issueId}}/comments',
						qs: {
							fields: 'id,text,created,updated,author(login,name)',
						},
					},
				},
			},
		],
		default: 'add',
		noDataExpression: true,
	},

	...commentSharedDescription,
	...commentAddDescription,
	...commentListDescription,
];

