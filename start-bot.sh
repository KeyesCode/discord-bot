#!/bin/bash

# EST RP Bot Startup Script
echo "🎮 Starting EST RP Bot..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Start bot in background
    echo "🚀 Starting bot in background..."
    nohup node dist/runtime.js > logs/bot.log 2>&1 &
    
    # Get the process ID
    BOT_PID=$!
    
    # Save PID to file for easy stopping
    echo $BOT_PID > bot.pid
    
    echo "✅ Bot started with PID: $BOT_PID"
    echo "📝 Logs are being written to: logs/bot.log"
    echo "🛑 To stop the bot, run: ./stop-bot.sh"
    echo "👀 To view logs, run: tail -f logs/bot.log"
    
else
    echo "❌ Build failed! Check the errors above."
    exit 1
fi
