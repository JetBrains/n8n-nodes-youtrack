import type { INodeProperties } from 'n8n-workflow';

const DEFAULT_FIELDS = 'id,notifyOnOwnChanges,emailNotificationsEnabled,mentionNotificationsEnabled,duplicateClusterNotificationsEnabled,mailboxIntegrationNotificationsEnabled,usePlainTextEmails,autoWatchOnComment,autoWatchOnVote,autoWatchOnUpdate';

export const userGetNotificationsProfileDescription: INodeProperties[] = [
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
				resource: ['user'],
				operation: ['getNotificationsProfile'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: DEFAULT_FIELDS,
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

