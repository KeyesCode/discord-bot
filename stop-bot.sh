#!/bin/bash

# EST RP Bot Stop Script
echo "🛑 Stopping EST RP Bot..."

# Check if PID file exists
if [ -f "bot.pid" ]; then
    BOT_PID=$(cat bot.pid)
    
    # Check if process is still running
    if ps -p $BOT_PID > /dev/null; then
        echo "🔄 Stopping bot with PID: $BOT_PID"
        kill $BOT_PID
        
        # Wait a bit for graceful shutdown
        sleep 2
        
        # Force kill if still running
        if ps -p $BOT_PID > /dev/null; then
            echo "⚡ Force stopping bot..."
            kill -9 $BOT_PID
        fi
        
        echo "✅ Bot stopped successfully!"
    else
        echo "⚠️  Bot process not found (PID: $BOT_PID)"
    fi
    
    # Remove PID file
    rm -f bot.pid
else
    echo "⚠️  No PID file found. Trying to find and stop bot process..."
    
    # Try to find and kill the bot process
    pkill -f "node dist/runtime.js"
    
    if [ $? -eq 0 ]; then
        echo "✅ Bot stopped successfully!"
    else
        echo "❌ No bot process found to stop"
    fi
fi
