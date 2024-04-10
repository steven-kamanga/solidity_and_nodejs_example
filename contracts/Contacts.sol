// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Contacts {
    uint public count = 0;

    struct Contact {
        uint id;
        string name;
        string phone;
    }

    mapping(uint => Contact) public contacts;

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
    }

    function getAllContacts() public view returns (Contact[] memory) {
        Contact[] memory allContacts = new Contact[](count);
        for (uint i = 1; i <= count; i++) {
            allContacts[i - 1] = contacts[i];
        }
        return allContacts;
    }
}
