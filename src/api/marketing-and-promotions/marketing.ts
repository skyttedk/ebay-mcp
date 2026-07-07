import type { EbayApiClient, EbayRequestConfig } from '@/api/client.js';
import {
  buildEndpointParams,
  type EbayApiError,
  requestDeleteEffect,
  requestGetEffect,
  requestPostEffect,
  requestPutEffect,
} from '@/api/shared/request.js';
import type {
  bulkCreateAdsByInventoryReferenceInputSchema,
  bulkCreateAdsByListingIdInputSchema,
  bulkDeleteAdsByInventoryReferenceInputSchema,
  bulkDeleteAdsByListingIdInputSchema,
  bulkUpdateAdsBidByInventoryReferenceInputSchema,
  bulkUpdateAdsBidByListingIdInputSchema,
  bulkUpdateAdsStatusInputSchema,
  bulkUpdateAdsStatusByListingIdInputSchema,
  getAdsInputSchema,
  createAdByListingIdInputSchema,
  createAdsByInventoryReferenceInputSchema,
  getAdInputSchema,
  deleteAdInputSchema,
  deleteAdsByInventoryReferenceInputSchema,
  getAdsByInventoryReferenceInputSchema,
  updateBidInputSchema,
  getAdGroupsInputSchema,
  createAdGroupInputSchema,
  getAdGroupInputSchema,
  updateAdGroupInputSchema,
  suggestBidsInputSchema,
  suggestKeywordsInputSchema,
  cloneCampaignInputSchema,
  getCampaignsInputSchema,
  createCampaignInputSchema,
  getCampaignInputSchema,
  deleteCampaignInputSchema,
  endCampaignInputSchema,
  findCampaignByAdReferenceInputSchema,
  getCampaignByNameInputSchema,
  launchCampaignInputSchema,
  pauseCampaignInputSchema,
  resumeCampaignInputSchema,
  setupQuickCampaignInputSchema,
  suggestBudgetInputSchema,
  suggestItemsInputSchema,
  suggestMaxCpcInputSchema,
  updateAdRateStrategyInputSchema,
  updateBiddingStrategyInputSchema,
  updateCampaignBudgetInputSchema,
  updateCampaignIdentificationInputSchema,
  bulkCreateKeywordInputSchema,
  bulkUpdateKeywordInputSchema,
  getKeywordsInputSchema,
  createKeywordInputSchema,
  getKeywordInputSchema,
  updateKeywordInputSchema,
  bulkCreateNegativeKeywordInputSchema,
  bulkUpdateNegativeKeywordInputSchema,
  getNegativeKeywordsInputSchema,
  createNegativeKeywordInputSchema,
  getNegativeKeywordInputSchema,
  updateNegativeKeywordInputSchema,
  getReportInputSchema,
  getReportMetadataInputSchema,
  getReportMetadataForReportTypeInputSchema,
  getReportTasksInputSchema,
  createReportTaskInputSchema,
  getReportTaskInputSchema,
  deleteReportTaskInputSchema,
  createItemPriceMarkdownPromotionInputSchema,
  getItemPriceMarkdownPromotionInputSchema,
  updateItemPriceMarkdownPromotionInputSchema,
  deleteItemPriceMarkdownPromotionInputSchema,
  createItemPromotionInputSchema,
  getItemPromotionInputSchema,
  updateItemPromotionInputSchema,
  deleteItemPromotionInputSchema,
  getListingSetInputSchema,
  getPromotionsInputSchema,
  pausePromotionInputSchema,
  resumePromotionInputSchema,
  getPromotionReportsInputSchema,
  getPromotionSummaryReportInputSchema,
  getEmailCampaignsInputSchema,
  createEmailCampaignInputSchema,
  getEmailCampaignInputSchema,
  updateEmailCampaignInputSchema,
  deleteEmailCampaignInputSchema,
  getAudiencesInputSchema,
  getEmailPreviewInputSchema,
  getEmailReportInputSchema,
} from '@/schemas/marketing/marketing.js';
import type { operations } from '@/types/sell-apps/markeitng-and-promotions/sellMarketingV1Oas3.js';
import type { Effect } from 'effect';
import type { z } from 'zod';

const MARKETING_BASE_PATH = '/sell/marketing/v1';

type JsonContent<Response> = Response extends { content: { 'application/json': infer Body } }
  ? Body
  : void;

type MarketingOperationResponse<Operation extends keyof operations> =
  200 extends keyof operations[Operation]['responses']
    ? JsonContent<operations[Operation]['responses'][200]>
    : 201 extends keyof operations[Operation]['responses']
      ? JsonContent<operations[Operation]['responses'][201]>
      : 202 extends keyof operations[Operation]['responses']
        ? JsonContent<operations[Operation]['responses'][202]>
        : 204 extends keyof operations[Operation]['responses']
          ? JsonContent<operations[Operation]['responses'][204]>
          : void;

type BulkCreateAdsByInventoryReferenceInput = z.infer<
  typeof bulkCreateAdsByInventoryReferenceInputSchema
>;
type BulkCreateAdsByListingIdInput = z.infer<typeof bulkCreateAdsByListingIdInputSchema>;
type BulkDeleteAdsByInventoryReferenceInput = z.infer<
  typeof bulkDeleteAdsByInventoryReferenceInputSchema
>;
type BulkDeleteAdsByListingIdInput = z.infer<typeof bulkDeleteAdsByListingIdInputSchema>;
type BulkUpdateAdsBidByInventoryReferenceInput = z.infer<
  typeof bulkUpdateAdsBidByInventoryReferenceInputSchema
>;
type BulkUpdateAdsBidByListingIdInput = z.infer<typeof bulkUpdateAdsBidByListingIdInputSchema>;
type BulkUpdateAdsStatusInput = z.infer<typeof bulkUpdateAdsStatusInputSchema>;
type BulkUpdateAdsStatusByListingIdInput = z.infer<
  typeof bulkUpdateAdsStatusByListingIdInputSchema
