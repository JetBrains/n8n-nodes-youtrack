import { INodeProperties } from 'n8n-workflow';

const DEFAULT_FIELDS = 'id,field(name,id),project(shortName),canBeEmpty,isPublic';

export const projectGetFieldsSchemaDescription: INodeProperties[] = [
	// Additional Fields Section
	{
		displayName: 'Additional Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Option',
		default: {
			fields: DEFAULT_FIELDS,
		},
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['getFieldsSchema'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: DEFAULT_FIELDS,
				description: 'Comma-separated list of ProjectCustomField attributes to return. If not specified, only entityID is returned.',
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
				description: 'Number of entries to skip before returning the first one',
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

