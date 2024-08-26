pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";

contract DecentralizedIdentity is Ownable {
    // Mapping of user addresses to their identity data
    mapping (address => Identity) public identities;

    // Event emitted when a user updates their identity data
    event UpdateIdentity(address indexed user, string data);

    // Struct to represent identity data
    struct Identity {
        string name;
        string email;
        string phoneNumber;
    }

    // Function to update identity data
    function updateIdentity(string memory data) public {
        Identity storage identity = identities[msg.sender];
        identity.name = data;
        emit UpdateIdentity(msg.sender, data);
    }

    // Function to get identity data
    function getIdentity(address user) public view returns (Identity memory) {
        return identities[user];
    }
}
