import { INodeProperties } from 'n8n-workflow';

export const issueDraftSharedDescription: INodeProperties[] = [
	// Issue Draft: Get/Update/Delete - Draft ID parameter
	{
		displayName: 'Draft ID',
		name: 'draftId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issueDraft'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		placeholder: 'e.g. 1-1',
		description: 'The ID of the draft to retrieve, update, or delete (e.g., 1-1)',
	},
]
