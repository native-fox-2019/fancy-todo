const deepai = require('deepai');

function resolve(data) {
    return new Promise(resolve => {
            resolve(data)
    });
}

deepai.setApiKey('220c40f2-910e-45eb-b042-d855d971106b');
(async function summarize() {
    var resp = await deepai.callStandardApi("summarization", {
        text
    });
    console.log(resp)
    resolve(resp)
})()

// module.exports = deepai.setApiKey