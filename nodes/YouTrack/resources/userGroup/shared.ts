import type { INodeProperties } from 'n8n-workflow';

export const userGroupSharedDescription: INodeProperties[] = [
	// User Group: Get/Get Members - Group ID parameter
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['userGroup'],
				operation: ['get', 'getMembers'],
			},
		},
		default: '',
		placeholder: 'e.g. 3-0',
		description: 'The database ID of the user group (e.g., 3-0)',
	},
];

