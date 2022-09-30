# CSS client credentials token generation

This library provides functionality for the generation of a client credentials token for the [Community Solid Server](https://communitysolidserver.github.io/) V4.0.0 and up.


## Installation
```
git clone https://github.com/Dexagod/css-generate-token.git
cd css-generate-token
npm install
npm run build
```


## Javascript


**Authenticating with a WebID**
```
import { generateTokenWithWebID } from "install/location"

const token = await generateTokenWithWebID({
  webid: "https://luigi.com/profile/card#me",
  email: "itsa@me.luigi",
  password: "mysupersecretpasssword",
  out: "/token/location"
})

console.log(token)
```

**Authenticating with an Identity Provider**
```
import { generateTokenWithIDP } from "install/location"

const token = await generateTokenWithIDP({
  idp: "https://luigi.com/idp/",
  email: "itsa@me.luigi",
  password: "mysupersecretpasssword",
  out: "/token/location"
})

console.log(token)
```



## CLI

```
node cli.js
```
