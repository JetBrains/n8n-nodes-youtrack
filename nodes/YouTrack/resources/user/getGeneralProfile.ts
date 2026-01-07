import type { INodeProperties } from 'n8n-workflow';

const DEFAULT_FIELDS = 'id,dateFieldFormat(id,presentation,pattern,datePattern),timezone(id,presentation,offset),locale(id,name,community,language,locale)';

export const userGetGeneralProfileDescription: INodeProperties[] = [
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
				operation: ['getGeneralProfile'],
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

