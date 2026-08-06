//Todo: add more common types here

export type Targeting = {
  keyValues?: {
    keyId: string;
    valueIds?: string[];
  }[];
};

export type TargetingHttpRequestBody = {
  key_values?: {
    key_id: string;
    value_ids?: string[];
  }[];
};

export type DeduplicationCriteria =
  | 'CRITERIA_DEFAULT'
  | 'CRITERIA_NONE'
  | 'CRITERIA_ITEM_ID'
  | 'CRITERIA_AD_ACCOUNT_ID'
  | 'CRITERIA_CAMPAIGN_ID'
  | 'CRITERIA_LINE_ITEM_ID';

export type DeduplicationSetting = {
  perRequest?: {
    method?: 'METHOD_DEFAULT' | 'METHOD_WATERFALL' | 'METHOD_INTERLEAVED';
    criteria?: DeduplicationCriteria;
  };
  perInventory?: {
    criteria?: DeduplicationCriteria;
  };
};

export type DeduplicationSettingHttpRequestBody = {
  per_request?: {
    method?: 'METHOD_DEFAULT' | 'METHOD_WATERFALL' | 'METHOD_INTERLEAVED';
    criteria?: DeduplicationCriteria;
  };
  per_inventory?: {
    criteria?: DeduplicationCriteria;
  };
};

export type Filtering = {
  category?: {
    operator?: 'OR' | 'AND';
    categories: string[];
  };
  location?: { locations: string[] };
  brand?: { brandId?: string; brandIds?: string[] };
  delivery?: { deliveryOption?: string; deliveryOptions?: string[] };
  price?: { minPrice: number; maxPrice: number };
  salePrice?: { minSalePrice: number; maxSalePrice: number };
  rating?: { min: number; max: number };
  reviewCount?: { min: number; max: number };
  color?: { colors: string[] };
  gender?: { genders: string[] };
  size?: { sizes: string[] };
  material?: { materials: string[] };
  pattern?: { patterns: string[] };
  condition?: { conditions: string[] };
  ageGroup?: { ageGroups: string[] };
};

export type FilteringHttpRequestBody = {
  category?: {
    operator?: 'OR' | 'AND';
    categories: string[];
  };
  location?: { locations: string[] };
  brand?: { brand_id?: string; brand_ids?: string[] };
  delivery?: { delivery_option?: string; delivery_options?: string[] };
  price?: { min_price: number; max_price: number };
  sale_price?: { min_sale_price: number; max_sale_price: number };
  rating?: { min: number; max: number };
  review_count?: { min: number; max: number };
  color?: { colors: string[] };
  gender?: { genders: string[] };
  size?: { sizes: string[] };
  material?: { materials: string[] };
  pattern?: { patterns: string[] };
  condition?: { conditions: string[] };
  age_group?: { age_groups: string[] };
};
