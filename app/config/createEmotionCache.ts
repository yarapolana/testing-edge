import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

export function createEmotionCache() {
  return createCache({ key: 'css' })
}

export const defaultCache = createEmotionCache()
export const { extractCriticalToChunks } = createEmotionServer(defaultCache)
