const HomeCoin = artifacts.require("./HomeCoin");
const StakeFarm = artifacts.require("./StakeFarm");

async function doDeploy(deployer, network, accounts) {

  console.log('Deployer account', accounts[0]);

  let homeCoin = await HomeCoin.at('0xAF585c15daB8C363087c572758AC75E82C467579');
  console.log(homeCoin.address);
  
  await deployer.deploy(StakeFarm, homeCoin.address);
  let stakeFarm = await StakeFarm.deployed();
  console.log('StakeFarm deployed:', stakeFarm.address);
}


module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};




