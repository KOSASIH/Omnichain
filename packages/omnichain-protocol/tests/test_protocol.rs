// Protocol tests

use super::protocol;
use serde_json;

#[test]
fn test_handshake_message() {
    let handshake = protocol::HandshakeMessage {
        version: 1,
        node_id: "node1".to_string(),
        timestamp: 1643723400,
    };

    let json = serde_json::to_string(&handshake).unwrap();
    assert_eq!(json, r#"{"version":1,"node_id":"node1","timestamp":1643723400}"#);

    let deserialized: protocol::HandshakeMessage = serde_json::from_str(&json).unwrap();
    assert_eq!(deserialized.version, 1);
    assert_eq!(deserialized.node_id, "node1");
    assert_eq!(deserialized.timestamp, 1643723400);
}

#[test]
fn test_transaction_message() {
    let transaction = protocol::TransactionMessage {
        transaction_id: "tx1".to_string(),
        sender: "node1".to_string(),
        recipient: "node2".to_string(),
        amount: 10,
        timestamp: 1643723400,
    };

    let json = serde_json::to_string(&transaction).unwrap();
    assert_eq!(json, r#"{"transaction_id":"tx1","sender":"node1","recipient":"node2","amount":10,"timestamp":1643723400}"#);

    let deserialized: protocol::TransactionMessage = serde_json::from_str(&json).unwrap();
    assert_eq!(deserialized.transaction_id, "tx1");
    assert_eq!(deserialized.sender, "node1");
    assert_eq!(deserialized.recipient, "node2");
    assert_eq!(deserialized.amount, 10);
    assert_eq!(deserialized.timestamp, 1643723400);
}

#[test]
fn test_block_message() {
    let block = protocol::BlockMessage {
        block_id: "block1".to_string(),
        transactions: vec![
            protocol::TransactionMessage {
                transaction_id: "tx1".to_string(),
                sender: "node1".to_string(),
                recipient: "node2".to_string(),
                amount: 10,
                timestamp: 1643723400,
            },
            protocol::TransactionMessage {
                transaction_id: "tx2".to_string(),
                sender: "node2".to_string(),
                recipient: "node3".to_string(),
                amount: 20,
                timestamp: 1643723401,
            },
        ],
        timestamp: 1643723400,
    };

    let json = serde_json::to_string(&block).unwrap();
    assert_eq!(json, r#"{"block_id":"block1","transactions":[{"transaction_id":"tx1","sender":"node1","recipient":"node2","amount":10,"timestamp":1643723400},{"transaction_id":"tx2","sender":"node2","recipient":"node3","amount":20,"timestamp":1643723401}],"timestamp":1643723400}"#);

    let deserialized: protocol::BlockMessage = serde_json::from_str(&json).unwrap();
    assert_eq!(deserialized.block_id, "block1");
    assert_eq!(deserialized.transactions.len(), 2);
    assert_eq!(deserialized.timestamp, 1643723400);
}

#[test]
fn test_vote_message() {
    let vote = protocol::VoteMessage {
        vote_id: "vote1".to_string(),
        node_id: "node1".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723400,
    };

    let json = serde_json::to_string(&vote).unwrap();
    assert_eq!(json, r#"{"vote_id":"vote1","node_id":"node1","block_id":"block1","timestamp":1643723400}"#);

    let deserialized: protocol::VoteMessage = serde_json::from_str(&json).unwrap();
    assert_eq!(deserialized.vote_id, "vote1");
    assert_eq!(deserialized.node_id, "node1");
    assert_eq!(deserialized.block_id, "block1");
    assert_eq!(deserialized.timestamp, 1643723400);
}
