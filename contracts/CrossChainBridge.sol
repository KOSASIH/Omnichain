pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract CrossChainBridge {
    using SafeERC20 for address;
    using SafeMath for uint256;

    // Mapping of user addresses to their locked balances
    mapping (address => uint256) public lockedBalances;

    // Mapping of user addresses to their unlocked balances
    mapping (address => uint256) public unlockedBalances;

    // Event emitted when a user locks tokens
    event Lock(address indexed user, uint256 value);

    // Event emitted when a user unlocks tokens
    event Unlock(address indexed user, uint256 value);

    // Function to lock tokens
    function lock(uint256 value) public {
        require(Omnichain(balances[msg.sender]) >= value, "Insufficient balance");
        lockedBalances[msg.sender] = lockedBalances[msg.sender].add(value);
        Omnichain(balances[msg.sender]).transferFrom(msg.sender, address(this), value);
        emit Lock(msg.sender, value);
    }

    // Function to unlock tokens
    function unlock(uint256 value) public {
        require(lockedBalances[msg.sender] >= value, "Insufficient locked balance");
        unlockedBalances[msg.sender] = unlockedBalances[msg.sender].add(value);
        Omnichain(balances[msg.sender]).transfer(msg.sender, value);
        emit Unlock(msg.sender, value);
    }
}
