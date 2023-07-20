import createCache from '@emotion/cache'

export function createEmotionCache() {
  return createCache({ key: 'css' })
}

export const defaultCache = createEmotionCache()
