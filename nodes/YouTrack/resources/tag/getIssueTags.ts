import type { INodeProperties } from 'n8n-workflow';

export const tagGetIssueTagsDescription: INodeProperties[] = [
	// Tag: Get Issue Tags - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
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
				default: 'id,name,owner(login,name),visibleFor(name,id),updateableBy(name,id),$type',
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

	// Note: Alternative way to get issue tags
	{
		displayName: 'Note',
		name: 'note',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['getIssueTags'],
			},
		},
		default: 'Private tags (like "Star") may not appear in this list due to API limitations. To see all tags including private ones, use Issue > Get operation and include "tags(id,name)" in the fields parameter.',
	},
];

