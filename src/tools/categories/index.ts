import type { ToolEntry } from '@/tools/registry.js';
import { connectorEntries } from './connector.js';
import { tokenManagementEntries } from './token-management.js';
import { accountEntries } from './account.js';
import { inventoryEntries } from './inventory.js';
import { fulfillmentEntries } from './fulfillment.js';
import { marketingEntries, marketingHandlerOnlyEntries } from './marketing.js';
import { analyticsEntries } from './analytics.js';
import { metadataEntries } from './metadata.js';
import { taxonomyEntries } from './taxonomy.js';
import { communicationEntries, communicationHandlerOnlyEntries } from './communication.js';
import { otherEntries, claudeEntries } from './other.js';
import { developerEntries } from './developer.js';
import { tradingEntries } from './trading.js';

/**
 * Registered tool entries in registry execution order. Connector tools (`search`/
 * `fetch`) are registered ahead of the eBay API tools, matching the prior registry.
 */
export const registeredEntries: ToolEntry[] = [
  ...connectorEntries,
  ...tokenManagementEntries,
  ...accountEntries,
  ...inventoryEntries,
  ...fulfillmentEntries,
  ...marketingEntries,
  ...analyticsEntries,
  ...metadataEntries,
  ...taxonomyEntries,
  ...communicationEntries,
  ...otherEntries,
  ...developerEntries,
  ...tradingEntries,
];

/**
 * Handler-only entries: callable via `executeTool`/`getToolHandler` but intentionally
 * not advertised to MCP clients (no registered definition). Preserves prior behavior
 * for handlers that existed without a corresponding definition.
 */
export const handlerOnlyEntries: ToolEntry[] = [
  ...claudeEntries,
  ...communicationHandlerOnlyEntries,
  ...marketingHandlerOnlyEntries,
];
