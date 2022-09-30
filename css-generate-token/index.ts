export type ITokenOptionsOIDC = {
  email: string,
  password: string,
  idp: string,
}

export type ITokenOptionsWebID = {
  email: string,
  password: string,
  webId: string,
}

type IClientCredentialsTokenGenerationOptions = {
  name: string,
  email: string,
  password: string,
  idp: string,
}

export type CSSToken = {
  name: string,
  email: string,
  id: string,
  secret: string,
  idp: string,
}

import fetch from "node-fetch"
import { Parser } from "n3"


export async function generateTokenWithWebID(options: ITokenOptionsWebID) { 
  const name = "Solid-cli-token-generation-script"
  let issuers = await findWebIDIssuers(options.webId)
  if (!issuers || issuers?.length === 0) {  
    throw new Error(`No OIDC issuers found on the profile document. Please make sure you have a solid:oidcIssuer triple present on your profile document!`)  }
  const issuer = issuers[0]
  return await handleTokenGeneration({ name, idp: issuer, ...options })
}

export async function generateTokenWithIDP(options: ITokenOptionsOIDC) {
  const name = "Solid-cli-token-generation-script"
  return await handleTokenGeneration({ name, ...options })
}

async function handleTokenGeneration(options: IClientCredentialsTokenGenerationOptions) { 
  const token = await generateCSSToken(options);
  if (!token) throw new Error('Token could not be generated.');
  return token
}


export async function findWebIDIssuers(webId: string): Promise<string[] | undefined> {
  let res = await fetch(webId, {
	  headers: {'Accept': 'text/turtle'}
  });
  const text = await res.text();
  if (!res.ok) { 
    throw new Error(`Error retrieving WebID document: ${text}`)
  }
  
  const parser = new Parser({ format: 'text/turtle' });
  
  return new Promise((resolve, reject) => { 
    let issuers: string[] = [];
    parser.parse(text,
      (error, quad, prefixes) => {
        if (error)
          reject(error)
        if (quad) { 
          if (quad.predicate.value === "http://www.w3.org/ns/solid/terms#oidcIssuer") { 
            issuers.push(quad.object.value)
          }
        } else
          resolve(issuers)
      });
  })
}

async function generateCSSToken(options: IClientCredentialsTokenGenerationOptions) {
  
  if (!options.idp.endsWith('/')) options.idp += '/';

  // This assumes your server is started under http://localhost:3000/.
  // This URL can also be found by checking the controls in JSON responses when interacting with the IDP API,
  // as described in the Identity Provider section.
  let url = `${options.idp}idp/credentials/`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    // The email/password fields are those of your account.
    // The name field will be used when generating the ID of your token.
    body: JSON.stringify({ email: options.email, password: options.password, name: options.name }),
  });
  if (!response.ok) { 
    writeTokenError(url, response.status, response.statusText)
    return;
  }
  // These are the identifier and secret of your token.
  // Store the secret somewhere safe as there is no way to request it again from the server!

  const token = await response.json();
  if (token.errorCode) { 
    writeTokenError(url, response.status, response.statusText)
    return;
  }
  token.name = options.name;
  token.email = options.email;
  token.idp = options.idp;

  return token as CSSToken;
}

function writeTokenError(url, status, statusText) { 
  throw new Error(`
Failed to create token.
Error posting to credentials endpoint at ${url}: ${status} ${statusText}.
Please check your provided credentials!
`)
}
