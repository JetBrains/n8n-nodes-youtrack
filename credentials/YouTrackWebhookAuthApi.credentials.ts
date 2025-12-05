import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class YouTrackWebhookAuthApi implements ICredentialType {
	name = 'youTrackWebhookAuthApi';
	displayName = 'YouTrack Webhook Auth API';
	documentationUrl = 'https://www.jetbrains.com/help/youtrack/devportal/youtrack-rest-api.html';
	properties: INodeProperties[] = [
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{
					name: 'Header Auth',
					value: 'headerAuth',
					description: 'Authenticate using a custom header',
				}
			],
			default: 'headerAuth',
			description: 'The authentication method to use for webhook validation',
		},
		{
			displayName: 'Header Name',
			name: 'headerName',
			type: 'string',
			displayOptions: {
				show: {
					authMethod: ['headerAuth'],
				},
			},
			default: 'X-YouTrack-Signature',
			description: 'The name of the header that contains the authentication token',
			required: true,
		},
		{
			displayName: 'Authentication Token',
			name: 'authToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'The secret token used to authenticate incoming webhooks. Generate a random secure token and configure it in your YouTrack app.',
			required: true,
			placeholder: 'e.g. my-secret-webhook-token-12345',
		},
	];
	authenticate = undefined;
	test = undefined;

	icon = 'file:../../common/jetbrains-youtrack-icon.svg' as const;
}



