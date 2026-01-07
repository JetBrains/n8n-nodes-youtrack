import type { INodeProperties } from 'n8n-workflow';

export const commentListDescription: INodeProperties[] = [
	// Return All toggle
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	// Comment: List - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,text,created,updated,author(login,name)',
		},
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,text,created,updated,author(login,name)',
				description: 'Comma-separated list of fields to return',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						'/returnAll': [false],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: '$top',
					},
				},
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Number of comments to skip before returning results',
				routing: {
					send: {
						type: 'query',
						property: '$skip',
					},
				},
			},
		],
	},
];

