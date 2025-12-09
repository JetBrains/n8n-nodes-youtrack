import type { INodeProperties } from 'n8n-workflow';

export const savedQueriesCreateDescription: INodeProperties[] = [
	// Saved Queries: Create - Name
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['savedQueries'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'e.g. Requires Attention',
		description: 'The name of the saved search',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	// Saved Queries: Create - Query
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['savedQueries'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'e.g. Priority: Major, Critical, Show-stopper #Unresolved',
		description: 'The YouTrack query string to save. Examples: "Priority: Major", "for: me", "project: MyProject #Unresolved".',
		routing: {
			send: {
				type: 'body',
				property: 'query',
			},
		},
	},
	// Saved Queries: Create - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['savedQueries'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Fields to Return',
				name: 'fields',
				type: 'string',
				default: 'id,name,query,owner(login,name),visibleFor(name,id),issues(id,idReadable,summary)',
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
];



