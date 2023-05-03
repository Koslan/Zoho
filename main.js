// Get related Deals
const relatedDeals = zoho.crm.getRelatedRecords({
    Entity: "Deals",
    Related_Name: "Deals",
    Record_ID: "{RECORD_ID}"
});

// Calculate summary amounts and win rate
let openDealsAmount = 0;
let wonDealsAmount = 0;
let lostDealsAmount = 0;
let winRate = 0;
let totalDealsAmount = 0;
let totalDealsCount = relatedDeals.length;

relatedDeals.forEach(function(deal) {
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

// Update widget values
document.getElementById("open-deals-amount").textContent = `$${openDealsAmount}`;
document.getElementById("won-deals-amount").textContent = `$${wonDealsAmount}`;
document.getElementById("lost-deals-amount").textContent = `$${lostDealsAmount}`;
document.getElementById("win-rate").textContent = `${Math.round(winRate)}% (${wonDealsAmount} / ${totalDealsAmount})`;
document.getElementById("win-rate").setAttribute("title", `${wonDealsAmount} Won Deals / ${totalDealsAmount} Total Deals`);
