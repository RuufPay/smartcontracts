// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "prb-math/contracts/PRBMathUD60x18.sol";

contract StakeFarm {
    using PRBMathUD60x18 for uint256;

    address immutable private homeToken;
    uint24 internal constant _SECONDS_IN_ONE_MONTH = 2592000;
    address private owner;

    struct UserStake {
        uint amount;
        uint stakeDate;
        uint rewards;
    }

    mapping(address => UserStake) private balances;

    event HomeTokenStaked(address _user, uint _amount);
    event Withdraw(address _user, uint _homeAmount, uint _rewardsAmount);
    event EmegercyWithdraw(address _user, uint _amount);

    constructor(address _homeToken) {
        homeToken = _homeToken;
        owner = msg.sender;
    }

    function stake(address _user, uint _amount) external {
        require(_amount > 0, "InvalidAmount");
        require(IERC20(homeToken).balanceOf(msg.sender) >= _amount, "NoEnoughTokens");

        if (balances[_user].amount == 0) {
            balances[_user] = UserStake({
                amount: _amount,
                stakeDate: block.timestamp,
                rewards: 0
            });
        } else {
            balances[_user].amount += _amount;
            balances[_user].rewards += _calculateRewards(_user);
            balances[_user].stakeDate = block.timestamp;
        }

        IERC20(homeToken).transferFrom(msg.sender, address(this), _amount);

        emit HomeTokenStaked(_user, _amount);
    }

    function withdraw() external {
        require(balances[msg.sender].stakeDate > 0, "NoStaked");
        uint256 rewards = balances[msg.sender].rewards + _calculateRewards(msg.sender);
        uint256 homes = balances[msg.sender].amount;

        delete balances[msg.sender];

        IERC20(homeToken).transfer(msg.sender, homes + rewards);

        emit Withdraw(msg.sender, homes, rewards);
    }

    function withdraw(address _user) external {
        require(msg.sender == owner, "BadOwner");
        require(balances[msg.sender].stakeDate > 0, "NoStaked");
        uint256 rewards = balances[_user].rewards + _calculateRewards(_user);
        uint256 homes = balances[_user].amount;

        delete balances[_user];

        IERC20(homeToken).transfer(_user, homes + rewards);

        emit Withdraw(_user, homes, rewards);
    }

    function emergencyWithdraw() external {
        require(msg.sender == owner, "BadOwner");
        
        uint256 balance = IERC20(homeToken).balanceOf(address(this));
        IERC20(homeToken).transfer(owner, balance);

        emit EmegercyWithdraw(owner, balance);
    }

    function changeOwner(address _owner) external {
        require(msg.sender == owner, "BadOwner");
        owner = _owner;
    }

    function getUserData(address _user) external view returns(uint256 homeTokens, uint256 pendingRewards, uint256 stakeDate, uint256 multiplier) {
        homeTokens = balances[_user].amount;
        pendingRewards = balances[_user].rewards + _calculateRewards(_user);
        stakeDate = balances[_user].stakeDate;
        multiplier = _calculateMultiplier(stakeDate);
    }

    function _calculateRewards(address _user) internal view returns(uint256) {
        uint256 amount = balances[_user].amount;
        uint256 multiplier = _calculateMultiplier(balances[_user].stakeDate);

        return amount.mul(multiplier);
    }

    function _calculateMultiplier(uint256 _stakeDate) internal view returns(uint256 multiplier) {
        uint256 one = 1;
        uint256 eight = 8;
        if ((block.timestamp - _stakeDate) / _SECONDS_IN_ONE_MONTH > 0) {
            uint256 secondsToCalculate = (block.timestamp - _stakeDate).div(_SECONDS_IN_ONE_MONTH);
            multiplier = eight.div(100).mul(secondsToCalculate.pow(one.div(3)));
            if (multiplier > 250000000000000000) multiplier = 250000000000000000;   // No more than 25% interest rate
        } else {
            uint256 maxOneMonth = 80000000000000000;    // Max for first month 8% interest
            uint256 secondsToCalculate = block.timestamp - _stakeDate;
            multiplier = secondsToCalculate.mul(maxOneMonth).div(_SECONDS_IN_ONE_MONTH);
        }

        assembly {
            let delta := mul(multiplier, 20)
            delta := div(delta, 100)
            multiplier := sub(multiplier, delta)
        }
    }
}
