// index.ts
import "dotenv/config";
import {
  ChannelType,
  Client,
  GatewayIntentBits,
  Guild,
  PermissionFlagsBits,
  Role,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
} from "discord.js";
import type { OverwriteResolvable } from "discord.js";
import { roles, structure } from "./config.js";

const token = process.env.DISCORD_TOKEN!;
const guildId = process.env.GUILD_ID!;

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds
  ] 
});

// Post rules in #rules channel
async function postRules(guild: Guild) {
  const rulesChannel = guild.channels.cache.find(
    (c) => c.type === ChannelType.GuildText && c.name === "rules"
  ) as TextChannel | undefined;

  if (!rulesChannel) {
    console.log("⚠️  #rules channel not found");
    return;
  }

  try {
    await rulesChannel.send({
      content: `# 🎮 EST RP - Official Server Rules

## 📋 **General Rules**
• **Be Respectful** - Treat all members with respect and dignity
• **No Harassment** - Bullying, hate speech, or discrimination is strictly prohibited
• **Keep it PG-13** - No explicit content, excessive swearing, or inappropriate language
• **English Only** - All communication must be in English for moderation purposes

## 🎭 **Roleplay Rules**
• **Stay In Character** - Maintain your RP character while in RP channels
• **No Metagaming** - Don't use OOC information in character
• **Respect RP Scenarios** - Don't interrupt ongoing roleplay situations
• **Character Development** - Build meaningful, realistic characters

## 🚫 **Prohibited Content**
• **No Spam** - Avoid excessive messaging or repetitive content
• **No Advertising** - No promotion of other servers or services
• **No Personal Information** - Never share personal details
• **No Cheating** - No exploits, hacks, or unfair advantages

## 🛡️ **Consequences**
• **1st Warning** - Verbal warning and temporary mute
• **2nd Warning** - Extended mute and role restrictions
• **3rd Warning** - Temporary ban from the server
• **Severe Violations** - Immediate permanent ban

## 📞 **Appeals**
If you believe a moderation action was unfair, contact staff in #tickets.

---
*By remaining in this server, you agree to follow these rules. Staff reserves the right to modify rules as needed.*`
    });
    console.log("✅ Posted rules in #rules");
  } catch (error) {
    console.error("❌ Failed to post rules:", error);
  }
}

// Post welcome announcement
async function postWelcomeAnnouncement(guild: Guild) {
  const announcementsChannel = guild.channels.cache.find(
    (c) => c.type === ChannelType.GuildText && c.name === "announcements"
  ) as TextChannel | undefined;

  if (!announcementsChannel) {
    console.log("⚠️  #announcements channel not found");
    return;
  }

  try {
    await announcementsChannel.send({
      content: `# 🎉 **EST RP is now LIVE!** 🎉

## 🚗 Welcome to the Ultimate GTA Roleplay Experience!

**EST RP** is officially launching today, bringing you the most immersive and engaging roleplay server in the GTA community!

### 🌟 **What Makes EST RP Special:**
• **Advanced Roleplay Systems** - Deep character development and storylines
• **Professional Staff Team** - Experienced moderators and administrators
• **Community-Driven** - Your feedback and suggestions shape our server
• **Regular Events** - Weekly RP events, competitions, and community activities
• **Quality Assurance** - We maintain high standards for the best RP experience

### 🎯 **Getting Started:**
1. **Read the Rules** - Check out #rules for our community guidelines
2. **Accept Rules** - Click the button in #start-here to unlock the server
3. **Join the Community** - Introduce yourself in #general
4. **Start Roleplaying** - Dive into our RP channels and create your story

### 🌐 **Official Website:**
**Visit us at: https://est-rp.com/**
• Server information and updates
• Character creation guides
• Community forums
• Staff applications

### 📱 **Stay Connected:**
• **Discord** - This server for real-time communication
• **Website** - For detailed information and resources
• **Social Media** - Follow us for updates and announcements

---
*Welcome to the EST RP family! Let's create amazing stories together!* 🚗💨

*Server launched on ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}*`
    });
    console.log("✅ Posted welcome announcement in #announcements");
  } catch (error) {
    console.error("❌ Failed to post announcement:", error);
  }
}

// Create accept rules button in #start-here
async function createAcceptButton(guild: Guild, memberRole: Role) {
  const startHereChannel = guild.channels.cache.find(
    (c) => c.type === ChannelType.GuildText && c.name === "start-here"
  ) as TextChannel | undefined;

  if (!startHereChannel) {
    console.log("⚠️  #start-here channel not found");
    return;
  }

  try {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`accept_rules:${memberRole.id}`)
        .setLabel("I Agree to the Rules")
        .setStyle(ButtonStyle.Success)
        .setEmoji("✅")
    );

    await startHereChannel.send({
      content: `**🎮 Welcome to EST RP!**\n\nPlease read **#rules** carefully. When you're ready to join our GTA RP community, click the button below to accept the rules and unlock the server.\n\n*This will grant you access to all RP channels, voice chat, and community features.*\n\n📋 **Rules Summary:**\n• Be respectful and follow Discord ToS\n• Stay in character during RP\n• No harassment, spam, or advertising\n• English only for moderation\n• Contact staff in #tickets for help`,
      components: [row]
    });
    console.log("✅ Created accept rules button in #start-here");
  } catch (error) {
    console.error("❌ Failed to create accept button:", error);
  }
}



