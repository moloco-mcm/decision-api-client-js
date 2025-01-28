import { Filtering, FilteringHttpRequestBody } from '../types/common';

export const testFiltering: Filtering = {
  category: {
    operator: 'OR',
    categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
  },
  location: {
    locations: ['test_location_1', 'test_location_2'],
  },
  brand: {
    brandIds: ['test_brand_id_1', 'test_brand_id_2'],
  },
  delivery: {
    deliveryOption: 'test_delivery_option',
  },
  price: {
    minPrice: 10,
    maxPrice: 100,
  },
  salePrice: {
    minSalePrice: 10,
    maxSalePrice: 100,
  },
  rating: {
    min: 1,
    max: 5,
  },
  reviewCount: {
    min: 10,
    max: 100,
  },
  color: {
    colors: ['red', 'blue'],
  },
  gender: {
    genders: ['male', 'female'],
  },
  size: {
    sizes: ['small', 'medium'],
  },
  material: {
    materials: ['cotton', 'polyester'],
  },
  pattern: {
    patterns: ['striped', 'dotted'],
  },
  condition: {
    conditions: ['new', 'used'],
  },
  ageGroup: {
    ageGroups: ['adult', 'child'],
  },
};

export const testFilteringHttpRequestBody: FilteringHttpRequestBody = {
  category: {
    operator: 'OR',
    categories: ['Sports & Fitness > Athletic Clothing > Shoe'],
  },
  location: {
    locations: ['test_location_1', 'test_location_2'],
  },
  brand: {
    brand_ids: ['test_brand_id_1', 'test_brand_id_2'],
  },
  delivery: {
    delivery_option: 'test_delivery_option',
  },
  price: {
    min_price: 10,
    max_price: 100,
  },
  sale_price: {
    min_sale_price: 10,
    max_sale_price: 100,
  },
  rating: {
    min: 1,
    max: 5,
  },
  review_count: {
    min: 10,
    max: 100,
  },
  color: {
    colors: ['red', 'blue'],
  },
  gender: {
    genders: ['male', 'female'],
  },
  size: {
    sizes: ['small', 'medium'],
  },
  material: {
    materials: ['cotton', 'polyester'],
  },
  pattern: {
    patterns: ['striped', 'dotted'],
  },
  condition: {
    conditions: ['new', 'used'],
  },
  age_group: {
    age_groups: ['adult', 'child'],
  },
};
