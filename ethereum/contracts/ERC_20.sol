pragma solidity ^0.4.17;
import "./Token.sol";
contract ERC_20 is Token{

    uint256 public totalSupply;

    mapping(address => uint256) balance;
    mapping(address => mapping(address => uint256)) allowed;

    function balanceOf(address _owner) constant public returns (uint256) {
        return balance[_owner];
    }
    function transfer(address _to, uint256 _value) public returns (bool success) {
        if(balance[tx.origin]>=_value&&_value>0){
            balance[tx.origin] -= _value;
            balance[_to] += _value;
            Transfer(tx.origin,_to,_value);
            return true;
        }
        return false;
    }

    function transferFrom(address _owner, address _to, uint256 _value) public returns (bool success){
        if((allowed[_owner][tx.origin]>=_value) ||_owner==tx.origin || _owner==address(this) &&_value>0){
            balance[_owner] -= _value;
            balance[_to] += _value;
            if(_owner!=tx.origin){
                allowed[_owner][tx.origin] -= _value;
            }

            Transfer(_owner,_to,_value);

            return true;
        }
        return false;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        if(balance[tx.origin]>=_value && _value>=0){
            allowed[tx.origin][_spender] = _value;
            Approval(tx.origin,_spender,_value);
            return true;
        }
        return false;
    }
    


    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

}