>;
type GetAdsInput = z.infer<typeof getAdsInputSchema>;
type CreateAdByListingIdInput = z.infer<typeof createAdByListingIdInputSchema>;
type CreateAdsByInventoryReferenceInput = z.infer<typeof createAdsByInventoryReferenceInputSchema>;
type GetAdInput = z.infer<typeof getAdInputSchema>;
type DeleteAdInput = z.infer<typeof deleteAdInputSchema>;
type DeleteAdsByInventoryReferenceInput = z.infer<typeof deleteAdsByInventoryReferenceInputSchema>;
type GetAdsByInventoryReferenceInput = z.infer<typeof getAdsByInventoryReferenceInputSchema>;
type UpdateBidInput = z.infer<typeof updateBidInputSchema>;
type GetAdGroupsInput = z.infer<typeof getAdGroupsInputSchema>;
type CreateAdGroupInput = z.infer<typeof createAdGroupInputSchema>;
type GetAdGroupInput = z.infer<typeof getAdGroupInputSchema>;
type UpdateAdGroupInput = z.infer<typeof updateAdGroupInputSchema>;
type SuggestBidsInput = z.infer<typeof suggestBidsInputSchema>;
type SuggestKeywordsInput = z.infer<typeof suggestKeywordsInputSchema>;
type CloneCampaignInput = z.infer<typeof cloneCampaignInputSchema>;
type GetCampaignsInput = z.infer<typeof getCampaignsInputSchema>;
type CreateCampaignInput = z.infer<typeof createCampaignInputSchema>;
type GetCampaignInput = z.infer<typeof getCampaignInputSchema>;
type DeleteCampaignInput = z.infer<typeof deleteCampaignInputSchema>;
type EndCampaignInput = z.infer<typeof endCampaignInputSchema>;
type FindCampaignByAdReferenceInput = z.infer<typeof findCampaignByAdReferenceInputSchema>;
type GetCampaignByNameInput = z.infer<typeof getCampaignByNameInputSchema>;
type LaunchCampaignInput = z.infer<typeof launchCampaignInputSchema>;
type PauseCampaignInput = z.infer<typeof pauseCampaignInputSchema>;
type ResumeCampaignInput = z.infer<typeof resumeCampaignInputSchema>;
type SetupQuickCampaignInput = z.infer<typeof setupQuickCampaignInputSchema>;
type SuggestBudgetInput = z.infer<typeof suggestBudgetInputSchema>;
type SuggestItemsInput = z.infer<typeof suggestItemsInputSchema>;
type SuggestMaxCpcInput = z.infer<typeof suggestMaxCpcInputSchema>;
type UpdateAdRateStrategyInput = z.infer<typeof updateAdRateStrategyInputSchema>;
type UpdateBiddingStrategyInput = z.infer<typeof updateBiddingStrategyInputSchema>;
type UpdateCampaignBudgetInput = z.infer<typeof updateCampaignBudgetInputSchema>;
type UpdateCampaignIdentificationInput = z.infer<typeof updateCampaignIdentificationInputSchema>;
type BulkCreateKeywordInput = z.infer<typeof bulkCreateKeywordInputSchema>;
type BulkUpdateKeywordInput = z.infer<typeof bulkUpdateKeywordInputSchema>;
type GetKeywordsInput = z.infer<typeof getKeywordsInputSchema>;
type CreateKeywordInput = z.infer<typeof createKeywordInputSchema>;
type GetKeywordInput = z.infer<typeof getKeywordInputSchema>;
type UpdateKeywordInput = z.infer<typeof updateKeywordInputSchema>;
type BulkCreateNegativeKeywordInput = z.infer<typeof bulkCreateNegativeKeywordInputSchema>;
type BulkUpdateNegativeKeywordInput = z.infer<typeof bulkUpdateNegativeKeywordInputSchema>;
type GetNegativeKeywordsInput = z.infer<typeof getNegativeKeywordsInputSchema>;
type CreateNegativeKeywordInput = z.infer<typeof createNegativeKeywordInputSchema>;
type GetNegativeKeywordInput = z.infer<typeof getNegativeKeywordInputSchema>;
type UpdateNegativeKeywordInput = z.infer<typeof updateNegativeKeywordInputSchema>;
type GetReportInput = z.infer<typeof getReportInputSchema>;
type GetReportMetadataInput = z.infer<typeof getReportMetadataInputSchema>;
type GetReportMetadataForReportTypeInput = z.infer<
  typeof getReportMetadataForReportTypeInputSchema
>;
type GetReportTasksInput = z.infer<typeof getReportTasksInputSchema>;
type CreateReportTaskInput = z.infer<typeof createReportTaskInputSchema>;
type GetReportTaskInput = z.infer<typeof getReportTaskInputSchema>;
type DeleteReportTaskInput = z.infer<typeof deleteReportTaskInputSchema>;
type CreateItemPriceMarkdownPromotionInput = z.infer<
  typeof createItemPriceMarkdownPromotionInputSchema
>;
type GetItemPriceMarkdownPromotionInput = z.infer<typeof getItemPriceMarkdownPromotionInputSchema>;
type UpdateItemPriceMarkdownPromotionInput = z.infer<
  typeof updateItemPriceMarkdownPromotionInputSchema
>;
type DeleteItemPriceMarkdownPromotionInput = z.infer<
  typeof deleteItemPriceMarkdownPromotionInputSchema
>;
type CreateItemPromotionInput = z.infer<typeof createItemPromotionInputSchema>;
type GetItemPromotionInput = z.infer<typeof getItemPromotionInputSchema>;
type UpdateItemPromotionInput = z.infer<typeof updateItemPromotionInputSchema>;
type DeleteItemPromotionInput = z.infer<typeof deleteItemPromotionInputSchema>;
type GetListingSetInput = z.infer<typeof getListingSetInputSchema>;
type GetPromotionsInput = z.infer<typeof getPromotionsInputSchema>;
type PausePromotionInput = z.infer<typeof pausePromotionInputSchema>;
type ResumePromotionInput = z.infer<typeof resumePromotionInputSchema>;
type GetPromotionReportsInput = z.infer<typeof getPromotionReportsInputSchema>;
type GetPromotionSummaryReportInput = z.infer<typeof getPromotionSummaryReportInputSchema>;
type GetEmailCampaignsInput = z.infer<typeof getEmailCampaignsInputSchema>;
type CreateEmailCampaignInput = z.infer<typeof createEmailCampaignInputSchema>;
type GetEmailCampaignInput = z.infer<typeof getEmailCampaignInputSchema>;
type UpdateEmailCampaignInput = z.infer<typeof updateEmailCampaignInputSchema>;
type DeleteEmailCampaignInput = z.infer<typeof deleteEmailCampaignInputSchema>;
type GetAudiencesInput = z.infer<typeof getAudiencesInputSchema>;
type GetEmailPreviewInput = z.infer<typeof getEmailPreviewInputSchema>;
type GetEmailReportInput = z.infer<typeof getEmailReportInputSchema>;

const marketplaceHeader = (marketplaceId: string): EbayRequestConfig => ({
  headers: { 'X-EBAY-C-MARKETPLACE-ID': marketplaceId },
});

/** Marketing API - campaigns, ads, promotions, reports, and email campaigns. */
export class MarketingApi {
  public constructor(private readonly client: EbayApiClient) {}

