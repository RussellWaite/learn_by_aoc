What did we do to create this
```sh
npm init -y && npm install --save-dev typescript jest && npm install -D @types/node

npm install jest --save-dev
npm install ts-jest --save-dev
npm install @types/jest --save-dev

```

need a tsconfig.json


```json
{
  "compilerOptions": { 
    "target": "esnext",
    "module": "ESNext",
    "lib": ["es2023"],
  }
}

```

need to edit the package json (add a type, if using Jest however, this seems to break it...)

```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.10.2",
    "typescript": "^5.3.2"
  }
}


```


create a jest.config.js
```js
module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
```

now run `npm test`
