import {INodeProperties} from 'n8n-workflow';

// Type definitions for issue draft update request body
interface IssueDraftUpdateRequestBody {
	project?: { id: string };
	summary?: string;
	description?: string;
}

export const issueDraftUpdateDescription: INodeProperties[] = [
	// Fields to Update
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['issueDraft'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Project',
				name: 'project',
				type: 'string',
				default: '',
				description: 'Project database ID (e.g., 0-0). Use the Get Projects operation to find the ID if you only have the short name.',
				routing: {
					send: {
						type: 'body',
						property: 'project',
						preSend: [
							async function (this, requestOptions) {
								const project = this.getNodeParameter('updateFields.project') as string;
								if (!project) {
									return requestOptions;
								}

								// Validate that it's a database ID format (number-number)
								const isDatabaseId = /^\d+-\d+$/.test(project);
								if (!isDatabaseId) {
									throw new Error(`Invalid project ID format: "${project}". Please provide a database ID in the format "0-0" (e.g., "0-0", "1-2"). Use the "Get Projects" operation to find the database ID if you only have the short name.`);
								}

								if (requestOptions.body && typeof requestOptions.body === 'object') {
									(requestOptions.body as IssueDraftUpdateRequestBody).project = { id: project };
								}

								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Summary',
				name: 'summary',
				type: 'string',
				default: '',
				description: 'New issue draft title/summary',
				routing: {
					send: {
						type: 'body',
						property: 'summary',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'New issue draft description',
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
				default: 'id,summary,description,project',
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
