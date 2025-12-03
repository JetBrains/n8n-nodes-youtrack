import type { INodeProperties } from 'n8n-workflow';

import { tagSharedDescription } from './shared';
import { tagAddToIssueDescription } from './addToIssue';
import { tagRemoveFromIssueDescription } from './removeFromIssue';
import { tagGetIssueTagsDescription } from './getIssueTags';
import { tagListDescription } from './list';

export const tagDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Add to Issue',
				value: 'addToIssue',
				description: 'Add a tag to an issue',
				action: 'Add tag to issue',
				routing: {
					request: {
						method: 'POST',
						url: '=/issues/{{$parameter.issueId}}/tags',
					},
				},
			},
			{
				name: 'Get Issue Tags',
				value: 'getIssueTags',
				description: 'Get all tags on a specific issue',
				action: 'Get issue tags',
				routing: {
					request: {
						method: 'GET',
						url: '=/issues/{{$parameter.issueId}}/tags',
						qs: {
							fields: 'id,name,owner(login,name),visibleFor(name,id),updateableBy(name,id),$type',
						},
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all available tags',
				action: 'List tags',
				routing: {
					request: {
						method: 'GET',
						url: '/tags',
						qs: {
							fields: 'id,name,owner(login,name),visibleFor(name,id),updateableBy(name,id),untagOnResolve,$type',
						},
					},
				},
			},
			{
				name: 'Remove From Issue',
				value: 'removeFromIssue',
				description: 'Remove a tag from an issue',
				action: 'Remove tag from issue',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/issues/{{$parameter.issueId}}/tags/{{$parameter.tagId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "deleted": true } }}',
								},
							},
						],
					},
				},
			},
		],
		default: 'addToIssue',
		noDataExpression: true,
	},

	...tagSharedDescription,
	...tagAddToIssueDescription,
	...tagRemoveFromIssueDescription,
	...tagGetIssueTagsDescription,
	...tagListDescription,
];

