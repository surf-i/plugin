chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({
            url: "https://surfi.netlify.app"
        });
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "getCurrentTab") getCurrentTab(sendResponse);
        return true;
    }
);

async function getCurrentTab(sendResponse) {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    sendResponse(tab);
}
