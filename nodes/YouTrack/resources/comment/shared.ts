import type { INodeProperties } from 'n8n-workflow';

export const commentSharedDescription: INodeProperties[] = [
	// Comment: Issue ID parameter (used by add and list operations)
	{
		displayName: 'Issue ID',
		name: 'issueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: ['add', 'list'],
			},
		},
		default: '',
		placeholder: 'PROJECT-123',
		description: 'The ID of the issue (e.g., PROJECT-123)',
	},
]

