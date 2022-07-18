# JSON Streaming

JSON Streaming is a library for streaming JSON objects optimizing the data flow. It can Read, Write and Stream JSON Arrays. This library is capable of handling large and smaller arrays of JSON objects by streaming them as a whole or in small portions.

[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features
- Chunky - Stream JSON arrays in chunks
- Chonky - Stream any JSON object as a whole
- Read/Write operations of JSON


## Installation



```bash
npm i @zentuari/json-streaming
```

## Usage

### 0. Importing
```javascript
const { chunky, chonky, readwrite } = require('@zentuari/json-streaming');
```

### 1. Chunky
Stream JSON arrays in chunks
```javascript
const json = [{a:1, b:2}, {a:3, b:4}];
const chunk_size = 1;
const stream = chunky.stream(json, chunk_size);
```
Rebuild chunky stream
```javascript
const output = await chunky.rebuild(stream)
```

### 2. Chonky
Stream whole JSON object
```javascript
const json = [{a:1, b:2}, {a:3, b:4}];
const stream = chonky.stream(json);
```
Rebuild chonky stream
```javascript
const output = await chonky.rebuild(stream);
```

### 3. Read/Write

Read json file
```javascript
const json = await readwrite.readJSON('read.json');
```

Write json object to file
```javascript
readwrite.writeJSON(json, 'write.json');
await readwrite.writeJSONSync(json, 'write.json'); //async
```

Read json and stream
```javascript
const stream = readwrite.fileToStream('read.json');
```

Write stream to json file
```javascript
readwrite.streamToFile(stream, 'write.json');
await readwrite.streamToFileSync(stream, 'write.json'); //async
```




## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://opensource.org/licenses/ISC)
