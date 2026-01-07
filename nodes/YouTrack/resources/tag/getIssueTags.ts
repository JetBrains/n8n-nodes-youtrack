import type { INodeProperties } from 'n8n-workflow';

const DEFAULT_FIELDS = 'id,name,owner(login,name),visibleFor(name,id),updateableBy(name,id)';

export const tagGetIssueTagsDescription: INodeProperties[] = [
	// Tag: Get Issue Tags - Additional Options
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
				resource: ['tag'],
				operation: ['getIssueTags'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: DEFAULT_FIELDS,
				description: 'Comma-separated list of fields to return',
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

