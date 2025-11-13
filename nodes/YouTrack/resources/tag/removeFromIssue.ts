import type { INodeProperties } from 'n8n-workflow';

export const tagRemoveFromIssueDescription: INodeProperties[] = [
	// Tag: Remove from Issue - Tag ID
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['removeFromIssue'],
			},
		},
		default: '',
		placeholder: '6-4',
		description: 'Tag ID to remove from the issue (e.g., 6-4). You can get tag IDs by listing issue tags first.',
	},
];
