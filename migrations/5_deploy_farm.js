const RuufCoin = artifacts.require("./RuufCoin");
const StakeFarm = artifacts.require("./StakeFarm");

async function doDeploy(deployer, network, accounts) {

  console.log('RuufPay deployer account: ', accounts[0]);
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log('RuufPay deployer account balance:', web3.utils.fromWei(balance.toString()));

  let homeCoin = await HomeCoin.at('0xAF585c15daB8C363087c572758AC75E82C467579');
  console.log(homeCoin.address);
  
  await deployer.deploy(StakeFarm, homeCoin.address);
  let stakeFarm = await StakeFarm.deployed();
  console.log('StakeFarm deployed:', stakeFarm.address);

  const users = [
    '0xe66d83Dd5C86E1ebA039eFa6912c8A5D3c6A93fE',
    '0x890f0b3af9ce1d92b75ad7d1d89c9684b4544546',
    '0xf7a4e505ea00d5922b56a73bd5b10f501506fd40',
    '0xc652c5db0c2c94b3209d7e4f72beddfcd74de813',
    '0x76bc5bf1a5f43cff07cc082ae64714ef39340047',
    '0x21dd5c13925407e5bcec3f27ab11a355a9dafbe3',
    '0x168eb7d35e5c28eea9d96e748a391f74215a5725',
    '0x40bff4611a3c98699b7eddc8e48104580a16b09b',
    '0xd89586797932ad7e9625e3b10db530f03f8629cb'
  ];
  const amounts = [
    web3.utils.toWei('10000'),
    web3.utils.toWei('959.593588633638980685'),
    web3.utils.toWei('8431.626981741420037926'),
    web3.utils.toWei('79637'),
    web3.utils.toWei('8362.829924104868800684'),
    web3.utils.toWei('1455.5707046'),
    web3.utils.toWei('3300000'),
    web3.utils.toWei('2000000'),
    web3.utils.toWei('3003286.163297538318146746')
  ];
  const dates = [
    1630529680,
    1630604030,
    1633404942,
    1633539257,
    1633545036,
    1634270254,
    1634598659,
    1634677585,
    1634850690
  ];

  await stakeFarm.migrateInitialStake(users, amounts, dates);
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};

