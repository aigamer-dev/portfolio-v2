#!/bin/bash

# Configuration
BASE_URL="https://portfolio-data.aigamer.dev"
DATA_DIR="./data"
FILES=("awards.json" "experience.json" "profile_info.json" "projects.json" "skills.json" "updates.json")

echo "🚀 Starting data synchronization from $BASE_URL..."

# Ensure data directory exists
mkdir -p "$DATA_DIR"

# Loop through files and download using curl
for FILE in "${FILES[@]}"; do
    echo "📡 Fetching $FILE..."
    
    # -f: Fail silently on server errors
    # -s: Silent mode
    # -L: Follow redirects
    # -o: Output to file
    # --retry: Retry on transient errors
    STATUS_CODE=$(curl -L -s -w "%{http_code}" -o "$DATA_DIR/$FILE" "$BASE_URL/$FILE" --retry 3)
    
    if [ "$STATUS_CODE" -eq 200 ]; then
        echo "✅ Successfully downloaded $FILE"
    else
        echo "❌ Failed to download $FILE (HTTP Status: $STATUS_CODE)"
        exit 1
    fi
done

echo "✨ All data files synchronized successfully!"
