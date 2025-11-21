/**
 * Type definitions for YouTrack node request bodies
 * These interfaces define the structure of API request payloads
 */

/**
 * Request body structure for executing commands on issues
 */
export interface CommandExecuteRequestBody {
	query: string;
	comment?: string;
	silent?: boolean;
}

/**
 * Request body structure for command operations on multiple issues
 */
export interface CommandSharedRequestBody {
	issues: Array<{ id: string } | { idReadable: string }>;
}

/**
 * Request body structure for creating issue drafts
 */
export interface IssueDraftCreateRequestBody {
	project: { id: string };
	summary?: string;
	description?: string;
}

/**
 * Request body structure for updating issue drafts
 */
export interface IssueDraftUpdateRequestBody {
	project?: { id: string };
	summary?: string;
	description?: string;
}

