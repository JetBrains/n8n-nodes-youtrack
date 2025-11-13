import type { INodeProperties } from 'n8n-workflow';

export const userSharedDescription: INodeProperties[] = [
	// User: Get/Get Tags/Get Saved Queries/Get Profiles - User ID parameter
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'getTags', 'getSavedQueries', 'getGeneralProfile', 'getNotificationsProfile', 'getTimeTrackingProfile'],
			},
		},
		default: '',
		placeholder: '1-0 or jane.doe',
		description: 'The database ID (e.g., 1-0) or login (e.g., jane.doe) of the user',
	},
];

