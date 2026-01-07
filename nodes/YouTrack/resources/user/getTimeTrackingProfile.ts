import type { INodeProperties } from 'n8n-workflow';

export const userGetTimeTrackingProfileDescription: INodeProperties[] = [
	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,periodFormat(id)',
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getTimeTrackingProfile'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,periodFormat(id)',
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

