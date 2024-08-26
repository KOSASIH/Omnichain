#!/bin/bash

# Set the test directory
TEST_DIR="test"

# Set the Jest configuration file
JEST_CONFIG="jest.config.js"

# Run the tests using Jest
echo "Running tests..."
npx jest --config $JEST_CONFIG

# Output a success message
echo "Tests complete!"
