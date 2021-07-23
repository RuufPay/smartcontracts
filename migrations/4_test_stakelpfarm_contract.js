const HomeCoin = artifacts.require("./HomeCoin");
const ERC20LPToken = artifacts.require("./ERC20LPToken");
const RuufGovernanceToken = artifacts.require("./RuufGovernanceToken");
const StakeLPFarm = artifacts.require("./StakeLPFarm");

async function doDeploy(deployer, network, accounts) {
    await deployer.deploy(ERC20LPToken);
    let lpToken = await ERC20LPToken.deployed();
    console.log('ERC20LPToken deployed:', lpToken.address);

    let token = await HomeCoin.deployed();
    let ruufGovernanceToken = await RuufGovernanceToken.deployed();
    let stakeLPFarm = await StakeLPFarm.deployed();

    // 1. Create LPs for testing
    await createLPsForUsers(lpToken, accounts);

    // 2. Initialize LP farm
    await initializeLPFarm(lpToken, ruufGovernanceToken, stakeLPFarm, accounts);

    // 3. Users needs to approve the farm to get their LP tokens.
    await approveAndStakeLPs(lpToken, stakeLPFarm, accounts);

    // 4. Run and test the LPFarm
    await runFarm(token, stakeLPFarm, accounts);
}

async function createLPsForUsers(lpToken, accounts) {
    // Mint test LPs
    await lpToken.mint(accounts[0], web3.utils.toWei('100'));
    await lpToken.mint(accounts[1], web3.utils.toWei('25'));
    await lpToken.mint(accounts[2], web3.utils.toWei('500'));
    await lpToken.mint(accounts[3], web3.utils.toWei('5'));
    console.log('LP Token minted');
}

async function initializeLPFarm(lpToken, ruufGovernanceToken, stakeLPFarm, accounts) {
    // Get the current block
    const currentBlock = await web3.eth.getBlockNumber();
    // Calculate the block number when the farm will start to get rewards
    let startBlock = currentBlock + 11;
    // It's mandatory to approve the LPFarm in the RGT token. Otherwise the farm doesn't have any permissions to get the reward tokens
    await ruufGovernanceToken.approve(stakeLPFarm.address, web3.utils.toWei('1000000'), { from: accounts[0] });
    console.log('Farm spending tokens approved');
    // Set rewards per block, the initial block and the total amount of rewards
    let txFarm = await stakeLPFarm.initialSetup(web3.utils.toWei('100'), startBlock, web3.utils.toWei('1000000'));
    console.log('BlockNumber Farm init: ', txFarm.receipt.blockNumber);
    console.log('BlockNumber StartBlock farming: ', startBlock);
    console.log('Farm initialized');
    // Setup the Uniswap LP token in the farm (important, don't setup any other token or change parameters)
    await stakeLPFarm.add(1, lpToken.address, false);
    console.log('Farm LP token configured');
}

async function approveAndStakeLPs(lpToken, stakeLPFarm, accounts) {
    // Users approve the lpFarm to get their tokens
    await lpToken.approve(stakeLPFarm.address, web3.utils.toWei('100'), { from: accounts[0] });
    await lpToken.approve(stakeLPFarm.address, web3.utils.toWei('25'), { from: accounts[1] });
    await lpToken.approve(stakeLPFarm.address, web3.utils.toWei('500'), { from: accounts[2] });
    await lpToken.approve(stakeLPFarm.address, web3.utils.toWei('5'), { from: accounts[3] });
    console.log('Users approve LPs in the farm');

    // Users stake their LP in the LPFarm
    await stakeLPFarm.deposit(0, web3.utils.toWei('100'), { from: accounts[0] });
    console.log('User 1 deposits 100 LPs');
    await stakeLPFarm.deposit(0, web3.utils.toWei('25'), { from: accounts[1] });
    console.log('User 2 deposits 25 LPs');
    await stakeLPFarm.deposit(0, web3.utils.toWei('500'), { from: accounts[2] });
    console.log('User 3 deposits 500 LPs');
    await stakeLPFarm.deposit(0, web3.utils.toWei('5'), { from: accounts[3] });
    console.log('User 4 deposits 5 LPs');
}

async function runFarm(token, stakeLPFarm, accounts) {
    for (let i=0; i<20;i++) {
        let tx = await token.transfer(accounts[5],1);   // Just for testing in local. Ganache increase the blocknumber after each transaction
        console.log('BlockNumber: ', tx.receipt.blockNumber);
        console.log('--------------------------------');

        console.log('STAKED LPs IN FARM:')
        let balanceLP = await stakeLPFarm.deposited(0, accounts[0]);
        console.log('- USER 1:', web3.utils.fromWei(balanceLP.toString(),'ether'));
        balanceLP = await stakeLPFarm.deposited(0, accounts[1]);
        console.log('- USER 2:', web3.utils.fromWei(balanceLP.toString(),'ether'));
        balanceLP = await stakeLPFarm.deposited(0, accounts[2]);
        console.log('- USER 3:', web3.utils.fromWei(balanceLP.toString(),'ether'));
        balanceLP = await stakeLPFarm.deposited(0, accounts[3]);
        console.log('- USER 4:', web3.utils.fromWei(balanceLP.toString(),'ether'));

        let totalPending = await stakeLPFarm.totalPending();
        console.log('TOTAL REWARDS PENDING TO CLAIM IN FARM: ', web3.utils.fromWei(totalPending.toString(),'ether'));

        console.log('REWARDS PER USER:')
        let pendingTokens = await stakeLPFarm.pending(0, accounts[0]);
        console.log('- USER 1:', web3.utils.fromWei(pendingTokens.toString(),'ether'));
        pendingTokens = await stakeLPFarm.pending(0, accounts[1]);
        console.log('- USER 2:', web3.utils.fromWei(pendingTokens.toString(),'ether'));
        pendingTokens = await stakeLPFarm.pending(0, accounts[2]);
        console.log('- USER 3:', web3.utils.fromWei(pendingTokens.toString(),'ether'));
        pendingTokens = await stakeLPFarm.pending(0, accounts[3]);
        console.log('- USER 4:', web3.utils.fromWei(pendingTokens.toString(),'ether'));
    }
}


module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
      await doDeploy(deployer, network, accounts);
  });
};
