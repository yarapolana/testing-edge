/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { 
  // handleRequest,
  type EntryContext
} from "@vercel/remix";
// import { Response } from "@remix-run/node";
import { renderToString } from 'react-dom/server'
import { RemixServer } from "@remix-run/react";
import { CacheProvider } from '@emotion/react'
import { ServerStyleContext } from './config/chakra.context'
import { createEmotionCache } from './config/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

export default function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  )

  const chunks = extractCriticalToChunks(html)

  const markup = renderToString(
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  )

  responseHeaders.set('Content-Type', 'text/html')
  
  // return new Response(`<!DOCTYPE html>${html}`, {
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders
  })
  
  // const remixServer = <RemixServer context={remixContext} url={request.url} />;
  // return handleRequest(
  //   request,
  //   responseStatusCode,
  //   responseHeaders,
  //   remixServer
  // );
}