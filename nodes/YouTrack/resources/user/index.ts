import type { INodeProperties } from 'n8n-workflow';

import { userSharedDescription } from './shared';
import { userListDescription } from './list';
import { userGetCurrentDescription } from './getCurrent';
import { userGetDescription } from './get';
import { userGetTagsDescription } from './getTags';
import { userGetSavedQueriesDescription } from './getSavedQueries';
import { userGetGeneralProfileDescription } from './getGeneralProfile';
import { userGetNotificationsProfileDescription } from './getNotificationsProfile';
import { userGetTimeTrackingProfileDescription } from './getTimeTrackingProfile';

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific user by ID or login',
				action: 'Get a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Get Current',
				value: 'getCurrent',
				description: 'Get current authenticated user',
				action: 'Get current user',
				routing: {
					request: {
						method: 'GET',
						url: '/users/me',
					},
				},
			},
			{
				name: 'Get General Profile',
				value: 'getGeneralProfile',
				description: 'Get general profile settings for a specific user',
				action: 'Get user general profile',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}/profiles/general',
					},
				},
			},
			{
				name: 'Get Notifications Profile',
				value: 'getNotificationsProfile',
				description: 'Get notification settings for a specific user',
				action: 'Get user notifications profile',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}/profiles/notifications',
					},
				},
			},
			{
				name: 'Get Saved Queries',
				value: 'getSavedQueries',
				description: 'Get saved queries for a specific user',
				action: 'Get user saved queries',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}/savedQueries',
					},
				},
			},
			{
				name: 'Get Tags',
				value: 'getTags',
				description: 'Get tags for a specific user',
				action: 'Get user tags',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}/tags',
					},
				},
			},
			{
				name: 'Get Time Tracking Profile',
				value: 'getTimeTrackingProfile',
				description: 'Get time tracking settings for a specific user',
				action: 'Get user time tracking profile',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}/profiles/timetracking',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List users',
				action: 'List users',
				routing: {
					request: {
						method: 'GET',
						url: '/users',
					},
				},
			},
		],
		default: 'list',
		noDataExpression: true,
	},

	...userSharedDescription,
	...userListDescription,
	...userGetCurrentDescription,
	...userGetDescription,
	...userGetTagsDescription,
	...userGetSavedQueriesDescription,
	...userGetGeneralProfileDescription,
	...userGetNotificationsProfileDescription,
	...userGetTimeTrackingProfileDescription,
];

