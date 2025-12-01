import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	IHookFunctions,
} from 'n8n-workflow';

// Define all available YouTrack events
const YOUTRACK_EVENTS = [
	{
		name: 'Issue Created',
		value: 'issueCreated',
		description: 'Trigger when a new issue is created',
	},
	{
		name: 'Issue Updated',
		value: 'issueUpdated',
		description: 'Trigger when an issue is updated',
	},
	{
		name: 'Issue Deleted',
		value: 'issueDeleted',
		description: 'Trigger when an issue is deleted',
	},
	{
		name: 'Comment Added',
		value: 'commentAdded',
		description: 'Trigger when a new comment is added to an issue',
	},
	{
		name: 'Comment Updated',
		value: 'commentUpdated',
		description: 'Trigger when a new comment is updated',
	},
	{
		name: 'Comment Deleted',
		value: 'commentDeleted',
		description: 'Trigger when a comment is deleted',
	},
	{
		name: 'Work Item Added',
		value: 'workItemAdded',
		description: 'Trigger when a work item is added to an issue',
	},
	{
		name: 'Work Item Updated',
		value: 'workItemUpdated',
		description: 'Trigger when a work item is updated',
	},
	{
		name: 'Work Item Deleted',
		value: 'workItemDeleted',
		description: 'Trigger when a work item is deleted',
	},
	{
		name: 'Issue Attachment Added',
		value: 'issueAttachmentAdded',
		description: 'Trigger when an attachment is added to an issue',
	},
	{
		name: 'Issue Attachment Deleted',
		value: 'issueAttachmentDeleted',
		description: 'Trigger when an attachment is deleted from an issue',
	},
] as const;

// Extract event values for validation
const EVENT_VALUES: string[] = YOUTRACK_EVENTS.map(e => e.value);

export class YoutrackTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'YouTrack Trigger',
		name: 'youtrackTrigger',
		icon: 'file:jetbrains-youtrack-icon.svg',
		group: ['trigger'],
		version: 2,
		subtitle: '={{$parameter["events"] && $parameter["events"].length > 0 ? $parameter["events"].join(", ") : "No events selected"}}',
		description: 'Triggers workflow on YouTrack events',
		defaults: {
			name: 'YouTrack Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'youTrackApi',
				required: true,
				displayName: 'Credentials to Connect to YouTrack',
			},
			{
				name: 'youTrackWebhookApi',
				required: false,
				displayName: 'Authenticate Incoming Webhook',
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: ['issueCreated'],
				options: [
					{
						name: '* All Events',
						value: '*',
						description: 'Trigger on any YouTrack event',
					},
					...YOUTRACK_EVENTS,
				],
				description: 'Select one or more events to listen to. Choose "* All Events" to listen to all events.',
			},
		]
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				return !!webhookData.webhookUrl;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookUrl = webhookUrl;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
		const webhookData = this.getWorkflowStaticData('node');
				delete webhookData.webhookUrl;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const selectedEvents = this.getNodeParameter('events', []) as string[];

		// Validate authentication if webhook credential is configured
		try {
			const webhookCredentials = await this.getCredentials('youTrackWebhookApi');
			
			if (webhookCredentials) {
				const authMethod = webhookCredentials.authMethod as string;
				const expectedToken = webhookCredentials.authToken as string;
				
				let receivedToken: string | undefined;
				
				if (authMethod === 'headerAuth') {
					// Header-based authentication
					const headerName = webhookCredentials.headerName as string;
					receivedToken = req.headers[headerName.toLowerCase()] as string;
				} else if (authMethod === 'queryAuth') {
					// Query parameter authentication
					const queryParamName = webhookCredentials.queryParameterName as string;
					receivedToken = req.query?.[queryParamName] as string;
				}
				
				// Validate the token
				if (!receivedToken || receivedToken !== expectedToken) {
					return {
						webhookResponse: {
							message: 'Unauthorized: Invalid or missing authentication token',
							statusCode: 401,
						},
					};
				}
			}
		} catch (error) {
			return {
				webhookResponse: {
					message: `Error validating authentication: ${error}`,
					statusCode: 401,
				},
			};
		}

		// Parse the webhook payload safely
		let body: IDataObject = {};
		try {
			body = req.body as IDataObject || {};
		} catch (error) {
			return {
				webhookResponse: {
					error: `Invalid payload format. ${error}`,
					statusCode: 400,
				},
			};
		}
		
		// Determine the event type from the payload
		let detectedEvent = 'unknown';
		
		if (body && typeof body === 'object') {
			// Check for the explicit 'event' field from YouTrack app workflows
			if (body.event && typeof body.event === 'string') {
				const eventValue = body.event as string;
				// Validate against known events - automatically includes all events from YOUTRACK_EVENTS
				if (EVENT_VALUES.includes(eventValue)) {
					detectedEvent = eventValue;
				}
			}
		}

		// Check if this event matches our configured event filter
		const acceptsAllEvents = selectedEvents && selectedEvents.length > 0 && selectedEvents.includes('*');
		
		// If specific events are selected, verify the detected event is in the list
		if (!acceptsAllEvents) {
			// Ensure selectedEvents is an array and not empty
			if (!selectedEvents || selectedEvents.length === 0) {
				return {
					webhookResponse: {
						message: 'No events selected',
						statusCode: 200,
					},
				};
			}
			
			// Check if detected event is in the selected events
			if (!selectedEvents.includes(detectedEvent)) {
				return {
					webhookResponse: {
						message: `Event type '${detectedEvent}' does not match filter. Selected events: ${selectedEvents.join(', ')}`,
						statusCode: 200,
					},
				};
			}
		}

		return {
			workflowData: [
				[
					{
						json: body,
					},
				],
			],
			webhookResponse: {
				message: 'Webhook received successfully',
				statusCode: 200,
			},
		};
	}
}
