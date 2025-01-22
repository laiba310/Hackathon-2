import { type SchemaTypeDefinition } from 'sanity'

import { productType } from './productType'
import { orderType } from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType,orderType],
}
