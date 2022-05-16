import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'
import { isRedisEnabled, redisUrl, redisNamespace } from './config'

let db: Keyv
if (isRedisEnabled) {
  db = new Keyv({ store: new KeyvRedis(redisUrl), namespace: redisNamespace || undefined })
} else {
  db = new Keyv()
}

export { db }
