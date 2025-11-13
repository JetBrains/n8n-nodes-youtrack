import type { INodeProperties } from 'n8n-workflow';

import { issueDraftSharedDescription } from './shared';
import { issueDraftCreateDescription } from './create';
import { issueDraftGetDescription } from './get';
import { issueDraftListDescription } from './list';
import { issueDraftUpdateDescription } from './update';

export const issueDraftDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['issueDraft'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new issue draft',
				action: 'Create an issue draft',
				routing: {
					request: {
						method: 'POST',
						url: '/users/me/drafts',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an issue draft',
				action: 'Delete an issue draft',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/users/me/drafts/{{$parameter.draftId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an issue draft by ID',
				action: 'Get an issue draft',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/me/drafts/{{$parameter.draftId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List issue drafts',
				action: 'List issue drafts',
				routing: {
					request: {
						method: 'GET',
						url: '/users/me/drafts',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an issue draft',
				action: 'Update an issue draft',
				routing: {
					request: {
						method: 'POST',
						url: '=/users/me/drafts/{{$parameter.draftId}}',
					},
				},
			},
		],
		default: 'create',
		noDataExpression: true,
	},

	...issueDraftSharedDescription,
	...issueDraftCreateDescription,
	...issueDraftGetDescription,
	...issueDraftListDescription,
	...issueDraftUpdateDescription,
]
