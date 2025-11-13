import {INodeProperties} from 'n8n-workflow';

// Type definitions for issue draft create request body
interface IssueDraftCreateRequestBody {
	project: { id: string };
	summary?: string;
	description?: string;
}

export const issueDraftCreateDescription: INodeProperties[] = [
	// Project parameter
	{
		displayName: 'Project',
		name: 'project',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issueDraft'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: '0-0',
		description: 'Project database ID (e.g., 0-0). Use the Get Projects operation to find the ID if you only have the short name.',
		routing: {
			send: {
				type: 'body',
				property: 'project',
				preSend: [
					async function (this, requestOptions) {
						const project = this.getNodeParameter('project') as string;
						if (!project) {
							return requestOptions;
						}

						// Validate that it's a database ID format (number-number)
						const isDatabaseId = /^\d+-\d+$/.test(project);
						if (!isDatabaseId) {
							throw new Error(`Invalid project ID format: "${project}". Please provide a database ID in the format "0-0" (e.g., "0-0", "1-2"). Use the "Get Projects" operation to find the database ID if you only have the short name.`);
						}

						if (requestOptions.body && typeof requestOptions.body === 'object') {
							(requestOptions.body as IssueDraftCreateRequestBody).project = { id: project };
						}

						return requestOptions;
					},
				],
			},
		},
	},

	// Summary parameter
	{
		displayName: 'Summary',
		name: 'summary',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issueDraft'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'Draft title',
		description: 'Issue draft title/summary',
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
		default: {},
		displayOptions: {
			show: {
				resource: ['issueDraft'],
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
				description: 'Issue draft description',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Fields to Return',
				name: 'fields',
				type: 'string',
				default: 'id,summary,project',
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