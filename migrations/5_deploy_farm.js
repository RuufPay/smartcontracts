const HomeCoin = artifacts.require("./HomeCoin");
const StakeFarm = artifacts.require("./StakeFarm");

async function doDeploy(deployer, network, accounts) {

  console.log('Deployer account', accounts[0]);

  let homeCoin = await HomeCoin.at('0x3460fcA73f770932eA9FF80c2D3AfA2A6ab4a18e');
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




