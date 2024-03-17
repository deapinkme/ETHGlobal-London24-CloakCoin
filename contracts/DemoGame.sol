// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DemoGame {
    address public savedAddress;

    // Function to save an address
    function saveAddress(address _newAddress) public {
        savedAddress = _newAddress;
    }

    // Function to retrieve the saved address
    function getAddress() public view returns (address) {
        return savedAddress;
    }
}
