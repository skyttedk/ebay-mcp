#!/usr/bin/env node
/**
 * Smoke test for Trading API: relist, get_listing, end_listing
 * Tests against a real ended listing (Leviton switch 168103939137)
 */
import { config } from 'dotenv';

config({ quiet: true });

import process from 'node:process';
import { Effect } from 'effect';
import { EbayApiClient } from './build/api/client.js';
import { TradingApiClient } from './build/api/clientTrading.js';
import { TradingApi } from './build/api/trading/trading.js';
import { getEbayConfig } from './build/config/environment.js';

const ITEM_ID = '168103939137';

const ebayConfig = getEbayConfig();
const restClient = new EbayApiClient(ebayConfig);
await Effect.runPromise(restClient.initialize());
const tradingClient = new TradingApiClient(restClient);
const api = new TradingApi(tradingClient);

const step = async (name, effectFactory) => {
  process.stdout.write(`  ${name}... `);
  return await Effect.runPromise(effectFactory());
};

// Step 1: Relist the ended item
const relistResult = await step('relist_item', () => api.relistItem({ itemId: ITEM_ID }));
const newItemId = relistResult.ItemID || ITEM_ID;

// Step 2: Get listing to verify it's active
await step('get_listing (verify active)', () => api.getListing({ itemId: String(newItemId) }));

// Step 3: End the listing
await step('end_listing', () =>
  api.endListing({ itemId: String(newItemId), reason: 'NotAvailable' }),
);

// Step 4: Get listing to verify it's ended
await step('get_listing (verify ended)', () => api.getListing({ itemId: String(newItemId) }));
const testItem = {
  Title: 'TEST LISTING - Leviton 8-Port Switch - WILL BE ENDED IMMEDIATELY',
  PrimaryCategory: { CategoryID: '51268' },
  StartPrice: 24.99,
  ConditionID: 3000, // Used
  Country: 'US',
  Currency: 'USD',
  DispatchTimeMax: 0,
  ListingDuration: 'GTC',
  ListingType: 'FixedPriceItem',
  Quantity: 1,
  SKU: 'SMOKE-TEST-DELETE-ME',
  Description: '<p>Smoke test listing - will be ended immediately after creation.</p>',
  PictureDetails: {
    PictureURL:
      'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/E-oAAeSwr59pcu9X/$_57.PNG?set_id=880000500F',
  },
  ShippingDetails: {
    ShippingType: 'Flat',
    ShippingServiceOptions: {
      ShippingServicePriority: 1,
      ShippingService: 'USPSFirstClass',
      ShippingServiceCost: 0,
      FreeShipping: true,
    },
  },
  ReturnPolicy: {
    ReturnsAcceptedOption: 'ReturnsNotAccepted',
  },
  PostalCode: '98115',
  Location: 'Seattle, WA',
  ItemSpecifics: {
    NameValueList: [
      { Name: 'Type', Value: 'Ethernet Switch' },
      { Name: 'Brand', Value: 'Leviton' },
      { Name: 'Number of LAN Ports', Value: '8' },
      { Name: 'Network Connectivity', Value: 'Wired - Ethernet (RJ-45)' },
      { Name: 'Maximum Data Transfer Rate', Value: '100 Mbps' },
    ],
  },
};

const createResult = await step('create_listing', () => api.createListing({ item: testItem }));
const createdItemId = String(createResult.ItemID);

// Ensure cleanup on unexpected exit
const cleanup = () => {
  void Effect.runPromise(
    Effect.ignore(api.endListing({ itemId: createdItemId, reason: 'NotAvailable' })),
  ).finally(() => process.exit(1));
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Step 6: Verify it's live
await step('get_listing (verify created)', () => api.getListing({ itemId: createdItemId }));
await new Promise((resolve) => {
  process.stdin.once('data', resolve);
});
process.stdin.destroy();
await step('end_listing (cleanup)', () =>
  api.endListing({ itemId: createdItemId, reason: 'NotAvailable' }),
);
