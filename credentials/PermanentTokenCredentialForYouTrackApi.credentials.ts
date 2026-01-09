import type {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class PermanentTokenCredentialForYouTrackApi implements ICredentialType {
    name = 'permanentTokenCredentialForYouTrackApi';
    displayName = 'YouTrack API';
    // eslint-disable-next-line n8n-nodes-base/cred-class-field-documentation-url-miscased
    documentationUrl = 'https://www.jetbrains.com/help/youtrack/devportal/youtrack-rest-api.html';
    properties: INodeProperties[] = [
        {
            displayName: 'YouTrack URL',
            name: 'url',
            type: 'string',
            default: '',
            placeholder: 'e.g. http://localhost:8088',
            description: 'The base URL of your YouTrack instance (without /api)',
            required: true,
        },
        {
            displayName: 'Permanent Token',
            name: 'token',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            description: 'Your YouTrack permanent token. Generate one in your Hub profile under Authentication > Tokens.',
            required: true,
        },
    ];
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'Authorization': '=Bearer {{$credentials.token}}',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        },
    };

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: '={{$credentials.url}}/api/admin/projects?fields=id&$top=1',
		},
	};

	icon = 'file:../../common/youtrack-logo.svg' as const;

}
