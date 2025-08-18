// index.ts
import "dotenv/config";
import {
  ChannelType,
  Client,
  GatewayIntentBits,
  Guild,
  PermissionFlagsBits,
  Role,
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
