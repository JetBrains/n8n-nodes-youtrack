import type { INodeProperties } from 'n8n-workflow';
import { projectGetIssuesDescription } from './getIssues';
import { projectGetDescription } from './get';
import { projectGetFieldsSchemaDescription } from './getFieldsSchema';
import { projectSharedDescription } from './shared';
import { projectListDescription } from './list';

export const projectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific project',
				action: 'Get a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/projects/{{$parameter.projectId}}',
					},
				},
			},
			{
				name: 'Get Fields Schema',
				value: 'getFieldsSchema',
				description: 'Get the JSON schema for custom fields in the specified project',
				action: 'Get issue fields schema',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/projects/{{$parameter.projectId}}/customFields',
					},
				},
			},
			{
				name: 'Get Issues',
				value: 'getIssues',
				description: 'Get issues for a specific project',
				action: 'Get project issues',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/projects/{{$parameter.projectId}}/issues',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all projects',
				action: 'List projects',
				routing: {
					request: {
						method: 'GET',
						url: '/admin/projects',
					},
				},
			},
		],
		default: 'list',
		noDataExpression: true,
	},

	...projectSharedDescription,
	...projectGetDescription,
	...projectGetFieldsSchemaDescription,
	...projectGetIssuesDescription,
	...projectListDescription,

]