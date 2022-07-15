function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}

function explainChunk(chunky_string) {
    const processed_string = '['.concat(chunky_string.concat(']')).replace(new RegExp("\\]\\[", 'g'), '],[');
    const processed_json = JSON.parse(processed_string);
    const res = {}
    res.num_chunks = processed_json.length;
    res.len_last = processed_json[res.num_chunks-1].length;
    res.total = res.num_chunks > 1 ? processed_json[0].length * (res.num_chunks-1) + res.len_last : processed_json[0].length;
    
    return res;

    // return json.length
}

module.exports = {
    streamToString,
    explainChunk
}