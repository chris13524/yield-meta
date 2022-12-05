// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract YieldMeta {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(
            amount <= balances[msg.sender],
            "Account does not have enough balance"
        );
        balances[msg.sender] -= amount;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send");
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}
