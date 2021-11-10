const RuufCoin = artifacts.require("./RuufCoin");
const StakeFarm = artifacts.require("./StakeFarm");
const Airdrop = artifacts.require("./Airdrop");

async function doDeploy(deployer, network, accounts) {

  await deployer.deploy(RuufCoin);
  let ruufCoin = await RuufCoin.deployed();
  console.log('RuufCoin deployed:', ruufCoin.address);

  await deployer.deploy(StakeFarm, ruufCoin.address);
  let stakeFarm = await StakeFarm.deployed();
  console.log('StakeFarm deployed:', stakeFarm.address);

  await ruufCoin.transfer(stakeFarm.address, web3.utils.toWei('5000000'));

  await deployer.deploy(Airdrop, ruufCoin.address);
  let airdrop = await Airdrop.deployed();
  console.log('Airdrop deployed:', airdrop.address);

  await ruufCoin.transfer(airdrop.address, web3.utils.toWei('200000000'));
}

async function printCurve(stakeFarm) {
  const ONE_MONTH_IN_SECONDS = 2592000;

  const currentBlock = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(currentBlock);
  const timestamp = block.timestamp;
  console.log(timestamp);
  console.log((ONE_MONTH_IN_SECONDS * 1));
  console.log( timestamp - (ONE_MONTH_IN_SECONDS * 1));

  let res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 1));
  console.log('Dividends 1 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 2));
  console.log('Dividends 2 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 3));
  console.log('Dividends 3 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 4));
  console.log('Dividends 4 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 5));
  console.log('Dividends 5 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 6));
  console.log('Dividends 6 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 7));
  console.log('Dividends 7 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 8));
  console.log('Dividends 8 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 9));
  console.log('Dividends 9 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 10));
  console.log('Dividends 10 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 11));
  console.log('Dividends 11 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 12));
  console.log('Dividends 12 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 13));
  console.log('Dividends 13 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 14));
  console.log('Dividends 14 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 15));
  console.log('Dividends 15 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 16));
  console.log('Dividends 16 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 17));
  console.log('Dividends 17 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 18));
  console.log('Dividends 18 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 19));
  console.log('Dividends 19 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 20));
  console.log('Dividends 20 Month', web3.utils.fromWei((res*100).toString(),'ether'));    
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 21));
  console.log('Dividends 21 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 22));
  console.log('Dividends 22 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 23));
  console.log('Dividends 23 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 24));
  console.log('Dividends 24 Month', web3.utils.fromWei((res*100).toString(),'ether'));
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 25));
  console.log('Dividends 25 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 26));
  console.log('Dividends 26 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 27));
  console.log('Dividends 27 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 28));
  console.log('Dividends 28 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 29));
  console.log('Dividends 29 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 30));
  console.log('Dividends 30 Month', web3.utils.fromWei((res*100).toString(),'ether')); 
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 31));
  console.log('Dividends 31 Month', web3.utils.fromWei((res*100).toString(),'ether'));       
  res = await stakeFarm.debugCurve(web3.utils.toWei('1'), timestamp - (ONE_MONTH_IN_SECONDS * 32));
  console.log('Dividends 32 Month', web3.utils.fromWei((res*100).toString(),'ether'));
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};