  /**
   * Bulk create ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated bulkCreateAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkCreateAdsByInventoryReference
   */
  public bulkCreateAdsByInventoryReference = (
    input: BulkCreateAdsByInventoryReferenceInput,
  ): Effect.Effect<
    MarketingOperationResponse<'bulkCreateAdsByInventoryReference'>,
    EbayApiError
  > => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_create_ads_by_inventory_reference`;
    return requestPostEffect<MarketingOperationResponse<'bulkCreateAdsByInventoryReference'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk create ads by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateAdsByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkCreateAdsByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateAdsByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkCreateAdsByListingId
   */
  public bulkCreateAdsByListingId = (
    input: BulkCreateAdsByListingIdInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkCreateAdsByListingId'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_create_ads_by_listing_id`;
    return requestPostEffect<MarketingOperationResponse<'bulkCreateAdsByListingId'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk delete ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkDeleteAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated bulkDeleteAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkDeleteAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkDeleteAdsByInventoryReference
   */
  public bulkDeleteAdsByInventoryReference = (
    input: BulkDeleteAdsByInventoryReferenceInput,
  ): Effect.Effect<
    MarketingOperationResponse<'bulkDeleteAdsByInventoryReference'>,
    EbayApiError
  > => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_delete_ads_by_inventory_reference`;
    return requestPostEffect<MarketingOperationResponse<'bulkDeleteAdsByInventoryReference'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk delete ads by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkDeleteAdsByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkDeleteAdsByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkDeleteAdsByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkDeleteAdsByListingId
   */
  public bulkDeleteAdsByListingId = (
    input: BulkDeleteAdsByListingIdInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkDeleteAdsByListingId'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_delete_ads_by_listing_id`;
    return requestPostEffect<MarketingOperationResponse<'bulkDeleteAdsByListingId'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update ads bid by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsBidByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsBidByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsBidByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsBidByInventoryReference
   */
  public bulkUpdateAdsBidByInventoryReference = (
    input: BulkUpdateAdsBidByInventoryReferenceInput,
  ): Effect.Effect<
    MarketingOperationResponse<'bulkUpdateAdsBidByInventoryReference'>,
    EbayApiError
  > => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_bid_by_inventory_reference`;
    return requestPostEffect<MarketingOperationResponse<'bulkUpdateAdsBidByInventoryReference'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update ads bid by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsBidByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsBidByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsBidByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsBidByListingId
   */
  public bulkUpdateAdsBidByListingId = (
    input: BulkUpdateAdsBidByListingIdInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkUpdateAdsBidByListingId'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_bid_by_listing_id`;
    return requestPostEffect<MarketingOperationResponse<'bulkUpdateAdsBidByListingId'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update ads status through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsStatus.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsStatus response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsStatus({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsStatus
   */
  public bulkUpdateAdsStatus = (
    input: BulkUpdateAdsStatusInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkUpdateAdsStatus'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_status`;
    return requestPostEffect<MarketingOperationResponse<'bulkUpdateAdsStatus'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update ads status by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateAdsStatusByListingId.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateAdsStatusByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateAdsStatusByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/bulkUpdateAdsStatusByListingId
   */
  public bulkUpdateAdsStatusByListingId = (
    input: BulkUpdateAdsStatusByListingIdInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkUpdateAdsStatusByListingId'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_ads_status_by_listing_id`;
    return requestPostEffect<MarketingOperationResponse<'bulkUpdateAdsStatusByListingId'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ads through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAds.
   * @returns An Effect that succeeds with eBay's generated getAds response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAds({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAds
   */
  public getAds = (
    input: GetAdsInput,
  ): Effect.Effect<MarketingOperationResponse<'getAds'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad`;
    const params = buildEndpointParams({
      adGroupIds: { wireName: 'ad_group_ids', value: input.adGroupIds },
      adStatus: { wireName: 'ad_status', value: input.adStatus },
      limit: { wireName: 'limit', value: input.limit },
      listingIds: { wireName: 'listing_ids', value: input.listingIds },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<MarketingOperationResponse<'getAds'>>(this.client, path, params);
  };

  /**
   * Create ad by listing id through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createAdByListingId.
   * @returns An Effect that succeeds with eBay's generated createAdByListingId response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createAdByListingId({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/createAdByListingId
   */
  public createAdByListingId = (
    input: CreateAdByListingIdInput,
  ): Effect.Effect<MarketingOperationResponse<'createAdByListingId'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad`;
    return requestPostEffect<MarketingOperationResponse<'createAdByListingId'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Create ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated createAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/createAdsByInventoryReference
   */
  public createAdsByInventoryReference = (
    input: CreateAdsByInventoryReferenceInput,
  ): Effect.Effect<MarketingOperationResponse<'createAdsByInventoryReference'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/create_ads_by_inventory_reference`;
    return requestPostEffect<MarketingOperationResponse<'createAdsByInventoryReference'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ad through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAd.
   * @returns An Effect that succeeds with eBay's generated getAd response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAd({ adId: 'ad-1', campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAd
   */
  public getAd = (
    input: GetAdInput,
  ): Effect.Effect<MarketingOperationResponse<'getAd'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad/${input.adId}`;
    return requestGetEffect<MarketingOperationResponse<'getAd'>>(this.client, path);
  };

  /**
   * Delete ad through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteAd.
   * @returns An Effect that succeeds with eBay's generated deleteAd response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteAd({ adId: 'ad-1', campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/deleteAd
   */
  public deleteAd = (
    input: DeleteAdInput,
  ): Effect.Effect<MarketingOperationResponse<'deleteAd'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad/${input.adId}`;
    return requestDeleteEffect<MarketingOperationResponse<'deleteAd'>>(this.client, path);
  };

  /**
   * Delete ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated deleteAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteAdsByInventoryReference({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/deleteAdsByInventoryReference
   */
  public deleteAdsByInventoryReference = (
    input: DeleteAdsByInventoryReferenceInput,
  ): Effect.Effect<MarketingOperationResponse<'deleteAdsByInventoryReference'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/delete_ads_by_inventory_reference`;
    return requestPostEffect<MarketingOperationResponse<'deleteAdsByInventoryReference'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ads by inventory reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAdsByInventoryReference.
   * @returns An Effect that succeeds with eBay's generated getAdsByInventoryReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAdsByInventoryReference({ campaignId: 'campaign-1', inventoryReferenceId: 'inventoryReference-1', inventoryReferenceType: 'inventoryReferenceType-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/getAdsByInventoryReference
   */
  public getAdsByInventoryReference = (
    input: GetAdsByInventoryReferenceInput,
  ): Effect.Effect<MarketingOperationResponse<'getAdsByInventoryReference'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/get_ads_by_inventory_reference`;
    const params = buildEndpointParams({
      inventoryReferenceId: {
        wireName: 'inventory_reference_id',
        value: input.inventoryReferenceId,
      },
      inventoryReferenceType: {
        wireName: 'inventory_reference_type',
        value: input.inventoryReferenceType,
      },
    });
    return requestGetEffect<MarketingOperationResponse<'getAdsByInventoryReference'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Update bid through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateBid.
   * @returns An Effect that succeeds with eBay's generated updateBid response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateBid({ adId: 'ad-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad/methods/updateBid
   */
  public updateBid = (
    input: UpdateBidInput,
  ): Effect.Effect<MarketingOperationResponse<'updateBid'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad/${input.adId}/update_bid`;
    return requestPostEffect<MarketingOperationResponse<'updateBid'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ad groups through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAdGroups.
   * @returns An Effect that succeeds with eBay's generated getAdGroups response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAdGroups({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/getAdGroups
   */
  public getAdGroups = (
    input: GetAdGroupsInput,
  ): Effect.Effect<MarketingOperationResponse<'getAdGroups'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group`;
    const params = buildEndpointParams({
      adGroupStatus: { wireName: 'ad_group_status', value: input.adGroupStatus },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<MarketingOperationResponse<'getAdGroups'>>(this.client, path, params);
  };

  /**
   * Create ad group through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createAdGroup.
   * @returns An Effect that succeeds with eBay's generated createAdGroup response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createAdGroup({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/createAdGroup
   */
  public createAdGroup = (
    input: CreateAdGroupInput,
  ): Effect.Effect<MarketingOperationResponse<'createAdGroup'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group`;
    return requestPostEffect<MarketingOperationResponse<'createAdGroup'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get ad group through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAdGroup.
   * @returns An Effect that succeeds with eBay's generated getAdGroup response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAdGroup({ adGroupId: 'adGroup-1', campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/getAdGroup
   */
  public getAdGroup = (
    input: GetAdGroupInput,
  ): Effect.Effect<MarketingOperationResponse<'getAdGroup'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}`;
    return requestGetEffect<MarketingOperationResponse<'getAdGroup'>>(this.client, path);
  };

  /**
   * Update ad group through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateAdGroup.
   * @returns An Effect that succeeds with eBay's generated updateAdGroup response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateAdGroup({ adGroupId: 'adGroup-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/updateAdGroup
   */
  public updateAdGroup = (
    input: UpdateAdGroupInput,
  ): Effect.Effect<MarketingOperationResponse<'updateAdGroup'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}`;
    return requestPutEffect<MarketingOperationResponse<'updateAdGroup'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Suggest bids through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestBids.
   * @returns An Effect that succeeds with eBay's generated suggestBids response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestBids({ adGroupId: 'adGroup-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/suggestBids
   */
  public suggestBids = (
    input: SuggestBidsInput,
  ): Effect.Effect<MarketingOperationResponse<'suggestBids'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}/suggest_bids`;
    return requestPostEffect<MarketingOperationResponse<'suggestBids'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Suggest keywords through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestKeywords.
   * @returns An Effect that succeeds with eBay's generated suggestKeywords response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestKeywords({ adGroupId: 'adGroup-1', campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_group/methods/suggestKeywords
   */
  public suggestKeywords = (
    input: SuggestKeywordsInput,
  ): Effect.Effect<MarketingOperationResponse<'suggestKeywords'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/ad_group/${input.adGroupId}/suggest_keywords`;
    return requestPostEffect<MarketingOperationResponse<'suggestKeywords'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Clone campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for cloneCampaign.
   * @returns An Effect that succeeds with eBay's generated cloneCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.cloneCampaign({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/cloneCampaign
   */
  public cloneCampaign = (
    input: CloneCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'cloneCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/clone`;
    return requestPostEffect<MarketingOperationResponse<'cloneCampaign'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get campaigns through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getCampaigns.
   * @returns An Effect that succeeds with eBay's generated getCampaigns response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getCampaigns());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaigns
   */
  public getCampaigns = (
    input: GetCampaignsInput = {},
  ): Effect.Effect<MarketingOperationResponse<'getCampaigns'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign`;
    const params = buildEndpointParams({
      campaignName: { wireName: 'campaign_name', value: input.campaignName },
      campaignStatus: { wireName: 'campaign_status', value: input.campaignStatus },
      campaignTargetingTypes: {
        wireName: 'campaign_targeting_types',
        value: input.campaignTargetingTypes,
      },
      channels: { wireName: 'channels', value: input.channels },
      endDateRange: { wireName: 'end_date_range', value: input.endDateRange },
      fundingStrategy: { wireName: 'funding_strategy', value: input.fundingStrategy },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      startDateRange: { wireName: 'start_date_range', value: input.startDateRange },
    });
    return requestGetEffect<MarketingOperationResponse<'getCampaigns'>>(this.client, path, params);
  };

  /**
   * Create campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createCampaign.
   * @returns An Effect that succeeds with eBay's generated createCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createCampaign({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/createCampaign
   */
  public createCampaign = (
    input: CreateCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'createCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign`;
    return requestPostEffect<MarketingOperationResponse<'createCampaign'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getCampaign.
   * @returns An Effect that succeeds with eBay's generated getCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaign
   */
  public getCampaign = (
    input: GetCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'getCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}`;
    return requestGetEffect<MarketingOperationResponse<'getCampaign'>>(this.client, path);
  };

  /**
   * Delete campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteCampaign.
   * @returns An Effect that succeeds with eBay's generated deleteCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/deleteCampaign
   */
  public deleteCampaign = (
    input: DeleteCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'deleteCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}`;
    return requestDeleteEffect<MarketingOperationResponse<'deleteCampaign'>>(this.client, path);
  };

  /**
   * End campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for endCampaign.
   * @returns An Effect that succeeds with eBay's generated endCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.endCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/endCampaign
   */
  public endCampaign = (
    input: EndCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'endCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/end`;
    return requestPostEffect<MarketingOperationResponse<'endCampaign'>>(this.client, path);
  };

  /**
   * Find campaign by ad reference through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for findCampaignByAdReference.
   * @returns An Effect that succeeds with eBay's generated findCampaignByAdReference response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.findCampaignByAdReference());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/findCampaignByAdReference
   */
  public findCampaignByAdReference = (
    input: FindCampaignByAdReferenceInput = {},
  ): Effect.Effect<MarketingOperationResponse<'findCampaignByAdReference'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/find_campaign_by_ad_reference`;
    const params = buildEndpointParams({
      inventoryReferenceId: {
        wireName: 'inventory_reference_id',
        value: input.inventoryReferenceId,
      },
      inventoryReferenceType: {
        wireName: 'inventory_reference_type',
        value: input.inventoryReferenceType,
      },
      listingId: { wireName: 'listing_id', value: input.listingId },
    });
    return requestGetEffect<MarketingOperationResponse<'findCampaignByAdReference'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Get campaign by name through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getCampaignByName.
   * @returns An Effect that succeeds with eBay's generated getCampaignByName response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getCampaignByName({ campaignName: 'campaignName-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/getCampaignByName
   */
  public getCampaignByName = (
    input: GetCampaignByNameInput,
  ): Effect.Effect<MarketingOperationResponse<'getCampaignByName'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/get_campaign_by_name`;
    const params = buildEndpointParams({
      campaignName: { wireName: 'campaign_name', value: input.campaignName },
    });
    return requestGetEffect<MarketingOperationResponse<'getCampaignByName'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Launch campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for launchCampaign.
   * @returns An Effect that succeeds with eBay's generated launchCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.launchCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/launchCampaign
   */
  public launchCampaign = (
    input: LaunchCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'launchCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/launch`;
    return requestPostEffect<MarketingOperationResponse<'launchCampaign'>>(this.client, path);
  };

  /**
   * Pause campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for pauseCampaign.
   * @returns An Effect that succeeds with eBay's generated pauseCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.pauseCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/pauseCampaign
   */
  public pauseCampaign = (
    input: PauseCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'pauseCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/pause`;
    return requestPostEffect<MarketingOperationResponse<'pauseCampaign'>>(this.client, path);
  };

  /**
   * Resume campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for resumeCampaign.
   * @returns An Effect that succeeds with eBay's generated resumeCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.resumeCampaign({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/resumeCampaign
   */
  public resumeCampaign = (
    input: ResumeCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'resumeCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/resume`;
    return requestPostEffect<MarketingOperationResponse<'resumeCampaign'>>(this.client, path);
  };

  /**
   * Setup quick campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for setupQuickCampaign.
   * @returns An Effect that succeeds with eBay's generated setupQuickCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.setupQuickCampaign({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/setupQuickCampaign
   */
  public setupQuickCampaign = (
    input: SetupQuickCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'setupQuickCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/setup_quick_campaign`;
    return requestPostEffect<MarketingOperationResponse<'setupQuickCampaign'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Suggest budget through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestBudget.
   * @returns An Effect that succeeds with eBay's generated suggestBudget response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestBudget({ marketplaceId: 'EBAY_US' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestBudget
   */
  public suggestBudget = (
    input: SuggestBudgetInput,
  ): Effect.Effect<MarketingOperationResponse<'suggestBudget'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/suggest_budget`;
    const config = marketplaceHeader(input.marketplaceId);
    return requestGetEffect<MarketingOperationResponse<'suggestBudget'>>(
      this.client,
      path,
      undefined,
      config,
    );
  };

  /**
   * Suggest items through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestItems.
   * @returns An Effect that succeeds with eBay's generated suggestItems response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestItems({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestItems
   */
  public suggestItems = (
    input: SuggestItemsInput,
  ): Effect.Effect<MarketingOperationResponse<'suggestItems'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/suggest_items`;
    const params = buildEndpointParams({
      categoryIds: { wireName: 'category_ids', value: input.categoryIds },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<MarketingOperationResponse<'suggestItems'>>(this.client, path, params);
  };

  /**
   * Suggest max cpc through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for suggestMaxCpc.
   * @returns An Effect that succeeds with eBay's generated suggestMaxCpc response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.suggestMaxCpc({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/suggestMaxCpc
   */
  public suggestMaxCpc = (
    input: SuggestMaxCpcInput,
  ): Effect.Effect<MarketingOperationResponse<'suggestMaxCpc'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/suggest_max_cpc`;
    return requestPostEffect<MarketingOperationResponse<'suggestMaxCpc'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Update ad rate strategy through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateAdRateStrategy.
   * @returns An Effect that succeeds with eBay's generated updateAdRateStrategy response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateAdRateStrategy({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateAdRateStrategy
   */
  public updateAdRateStrategy = (
    input: UpdateAdRateStrategyInput,
  ): Effect.Effect<MarketingOperationResponse<'updateAdRateStrategy'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_ad_rate_strategy`;
    return requestPostEffect<MarketingOperationResponse<'updateAdRateStrategy'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Update bidding strategy through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateBiddingStrategy.
   * @returns An Effect that succeeds with eBay's generated updateBiddingStrategy response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateBiddingStrategy({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateBiddingStrategy
   */
  public updateBiddingStrategy = (
    input: UpdateBiddingStrategyInput,
  ): Effect.Effect<MarketingOperationResponse<'updateBiddingStrategy'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_bidding_strategy`;
    return requestPostEffect<MarketingOperationResponse<'updateBiddingStrategy'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Update campaign budget through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateCampaignBudget.
   * @returns An Effect that succeeds with eBay's generated updateCampaignBudget response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateCampaignBudget({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateCampaignBudget
   */
  public updateCampaignBudget = (
    input: UpdateCampaignBudgetInput,
  ): Effect.Effect<MarketingOperationResponse<'updateCampaignBudget'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_campaign_budget`;
    return requestPostEffect<MarketingOperationResponse<'updateCampaignBudget'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Update campaign identification through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateCampaignIdentification.
   * @returns An Effect that succeeds with eBay's generated updateCampaignIdentification response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateCampaignIdentification({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/campaign/methods/updateCampaignIdentification
   */
  public updateCampaignIdentification = (
    input: UpdateCampaignIdentificationInput,
  ): Effect.Effect<MarketingOperationResponse<'updateCampaignIdentification'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/update_campaign_identification`;
    return requestPostEffect<MarketingOperationResponse<'updateCampaignIdentification'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk create keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkCreateKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateKeyword({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/bulkCreateKeyword
   */
  public bulkCreateKeyword = (
    input: BulkCreateKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkCreateKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_create_keyword`;
    return requestPostEffect<MarketingOperationResponse<'bulkCreateKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateKeyword({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/bulkUpdateKeyword
   */
  public bulkUpdateKeyword = (
    input: BulkUpdateKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkUpdateKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/bulk_update_keyword`;
    return requestPostEffect<MarketingOperationResponse<'bulkUpdateKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get keywords through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getKeywords.
   * @returns An Effect that succeeds with eBay's generated getKeywords response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getKeywords({ campaignId: 'campaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/getKeywords
   */
  public getKeywords = (
    input: GetKeywordsInput,
  ): Effect.Effect<MarketingOperationResponse<'getKeywords'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword`;
    const params = buildEndpointParams({
      adGroupIds: { wireName: 'ad_group_ids', value: input.adGroupIds },
      keywordStatus: { wireName: 'keyword_status', value: input.keywordStatus },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<MarketingOperationResponse<'getKeywords'>>(this.client, path, params);
  };

  /**
   * Create keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createKeyword.
   * @returns An Effect that succeeds with eBay's generated createKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createKeyword({ campaignId: 'campaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/createKeyword
   */
  public createKeyword = (
    input: CreateKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'createKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword`;
    return requestPostEffect<MarketingOperationResponse<'createKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getKeyword.
   * @returns An Effect that succeeds with eBay's generated getKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getKeyword({ campaignId: 'campaign-1', keywordId: 'keyword-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/getKeyword
   */
  public getKeyword = (
    input: GetKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'getKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword/${input.keywordId}`;
    return requestGetEffect<MarketingOperationResponse<'getKeyword'>>(this.client, path);
  };

  /**
   * Update keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateKeyword.
   * @returns An Effect that succeeds with eBay's generated updateKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateKeyword({ campaignId: 'campaign-1', keywordId: 'keyword-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/keyword/methods/updateKeyword
   */
  public updateKeyword = (
    input: UpdateKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'updateKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_campaign/${input.campaignId}/keyword/${input.keywordId}`;
    return requestPutEffect<MarketingOperationResponse<'updateKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk create negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkCreateNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkCreateNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkCreateNegativeKeyword({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/bulkCreateNegativeKeyword
   */
  public bulkCreateNegativeKeyword = (
    input: BulkCreateNegativeKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkCreateNegativeKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/bulk_create_negative_keyword`;
    return requestPostEffect<MarketingOperationResponse<'bulkCreateNegativeKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Bulk update negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for bulkUpdateNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated bulkUpdateNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.bulkUpdateNegativeKeyword({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/bulkUpdateNegativeKeyword
   */
  public bulkUpdateNegativeKeyword = (
    input: BulkUpdateNegativeKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'bulkUpdateNegativeKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/bulk_update_negative_keyword`;
    return requestPostEffect<MarketingOperationResponse<'bulkUpdateNegativeKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get negative keywords through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getNegativeKeywords.
   * @returns An Effect that succeeds with eBay's generated getNegativeKeywords response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getNegativeKeywords());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/getNegativeKeywords
   */
  public getNegativeKeywords = (
    input: GetNegativeKeywordsInput = {},
  ): Effect.Effect<MarketingOperationResponse<'getNegativeKeywords'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword`;
    const params = buildEndpointParams({
      adGroupIds: { wireName: 'ad_group_ids', value: input.adGroupIds },
      campaignIds: { wireName: 'campaign_ids', value: input.campaignIds },
      limit: { wireName: 'limit', value: input.limit },
      negativeKeywordStatus: {
        wireName: 'negative_keyword_status',
        value: input.negativeKeywordStatus,
      },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<MarketingOperationResponse<'getNegativeKeywords'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Create negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated createNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createNegativeKeyword({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/createNegativeKeyword
   */
  public createNegativeKeyword = (
    input: CreateNegativeKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'createNegativeKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword`;
    return requestPostEffect<MarketingOperationResponse<'createNegativeKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated getNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getNegativeKeyword({ negativeKeywordId: 'negativeKeyword-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/getNegativeKeyword
   */
  public getNegativeKeyword = (
    input: GetNegativeKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'getNegativeKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword/${input.negativeKeywordId}`;
    return requestGetEffect<MarketingOperationResponse<'getNegativeKeyword'>>(this.client, path);
  };

  /**
   * Update negative keyword through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateNegativeKeyword.
   * @returns An Effect that succeeds with eBay's generated updateNegativeKeyword response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateNegativeKeyword({ negativeKeywordId: 'negativeKeyword-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/negative_keyword/methods/updateNegativeKeyword
   */
  public updateNegativeKeyword = (
    input: UpdateNegativeKeywordInput,
  ): Effect.Effect<MarketingOperationResponse<'updateNegativeKeyword'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/negative_keyword/${input.negativeKeywordId}`;
    return requestPutEffect<MarketingOperationResponse<'updateNegativeKeyword'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get report through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReport.
   * @returns An Effect that succeeds with eBay's generated getReport response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReport({ reportId: 'report-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report/methods/getReport
   */
  public getReport = (
    input: GetReportInput,
  ): Effect.Effect<MarketingOperationResponse<'getReport'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report/${input.reportId}`;
    return requestGetEffect<MarketingOperationResponse<'getReport'>>(this.client, path);
  };

  /**
   * Get report metadata through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportMetadata.
   * @returns An Effect that succeeds with eBay's generated getReportMetadata response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportMetadata());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_metadata/methods/getReportMetadata
   */
  public getReportMetadata = (
    input: GetReportMetadataInput = {},
  ): Effect.Effect<MarketingOperationResponse<'getReportMetadata'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_metadata`;
    const params = buildEndpointParams({
      fundingModel: { wireName: 'funding_model', value: input.fundingModel },
      channel: { wireName: 'channel', value: input.channel },
    });
    return requestGetEffect<MarketingOperationResponse<'getReportMetadata'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Get report metadata for report type through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportMetadataForReportType.
   * @returns An Effect that succeeds with eBay's generated getReportMetadataForReportType response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportMetadataForReportType({ reportType: 'reportType-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_metadata/methods/getReportMetadataForReportType
   */
  public getReportMetadataForReportType = (
    input: GetReportMetadataForReportTypeInput,
  ): Effect.Effect<MarketingOperationResponse<'getReportMetadataForReportType'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_metadata/${input.reportType}`;
    const params = buildEndpointParams({
      fundingModel: { wireName: 'funding_model', value: input.fundingModel },
      channel: { wireName: 'channel', value: input.channel },
    });
    return requestGetEffect<MarketingOperationResponse<'getReportMetadataForReportType'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Get report tasks through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportTasks.
   * @returns An Effect that succeeds with eBay's generated getReportTasks response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportTasks());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/getReportTasks
   */
  public getReportTasks = (
    input: GetReportTasksInput = {},
  ): Effect.Effect<MarketingOperationResponse<'getReportTasks'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      reportTaskStatuses: { wireName: 'report_task_statuses', value: input.reportTaskStatuses },
    });
    return requestGetEffect<MarketingOperationResponse<'getReportTasks'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Create report task through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createReportTask.
   * @returns An Effect that succeeds with eBay's generated createReportTask response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createReportTask({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/createReportTask
   */
  public createReportTask = (
    input: CreateReportTaskInput,
  ): Effect.Effect<MarketingOperationResponse<'createReportTask'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task`;
    return requestPostEffect<MarketingOperationResponse<'createReportTask'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get report task through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getReportTask.
   * @returns An Effect that succeeds with eBay's generated getReportTask response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getReportTask({ reportTaskId: 'reportTask-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/getReportTask
   */
  public getReportTask = (
    input: GetReportTaskInput,
  ): Effect.Effect<MarketingOperationResponse<'getReportTask'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task/${input.reportTaskId}`;
    return requestGetEffect<MarketingOperationResponse<'getReportTask'>>(this.client, path);
  };

  /**
   * Delete report task through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteReportTask.
   * @returns An Effect that succeeds with eBay's generated deleteReportTask response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteReportTask({ reportTaskId: 'reportTask-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/ad_report_task/methods/deleteReportTask
   */
  public deleteReportTask = (
    input: DeleteReportTaskInput,
  ): Effect.Effect<MarketingOperationResponse<'deleteReportTask'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/ad_report_task/${input.reportTaskId}`;
    return requestDeleteEffect<MarketingOperationResponse<'deleteReportTask'>>(this.client, path);
  };

  /**
   * Create item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated createItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createItemPriceMarkdownPromotion({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/createItemPriceMarkdownPromotion
   */
  public createItemPriceMarkdownPromotion = (
    input: CreateItemPriceMarkdownPromotionInput,
  ): Effect.Effect<
    MarketingOperationResponse<'createItemPriceMarkdownPromotion'>,
    EbayApiError
  > => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown`;
    return requestPostEffect<MarketingOperationResponse<'createItemPriceMarkdownPromotion'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated getItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getItemPriceMarkdownPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/getItemPriceMarkdownPromotion
   */
  public getItemPriceMarkdownPromotion = (
    input: GetItemPriceMarkdownPromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'getItemPriceMarkdownPromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown/${input.promotionId}`;
    return requestGetEffect<MarketingOperationResponse<'getItemPriceMarkdownPromotion'>>(
      this.client,
      path,
    );
  };

  /**
   * Update item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated updateItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateItemPriceMarkdownPromotion({ promotionId: 'promotion-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/updateItemPriceMarkdownPromotion
   */
  public updateItemPriceMarkdownPromotion = (
    input: UpdateItemPriceMarkdownPromotionInput,
  ): Effect.Effect<
    MarketingOperationResponse<'updateItemPriceMarkdownPromotion'>,
    EbayApiError
  > => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown/${input.promotionId}`;
    return requestPutEffect<MarketingOperationResponse<'updateItemPriceMarkdownPromotion'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Delete item price markdown promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteItemPriceMarkdownPromotion.
   * @returns An Effect that succeeds with eBay's generated deleteItemPriceMarkdownPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteItemPriceMarkdownPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_price_markdown/methods/deleteItemPriceMarkdownPromotion
   */
  public deleteItemPriceMarkdownPromotion = (
    input: DeleteItemPriceMarkdownPromotionInput,
  ): Effect.Effect<
    MarketingOperationResponse<'deleteItemPriceMarkdownPromotion'>,
    EbayApiError
  > => {
    const path = `${MARKETING_BASE_PATH}/item_price_markdown/${input.promotionId}`;
    return requestDeleteEffect<MarketingOperationResponse<'deleteItemPriceMarkdownPromotion'>>(
      this.client,
      path,
    );
  };

  /**
   * Create item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createItemPromotion.
   * @returns An Effect that succeeds with eBay's generated createItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createItemPromotion({ request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/createItemPromotion
   */
  public createItemPromotion = (
    input: CreateItemPromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'createItemPromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion`;
    return requestPostEffect<MarketingOperationResponse<'createItemPromotion'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Get item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getItemPromotion.
   * @returns An Effect that succeeds with eBay's generated getItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getItemPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/getItemPromotion
   */
  public getItemPromotion = (
    input: GetItemPromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'getItemPromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion/${input.promotionId}`;
    return requestGetEffect<MarketingOperationResponse<'getItemPromotion'>>(this.client, path);
  };

  /**
   * Update item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateItemPromotion.
   * @returns An Effect that succeeds with eBay's generated updateItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateItemPromotion({ promotionId: 'promotion-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/updateItemPromotion
   */
  public updateItemPromotion = (
    input: UpdateItemPromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'updateItemPromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion/${input.promotionId}`;
    return requestPutEffect<MarketingOperationResponse<'updateItemPromotion'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Delete item promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteItemPromotion.
   * @returns An Effect that succeeds with eBay's generated deleteItemPromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteItemPromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/item_promotion/methods/deleteItemPromotion
   */
  public deleteItemPromotion = (
    input: DeleteItemPromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'deleteItemPromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/item_promotion/${input.promotionId}`;
    return requestDeleteEffect<MarketingOperationResponse<'deleteItemPromotion'>>(
      this.client,
      path,
    );
  };

  /**
   * Get listing set through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getListingSet.
   * @returns An Effect that succeeds with eBay's generated getListingSet response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getListingSet({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/getListingSet
   */
  public getListingSet = (
    input: GetListingSetInput,
  ): Effect.Effect<MarketingOperationResponse<'getListingSet'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion/${input.promotionId}/get_listing_set`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      q: { wireName: 'q', value: input.q },
      sort: { wireName: 'sort', value: input.sort },
      status: { wireName: 'status', value: input.status },
    });
    return requestGetEffect<MarketingOperationResponse<'getListingSet'>>(this.client, path, params);
  };

  /**
   * Get promotions through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getPromotions.
   * @returns An Effect that succeeds with eBay's generated getPromotions response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getPromotions({ marketplaceId: 'marketplace-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/getPromotions
   */
  public getPromotions = (
    input: GetPromotionsInput,
  ): Effect.Effect<MarketingOperationResponse<'getPromotions'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      marketplaceId: { wireName: 'marketplace_id', value: input.marketplaceId },
      offset: { wireName: 'offset', value: input.offset },
      promotionStatus: { wireName: 'promotion_status', value: input.promotionStatus },
      promotionType: { wireName: 'promotion_type', value: input.promotionType },
      q: { wireName: 'q', value: input.q },
      sort: { wireName: 'sort', value: input.sort },
    });
    return requestGetEffect<MarketingOperationResponse<'getPromotions'>>(this.client, path, params);
  };

  /**
   * Pause promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for pausePromotion.
   * @returns An Effect that succeeds with eBay's generated pausePromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.pausePromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/pausePromotion
   */
  public pausePromotion = (
    input: PausePromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'pausePromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion/${input.promotionId}/pause`;
    return requestPostEffect<MarketingOperationResponse<'pausePromotion'>>(this.client, path);
  };

  /**
   * Resume promotion through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for resumePromotion.
   * @returns An Effect that succeeds with eBay's generated resumePromotion response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.resumePromotion({ promotionId: 'promotion-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion/methods/resumePromotion
   */
  public resumePromotion = (
    input: ResumePromotionInput,
  ): Effect.Effect<MarketingOperationResponse<'resumePromotion'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion/${input.promotionId}/resume`;
    return requestPostEffect<MarketingOperationResponse<'resumePromotion'>>(this.client, path);
  };

  /**
   * Get promotion reports through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getPromotionReports.
   * @returns An Effect that succeeds with eBay's generated getPromotionReports response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getPromotionReports({ marketplaceId: 'marketplace-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion_report/methods/getPromotionReports
   */
  public getPromotionReports = (
    input: GetPromotionReportsInput,
  ): Effect.Effect<MarketingOperationResponse<'getPromotionReports'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion_report`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      marketplaceId: { wireName: 'marketplace_id', value: input.marketplaceId },
      offset: { wireName: 'offset', value: input.offset },
      promotionStatus: { wireName: 'promotion_status', value: input.promotionStatus },
      promotionType: { wireName: 'promotion_type', value: input.promotionType },
      q: { wireName: 'q', value: input.q },
    });
    return requestGetEffect<MarketingOperationResponse<'getPromotionReports'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Get promotion summary report through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getPromotionSummaryReport.
   * @returns An Effect that succeeds with eBay's generated getPromotionSummaryReport response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getPromotionSummaryReport({ marketplaceId: 'marketplace-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/promotion_summary_report/methods/getPromotionSummaryReport
   */
  public getPromotionSummaryReport = (
    input: GetPromotionSummaryReportInput,
  ): Effect.Effect<MarketingOperationResponse<'getPromotionSummaryReport'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/promotion_summary_report`;
    const params = buildEndpointParams({
      marketplaceId: { wireName: 'marketplace_id', value: input.marketplaceId },
    });
    return requestGetEffect<MarketingOperationResponse<'getPromotionSummaryReport'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Get email campaigns through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailCampaigns.
   * @returns An Effect that succeeds with eBay's generated getEmailCampaigns response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailCampaigns());
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailCampaigns
   */
  public getEmailCampaigns = (
    input: GetEmailCampaignsInput = {},
  ): Effect.Effect<MarketingOperationResponse<'getEmailCampaigns'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign`;
    const params = buildEndpointParams({
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
      q: { wireName: 'q', value: input.q },
      sort: { wireName: 'sort', value: input.sort },
    });
    return requestGetEffect<MarketingOperationResponse<'getEmailCampaigns'>>(
      this.client,
      path,
      params,
    );
  };

  /**
   * Create email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for createEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated createEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.createEmailCampaign({ marketplaceId: 'EBAY_US', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/createEmailCampaign
   */
  public createEmailCampaign = (
    input: CreateEmailCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'createEmailCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign`;
    const config = marketplaceHeader(input.marketplaceId);
    return requestPostEffect<MarketingOperationResponse<'createEmailCampaign'>>(
      this.client,
      path,
      input.request,
      config,
    );
  };

  /**
   * Get email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated getEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailCampaign({ emailCampaignId: 'emailCampaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailCampaign
   */
  public getEmailCampaign = (
    input: GetEmailCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'getEmailCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}`;
    return requestGetEffect<MarketingOperationResponse<'getEmailCampaign'>>(this.client, path);
  };

  /**
   * Update email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for updateEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated updateEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.updateEmailCampaign({ emailCampaignId: 'emailCampaign-1', request: { ... } }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/updateEmailCampaign
   */
  public updateEmailCampaign = (
    input: UpdateEmailCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'updateEmailCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}`;
    return requestPutEffect<MarketingOperationResponse<'updateEmailCampaign'>>(
      this.client,
      path,
      input.request,
    );
  };

  /**
   * Delete email campaign through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for deleteEmailCampaign.
   * @returns An Effect that succeeds with eBay's generated deleteEmailCampaign response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.deleteEmailCampaign({ emailCampaignId: 'emailCampaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/deleteEmailCampaign
   */
  public deleteEmailCampaign = (
    input: DeleteEmailCampaignInput,
  ): Effect.Effect<MarketingOperationResponse<'deleteEmailCampaign'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}`;
    return requestDeleteEffect<MarketingOperationResponse<'deleteEmailCampaign'>>(
      this.client,
      path,
    );
  };

  /**
   * Get audiences through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getAudiences.
   * @returns An Effect that succeeds with eBay's generated getAudiences response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getAudiences({ emailCampaignType: 'emailCampaignType-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getAudiences
   */
  public getAudiences = (
    input: GetAudiencesInput,
  ): Effect.Effect<MarketingOperationResponse<'getAudiences'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/audience`;
    const params = buildEndpointParams({
      emailCampaignType: { wireName: 'emailCampaignType', value: input.emailCampaignType },
      limit: { wireName: 'limit', value: input.limit },
      offset: { wireName: 'offset', value: input.offset },
    });
    return requestGetEffect<MarketingOperationResponse<'getAudiences'>>(this.client, path, params);
  };

