const HomeCoin = artifacts.require("./HomeCoin");
const RuufGovernanceToken = artifacts.require("./RuufGovernanceToken");
const StakeFarm = artifacts.require("./StakeFarm");

async function doDeploy(deployer, network, accounts) {

  let homeCoin = await HomeCoin.deployed();
  let stakeFarm = await StakeFarm.deployed();

  // 1. Distribute tokens between users to test
  await homeCoin.transfer(accounts[1], web3.utils.toWei('10000000'));
  await homeCoin.transfer(accounts[2], web3.utils.toWei('20000000'));
  await homeCoin.transfer(accounts[3], web3.utils.toWei('30000000'));
  await homeCoin.transfer(accounts[4], web3.utils.toWei('40000000'));
  await homeCoin.transfer(accounts[5], web3.utils.toWei('50000000'));

  // 2. Stake tokens
  await homeCoin.approve(stakeFarm.address, web3.utils.toWei('10000000'), { from: accounts[1] });
  await homeCoin.approve(stakeFarm.address, web3.utils.toWei('20000000'), { from: accounts[2] });
  await stakeFarm.stake(accounts[1], web3.utils.toWei('10000000'), { from: accounts[1] });
  
  // 3. Just for testing in local.
  await waitBlocks(homeCoin, accounts);
  await waitBlocks(homeCoin, accounts);

  await stakeFarm.stake(accounts[2], web3.utils.toWei('20000000'), { from: accounts[2] });

  await waitBlocks(homeCoin, accounts);
  await waitBlocks(homeCoin, accounts);
  await waitBlocks(homeCoin, accounts);
  await waitBlocks(homeCoin, accounts);
}

async function waitBlocks(homeCoin, accounts) {
    // Just to execute in local with Ganache. Force to increase the blocknumber
    await homeCoin.transfer(accounts[1], web3.utils.toWei('1'));
    await homeCoin.transfer(accounts[2], web3.utils.toWei('1'));
    await homeCoin.transfer(accounts[3], web3.utils.toWei('1'));
    await homeCoin.transfer(accounts[4], web3.utils.toWei('1'));
    await homeCoin.transfer(accounts[5], web3.utils.toWei('1'));
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};

