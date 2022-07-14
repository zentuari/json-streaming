const {streamToString} = require('./util');
const { Readable } = require('stream');
const fs = require('fs');

const chunky = {
    stream: (jsonarr = [], chunk_size = 1) => {
    
        let len = jsonarr.length;
        let cursor = 0;
    
        const rs = new Readable();
        rs._read = async function () {
            while (len-cursor > 0) {
                let rows = [];
                for(let i = 0 ; i < chunk_size ; i++){
                    rows.push(jsonarr[cursor]);
                    cursor++;
                    if(len-cursor == 0) break;
                }
                rs.push(JSON.stringify(rows));
            }
            rs.push(null);
        }
        return rs;
    },
    rebuild: (stream) => {
        let chunks = [];
        return new Promise((resolve, reject) => {
            stream.on('data', (chunk) => {
                                            chunks = chunks.concat(JSON.parse(chunk.toString()))
                                        });
            stream.on('error', (err) => reject(err));
            stream.on('end', () => resolve(chunks));
        })
    }
}

const chonky = {
    stream: (json) => {
        const rs = new Readable();
        rs._read = async function () {
            rs.push(JSON.stringify(json));
            rs.push(null);    
        }
        return rs;
    },
    rebuild: async (stream) => {
        return JSON.parse(await streamToString(stream));
    }
}

const readwrite = {
    fileToStream: (path) => {
        const readable = fs.ReadStream(path);
        return readable;
    },
    streamToFile: (stream, path) => {
        const writable = fs.WriteStream(path);
        stream.pipe(writable);
    },
    readJSON: (path) => {
        return fs.readFileSync(path, {encoding:'utf8', flag:'r'});
    },
    writeJSON: (json, path) => {
        fs.writeFileSync(path, json);
    }
}

module.exports = {
    chonky,
    chunky,
    readwrite
}