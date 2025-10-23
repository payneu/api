#!/bin/bash

set -e

echo "Fetching API spec from http://localhost:3000/docs-json..."

curl -s http://localhost:3000/doc-json > swagger/api-spec.json

if [ $? -eq 0 ]; then
    echo "✅ API spec updated successfully!"
else
    echo "❌ Error fetching API spec"
    exit 1
fi

echo "✅ Client generated successfully!"

echo "File Location: ./swagger/payneu-api.ts"