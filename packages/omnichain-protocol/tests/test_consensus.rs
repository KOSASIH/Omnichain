// Consensus tests

use super::consensus;
use std::collections::HashMap;

#[test]
fn test_pow_consensus() {
    let mut consensus = consensus::Consensus::new(consensus::ConsensusAlgorithm::PoW);
    let node1 = consensus::Node {
        node_id: "node1".to_string(),
        address: "127.0.0.1:8080".to_string(),
        timestamp: 1643723400,
    };
    let node2 = consensus::Node {
        node_id: "node2".to_string(),
        address: "127.0.0.1:8081".to_string(),
        timestamp: 1643723401,
    };

    consensus.add_node(node1.clone());
    consensus.add_node(node2.clone());

    let block = consensus::Block {
        block_id: "block1".to_string(),
        transactions: vec![],
        timestamp: 1643723400,
    };

    consensus.propose_block(block.clone());

    let mut votes: HashMap<String, consensus::Vote> = HashMap::new();
    votes.insert("node1".to_string(), consensus::Vote {
        vote_id: "vote1".to_string(),
        node_id: "node1".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723400,
    });
    votes.insert("node2".to_string(), consensus::Vote {
        vote_id: "vote2".to_string(),
        node_id: "node2".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723401,
    });

    consensus.vote_on_block(votes);

    assert_eq!(consensus.finalize_block(), true);
}

#[test]
fn test_pos_consensus() {
    let mut consensus = consensus::Consensus::new(consensus::ConsensusAlgorithm::PoS);
    let node1 = consensus::Node {
        node_id: "node1".to_string(),
        address: "127.0.0.1:8080".to_string(),
        timestamp: 1643723400,
    };
    let node2 = consensus::Node {
        node_id: "node2".to_string(),
        address: "127.0.0.1:8081".to_string(),
        timestamp: 1643723401,
    };

    consensus.add_node(node1.clone());
    consensus.add_node(node2.clone());

    let block = consensus::Block {
        block_id: "block1".to_string(),
        transactions: vec![],
        timestamp: 1643723400,
    };

    consensus.propose_block(block.clone());

    let mut votes: HashMap<String, consensus::Vote> = HashMap::new();
    votes.insert("node1".to_string(), consensus::Vote {
        vote_id: "vote1".to_string(),
        node_id: "node1".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723400,
    });
    votes.insert("node2".to_string(), consensus::Vote {
        vote_id: "vote2".to_string(),
        node_id: "node2".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723401,
    });

    consensus.vote_on_block(votes);

    assert_eq!(consensus.finalize_block(), true);
}

#[test]
fn test_pbft_consensus() {
    let mut consensus = consensus::Consensus::new(consensus::ConsensusAlgorithm::PBFT);
    let node1 = consensus::Node {
        node_id: "node1".to_string(),
        address: "127.0.0.1:8080".to_string(),
        timestamp: 1643723400,
    };
    let node2 = consensus::Node {
        node_id: "node2".to_string(),
        address: "127.0.0.1:8081".to_string(),
        timestamp: 1643723401,
    };
    let node3 = consensus::Node {
        node_id: "node3".to_string(),
        address: "127.0.0.1:8082".to_string(),
        timestamp: 1643723402,
    };

    consensus.add_node(node1.clone());
    consensus.add_node(node2.clone());
    consensus.add_node(node3.clone());

    let block = consensus::Block {
        block_id: "block1".to_string(),
        transactions: vec![],
        timestamp: 1643723400,
    };

    consensus.propose_block(block.clone());

    let mut votes: HashMap<String, consensus::Vote> = HashMap::new();
    votes.insert("node1".to_string(), consensus::Vote {
        vote_id: "vote1".to_string(),
        node_id: "node1".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723400,
    });
    votes.insert("node2".to_string(), consensus::Vote {
        vote_id: "vote2".to_string(),
        node_id: "node2".to_string(),
        block_id: "block1".to_string(),
        timestamp: 1643723401,
    });
    votes.insert("node3".to_string(), consensus::Vote {
        vote
