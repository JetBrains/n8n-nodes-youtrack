import { INodeProperties } from 'n8n-workflow';

export const issueDraftListDescription: INodeProperties[] = [
	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['issueDraft'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,summary,description,project',
				description: 'Comma-separated list of fields to return. If not specified, only entityID is returned.',
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
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
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
				description: 'Number of drafts to skip before returning results',
				routing: {
					send: {
						type: 'query',
						property: '$skip',
					},
				},
			},
		],
	},

]
