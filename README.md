# Janus Typescript Client

Wrapped Janus.js by TypeScript.

## Installation

`npm i https://github.com/Lycolia/janus-typescript-client.git`

## Usage

```
import * as Janus from 'janus-typescript-client;

Janus.init({
    callback: () => {
        const janus = new Janus(...options);
    },
});
```