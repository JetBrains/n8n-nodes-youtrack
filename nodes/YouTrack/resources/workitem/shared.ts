import type { INodeProperties } from 'n8n-workflow';

export const workItemSharedDescription: INodeProperties[] = [
	// WorkItem: Issue ID parameter (used by add operation)
	{
		displayName: 'Issue ID',
		name: 'issueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['workItem'],
				operation: ['add'],
			},
		},
		default: '',
		placeholder: 'PROJECT-123',
		description: 'The ID of the issue to add work item to (e.g., PROJECT-123)',
	},
];

