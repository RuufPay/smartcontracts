const HomeCoin = artifacts.require("./HomeCoin");
const RuufGovernanceToken = artifacts.require("./RuufGovernanceToken");
const StakeFarm = artifacts.require("./StakeFarm");

async function doDeploy(deployer, network, accounts) {

    let stakeFarm = await StakeFarm.deployed();

    let farmData = await stakeFarm.getHomeTokenBalance();
    console.log('FarmData - HomeTokens', web3.utils.fromWei(farmData.toString(),'ether'));

    let userData1 = await stakeFarm.getUserData(accounts[1]);
    console.log('UserData1 - HomeTokens:', web3.utils.fromWei(userData1.homeTokens.toString(),'ether'));
    console.log('UserData1 - PendingRewards:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));
    console.log('UserData1 - StakeDate (UnixTime seconds):', userData1.stakeDate.toString());
    console.log('UserData1 - Multiplier:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));

    let userData2 = await stakeFarm.getUserData(accounts[2]);
    console.log('UserData2 - HomeTokens:', web3.utils.fromWei(userData2.homeTokens.toString(),'ether'));
    console.log('UserData2 - PendingRewards:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));
    console.log('UserData2 - StakeDate (UnixTime seconds):', userData2.stakeDate.toString());
    console.log('UserData2 - Multiplier:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));

    await stakeFarm.withdrawAll(accounts[1], {from: accounts[1]});
    await stakeFarm.withdrawAll(accounts[2], {from: accounts[2]});

    userData1 = await stakeFarm.getUserData(accounts[1]);
    console.log('UserData1 - HomeTokens:', web3.utils.fromWei(userData1.homeTokens.toString(),'ether'));
    console.log('UserData1 - PendingRewards:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));
    console.log('UserData1 - StakeDate (UnixTime seconds):', userData1.stakeDate.toString());
    console.log('UserData1 - Multiplier:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));

    userData2 = await stakeFarm.getUserData(accounts[2]);
    console.log('UserData2 - HomeTokens:', web3.utils.fromWei(userData2.homeTokens.toString(),'ether'));
    console.log('UserData2 - PendingRewards:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));
    console.log('UserData2 - StakeDate (UnixTime seconds):', userData2.stakeDate.toString());
    console.log('UserData2 - Multiplier:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));
}

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};
