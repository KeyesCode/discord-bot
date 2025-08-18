# 🎮 EST RP Discord Server Setup

A Discord bot setup for "EST RP" - a GTA Roleplay server with automated role assignment and channel management.

## 🚀 Quick Start

### 1. Setup (One-time)
```bash
npm run setup
```
This creates:
- All server roles (Owner, Management, Admin, Moderator, Support, VIP, Member)
- Channel structure (GTA RP, Gameplay, Voice, Support, Staff, Community)
- Permission system (channels locked behind Member role)

### 2. Runtime (Continuous)
```bash
npm start
```
This starts the bot to:
- Handle rules acceptance button clicks
- Assign Member role to users who accept rules
- Grant access to all RP channels

## 📁 Project Structure

```
src/
├── index.ts      # Setup script (creates server structure)
├── runtime.ts    # Runtime bot (handles interactions)
└── config.ts     # Server configuration (roles, channels)
```

## 🎯 Features

### **Role Hierarchy**
- **Owner** - Full server control
- **Management** - High-level management
- **Admin** - Administrative powers
- **Moderator** - Moderation tools
- **Support** - Help desk management
- **VIP** - Priority access
- **Member** - Basic community access

### **Channel Categories**
- **📢 SERVER INFO** - Welcome, Rules, Start-Here
- **🎮 GTA RP** - General, RP Discussion, Character Development
- **🎯 GAMEPLAY** - Jobs, Businesses, Properties, Vehicles
- **🎵 VOICE CHANNELS** - RP Voice, Music, AFK
- **🛠️ SUPPORT** - Tickets, Help Desk, Bug Reports
- **👥 STAFF** - Private staff areas
- **🎉 COMMUNITY** - Off-topic, Memes, Gaming

### **Access Control**
- New members can only see 3 channels initially
- Must click "I Agree to the Rules" button in `#start-here`
- Button grants Member role and unlocks all channels
- Staff channels remain properly restricted

## ⚙️ Configuration

### **Environment Variables**
Create a `.env` file:
```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_server_id_here
```

### **Bot Permissions Required**
- ✅ Manage Roles
- ✅ Manage Channels
- ✅ Manage Server

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run setup` | One-time server setup |
| `npm start` | Start runtime bot |
| `npm run dev` | Alias for start |

## 🚨 Troubleshooting

### **"Interaction Failed" Error**
- Ensure bot has `Manage Roles` permission
- Check bot role is higher than Member role in hierarchy
- Verify Member role exists

### **Bot Not Responding**
- Make sure runtime bot is running (`npm start`)
- Check bot is online in Discord
- Verify bot has proper permissions

### **Setup Issues**
- Run `npm run setup` first to create server structure
- Check bot has all required permissions
- Ensure `.env` file is configured correctly

## 🎮 Customization

Edit `src/config.ts` to:
- Modify role colors and permissions
- Add/remove channels
- Change category names
- Adjust permission overwrites

## 📝 Notes

- **Setup is idempotent** - safe to run multiple times
- **Runtime bot stays running** - handles ongoing interactions
- **Permissions are enforced** - no bypass of role requirements
- **Logs all actions** - easy to track who accepted rules

## 🤝 Support

If you encounter issues:
1. Check bot permissions in Discord
2. Verify environment variables
3. Check console logs for errors
4. Ensure bot role hierarchy is correct

---

**EST RP** - Your GTA Roleplay Community! 🚗💨
