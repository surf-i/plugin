chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.tabs.create({
            url : "https://www.example.com/install.html"
        });
    }

    if (details.reason == "update") {
        chrome.tabs.create({
            url : "https://www.example.com/update.html"
        });
    }
});