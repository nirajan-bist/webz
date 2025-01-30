#!/bin/bash
set -e

# Run database migration script
echo "Running database migrations..."
yarn migrate

echo 

# Start the Node.js application
echo "Starting the application..."
yarn start