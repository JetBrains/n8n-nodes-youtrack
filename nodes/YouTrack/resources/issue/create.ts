import { INodeProperties } from 'n8n-workflow';

export const issueCreateDescription: INodeProperties[] = [
	// Project parameter
	{
		displayName: 'Project',
		name: 'project',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issue'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'e.g. SP or 0-0',
		description: 'Project short name (e.g., SP, BUG) or database ID (e.g., 0-0)',
	},

	// Summary parameter
	{
		displayName: 'Summary',
		name: 'summary',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issue'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'e.g. Issue title',
		description: 'Issue title/summary',
		routing: {
			send: {
				type: 'body',
				property: 'summary',
			},
		},
	},

	// Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: 'id,idReadable,summary'
		},
		displayOptions: {
			show: {
				resource: ['issue'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Issue description',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,idReadable,summary',
				description: 'Comma-separated list of fields to return in response. If not specified, only entityID is returned.',
				routing: {
					send: {
						type: 'query',
						property: 'fields',
					},
				},
			},
		],
	},

]