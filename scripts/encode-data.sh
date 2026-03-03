#!/bin/bash

# Configuration
DATA_DIR="data"
JSON_FILES=("awards.json" "experience.json" "profile_info.json" "projects.json" "skills.json" "updates.json")

echo "🚀 Encoding JSON data to Base64..."

for file in "${JSON_FILES[@]}"; do
    if [ -f "$DATA_DIR/$file" ]; then
        base_name="${file%.json}"
        cat "$DATA_DIR/$file" | base64 -w 0 > "$DATA_DIR/$base_name.b64"
        echo "✅ Encoded $file -> $base_name.b64"
    else
        echo "⚠️  Warning: $file not found in $DATA_DIR"
    fi
done

echo "✨ All files encoded successfully!"
