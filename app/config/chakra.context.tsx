import React, { createContext, useState } from 'react'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache, defaultCache } from './createEmotionCache'

export interface ServerStyleContextData {
  key: string
  ids: Array<string>
  css: string
}

interface ClientCacheProviderProps {
  children: React.ReactNode
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null)

export interface ClientStyleContextData {
  reset: () => void
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
)

export function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache)

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}
