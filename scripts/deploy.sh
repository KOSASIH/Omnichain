#!/bin/bash

# Set the deployment directory
DEPLOY_DIR="deploy"

# Set the build directory
BUILD_DIR="build"

# Set the AWS S3 bucket name
AWS_S3_BUCKET="omnichain-deploy"

# Create the deployment directory
echo "Creating deployment directory..."
mkdir -p $DEPLOY_DIR

# Copy the build files to the deployment directory
echo "Copying build files to deployment directory..."
cp -r $BUILD_DIR/* $DEPLOY_DIR/

# Upload the deployment files to AWS S3
echo "Uploading deployment files to AWS S3..."
aws s3 cp $DEPLOY_DIR s3://$AWS_S3_BUCKET/ --recursive --exclude ".git/*"

# Output a success message
echo "Deployment complete!"
