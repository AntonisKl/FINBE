/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.ClientInfoTransfer} clientInfoTransfer - the trade to be processed
 * @transaction
 */

async function tradeKYCinfo(clientInfoTransfer) {
    clientInfoTransfer.clientInfo.banks.push(clientInfoTransfer.toBank);
// emit a notification that a trade has occurred
//  let KYCNotification = getFactory().newEvent('org.example.mynetwork', 'KYCNotification');
//  KYCNotification.clientInfo = trade.clientInfo;
 // emit(KYCNotification);

  return getAssetRegistry('org.example.mynetwork.ClientInfo').then(
    function(assetRegistry){
      return assetRegistry.update(clientInfoTransfer.clientInfo);
    });
}