pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string name) public {
        address newCampaign = new Campaign(minimum, name, msg.sender); // returns an address
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}   

contract Token {

    /// @return total amount of tokens
    function totalSupply() constant returns (uint256 supply) {}

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance) {}

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success) {}

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) returns (bool success) {}

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}

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

contract DonatePlusTokens is ERC_20 {

    string public name;
    uint8 public decimals;
    string public symbol;
    string public version = 'R1.0';
    address owner;
    function DonatePlusTokens() public{
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

contract Campaign is DonatePlusTokens{
    // Does not create an instance of a request
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; // Count of approvals
        mapping(address => bool) approvals; // People who have approved this
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string public name;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, string reason , address creator) public {
        require(minimum > 0);
        manager = creator;
        minimumContribution = minimum;
        name = reason;
    }

    function contribute(uint value) public {
        require(value > minimumContribution);
        ERC_20.transferFrom(msg.sender, address(this), value);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function getBalance() public view returns (uint) {
        address myAddress = this;
        return  ERC_20.balanceOf(myAddress);
    }
     function getAccountBalance(address myAddress) public view returns (uint) {
        return  ERC_20.balanceOf(myAddress);
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        // create instance of struct "Request"
        // Created via memory over storage
        // Only have to initialize value types
        // No need to initialize mapping types (mapping)
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]); // requiring he is an approver
        require(!request.approvals[msg.sender]); // Check if approver has already approved.

        request.approvals[msg.sender] = true; // Add approver as voted.
        request.approvalCount++; // increase the count;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require( ERC_20.balanceOf(address(this)) > request.value);

        require(request.approvalCount > (approversCount / 2)); // Greater than 50% must approve before release
        require(!request.complete);
        
        ERC_20.transferFrom(address(this),request.recipient,request.value);
        request.complete = true;
    }

      function getSummary() public view returns(uint , uint, uint, uint, address, string){
        return (
            minimumContribution,
            //this.balance,
             ERC_20.balanceOf(address(this)),
            requests.length,
            approversCount,
            manager,
            name
            );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}