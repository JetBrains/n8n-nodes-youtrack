import type { INodeProperties } from 'n8n-workflow';

export const projectGetIssuesDescription: INodeProperties[] = [
	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,idReadable,summary,description,created,updated,resolved',
		},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['getIssues'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,idReadable,summary,description,created,updated,resolved',
				description: 'Comma-separated list of fields to return. If not specified, only entityID is returned.',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
			// TODO:- not working?
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'string',
				default: '',
				placeholder: 'e.g. type,assignee,priority',
				description: 'Comma-separated list of custom field names to include. Use multiple times for multiple fields.',
				routing: {
					send: {
						type: 'query',
						property: 'customFields',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
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
				description: 'Number of issues to skip before returning results',
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