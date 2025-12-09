import { describe, it, expect, vi } from 'vitest';
import { normalizeCommandQuery, validateCommandQuery, normalizeComment } from '../../nodes/YouTrack/resources/command/utils';
import { NodeOperationError } from 'n8n-workflow';
import type { IExecuteSingleFunctions } from 'n8n-workflow';

describe('Command Utils', () => {
	describe('normalizeCommandQuery', () => {
		it('should normalize multiple spaces to single space', () => {
			expect(normalizeCommandQuery('tag  MyTag   for   me')).toBe('tag MyTag for me');
		});

		it('should convert newlines to spaces', () => {
			expect(normalizeCommandQuery('tag MyTag\nfor me\nvote+1')).toBe('tag MyTag for me vote+1');
		});

		it('should trim leading and trailing whitespace', () => {
			expect(normalizeCommandQuery('  tag MyTag for me  ')).toBe('tag MyTag for me');
		});

		it('should handle multiple consecutive newlines', () => {
			expect(normalizeCommandQuery('tag MyTag\n\n\nfor me')).toBe('tag MyTag for me');
		});

		it('should handle mixed whitespace (tabs, spaces, newlines)', () => {
			expect(normalizeCommandQuery('\ttag  MyTag\n\tfor   me  ')).toBe('tag MyTag for me');
		});

		it('should return empty string for whitespace-only input', () => {
			expect(normalizeCommandQuery('   \n\n   ')).toBe('');
		});

		it('should preserve valid command structure', () => {
			expect(normalizeCommandQuery('tag MyTag for jane.doe')).toBe('tag MyTag for jane.doe');
		});

		it('should handle complex commands', () => {
			expect(normalizeCommandQuery('work 2h    Fixed   bug')).toBe('work 2h Fixed bug');
		});

		it('should handle vote commands', () => {
			expect(normalizeCommandQuery('vote+1')).toBe('vote+1');
		});

		it('should handle star commands', () => {
			expect(normalizeCommandQuery('star   username')).toBe('star username');
		});
	});

	describe('validateCommandQuery', () => {
		const mockContext = {
			getNode: vi.fn().mockReturnValue({ 
				id: 'test-node', 
				name: 'Test Node', 
				type: 'n8n-nodes-youtrack.youtrack',
				typeVersion: 1,
				position: [0, 0],
				parameters: {}
			}),
		} as unknown as IExecuteSingleFunctions;

		it('should throw NodeOperationError for empty query', () => {
			expect(() => validateCommandQuery('', mockContext)).toThrow(NodeOperationError);
			expect(() => validateCommandQuery('', mockContext)).toThrow('Command query is required');
		});

		it('should throw NodeOperationError for undefined query', () => {
			expect(() => validateCommandQuery(undefined, mockContext)).toThrow(NodeOperationError);
			expect(() => validateCommandQuery(undefined, mockContext)).toThrow('Command query is required');
		});

		it('should not throw for valid query', () => {
			expect(() => validateCommandQuery('tag MyTag', mockContext)).not.toThrow();
		});

		it('should not throw for single character query', () => {
			expect(() => validateCommandQuery('a', mockContext)).not.toThrow();
		});

		it('should not throw for query with only spaces (validation happens before normalization)', () => {
			// Note: This query will be normalized to empty string later, but validation only checks existence
			expect(() => validateCommandQuery('   ', mockContext)).not.toThrow();
		});
	});

	describe('normalizeComment', () => {
		it('should trim leading and trailing whitespace', () => {
			expect(normalizeComment('  This is a comment  ')).toBe('This is a comment');
		});

		it('should return undefined for empty string', () => {
			expect(normalizeComment('')).toBeUndefined();
		});

		it('should return undefined for undefined', () => {
			expect(normalizeComment(undefined)).toBeUndefined();
		});

		it('should preserve internal whitespace and newlines', () => {
			expect(normalizeComment('  Line 1\nLine 2\n  Line 3  ')).toBe('Line 1\nLine 2\n  Line 3');
		});

		it('should return undefined for whitespace-only string', () => {
			expect(normalizeComment('   \n\n   ')).toBeUndefined();
		});

		it('should handle tab characters', () => {
			expect(normalizeComment('\t\tComment with tabs\t\t')).toBe('Comment with tabs');
		});

		it('should preserve markdown formatting', () => {
			const markdown = '  # Header\n\n**Bold text**  ';
			expect(normalizeComment(markdown)).toBe('# Header\n\n**Bold text**');
		});

		it('should handle single word comments', () => {
			expect(normalizeComment('  Test  ')).toBe('Test');
		});
	});
});

