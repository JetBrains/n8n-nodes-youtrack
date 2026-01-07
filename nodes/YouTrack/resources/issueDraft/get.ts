import { INodeProperties } from 'n8n-workflow';

export const issueDraftGetDescription: INodeProperties[] = [
	// Additional Fields Section
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Fields',
		default: {
			fields: 'id,idReadable,summary,description,created,updated,resolved,reporter(login,name),customFields(name,value),tags(id,name)',
		},
		displayOptions: {
			show: {
				resource: ['issueDraft'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: 'id,idReadable,summary,description,created,updated,resolved,reporter(login,name),customFields(name,value),tags(id,name)',
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

]
