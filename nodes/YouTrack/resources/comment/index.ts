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
				name: 'Get Many',
				value: 'list',
				description: 'Get many comments on an issue',
				action: 'Get many comments',
				routing: {
					request: {
						method: 'GET',
						url: '=/issues/{{$parameter.issueId}}/comments',
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

