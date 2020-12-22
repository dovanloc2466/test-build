export type UrlFilterOperator = 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'containss' | 'null';

export const getUrlFilterKey = (fieldName: string, operator: UrlFilterOperator = 'eq') => {
  return fieldName + '_' + operator;
};