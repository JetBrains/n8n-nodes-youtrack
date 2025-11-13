import type { INodeProperties } from 'n8n-workflow';

import { workItemSharedDescription } from './shared';
import { workItemAddDescription } from './add';

export const workItemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['workItem'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Add a work item (time tracking) to an issue',
				action: 'Add a work item',
				routing: {
					request: {
						method: 'POST',
						url: '=/issues/{{$parameter.issueId}}/timeTracking/workItems',
					},
				},
			},
		],
		default: 'add',
		noDataExpression: true,
	},

	...workItemSharedDescription,
	...workItemAddDescription,
];

