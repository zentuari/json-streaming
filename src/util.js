function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}

function explainChunk(chunky_string) {
    const json = JSON.parse([`${chunky_string}`.replace('][', '],[')])
    return json.length
}

module.exports = {
    streamToString,
    explainChunk
}