client.once("ready", async () => {
  try {
    const guild = await client.guilds.fetch(guildId);
    console.log(`Connected as ${client.user?.tag}. Setting up: ${guild.name}`);

    // Check bot permissions
    const botMember = guild.members.cache.get(client.user!.id);
    if (!botMember) {
      throw new Error("Bot member not found in guild");
    }

    const requiredPermissions = [
      PermissionFlagsBits.ManageRoles,
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ManageGuild
    ];

    const missingPermissions = requiredPermissions.filter(perm => !botMember.permissions.has(perm));
    if (missingPermissions.length > 0) {
      console.warn("⚠️  Bot is missing some permissions:", missingPermissions.map(p => Object.keys(PermissionFlagsBits).find(key => PermissionFlagsBits[key as keyof typeof PermissionFlagsBits] === p)));
    }

    // 1) Ensure roles exist (and capture IDs)
    const roleMap: Record<string, Role> = {};
    for (const r of roles) {
      let role = guild.roles.cache.find((x) => x.name === r.name);
      if (!role) {
        role = await guild.roles.create({
          name: r.name,
          color: r.color,
          hoist: r.hoist,
          mentionable: r.mentionable,
          permissions: r.permissions,
          reason: "Server bootstrap",
        });
        console.log(`Created role: ${role.name}`);
      } else {
        // optional: keep roles updated
        await role.edit({
          color: r.color,
          hoist: r.hoist,
          mentionable: r.mentionable,
          permissions: r.permissions,
          reason: "Server bootstrap sync",
        });
        console.log(`Synced role: ${role.name}`);
      }
      roleMap[r.name] = role;
    }

    // helpful handle for @everyone
    const everyone = guild.roles.everyone;
    roleMap["@everyone"] = everyone;

    // 2) Create categories and channels
    for (const block of structure) {
      // ensure category exists
      let category = guild.channels.cache.find(
        (c) => c.type === ChannelType.GuildCategory && c.name === block.category
      );
      if (!category) {
        category = await guild.channels.create({
          name: block.category,
          type: ChannelType.GuildCategory,
          reason: "Server bootstrap",
        });
        console.log(`Created category: ${block.category}`);
      }

      // create/update channels under category
      for (const ch of block.channels) {
        const isVoice = ch.type === "voice";
        let channel = guild.channels.cache.find(
          (c) =>
            c.parentId === category!.id &&
            c.name === ch.name &&
            (isVoice
              ? c.type === ChannelType.GuildVoice
              : c.type === ChannelType.GuildText)
        );

        // Build permission overwrites if provided
        let permissionOverwrites: OverwriteResolvable[] | undefined;

        if ('overwrites' in ch && ch.overwrites) {
          permissionOverwrites = Object.entries(ch.overwrites).map(
            ([roleName, perms]) => {
              const role = roleMap[roleName];
              if (!role) {
                throw new Error(`Unknown role in overwrites: ${roleName}`);
              }
              // convert `{ SendMessages: false }` to allow/deny bitfields
              const allow: bigint[] = [];
              const deny: bigint[] = [];
              for (const [permKey, val] of Object.entries(perms as Record<string, boolean>)) {
                const bit = (PermissionFlagsBits as any)[permKey];
                if (!bit) throw new Error(`Invalid permission: ${permKey}`);
                (val ? allow : deny).push(bit);
              }
              return {
                id: role.id,
                allow: allow.reduce((a, b) => a | b, 0n),
                deny: deny.reduce((a, b) => a | b, 0n),
              };
            }
          );
        }

        if (!channel) {
          const createOptions: any = {
            name: ch.name,
            type: isVoice ? ChannelType.GuildVoice : ChannelType.GuildText,
            parent: category!.id,
            reason: "Server bootstrap",
          };
          if (permissionOverwrites) {
            createOptions.permissionOverwrites = permissionOverwrites;
          }
          
          channel = await guild.channels.create(createOptions);
          console.log(`Created ${ch.type} channel: #${ch.name}`);
        } else if (permissionOverwrites && 'permissionOverwrites' in channel) {
          await channel.permissionOverwrites.set(permissionOverwrites);
          console.log(`Synced overwrites for #${ch.name}`);
        }

        // Optional: set slowmode, topic, etc.
        // if (!isVoice) await (channel as any).setRateLimitPerUser(2);
      }
    }

    // Post initial content
    console.log("📝 Posting initial content...");
    await postRules(guild);
    await postWelcomeAnnouncement(guild);
    
    if (roleMap["Member"]) {
      await createAcceptButton(guild, roleMap["Member"]);
    } else {
      console.log("⚠️  Member role not found, skipping accept button creation");
    }

    console.log("✅ Setup complete.");
    console.log("🎮 EST RP server is ready!");
    console.log("💡 Run 'npm start' to start the bot and handle rules acceptance");
  } catch (err) {
    console.error(err);
  } finally {
    client.destroy();
  }
});



client.login(token);
