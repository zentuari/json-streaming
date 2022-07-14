const {assert, expect} = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');

const {chunky, chonky} = require('../src/jsonstreamer');
const {streamToString, explainChunk} = require('../src/util');

describe('Chunky - JSON Arrays', ()=>{
    it.only('Stream', async ()=>{
        const json = [{"index":1,"letter":"A"},{"index":2,"letter":"B"},{"index":3,"letter":"C"},{"index":4,"letter":"D"},{"index":5,"letter":"E"},{"index":6,"letter":"F"},{"index":7,"letter":"G"},{"index":8,"letter":"H"},{"index":9,"letter":"I"},{"index":10,"letter":"J"},{"index":11,"letter":"K"},{"index":12,"letter":"L"},{"index":13,"letter":"M"},{"index":14,"letter":"N"},{"index":15,"letter":"O"},{"index":16,"letter":"P"},{"index":17,"letter":"Q"},{"index":18,"letter":"R"},{"index":19,"letter":"S"},{"index":20,"letter":"T"},{"index":21,"letter":"Y"},{"index":22,"letter":"V"},{"index":23,"letter":"W"},{"index":24,"letter":"X"},{"index":25,"letter":"Y"},{"index":26,"letter":"Z"}];
        const stream = chunky.stream(json);
        const str = `[{"index":1,"letter":"A"}][{"index":2,"letter":"B"}][{"index":3,"letter":"C"}][{"index":4,"letter":"D"}][{"index":5,"letter":"E"}][{"index":6,"letter":"F"}][{"index":7,"letter":"G"}][{"index":8,"letter":"H"}][{"index":9,"letter":"I"}][{"index":10,"letter":"J"}][{"index":11,"letter":"K"}][{"index":12,"letter":"L"}][{"index":13,"letter":"M"}][{"index":14,"letter":"N"}][{"index":15,"letter":"O"}][{"index":16,"letter":"P"}][{"index":17,"letter":"Q"}][{"index":18,"letter":"R"}][{"index":19,"letter":"S"}][{"index":20,"letter":"T"}][{"index":21,"letter":"Y"}][{"index":22,"letter":"V"}][{"index":23,"letter":"W"}][{"index":24,"letter":"X"}][{"index":25,"letter":"Y"}][{"index":26,"letter":"Z"}]`
        console.log('['.concat(str.replace('}][{', '}],[{').concat(']')))
        // console.log(await streamToString(stream))

    });
    it('Test', async ()=>{
        const readable = fs.ReadStream('array.json');
        const json = JSON.parse(await streamToString(readable));
        console.log(json.length);
        const stream = chonky.stream(json);

        console.log(await chonky.rebuild(stream));     
    });
});