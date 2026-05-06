#!/bin/sh
set -e

# Install dependencies if missing or if node_modules came from the host
if [ ! -f "node_modules/.docker-installed" ]; then
    if [ -d "node_modules" ]; then
        echo "WARNING: node_modules appears to be from host system!"
        echo "Cleaning for container-native installation..."
        # Use rm on contents since node_modules may be a mounted volume
        rm -rf node_modules/* node_modules/.[!.]* 2>/dev/null || true
    fi

    npm install
fi


# Create marker to indicate this was installed in the container
touch node_modules/.docker-installed

# Start the development server
exec npm run dev -- -H 0.0.0.0
