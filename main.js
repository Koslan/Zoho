

const fetchZohoDeals = async (apiKey) => {
    const url = "https://www.zohoapis.com/crm/v2/Deals";
    const headers = new Headers({
        "Authorization": `Zoho-oauthtoken ${apiKey}`,
        "Content-Type": "application/json"
    });

    const response = await fetch(url, { method: "GET", headers: headers });
    const data = await response.json();

    return data.data;
};




// Get related Deals
(async () => {
    const apiKey = "41fe415563fb09c64617f59ae9e67f09";
    const deals = await fetchZohoDeals(apiKey);


    let openDealsAmount = 0;
    let wonDealsAmount = 0;
    let lostDealsAmount = 0;
    let winRate = 0;
    let totalDealsAmount = 0;
    let totalDealsCount = deals.length;

    deals.forEach(function (deal) {
        const stage = deal.Stage;
        const amount = deal.Amount;
        if (stage === "Open") {
            openDealsAmount += amount;
        } else if (stage === "Won") {
            wonDealsAmount += amount;
        } else if (stage === "Lost") {
            lostDealsAmount += amount;
        }
    });

    totalDealsAmount = openDealsAmount + wonDealsAmount + lostDealsAmount;

    if (totalDealsCount > 0) {
        winRate = (wonDealsAmount / totalDealsAmount) * 100;
    }


    document.getElementById("open-deals-amount").textContent = `$${openDealsAmount}`;
    document.getElementById("won-deals-amount").textContent = `$${wonDealsAmount}`;
    document.getElementById("lost-deals-amount").textContent = `$${lostDealsAmount}`;
    document.getElementById("win-rate").textContent = `${Math.round(winRate)}% (${wonDealsAmount} / ${totalDealsAmount})`;
    document.getElementById("win-rate").setAttribute("title", `${wonDealsAmount} Won Deals / ${totalDealsAmount} Total Deals`);
})();