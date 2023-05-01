string related_list.RelatedList_Function(map account)
{
accountId = account.get("Accounts.ID");
dealsResp = zoho.crm.searchRecords("Deals","(Account_Name:equals:" + accountId + ")",1,100);
openDealsAmount = 0;
wonDealsAmount = 0;
lostDealsAmount = 0;
wonDealsCount = 0;
lostDealsCount = 0;
for each  deal in dealsResp
{
	dealAmount = deal.get("Amount");
	dealStage = deal.get("Stage");
	if(dealStage.contains("Open"))
	{
		openDealsAmount = openDealsAmount + dealAmount;
	}
	else if(dealStage.contains("Won"))
	{
		wonDealsAmount = wonDealsAmount + dealAmount;
		wonDealsCount = wonDealsCount + 1;
	}
	else if(dealStage.contains("Lost"))
	{
		lostDealsAmount = lostDealsAmount + dealAmount;
		lostDealsCount = lostDealsCount + 1;
	}
}
totalDealsCount = wonDealsCount + lostDealsCount;
winRate = wonDealsCount / totalDealsCount * 100;
responseXML = "<record>";
responseXML = responseXML + "<row no='0'><FL val='Open Deals Amount'>" + openDealsAmount + "</FL></row>";
responseXML = responseXML + "<row no='1'><FL val='Won Deals Amount'>" + wonDealsAmount + "</FL></row>";
responseXML = responseXML + "<row no='2'><FL val='Lost Deals Amount'>" + lostDealsAmount + "</FL></row>";
responseXML = responseXML + "<row no='3'><FL val='Win Rate #'>" + wonDealsCount + "</FL></row>";
responseXML = responseXML + "<row no='4'><FL val='Win Rate %'>" + winRate + "</FL></row>";
responseXML = responseXML + "</record>";
return responseXML;
}