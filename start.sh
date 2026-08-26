#!/bin/sh

# Install dependencies ถ้ายังไม่ได้ install
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

LOG_DIR="$(dirname "$0")/logs"
mkdir -p "$LOG_DIR"

pm2 start npm --name "production-analysis-service" -l "$LOG_DIR/production-analysis-service.log" --merge-logs -- run local_v1
