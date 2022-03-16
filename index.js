const phishingLinks = require('./phishingLinks.json');

exports.antiPhishing = async function (message) {
    if (!message) return;
    if (!message.author && !message.content && !message.member) return;

    let links = []
    for (const url of phishingLinks.links) {
        if (message.content.includes(url)) {
            links.push(url);
            break;
        }
    }

    if (links.length == 1) {
        message.delete().catch(err => err);

        const linkFound = { message: message, link: links[0] }
        return linkFound;
    } else return undefined;
}