  /**
   * Get email preview through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailPreview.
   * @returns An Effect that succeeds with eBay's generated getEmailPreview response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailPreview({ emailCampaignId: 'emailCampaign-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailPreview
   */
  public getEmailPreview = (
    input: GetEmailPreviewInput,
  ): Effect.Effect<MarketingOperationResponse<'getEmailPreview'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/${input.emailCampaignId}/email_preview`;
    return requestGetEffect<MarketingOperationResponse<'getEmailPreview'>>(this.client, path);
  };

  /**
   * Get email report through the eBay Marketing API.
   *
   * @param input - Path, query, header, and request body values for getEmailReport.
   * @returns An Effect that succeeds with eBay's generated getEmailReport response DTO.
   *
   * @example
   * ```ts
   * const response = await Effect.runPromise(marketingApi.getEmailReport({ endDate: 'endDate-1', startDate: 'startDate-1' }));
   * ```
   *
   * @see https://developer.ebay.com/api-docs/sell/marketing/resources/email_campaign/methods/getEmailReport
   */
  public getEmailReport = (
    input: GetEmailReportInput,
  ): Effect.Effect<MarketingOperationResponse<'getEmailReport'>, EbayApiError> => {
    const path = `${MARKETING_BASE_PATH}/email_campaign/report`;
    const params = buildEndpointParams({
      endDate: { wireName: 'endDate', value: input.endDate },
      startDate: { wireName: 'startDate', value: input.startDate },
    });
    return requestGetEffect<MarketingOperationResponse<'getEmailReport'>>(
      this.client,
      path,
      params,
    );
  };
}
