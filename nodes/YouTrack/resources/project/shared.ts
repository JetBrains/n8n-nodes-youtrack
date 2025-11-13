import type { INodeProperties } from 'n8n-workflow';

export const projectSharedDescription: INodeProperties[] = [
	// Project: Get/Get Issues - Project ID parameter
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['get', 'getFieldsSchema', 'getIssues'],
			},
		},
		default: '',
		placeholder: '0-0 or SP',
		description: 'Project ID (e.g., 0-0) or short name (e.g., SP)',
	},

]