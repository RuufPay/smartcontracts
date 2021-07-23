// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract HomeCoin is ERC20 {

    constructor() ERC20("HomeCoin", "HOME") {
        // Fix supply: 1.000.000.000 tokens
        _mint(msg.sender, 1000000000 * 10 ** 18);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
