const RuufCoin = artifacts.require("./RuufCoin");
const StakeFarm = artifacts.require("./StakeFarm");
const Airdrop = artifacts.require("./Airdrop");

async function doDeploy(deployer, network, accounts) {

  let ruufCoin = await RuufCoin.deployed();
  let stakeFarm = await StakeFarm.deployed();
  let airdrop = await Airdrop.deployed();

  console.log('start');
  await ruufCoin.transfer('0x4660dcDBdCF4b5CbAe20670364c888d63aD49e62', web3.utils.toWei('1200000'));
  console.log('finished');

/*
  const airdrop_users = [
    '0x8a64ea5b1ce910cbf8e7955c41749b1b75f6328e',
    '0x168eb7d35e5c28eea9d96e748a391f74215a5725',
    '0x9619bcf6f34dcd2b0436e2a0548324ab1e4f1d52',
    '0xe08117c2dd702dff5e541f733ad7280e32f80c15',
    '0xd70f20da714e485100235c0ce44938e33c2913c8',
    '0xbf05861b01631da359be5e8bc54d6e11a5159924',
    '0x7368d08c1aacc2807f4c60a4f119ac7344540fab',
    '0x428e4e5d52f072497fbd0feaf578664333290866',
    '0x92c6569865565c907b3b98f9905dbf3a04771264',
    '0xfc924ff622817de6e1920e356be7884f9c491956',
    '0x4d12b655236ad1aab68b3b86eb93d6581ba0c171',
    '0x21dd5c13925407e5bcec3f27ab11a355a9dafbe3',
    '0xf75d2c38eb3f17a8acbf2eaa7d6c456eeec4c621',
    '0x7213f954202c65b1a5bfa69cc9282e21941f1195',
    '0x6534bce67c9f1ed21cd1d1554e97962002124641',
    '0xeb72a255a65dd539bc217bc6a0e3739facd91158',
    '0xc5ddba86109f81aa0aab8b8f0a90bc476e89af49',
    '0x345b1eef91d46516686a3bf4973af96134c3811c',
    '0xafed70e4ba4d8f70c36ffa50211975097f8cc1f3',
    '0xa659481fac5cc1ede466282cda90c6958396093e',
    '0xcb05437846b81512487042ecfda74e357a46e2e2',
    '0x2747710b50d0c0bd0b6ea9c184e8f050794dee43',
    '0xa38998e95a18389fe9b2e04605ac3b074c6106e0',
    '0x4f7e36d4d3e7a6d77f862f110d09f59e30ced2fa',
    '0xc9e303b76e26ff39803a5babf91f6672b4edf0ab',
    '0xb1293dca339f9d3f4dba8cbf6902c1b895773886',
    '0x2b3103fb2f63430f4a0bcca82678968079296dcd',
    '0x270b6a7b5626d7f6b0b74dc3b005da1fcd63b1a4',
    '0x0569723208d214adfc6e1ac176c94bc315d2b22f',
    '0xe5cde0de4e1d15a2483537b75b5fd7db4cecb2a9',
    '0xf4ce572eb5f0c17ccccfb12a846060a6d27a7aff',
    '0x95e8acbb6df803e41b0e01f76d4985ce7d11480e',
    '0x149f1b247763f36183c4309e13164a7711e5a99f',
    '0x4c60eff5fa568791748e5e2e99dc21b6fe8c1482',
    '0x881248f9b35fce96bb65364fde58f2cef542041f',
    '0xa381ba648516f35c85e0ed3e18ac677ea4561710',
    '0xfe37cc883def8ad881f941d7e587e0dc0d3a2f1c',
    '0x317764e69320d2e90bdd1d21da64e829f22c490e',
    '0x9b3ccc8afaa34a81826819f41d68c3e0dc7750d0',
    '0x8a5e70d9af4611ef2739f66d9b190a9aeb39035a',
    '0x07ceeb9855342b5873abacc7422e0e4ccb1450eb',
    '0x70123f7db655afefc5f6fb8c8d3a387a92239415',
    '0xd6924d57ecd76dff6d318718d4792670a4232257',
    '0xb3dd77bb326df31c67389138605fd57c84f04bbd',
    '0x87d0253a3b1a74f7bf0f6b8a1fe909ddfd821ea0',
    '0x97cfa959a8cfce2f07e497eb90045731de1ea555',
    '0x4c3ee50652f2a41d7e59525dab872290f5cd0ea9',
    '0x096ced2e877049c2bd5d3369136d8a4bcc7fadb6',
    '0xe384eb7c74f4486fdce6244eb79876652c2b4114',
    '0xfbf1f129e98feea69083f08d91733e0dc8352f16',
    '0xc786af70058d7cc2565c710f7865c1f0a7b2982f',
    '0xfa686beeed34ec6bba48a6d82d346708c606a2db',
    '0x6cbb16a8dffd512f6ad1216863eb09d7575cd446',
    '0xe3b52b690d0722b7c8165e69d44cf110c20996af',
    '0xb85c7315a0f2a260ba976201049e4c3e47f5ae36',
    '0x7eba0281e8af4deb9735a6a67f2a14c3ceae16fe',
    '0x577449f79abdf588a26cbd71071f18aa90b99567',
    '0x1ccdbf6ed01565700df177e2f83d75146b3cc6b5',
    '0x7199ff1a45d4bf32ec689fb6c3d847c38b550d5e',
    '0xa01bca1b6faa4c2a8df6679dbf4fdbfab1967dff',
    '0xadc6074075dac6bdf0154466d51adcbe1da0f1b8',
    '0xf5612468a590f539facd57045bf2d302414bcd2b',
    '0xcc5f4b7d28e71122f14328d1a1b3e1a8879efe93',
    '0x3bd39751e6007d90d7ac6cec16041bfa5b44683f',
    '0xb6fdebcbe316fd6e299fd96153a651babf7cf760',
    '0xf1b405015ab7924a11b372ad8caf040e6097f5f9',
    '0x5256bae226b9450d12d57431d22c34bebcccb136',
    '0x819a123c8e45d14ac944d25179d6f003c79ffc08',
    '0xe64cae13c367f75d30eada5b9d75179233aac554',
    '0x1289fe191ad6cf57a79ecfc023a80d7c8db6fbcf',
    '0xcf98c7f7569daa2d64402a7e4c9c69bf468addb3',
    '0x815f71d65a5c18e9d991bf382b67e20d517040c3',
    '0xb85d831c4fe5ee109f0a445f6c11e9562abc9e24',
    '0x5df18e79f8a32ca7883f1d5819e8468eea18d731',
    '0x59368d5e1956df7d540e7f691309a84d4022f117',
    '0xd4d86659b37a1cdebc10fdcc3540266ec26a7219',
    '0x11ededebf63bef0ea2d2d071bdf88f71543ec6fb',
    '0xaefb94e89b86552baacf3aa73a962603beb59583',
    '0x20f62816939edf62e3d748b95dcf4700af518398',
    '0x55f76a6280e5471b87d66e85ae7f0a998ef48b15',
    '0xe674daa1b52b6ebe9f158ce98af8d53d6a16b743',
    '0xc90cdf45b0aa59dbf2712204b9c5248be74244cf',
    '0x68404bbfae79b6729f5724de5272e42b7671c645',
    '0x80271556d5de0cd99299a50fd2a6d561e5717053',
    '0x4c37743660deab631b12b25e616a0d84690cd4da',
    '0x42e43E9dbE64deCAbF4ac88F0b7E76d5187d0Adc' 
  ];

const airdrop_balances = [
  web3.utils.toWei('4000000') * 1.01,
  web3.utils.toWei('3311233.91203704') * 1.01,
  web3.utils.toWei('3000000') * 1.01,
  web3.utils.toWei('3000000') * 1.01,
  web3.utils.toWei('2700000') * 1.01,
  web3.utils.toWei('2500000') * 1.01,
  web3.utils.toWei('1200000') * 1.01,
  web3.utils.toWei('300000') * 1.01,
  web3.utils.toWei('222207.142676979') * 1.01,
  web3.utils.toWei('150000') * 1.01,
  web3.utils.toWei('112478') * 1.01,
  web3.utils.toWei('58548.4292954') * 1.01,
  web3.utils.toWei('54153.4484535387') * 1.01,
  web3.utils.toWei('51717.0802418049') * 1.01,
  web3.utils.toWei('49946.7427009985') * 1.01,
  web3.utils.toWei('46955.0140136448') * 1.01,
  web3.utils.toWei('36427.2668351761') * 1.01,
  web3.utils.toWei('24894.2946257865') * 1.01,
  web3.utils.toWei('23702.6225334783') * 1.01,
  web3.utils.toWei('20577.5824321595') * 1.01,
  web3.utils.toWei('20489.7153001018') * 1.01,
  web3.utils.toWei('18925.4358449966') * 1.01,
  web3.utils.toWei('12596.7121348744') * 1.01,
  web3.utils.toWei('12538.3794715135') * 1.01,
  web3.utils.toWei('12051.2584110031') * 1.01,
  web3.utils.toWei('11772.6628099797') * 1.01,
  web3.utils.toWei('10266.6833951499') * 1.01,
  web3.utils.toWei('10036.8113391151') * 1.01,
  web3.utils.toWei('9935.39201426463') * 1.01,
  web3.utils.toWei('9187.53149879284') * 1.01,
  web3.utils.toWei('9064.45701097219') * 1.01,
  web3.utils.toWei('8642.76326904182') * 1.01,
  web3.utils.toWei('6582.90924959227') * 1.01,
  web3.utils.toWei('6471.73999043783') * 1.01,
  web3.utils.toWei('6316.11103806819') * 1.01,
  web3.utils.toWei('5965.33447506487') * 1.01,
  web3.utils.toWei('5826.98647538756') * 1.01,
  web3.utils.toWei('5099.4479211095') * 1.01,
  web3.utils.toWei('4897') * 1.01,
  web3.utils.toWei('4192.3288104439') * 1.01,
  web3.utils.toWei('3919.97946059071') * 1.01,
  web3.utils.toWei('3903.94285927642') * 1.01,
  web3.utils.toWei('3800') * 1.01,
  web3.utils.toWei('3676.02698943785') * 1.01,
  web3.utils.toWei('3500') * 1.01,
  web3.utils.toWei('3411.33625893641') * 1.01,
  web3.utils.toWei('3343.89010863474') * 1.01,
  web3.utils.toWei('3114.02242521002') * 1.01,
  web3.utils.toWei('2347') * 1.01,
  web3.utils.toWei('1995.26175775784') * 1.01,
  web3.utils.toWei('1954.46620598461') * 1.01,
  web3.utils.toWei('1808.92318773824') * 1.01,
  web3.utils.toWei('1676.25559961325') * 1.01,
  web3.utils.toWei('1445.36237625377') * 1.01,
  web3.utils.toWei('1342.69497415658') * 1.01,
  web3.utils.toWei('1274.58137426905') * 1.01,
  web3.utils.toWei('1256.76093246954') * 1.01,
  web3.utils.toWei('1118.7348865387') * 1.01,
  web3.utils.toWei('900') * 1.01,
  web3.utils.toWei('800') * 1.01,
  web3.utils.toWei('410.435096486984') * 1.01,
  web3.utils.toWei('407.54577762575') * 1.01,
  web3.utils.toWei('387.436457560286') * 1.01,
  web3.utils.toWei('328.565288869937') * 1.01,
  web3.utils.toWei('293.260321082138') * 1.01,
  web3.utils.toWei('248.594645999303') * 1.01,
  web3.utils.toWei('246.290907693451') * 1.01,
  web3.utils.toWei('203.931724837779') * 1.01,
  web3.utils.toWei('150') * 1.01,
  web3.utils.toWei('117.500516390976') * 1.01,
  web3.utils.toWei('108.544363827284') * 1.01,
  web3.utils.toWei('101.319204363228') * 1.01,
  web3.utils.toWei('100') * 1.01,
  web3.utils.toWei('49.3226844062997') * 1.01,
  web3.utils.toWei('47.864058027998') * 1.01,
  web3.utils.toWei('45.9638099590242') * 1.01,
  web3.utils.toWei('43.75') * 1.01,
  web3.utils.toWei('43.4575169212362') * 1.01,
  web3.utils.toWei('42.1442065298782') * 1.01,
  web3.utils.toWei('40.5405949294565') * 1.01,
  web3.utils.toWei('40.530924944778') * 1.01,
  web3.utils.toWei('40.5212584212323') * 1.01,
  web3.utils.toWei('38.2938599053042') * 1.01,
  web3.utils.toWei('18.4351371399576') * 1.01,
  web3.utils.toWei('10.0636374593976') * 1.01,
  web3.utils.toWei('10.0636374593976') * 1.01,
  web3.utils.toWei('500000')
];

  console.log(airdrop_balances);

  console.log('start airdrop');
  //const x = await airdrop.distribute(airdrop_users, airdrop_balances);
  console.log(x.logs);
  */
}

async function waitBlocks(ruufCoin, accounts) {
    // Just to execute in local with Ganache. Force to increase the blocknumber
    await ruufCoin.transfer(accounts[1], web3.utils.toWei('1'));
    await ruufCoin.transfer(accounts[2], web3.utils.toWei('1'));
    await ruufCoin.transfer(accounts[3], web3.utils.toWei('1'));
    await ruufCoin.transfer(accounts[4], web3.utils.toWei('1'));
    await ruufCoin.transfer(accounts[5], web3.utils.toWei('1'));
}

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};

