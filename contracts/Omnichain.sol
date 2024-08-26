pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Omnichain {
    using SafeERC20 for address;
    using SafeMath for uint256;

    // Mapping of user addresses to their balances
    mapping (address => uint256) public balances;

    // Mapping of user addresses to their allowances
    mapping (address => mapping (address => uint256)) public allowances;

    // Total supply of Omnichain tokens
    uint256 public totalSupply;

    // Event emitted when a user transfers tokens
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Event emitted when a user approves an allowance
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Constructor function
    constructor() public {
        totalSupply = 1000000000 * (10 ** 18); // 1 billion Omnichain tokens
        balances[msg.sender] = totalSupply;
    }

    // Function to transfer tokens
    function transfer(address to, uint256 value) public {
        require(balances[msg.sender] >= value, "Insufficient balance");
        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[to] = balances[to].add(value);
        emit Transfer(msg.sender, to, value);
    }

    // Function to approve an allowance
    function approve(address spender, uint256 value) public {
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
    }

    // Function to transfer tokens from one user to another
    function transferFrom(address from, address to, uint256 value) public {
        require(allowances[from][msg.sender] >= value, "Insufficient allowance");
        require(balances[from] >= value, "Insufficient balance");
        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);
        emit Transfer(from, to, value);
    }
}
