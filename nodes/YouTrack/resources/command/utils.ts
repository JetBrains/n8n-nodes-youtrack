import { NodeOperationError } from 'n8n-workflow';
import type { IExecuteSingleFunctions } from 'n8n-workflow';

/**
 * Normalizes a command query string by:
 * - Trimming leading/trailing whitespace
 * - Converting newlines to spaces
 * - Collapsing multiple spaces to single space
 * 
 * @param query - The raw query string
 * @returns Normalized query string
 */
export function normalizeCommandQuery(query: string): string {
	return query.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ');
}

/**
 * Validates that a query string is not empty
 * 
 * @param query - The query string to validate
 * @param context - The n8n execution context
 * @throws {NodeOperationError} If query is empty or undefined
 */
export function validateCommandQuery(
	query: string | undefined,
	context: IExecuteSingleFunctions
): void {
	if (!query) {
		throw new NodeOperationError(
			context.getNode(),
			'Command query is required'
		);
	}
}

/**
 * Normalizes comment text by trimming whitespace
 * 
 * @param comment - The raw comment string
 * @returns Trimmed comment string, or undefined if empty
 */
export function normalizeComment(comment: string | undefined): string | undefined {
	if (!comment) {
		return undefined;
	}
	const trimmed = comment.trim();
	return trimmed || undefined;
}

