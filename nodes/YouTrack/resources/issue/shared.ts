import { INodeProperties } from 'n8n-workflow';

export const issueSharedDescription: INodeProperties[] = [
	// Issue: Get/Update/Delete - Issue ID parameter
	{
		displayName: 'Issue ID',
		name: 'issueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issue'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		placeholder: 'e.g. PROJECT-123',
		description: 'The ID of the issue to retrieve, update, or delete (e.g., PROJECT-123)',
	},
]

