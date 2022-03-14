const RuufCoin = artifacts.require("./RuufCoin.sol");
const RuufStakeFarm = artifacts.require("./RuufStakeFarm.sol");

const BN = web3.utils.BN;
const { promisify } = require('util');

// Returns the time of the last mined block in seconds
async function latest () {
    const block = await web3.eth.getBlock('latest');
    return new BN(block.timestamp);
  }

function advanceBlock () {
    return promisify(web3.currentProvider.send.bind(web3.currentProvider))({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: new Date().getTime(),
    });
  }

// Increases ganache time by the passed duration in seconds
async function increase (duration) {
    if (!BN.isBN(duration)) {
      duration = new BN(duration);
    }
  
    if (duration.isNeg()) throw Error(`Cannot increase time by a negative amount (${duration})`);
  
    await promisify(web3.currentProvider.send.bind(web3.currentProvider))({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration.toNumber()],
      id: new Date().getTime(),
    });
  
    await advanceBlock();
}

async function increaseTo (target) {
    if (!BN.isBN(target)) {
      target = new BN(target);
    }
  
    const now = (await latest());
  
    if (target.lt(now)) throw Error(`Cannot increase current time (${now}) to a moment in the past (${target})`);
    const diff = target.sub(now);
    return increase(diff);
}

async function doDeploy(deployer, network, accounts) {

    let token = await RuufCoin.deployed();
    console.log('RuufCoin deployed:', token.address);

    let stakeFarm = await RuufStakeFarm.deployed();
    console.log('RuufStakeFarm deployed:', stakeFarm.address);

    //await token.transfer(accounts[1], web3.utils.toWei('1000000'));

    await token.approve(stakeFarm.address, web3.utils.toWei('1000000'), {from: accounts[0]});

    await stakeFarm.stake(web3.utils.toWei('100000'), 9, {from: accounts[0]});
    //await stakeFarm.withdraw({from: accounts[0]});

    let now = 1647352974;   // 2022/03/14 00:00:00
    for (let i=0; i<365; i++) { // 365 days loop
        console.log('Test datetime: ', new Date(now * 1000).toISOString());
        await increaseTo(now);
        try {
            console.log(i);
            if (i == 300) {
                const userData = await stakeFarm.getUserData(accounts[0]);
                console.log('homeTokens',web3.utils.fromWei(userData.homeTokens,'ether'));
                console.log('stakeDate',userData.stakeDate.toString());
                console.log('pendingRewards',web3.utils.fromWei(userData.pendingRewards,'ether'));
                console.log('multiplier',userData.multiplier.toString());
                console.log('months',userData.months.toString());
                console.log('untilRewards',userData.untilRewards.toString());
                console.log('finalIr',userData.finalIr.toString());

                console.log('WITHDRAW');
                await stakeFarm.withdraw(accounts[0]);

                let balance2 = await token.balanceOf(accounts[0]);
                console.log(web3.utils.fromWei(balance2,"ether"));
                break;
            }
        } catch(e) {
            console.log('ERROR: ', e.toString());
        }

        now += 86400;
    }
}

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};