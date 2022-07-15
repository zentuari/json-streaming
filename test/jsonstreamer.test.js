const { assert, expect } = require('chai');
const fs = require('fs');

const { chunky, chonky, readwrite } = require('../src/jsonstreamer');
const { streamToString, explainChunk } = require('../src/util');

describe('Chunky - JSON Arrays', () => {
    describe('Stream - Array with 26 json objects', () => {
        const json = [{ "index": 1, "letter": "A" }, { "index": 2, "letter": "B" }, { "index": 3, "letter": "C" }, { "index": 4, "letter": "D" }, { "index": 5, "letter": "E" }, { "index": 6, "letter": "F" }, { "index": 7, "letter": "G" }, { "index": 8, "letter": "H" }, { "index": 9, "letter": "I" }, { "index": 10, "letter": "J" }, { "index": 11, "letter": "K" }, { "index": 12, "letter": "L" }, { "index": 13, "letter": "M" }, { "index": 14, "letter": "N" }, { "index": 15, "letter": "O" }, { "index": 16, "letter": "P" }, { "index": 17, "letter": "Q" }, { "index": 18, "letter": "R" }, { "index": 19, "letter": "S" }, { "index": 20, "letter": "T" }, { "index": 21, "letter": "Y" }, { "index": 22, "letter": "V" }, { "index": 23, "letter": "W" }, { "index": 24, "letter": "X" }, { "index": 25, "letter": "Y" }, { "index": 26, "letter": "Z" }];
        it('Chunk size:1 -> Receive 26 array chunks', async () => {
            const stream = chunky.stream(json, 1);
            const str = await streamToString(stream)
            const expln = explainChunk(str);
            assert.equal(expln.num_chunks, 26);
            assert.equal(expln.total, 26);
            assert.equal(expln.len_last, 1);
        });
        it('Chunk size:5 -> Receive 6 array chunks;last chunk size is 1', async () => {
            const stream = chunky.stream(json, 5);
            const str = await streamToString(stream)
            const expln = explainChunk(str);
            assert.equal(expln.num_chunks, 6);
            assert.equal(expln.total, 26);
            assert.equal(expln.len_last, 1);
        });
        it('Chunk size:30 -> Receive 1 array chunk of length 26', async () => {
            const stream = chunky.stream(json, 30);
            const str = await streamToString(stream)
            const expln = explainChunk(str);
            assert.equal(expln.num_chunks, 1);
            assert.equal(expln.total, 26);
            assert.equal(expln.len_last, 26);
        });
    });
    describe('Rebuild - array with 26 json objects', () => {
        const json = [{ "index": 1, "letter": "A" }, { "index": 2, "letter": "B" }, { "index": 3, "letter": "C" }, { "index": 4, "letter": "D" }, { "index": 5, "letter": "E" }, { "index": 6, "letter": "F" }, { "index": 7, "letter": "G" }, { "index": 8, "letter": "H" }, { "index": 9, "letter": "I" }, { "index": 10, "letter": "J" }, { "index": 11, "letter": "K" }, { "index": 12, "letter": "L" }, { "index": 13, "letter": "M" }, { "index": 14, "letter": "N" }, { "index": 15, "letter": "O" }, { "index": 16, "letter": "P" }, { "index": 17, "letter": "Q" }, { "index": 18, "letter": "R" }, { "index": 19, "letter": "S" }, { "index": 20, "letter": "T" }, { "index": 21, "letter": "Y" }, { "index": 22, "letter": "V" }, { "index": 23, "letter": "W" }, { "index": 24, "letter": "X" }, { "index": 25, "letter": "Y" }, { "index": 26, "letter": "Z" }];
        
        it('Chunk size:1 -> Receive 26 array chunks', async () => {
            const stream = chunky.stream(json, 1);
            const output = await chunky.rebuild(stream);
            expect(output).to.eql(json);
        });
        it('Chunk size:5 -> Receive 6 array chunks;last chunk size is 1', async () => {
            const stream = chunky.stream(json, 5);
            const output = await chunky.rebuild(stream);
            expect(output).to.eql(json);
        });
        it('Chunk size:30 -> Receive 1 array chunk of length 26', async () => {
            const stream = chunky.stream(json, 30);
            const output = await chunky.rebuild(stream);
            expect(output).to.eql(json);
        });
    });
});

