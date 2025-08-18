// runtime.ts - EST RP Bot Runtime (Handles Interactions)
import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  TextChannel,
} from "discord.js";

const token = process.env.DISCORD_TOKEN!;
const guildId = process.env.GUILD_ID!;

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds
  ] 
});

// Ensure an "accept rules" message exists (idempotent)
async function ensureAcceptMessage(guild: any) {
  const ch = guild.channels.cache.find(
    (c: any) => c.type === ChannelType.GuildText && c.name === "start-here"
  ) as TextChannel | undefined;

  if (!ch) {
    console.log("⚠️  #start-here channel not found. Make sure to run setup first.");
    return;
  }

  // If we already posted one, skip (looks for a bot message with components)
  try {
    const recent = await ch.messages.fetch({ limit: 20 });
    const exists = recent.find((m: any) => m.author.id === guild.client.user?.id && m.components.length > 0);
    if (exists) {
      console.log("✅ Accept rules button already exists in #start-here");
      return;
    }
  } catch (error) {
    console.log("⚠️  Could not check existing messages, proceeding to create button");
  }

  const memberRole = guild.roles.cache.find((r: any) => r.name === "Member");
  if (!memberRole) {
    console.log("❌ Member role not found. Make sure to run setup first.");
    return;
  }

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`accept_rules:${memberRole.id}`)
      .setLabel("I Agree to the Rules")
      .setStyle(ButtonStyle.Success)
      .setEmoji("✅")
  );

  try {
    await ch.send({
      content: `**🎮 Welcome to EST RP!**\n\nPlease read **#rules** carefully. When you're ready to join our GTA RP community, click the button below to accept the rules and unlock the server.\n\n*This will grant you access to all RP channels, voice chat, and community features.*`,
      components: [row]
    });
    console.log("✅ Created accept rules button in #start-here");
  } catch (error) {
    console.error("❌ Failed to create accept rules button:", error);
  }
}

// Handle button interactions for rules acceptance
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  const [key, roleId] = interaction.customId.split(":");
  if (key !== "accept_rules" || !roleId) return;

  try {
    // Check if bot has permission to manage roles
    const botMember = interaction.guild?.members.cache.get(interaction.client.user!.id);
    if (!botMember?.permissions.has(PermissionFlagsBits.ManageRoles)) {
      await interaction.reply({ 
        content: "❌ Bot doesn't have permission to manage roles. Please contact staff.", 
        ephemeral: true 
      });
      return;
    }

    // Check if bot can manage the target role (role hierarchy)
    const targetRole = interaction.guild?.roles.cache.get(roleId);
    if (!targetRole) {
      await interaction.reply({ 
        content: "❌ Member role not found. Please contact staff.", 
        ephemeral: true 
      });
      return;
    }

    if (botMember.roles.highest.position <= targetRole.position) {
      await interaction.reply({ 
        content: "❌ Bot cannot manage this role due to role hierarchy. Please contact staff.", 
        ephemeral: true 
      });
      return;
    }

    // Use the interaction's member directly (no need to fetch)
    const member = interaction.member;
    if (!member || !('roles' in member) || !('cache' in member.roles)) {
      await interaction.reply({ 
        content: "❌ Unable to process request. Please try again.", 
        ephemeral: true 
      });
      return;
    }

    // Check if user already has the role
    if (member.roles.cache.has(roleId)) {
      await interaction.reply({ 
        content: "✅ You already have access to EST RP! Welcome back!", 
        ephemeral: true 
      });
      return;
    }

    // Add the Member role
    await member.roles.add(roleId, "Accepted EST RP server rules");
    console.log(`✅ ${interaction.user.tag} accepted rules and joined EST RP`);

    // Acknowledge with a welcome message
    await interaction.reply({ 
      content: `🎮 **Welcome to EST RP!** You now have access to all RP channels, voice chat, and community features. Enjoy your roleplay experience!`, 
      ephemeral: true 
    });

  } catch (error) {
    console.error("Error handling rules acceptance:", error);
    
    // More specific error messages
    let errorMessage = "❌ There was an error processing your request. Please contact staff.";
    
    if (error instanceof Error) {
      if (error.message.includes("Missing Permissions")) {
        errorMessage = "❌ Bot doesn't have permission to manage roles. Please contact staff.";
      } else if (error.message.includes("Unknown Role")) {
        errorMessage = "❌ Member role not found. Please contact staff.";
      }
    }
    
    await interaction.reply({ 
      content: errorMessage, 
      ephemeral: true 
    });
  }
});

client.once("ready", async () => {
  try {
    const guild = await client.guilds.fetch(guildId);
    console.log(`🎮 EST RP Bot is online as ${client.user?.tag}`);
    console.log(`📱 Connected to: ${guild.name}`);
    console.log(`👥 Serving ${guild.memberCount} members`);

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
    } else {
      console.log("✅ Bot has all required permissions");
    }

    // Ensure the accept rules button exists
    await ensureAcceptMessage(guild);

    console.log("🎯 Bot is ready to handle rules acceptance!");
    console.log("💡 Use Ctrl+C to stop the bot");

  } catch (err) {
    console.error("❌ Error during bot startup:", err);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down EST RP Bot...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down EST RP Bot...');
  client.destroy();
  process.exit(0);
});

client.login(token);
