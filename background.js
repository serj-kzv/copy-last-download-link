'use strict';

let timer;

browser.browserAction.onClicked.addListener(async () => {
    const downloads = await browser.downloads.search({
        limit: 1,
        orderBy: ['-startTime'],
        state: 'complete'
    });

    if (downloads.length > 0) {
        navigator.clipboard.writeText(downloads[0].url);
        browser.browserAction.setBadgeText({text: 'done'});
    } else {
        browser.browserAction.setBadgeText({text: 'fail'});
    }
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => browser.browserAction.setBadgeText({text: ''}), 1500);
});
