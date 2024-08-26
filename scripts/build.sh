#!/bin/bash

# Set the build directory
BUILD_DIR="build"

# Set the source directory
SRC_DIR="src"

# Set the TypeScript compiler options
TSC_OPTIONS="-p $SRC_DIR --outDir $BUILD_DIR --target es6 --moduleResolution node --esModuleInterop --allowSyntheticDefaultImports"

# Clean the build directory
echo "Cleaning build directory..."
rm -rf $BUILD_DIR

# Compile the TypeScript code
echo "Compiling TypeScript code..."
npx tsc $TSC_OPTIONS

# Copy static assets
echo "Copying static assets..."
cp -r $SRC_DIR/assets $BUILD_DIR/assets

# Create a production-ready build
echo "Creating production-ready build..."
npx webpack --config webpack.config.js --mode production

# Output a success message
echo "Build complete!"
