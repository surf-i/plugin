chrome.runtime.onInstalled?.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({
            url: "https://surfi.netlify.app"
        });
    }
});

let blacklist = ["https://www.google.com", "https://twitter.com", "https://facebook.com", "https://bloqueneon.uniandes.edu.co", 
                "https://www.youtube.com", "https://www.instagram.com", "https://www.amazon.com", "https://www.netflix.com", "https://www.reddit.com",
                "https://www.linkedin.com", "https://www.pinterest.com", "https://www.quora.com", "https://www.canva.com", "https://www.flickr.com",
                "https://www.tumblr.com", "https://discord.com", "https://www.twitch.tv"]

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg == "getCurrentTab") getCurrentTab(sendResponse);
        if (request.msg == "getWebsiteFirstParagraph") getWebsiteFirstParagraph(sendResponse);
        if (request.msg == "getBlacklist") sendResponse(blacklist);
        return true;
    }
);

async function getCurrentTab(sendResponse) {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    sendResponse(tab);
}

async function getWebsiteFirstParagraph(sendResponse) {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab){
        let url = tab.url;
        let HTML = await getHTML(url).catch(() => { return "No summary available" });
        let firstParagraph = getFromBetween.get(HTML, "<p>", "</p>")[0] + "<br/><br/>" + getFromBetween.get(HTML, "<p>", "</p>")[1];
        sendResponse(firstParagraph);
    }
}

async function getHTML(url) {
    let response = await fetch(url);
    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
    let text = await response.text(); // await ensures variable has fulfilled Promise
    return text
}

var getFromBetween = {
    results: [],
    string: "",
    getFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1) + sub1.length;
        var string1 = this.string.substr(0, SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP, TP);
    },
    removeFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
        this.string = this.string.replace(removal, "");
    },
    getAllResults: function (sub1, sub2,veces) {
        // first check to see if we do have both substrings
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1, sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1, sub2);

        // if there's more substrings
        if (this.string.indexOf(sub1) > -1 && veces<=3 &&this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1, sub2,veces+1);
        }
        else return;
    },
    get: function (string, sub1, sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1, sub2,0);
        return this.results;
    }
};