describe('Chonky - JSON', () => {
    describe('Stream', () => {
        it('JSON array', async () => {
            const json = [{ "index": 1, "letter": "A" }, { "index": 2, "letter": "B" }, { "index": 3, "letter": "C" }, { "index": 4, "letter": "D" }, { "index": 5, "letter": "E" }, { "index": 6, "letter": "F" }, { "index": 7, "letter": "G" }, { "index": 8, "letter": "H" }, { "index": 9, "letter": "I" }, { "index": 10, "letter": "J" }, { "index": 11, "letter": "K" }, { "index": 12, "letter": "L" }, { "index": 13, "letter": "M" }, { "index": 14, "letter": "N" }, { "index": 15, "letter": "O" }, { "index": 16, "letter": "P" }, { "index": 17, "letter": "Q" }, { "index": 18, "letter": "R" }, { "index": 19, "letter": "S" }, { "index": 20, "letter": "T" }, { "index": 21, "letter": "Y" }, { "index": 22, "letter": "V" }, { "index": 23, "letter": "W" }, { "index": 24, "letter": "X" }, { "index": 25, "letter": "Y" }, { "index": 26, "letter": "Z" }];
            const stream = chonky.stream(json);
            const output = await streamToString(stream);
            expect(JSON.parse(output)).to.eql(json);
        });
        it('JSON Object', async () => {
            const json = { "index": 1, "letter": "A" };
            const stream = chonky.stream(json);
            const output = await streamToString(stream);
            expect(JSON.parse(output)).to.eql(json);
        });
    });
    describe('Rebuild', () => {
        it('JSON array', async () => {
            const json = [{ "index": 1, "letter": "A" }, { "index": 2, "letter": "B" }, { "index": 3, "letter": "C" }, { "index": 4, "letter": "D" }, { "index": 5, "letter": "E" }, { "index": 6, "letter": "F" }, { "index": 7, "letter": "G" }, { "index": 8, "letter": "H" }, { "index": 9, "letter": "I" }, { "index": 10, "letter": "J" }, { "index": 11, "letter": "K" }, { "index": 12, "letter": "L" }, { "index": 13, "letter": "M" }, { "index": 14, "letter": "N" }, { "index": 15, "letter": "O" }, { "index": 16, "letter": "P" }, { "index": 17, "letter": "Q" }, { "index": 18, "letter": "R" }, { "index": 19, "letter": "S" }, { "index": 20, "letter": "T" }, { "index": 21, "letter": "Y" }, { "index": 22, "letter": "V" }, { "index": 23, "letter": "W" }, { "index": 24, "letter": "X" }, { "index": 25, "letter": "Y" }, { "index": 26, "letter": "Z" }];
            const stream = chonky.stream(json);
            const output = await chonky.rebuild(stream);
            expect(output).to.eql(json);
        });
        it('JSON Object', async () => {
            const json = { "index": 1, "letter": "A" };
            const stream = chonky.stream(json);
            const output = await chonky.rebuild(stream);
            expect(output).to.eql(json);
        });
    });
});

describe('Read/Write', () => {
    describe('fileToStream', () => {
        it('Streaming JSON - Duck Test - on', async () => {
            const stream = readwrite.fileToStream('./test/read.json');
            
            const output = await streamToString(stream);
            const json = JSON.parse(output);
            assert.equal(json[0].letter, 'A');
        });
    });
    describe('streamToFileAsync', () => {
        const json = [{ "index": 1, "letter": "A" }, { "index": 2, "letter": "B" }, { "index": 3, "letter": "C" }, { "index": 4, "letter": "D" }, { "index": 5, "letter": "E" }, { "index": 6, "letter": "F" }, { "index": 7, "letter": "G" }, { "index": 8, "letter": "H" }, { "index": 9, "letter": "I" }, { "index": 10, "letter": "J" }, { "index": 11, "letter": "K" }, { "index": 12, "letter": "L" }, { "index": 13, "letter": "M" }, { "index": 14, "letter": "N" }, { "index": 15, "letter": "O" }, { "index": 16, "letter": "P" }, { "index": 17, "letter": "Q" }, { "index": 18, "letter": "R" }, { "index": 19, "letter": "S" }, { "index": 20, "letter": "T" }, { "index": 21, "letter": "Y" }, { "index": 22, "letter": "V" }, { "index": 23, "letter": "W" }, { "index": 24, "letter": "X" }, { "index": 25, "letter": "Y" }, { "index": 26, "letter": "Z" }];
        const stream = chonky.stream(json);

        it('Stream to JSON file', async () => {
            await readwrite.streamToFileSync(stream, './test/write.json');

            const exists = fs.existsSync('./test/write.json');
            assert.equal(exists, true);
        });
    });
    describe('readJSON', () => {
        it('reading JSON', async () => {
            const json = await readwrite.readJSON('./test/read.json');

            assert.equal(json[0].letter, 'A');
        });
    });
    describe('writeJSONSync', () => {
        const json = [{ "index": 1, "letter": "A" }, { "index": 2, "letter": "B" }, { "index": 3, "letter": "C" }, { "index": 4, "letter": "D" }, { "index": 5, "letter": "E" }, { "index": 6, "letter": "F" }, { "index": 7, "letter": "G" }, { "index": 8, "letter": "H" }, { "index": 9, "letter": "I" }, { "index": 10, "letter": "J" }, { "index": 11, "letter": "K" }, { "index": 12, "letter": "L" }, { "index": 13, "letter": "M" }, { "index": 14, "letter": "N" }, { "index": 15, "letter": "O" }, { "index": 16, "letter": "P" }, { "index": 17, "letter": "Q" }, { "index": 18, "letter": "R" }, { "index": 19, "letter": "S" }, { "index": 20, "letter": "T" }, { "index": 21, "letter": "Y" }, { "index": 22, "letter": "V" }, { "index": 23, "letter": "W" }, { "index": 24, "letter": "X" }, { "index": 25, "letter": "Y" }, { "index": 26, "letter": "Z" }];

        it('Stream to JSON file', async () => {
            await readwrite.writeJSONSync(json, './test/read.json');

            const exists = fs.existsSync('./test/read.json');
            assert.equal(exists, true);
        });
    });
});