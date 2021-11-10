const StakeFarm = artifacts.require("./StakeFarm");

async function doDeploy(deployer, network, accounts) {

    let stakeFarm = await StakeFarm.deployed();

    let userData1 = await stakeFarm.getUserData('0xe66d83Dd5C86E1ebA039eFa6912c8A5D3c6A93fE');
    console.log('UserData1 - HomeTokens:', web3.utils.fromWei(userData1.homeTokens.toString(),'ether'));
    console.log('UserData1 - PendingRewards:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));
    console.log('UserData1 - StakeDate (UnixTime seconds):', userData1.stakeDate.toString());
    console.log('UserData1 - Multiplier:', web3.utils.fromWei(userData1.multiplier.toString(),'ether'));

    let userData2 = await stakeFarm.getUserData('0xc652c5db0c2c94b3209d7e4f72beddfcd74de813');
    console.log('UserData2 - HomeTokens:', web3.utils.fromWei(userData2.homeTokens.toString(),'ether'));
    console.log('UserData2 - PendingRewards:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));
    console.log('UserData2 - StakeDate (UnixTime seconds):', userData2.stakeDate.toString());
    console.log('UserData2 - Multiplier:', web3.utils.fromWei(userData2.multiplier.toString(),'ether'));

    let userData3 = await stakeFarm.getUserData('0xd89586797932ad7e9625e3b10db530f03f8629cb');
    console.log('UserData3 - HomeTokens:', web3.utils.fromWei(userData3.homeTokens.toString(),'ether'));
    console.log('UserData3 - PendingRewards:', web3.utils.fromWei(userData3.pendingRewards.toString(),'ether'));
    console.log('UserData3 - StakeDate (UnixTime seconds):', userData3.stakeDate.toString());
    console.log('UserData3 - Multiplier:', web3.utils.fromWei(userData3.multiplier.toString(),'ether'));

    await stakeFarm.withdraw('0xe66d83Dd5C86E1ebA039eFa6912c8A5D3c6A93fE');
    await stakeFarm.withdraw('0xc652c5db0c2c94b3209d7e4f72beddfcd74de813');
    await stakeFarm.withdraw('0xd89586797932ad7e9625e3b10db530f03f8629cb');

    userData1 = await stakeFarm.getUserData('0xe66d83Dd5C86E1ebA039eFa6912c8A5D3c6A93fE');
    console.log('UserData1 - HomeTokens:', web3.utils.fromWei(userData1.homeTokens.toString(),'ether'));
    console.log('UserData1 - PendingRewards:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));
    console.log('UserData1 - StakeDate (UnixTime seconds):', userData1.stakeDate.toString());
    console.log('UserData1 - Multiplier:', web3.utils.fromWei(userData1.pendingRewards.toString(),'ether'));

    userData2 = await stakeFarm.getUserData('0xc652c5db0c2c94b3209d7e4f72beddfcd74de813');
    console.log('UserData2 - HomeTokens:', web3.utils.fromWei(userData2.homeTokens.toString(),'ether'));
    console.log('UserData2 - PendingRewards:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));
    console.log('UserData2 - StakeDate (UnixTime seconds):', userData2.stakeDate.toString());
    console.log('UserData2 - Multiplier:', web3.utils.fromWei(userData2.pendingRewards.toString(),'ether'));

    userData3 = await stakeFarm.getUserData('0xd89586797932ad7e9625e3b10db530f03f8629cb');
    console.log('UserData3 - HomeTokens:', web3.utils.fromWei(userData3.homeTokens.toString(),'ether'));
    console.log('UserData3 - PendingRewards:', web3.utils.fromWei(userData3.pendingRewards.toString(),'ether'));
    console.log('UserData3 - StakeDate (UnixTime seconds):', userData3.stakeDate.toString());
    console.log('UserData3 - Multiplier:', web3.utils.fromWei(userData3.pendingRewards.toString(),'ether'));
}

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};
