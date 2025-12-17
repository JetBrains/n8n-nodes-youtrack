# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - YYYY-MM-DD

### Added

#### YouTrack Action Node
- **Command** resource with Execute operation for bulk YouTrack command execution
- **Comment** resource with Add and List operations
- **Issue** resource with Create, Delete, Get, List, and Update operations
- **Issue Draft** resource with Create, Delete, Get, List, and Update operations
- **Project** resource with Get, Get Fields Schema, Get Issues, and List operations
- **Saved Query** resource with Create and List operations
- **Tag** resource with Add to Issue, Get Issue Tags, List, and Remove From Issue operations
- **User** resource with Get, Get Current, Get General Profile, Get Notifications Profile, Get Saved Queries, Get Tags, Get Time Tracking Profile, and List operations
- **User Group** resource with Get, Get Members, and List operations
- **Work Item** resource with Add operation for time tracking

#### YouTrack Trigger Node
- Webhook trigger support for YouTrack events
- Support for Issue Created, Updated, and Deleted events
- Support for Comment Added, Updated, and Deleted events
- Support for Work Item Added, Updated, and Deleted events
- Support for Issue Attachment Added and Deleted events

#### Credentials
- Permanent Token authentication for YouTrack API
- Webhook authentication for YouTrack webhook subscriptions

#### Documentation
- Comprehensive README with installation instructions
- Usage examples for Command Execute operation
- Documentation for custom fields discovery
- Webhook setup instructions
