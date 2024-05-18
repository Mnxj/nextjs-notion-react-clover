import got from 'got'
import lqip from 'lqip-modern'
import pMap from 'p-map'
import pMemoize from 'p-memoize'
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from 'notion-types'
import { getPageImageUrls, normalizeUrl } from 'notion-utils'

import { defaultPageIcon} from './config'
import { mapImageUrl } from './map-image-url'
import { appendWriteJson, findValue } from 'components/writeJson'
const imageMapPath = 'ImageMap.json'

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap
): Promise<PreviewImageMap> {
  const urls: string[] = getPageImageUrls(recordMap, {mapImageUrl})
    .concat([defaultPageIcon])
    .filter(Boolean)

  return Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url)
        return [cacheKey, await getPreviewImage(url, {cacheKey})]
      },
      {
        concurrency: 8
      }
    )
  )
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string }
): Promise<PreviewImage | null> {
  try {
    const cachedPreviewImage = await findValue(imageMapPath,cacheKey)
    if (cachedPreviewImage) {
      return cachedPreviewImage
    }

    const { body } = await got(url, { responseType: 'buffer' })
    const result = await lqip(body)
    // console.log('lqip', { ...result.metadata, url, cacheKey })

    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64
    }
    appendWriteJson(imageMapPath,{id:cacheKey, value: previewImage})
    return previewImage
  } catch (err) {
    console.warn('failed to create preview image', url, err.message)
    return null
  }
}

export const getPreviewImage = pMemoize(createPreviewImage)
