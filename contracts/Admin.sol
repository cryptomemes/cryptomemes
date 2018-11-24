pragma solidity ^0.4.24;

contract Admin {
    address owner = msg.sender;
    mapping (address => bool) admins;
    
    constructor() public {
        admins[0x0a727d92742cc4044B1b65a20b8dCDA88cCc7462] = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender] == true);
        _;
    }
    
}