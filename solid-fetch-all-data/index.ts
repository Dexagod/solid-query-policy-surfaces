import generateFetch from "../css-generate-fetch-token"
import { getContainedResourceUrlAll, getResourceInfo, getSolidDataset } from "@inrupt/solid-client"
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { toNodeReadable } from "web-streams-node"
const TinyQueue = require('tinyqueue');
const path = require('path')


export async function downloadSolidRDFResources(podRoot: string, tokenLocation: string, storageLocation: string, includeMetadata?: boolean) {
  includeMetadata = includeMetadata || false

  if (!storageLocation.endsWith('/')) throw new Error('Storage location value should end in "/".')

  const authenticatedFetch = await generateFetch(tokenLocation)

  const r1 = await authenticatedFetch('https://publicpod.rubendedecker.be/ruben/')
  let resourceURIs = findAllDocumentURIs(podRoot, authenticatedFetch)
  for await (const uri of resourceURIs) { 
    retrieveDocument(uri, authenticatedFetch, storageLocation, podRoot)
    if (includeMetadata) { 
      const ri = await getResourceInfo(uri, { fetch: authenticatedFetch })
      const links = ri.internal_resourceInfo.linkedResources
      const meta = links.describedby && links.describedby.length && links.describedby[0]
      if (meta) retrieveDocument(meta, authenticatedFetch, storageLocation, podRoot)
    }
  }
}

async function* findAllDocumentURIs(containerUrl: string, authenticatedFetch:any) {
  if (!containerUrl.endsWith('/')) {
    throw new Error('Container URLs should end in a "/".')
  }
  
  var queue = new TinyQueue();
  queue.push(containerUrl)

  let container = queue.pop();

  while (container) { 
    let resourceDS = await getSolidDataset(container, { fetch: authenticatedFetch })
    let resourceURIs = getContainedResourceUrlAll(resourceDS)

    for (let uri of resourceURIs) {
      if (uri.endsWith('/')) {
        queue.push(uri)
      } else { 
        yield(uri)
      }
    }
    container = queue.pop();
  }

}


async function retrieveDocument(url: string, f: any, storageLocation: string, podRoot: string) {
  const res = await f(url, {
    headers: { "Accept": "text/n3" }
  })
  if (!res.ok) { 
    console.error(`Could not retrieve resource at location ${url}`)
    return
  }
  const filepath = `${storageLocation}${url.replace(podRoot, '')}.n3`

  mkdirSync(path.dirname(filepath), { recursive: true })
  console.log('Writing to: ', filepath)
  const fileStream = createWriteStream(filepath);
  await new Promise((resolve, reject) => {
    let body = toReadableStream(res.body)
    body.pipe(fileStream);
    body.on("error", reject);
    fileStream.on("finish", resolve);
    fileStream.on("end", resolve);
  });
  return
}




/**
 * Converts a WhatWG streams to Node streams if required.
 * Returns the input in case the stream already is a Node stream.
 * @param {ReadableStream} body
 * @returns {NodeJS.ReadableStream}
 */
function toReadableStream(body: ReadableStream | null): NodeJS.ReadableStream {
  return require("is-stream")(body) ? body : toNodeReadable(body);
}