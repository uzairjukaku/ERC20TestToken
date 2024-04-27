// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OceanCoin is ERC20 {



// i am using openzepplin interface to develope my contract. it contain all the interfaces use to create a contract.
//  so we dont need to create a wheel from scratch

    address public owner;

    constructor() ERC20("OceanCoin", "OCC") {
        uint256 intialSupply = 1000000000;
        _mint(msg.sender, intialSupply * 10 ** decimals());
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can mint Token");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
