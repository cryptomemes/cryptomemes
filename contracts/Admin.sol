pragma solidity ^0.4.24;

contract Admin {
    address owner = msg.sender;
    mapping (address => bool) admins;
    
    constructor() public {
        admins[0x07520d07ad25028695415a1f94a13ab0896466dd] = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender] == true || msg.sender == owner);
        _;
    }
    
}