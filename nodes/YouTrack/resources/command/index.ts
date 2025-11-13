import type { INodeProperties } from 'n8n-workflow';

import { commandSharedDescription } from './shared';
import { commandExecuteDescription } from './execute';

export const commandDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['command'],
			},
		},
		options: [
			{
				name: 'Execute',
				value: 'execute',
				description:
					'Execute a YouTrack command on one or more issues (bulk operations supported). Supports all YouTrack commands: tags, assignees, comments, work items, votes, watchers, links, custom fields, and more. For star/watcher commands, use "star username" or "watcher username".',
				action: 'Execute a command',
				routing: {
					request: {
						method: 'POST',
						url: '/commands',
					},
				},
			},
		],
		default: 'execute',
		noDataExpression: true,
	},

	...commandSharedDescription,
	...commandExecuteDescription,
];

