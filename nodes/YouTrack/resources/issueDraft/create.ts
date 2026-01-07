import {INodeProperties, NodeOperationError} from 'n8n-workflow';
import type { IssueDraftCreateRequestBody } from '../types';

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
		placeholder: 'e.g. 0-0',
		description: 'Project database ID (e.g., 0-0). Use the Get Projects operation to find the ID if you only have the short name.',
		routing: {
			send: {
				type: 'body',
				property: 'project',
				preSend: [
					/**
					 * Validates and formats the project ID for issue draft creation.
					 * Ensures the project ID is in the correct database ID format (e.g., "0-0", "1-2").
					 * Converts the string ID to the required object format { id: "..." }.
					 * 
					 * @throws {NodeOperationError} If project ID format is invalid (must be "number-number")
					 */
					async function (this, requestOptions) {
						const project = this.getNodeParameter('project') as string;
						if (!project) {
							return requestOptions;
						}

						// Validate that it's a database ID format (number-number)
						const isDatabaseId = /^\d+-\d+$/.test(project);
						if (!isDatabaseId) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid project ID format: "${project}". Please provide a database ID in the format "0-0" (e.g., "0-0", "1-2"). Use the "Get Projects" operation to find the database ID if you only have the short name.`,
								{ itemIndex: this.getItemIndex() }
							);
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
		placeholder: 'e.g. Draft title',
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
		default: {
			fields: 'id,idReadable,summary',
		},
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