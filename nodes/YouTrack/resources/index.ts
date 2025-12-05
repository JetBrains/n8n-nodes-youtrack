import { INodeProperties } from 'n8n-workflow';
import { issueDescription } from './issue';
import { issueDraftDescription } from './issueDraft';
import { projectDescription } from './project';
import { commentDescription } from './comment';
import { workItemDescription } from './workitem';
import { tagDescription } from './tag';
import { commandDescription } from './command';
import { userDescription } from './user';
import { userGroupDescription } from './userGroup';
import { savedQueriesDescription } from './savedQueries';

// Resource selector (root level)
export const resourceSelection: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Command',
			value: 'command',
			description: 'Execute YouTrack commands on issues (tags, assignees, comments, work items, votes, etc.)',
		},
		{
			name: 'Comment',
			value: 'comment',
			description: 'Add and manage comments on issues',
		},
		{
			name: 'Issue',
			value: 'issue',
			description: 'Create and manage issues in YouTrack',
		},
		{
			name: 'Issue Draft',
			value: 'issueDraft',
			description: 'Create and manage issue drafts',
		},
		{
			name: 'Project',
			value: 'project',
			description: 'Access project information',
		},
		{
			name: 'Saved Query',
			value: 'savedQueries',
			description: 'Get many and create saved searches',
		},
		{
			name: 'Tag',
			value: 'tag',
			description: 'Add and manage tags on issues',
		},
		{
			name: 'User',
			value: 'user',
			description: 'Find and manage users',
		},
		{
			name: 'User Group',
			value: 'userGroup',
			description: 'Find user groups and get group members',
		},
		{
			name: 'Work Item',
			value: 'workItem',
			description: 'Track time spent on issues',
		},
	],
	default: 'issue',
};

// Export all properties in the correct order
export const nodeProperties: INodeProperties[] = [
	resourceSelection,
	...commentDescription,
	...commandDescription,
	...issueDescription,
	...issueDraftDescription,
	...projectDescription,
	...tagDescription,
	...workItemDescription,
	...userDescription,
	...userGroupDescription,
	...savedQueriesDescription,
];

