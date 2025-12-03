import type { INodeProperties } from 'n8n-workflow';

// Type definitions for work item add request body
interface WorkItemAddRequestBody {
	duration: { minutes: number };
	text?: string;
	date?: number;
	usesMarkdown?: boolean;
}

export const workItemAddDescription: INodeProperties[] = [
	// WorkItem: Add - Duration (required)
	{
		displayName: 'Duration (Minutes)',
		name: 'durationMinutes',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['workItem'],
				operation: ['add'],
			},
		},
		default: 60,
		description: 'Duration of the work item in minutes',
		routing: {
			send: {
				type: 'body',
				property: 'duration.minutes',
			},
		},
	},

	// WorkItem: Add - Additional Options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['workItem'],
				operation: ['add'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Work item description',
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date and time when the work was done (Unix timestamp in milliseconds)',
				routing: {
					send: {
						type: 'body',
						property: 'date',
						preSend: [
							// Convert to milliseconds if needed
							async function (this, requestOptions) {
								const date = this.getNodeParameter('additionalOptions.date') as string;
								if (date) {
									const timestamp = new Date(date).getTime();
									if (requestOptions.body && typeof requestOptions.body === 'object') {
										(requestOptions.body as WorkItemAddRequestBody).date = timestamp;
									}
								}
								return requestOptions;
							},
						],
					},
				},
			},
			{
				displayName: 'Fields to Return',
				name: 'fields',
				type: 'string',
				default: 'id,text,date,duration(minutes,presentation),author(login,name),creator(login,name)',
				description: 'Comma-separated list of fields to return in response',
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
