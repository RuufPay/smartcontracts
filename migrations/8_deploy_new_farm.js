const RuufCoin = artifacts.require("./RuufCoin");
const RuufStakeFarm = artifacts.require("./RuufStakeFarm");

async function doDeploy(deployer, network, accounts) {

  await deployer.deploy(RuufCoin);
  let ruufCoin = await RuufCoin.deployed();
  console.log('RuufCoin deployed:', ruufCoin.address);

  await deployer.deploy(RuufStakeFarm, ruufCoin.address);
  let stakeFarm = await RuufStakeFarm.deployed();
  console.log('RuufStakeFarm deployed:', stakeFarm.address);

  await ruufCoin.transfer(stakeFarm.address, web3.utils.toWei('5000000'));
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};
