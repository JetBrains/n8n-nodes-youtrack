import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { IWebhookFunctions, IHookFunctions } from 'n8n-workflow';
import { YoutrackTrigger } from '../nodes/YouTrack/YoutrackTrigger.node';

describe('YouTrack Trigger Node', () => {
	let trigger: YoutrackTrigger;

	beforeEach(() => {
		trigger = new YoutrackTrigger();
	});

	describe('Webhook Methods', () => {
		describe('checkExists', () => {
			it('should return true when webhookUrl exists', async () => {
				const mockContext = {
					getWorkflowStaticData: vi.fn().mockReturnValue({ webhookUrl: 'http://example.com/webhook' }),
				} as unknown as IHookFunctions;

				const result = await trigger.webhookMethods.default.checkExists.call(mockContext);
				expect(result).toBe(true);
			});

			it('should return false when webhookUrl does not exist', async () => {
				const mockContext = {
					getWorkflowStaticData: vi.fn().mockReturnValue({}),
				} as unknown as IHookFunctions;

				const result = await trigger.webhookMethods.default.checkExists.call(mockContext);
				expect(result).toBe(false);
			});
		});

		describe('create', () => {
			it('should store webhookUrl in workflow static data', async () => {
				const webhookData: Record<string, string> = {};
				const mockContext = {
					getNodeWebhookUrl: vi.fn().mockReturnValue('http://example.com/webhook'),
					getWorkflowStaticData: vi.fn().mockReturnValue(webhookData),
				} as unknown as IHookFunctions;

				const result = await trigger.webhookMethods.default.create.call(mockContext);
				expect(result).toBe(true);
				expect(webhookData.webhookUrl).toBe('http://example.com/webhook');
			});
		});

		describe('delete', () => {
			it('should remove webhookUrl from workflow static data', async () => {
				const webhookData: Record<string, string> = { webhookUrl: 'http://example.com/webhook' };
				const mockContext = {
					getWorkflowStaticData: vi.fn().mockReturnValue(webhookData),
				} as unknown as IHookFunctions;

				const result = await trigger.webhookMethods.default.delete.call(mockContext);
				expect(result).toBe(true);
				expect(webhookData.webhookUrl).toBeUndefined();
			});
		});
	});

	describe('Webhook - Authentication Validation', () => {
		it('should accept request with valid header-based authentication', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: { 'x-auth-token': 'valid-token-123' },
					body: { event: 'issueCreated', issue: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue({
					authMethod: 'headerAuth',
					authToken: 'valid-token-123',
					headerName: 'X-Auth-Token',
				}),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.workflowData).toBeDefined();
			expect(result.webhookResponse?.statusCode).toBe(200);
		});

		it('should reject request with invalid header-based authentication', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: { 'x-auth-token': 'wrong-token' },
					body: { event: 'issueCreated' },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue({
					authMethod: 'headerAuth',
					authToken: 'valid-token-123',
					headerName: 'X-Auth-Token',
				}),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(401);
			expect(result.webhookResponse?.message).toContain('Unauthorized');
		});

		it('should accept request with valid query-based authentication', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					query: { token: 'valid-query-token' },
					body: { event: 'issueCreated', issue: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue({
					authMethod: 'queryAuth',
					authToken: 'valid-query-token',
					queryParameterName: 'token',
				}),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.workflowData).toBeDefined();
			expect(result.webhookResponse?.statusCode).toBe(200);
		});

		it('should reject request with invalid query-based authentication', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					query: { token: 'wrong-query-token' },
					body: { event: 'issueCreated' },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue({
					authMethod: 'queryAuth',
					authToken: 'valid-query-token',
					queryParameterName: 'token',
				}),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(401);
		});

		it('should reject request with missing authentication token', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					query: {},
					body: { event: 'issueCreated' },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue({
					authMethod: 'headerAuth',
					authToken: 'required-token',
					headerName: 'X-Auth-Token',
				}),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(401);
		});

		it('should accept request when no webhook credentials are configured', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'issueCreated', issue: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.workflowData).toBeDefined();
			expect(result.webhookResponse?.statusCode).toBe(200);
		});
	});

	describe('Webhook - Event Filtering', () => {
		it('should accept event when included in selected events', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'issueCreated', issue: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated', 'issueUpdated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.workflowData).toBeDefined();
			expect(result.webhookResponse?.statusCode).toBe(200);
		});

		it('should reject event when not in selected events', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'commentAdded', comment: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated', 'issueUpdated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(200);
			expect(result.webhookResponse?.message).toContain('does not match filter');
		});

		it('should accept any event when wildcard "*" is selected', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'commentDeleted', comment: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['*']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.workflowData).toBeDefined();
			expect(result.webhookResponse?.statusCode).toBe(200);
		});

		it('should handle unknown event type gracefully', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'unknownEvent', data: {} },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(200);
			expect(result.webhookResponse?.message).toContain('does not match filter');
		});

		it('should reject when no events are selected', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'issueCreated', issue: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue([]),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(200);
			expect(result.webhookResponse?.message).toContain('No events selected');
		});

		it('should accept all valid YouTrack events with wildcard', async () => {
			const validEvents = [
				'issueCreated', 'issueUpdated', 'issueDeleted',
				'commentAdded', 'commentUpdated', 'commentDeleted',
				'workItemAdded', 'workItemUpdated', 'workItemDeleted',
				'issueAttachmentAdded', 'issueAttachmentDeleted'
			];

			for (const event of validEvents) {
				const mockContext = {
					getRequestObject: vi.fn().mockReturnValue({
						headers: {},
						body: { event, data: {} },
					}),
					getNodeParameter: vi.fn().mockReturnValue(['*']),
					getCredentials: vi.fn().mockResolvedValue(undefined),
				} as unknown as IWebhookFunctions;

				const result = await trigger.webhook.call(mockContext);
				expect(result.workflowData).toBeDefined();
				expect(result.webhookResponse?.statusCode).toBe(200);
			}
		});
	});

	describe('Webhook - Payload Processing', () => {
		it('should process valid JSON payload correctly', async () => {
			const payload = {
				event: 'issueCreated',
				issue: {
					id: 'PROJECT-123',
					summary: 'Test Issue',
					description: 'Test Description'
				}
			};

			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: payload,
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.workflowData).toBeDefined();
			expect(result.workflowData![0][0].json).toEqual(payload);
		});

		it('should handle payload with missing event field', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { issue: { id: '1' } },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(200);
			expect(result.webhookResponse?.message).toContain('does not match filter');
		});

		it('should handle empty payload', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: {},
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.statusCode).toBe(200);
		});

		it('should validate event value against known events', async () => {
			const mockContext = {
				getRequestObject: vi.fn().mockReturnValue({
					headers: {},
					body: { event: 'invalidEventType', data: {} },
				}),
				getNodeParameter: vi.fn().mockReturnValue(['issueCreated']),
				getCredentials: vi.fn().mockResolvedValue(undefined),
			} as unknown as IWebhookFunctions;

			const result = await trigger.webhook.call(mockContext);
			expect(result.webhookResponse?.message).toContain('does not match filter');
		});
	});
});

