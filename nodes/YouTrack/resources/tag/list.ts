import type { INodeProperties } from 'n8n-workflow';

export const tagListDescription: INodeProperties[] = [
	// Return All toggle
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	// Tag: List - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,name,owner(login,name),visibleFor(name,id),updateableBy(name,id),untagOnResolve,issues(id,idReadable),$type',
				description: 'Comma-separated list of fields to return',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				placeholder: 'bug',
				description: 'Filter tags by name',
				routing: {
					send: {
						type: 'query',
						property: 'query',
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
				description: 'Number of tags to skip before returning results',
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

