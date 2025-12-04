import {INodeType, INodeTypeDescription} from 'n8n-workflow';
import {nodeProperties} from './resources';

export class Youtrack implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details
        displayName: 'YouTrack',
        name: 'youtrack',
        icon: 'file:jetbrains-youtrack-icon.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from YouTrack API',
        defaults: {
            name: 'YouTrack',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'permanentTokenCredentialForYouTrackApi',
                required: true,
                displayName: 'Credentials to Connect to YouTrack',
            },
        ],
        requestDefaults: {
            baseURL: '={{$credentials.url}}/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: nodeProperties,
        usableAsTool: true,
    };
}

