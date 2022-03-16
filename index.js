const phishingLinks = require('./phishingLinks.json');

exports.antiPhishing = async function (message) {
    if (!message) return;
    if (!message.author && !message.content && !message.member) return;

    let links = []
    for (const url of phishingLinks.domains) {
        if (message.content.includes(url)) {
            links.push(url);
            break;
        }
    }

    if (links.length == 1) {
        message.delete().catch(err => err);

        const linkFound = new Promise((resolve, reject) => {
            let res = { message: message, link: links[0] }
            resolve(res);
        });
    } else {
        const linkNotFound = new Promise((resolve, reject) => {
            let rej = { message: undefined, link: undefined }
            reject(rej);
        });
    }
}