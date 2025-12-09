import type { INodeProperties } from 'n8n-workflow';

export const tagSharedDescription: INodeProperties[] = [
	// Tag: Issue ID parameter (used by addToIssue, removeFromIssue, getIssueTags)
	{
		displayName: 'Issue ID',
		name: 'issueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['addToIssue', 'removeFromIssue', 'getIssueTags'],
			},
		},
		default: '',
		placeholder: 'e.g. PROJECT-123',
		description: 'The ID of the issue (e.g., PROJECT-123)',
	},
];

