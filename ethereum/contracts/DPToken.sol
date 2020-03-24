pragma solidity ^0.4.17;
import "./ERC_20.sol";
contract DPToken is ERC_20 {

    string public name;
    uint8 public decimals;
    string public symbol;
    string public version = 'R1.0';
    address owner;
    function DPToken() public{
        name = "DP_TOKEN";
        owner = tx.origin;
        decimals = 0;
        totalSupply = 1000000;
        balance[tx.origin] = 1000000;
        symbol = "DPT";
    }

    function getTokenFromOwner(uint256 value) public{
        balance[tx.origin] += value;
        balance[owner] -=value;
    }
    
}