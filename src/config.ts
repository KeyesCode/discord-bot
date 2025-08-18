// config.ts - EST RP GTA Roleplay Server Configuration
import { PermissionFlagsBits } from "discord.js";

export const roles = [
  { 
    name: "Owner", 
    color: 0xFF0000, 
    hoist: true, 
    mentionable: true, 
    permissions: [PermissionFlagsBits.Administrator]
  },
  { 
    name: "Management", 
    color: 0xFF6B35, 
    hoist: true, 
    mentionable: true, 
    permissions: [
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.MuteMembers,
      PermissionFlagsBits.DeafenMembers,
      PermissionFlagsBits.MoveMembers,
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ManageRoles,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ManageGuild
    ]
  },
  { 
    name: "Admin", 
    color: 0xE74C3C, 
    hoist: true, 
    mentionable: true, 
    permissions: [
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.MuteMembers,
      PermissionFlagsBits.DeafenMembers,
      PermissionFlagsBits.MoveMembers,
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ManageRoles,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages
    ]
  },
  { 
    name: "Moderator", 
    color: 0x3498DB, 
    hoist: true, 
    mentionable: true, 
    permissions: [
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.MuteMembers,
      PermissionFlagsBits.DeafenMembers,
      PermissionFlagsBits.MoveMembers,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages
    ]
  },
  { 
    name: "Support", 
    color: 0x9B59B6, 
    hoist: true, 
    mentionable: true, 
    permissions: [
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.MuteMembers,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages
    ]
  },
  { 
    name: "VIP", 
    color: 0xF1C40F, 
    hoist: true, 
    mentionable: true, 
    permissions: [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak,
      PermissionFlagsBits.PrioritySpeaker
    ]
  },
  { 
    name: "Member", 
    color: 0x2ECC71, 
    hoist: false, 
    mentionable: true, 
    permissions: [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak
    ]
  },
];

export const structure = [
  {
    category: "📢 SERVER INFO",
    channels: [
      { 
        name: "welcome", 
        type: "text", 
        overwrites: {
          "@everyone": { SendMessages: false }
        }
      },
      { 
        name: "rules", 
        type: "text", 
        overwrites: {
          "@everyone": { SendMessages: false }
        }
      },
      { 
        name: "start-here", 
        type: "text", 
        overwrites: {
          "@everyone": { SendMessages: false, ViewChannel: true }
        }
      },
      { 
        name: "announcements", 
        type: "text", 
        overwrites: {
          "@everyone": { SendMessages: false, ViewChannel: false },
          "Member": { ViewChannel: true },
          "VIP": { ViewChannel: true },
          "Support": { ViewChannel: true, SendMessages: true },
          "Moderator": { ViewChannel: true, SendMessages: true },
          "Admin": { ViewChannel: true, SendMessages: true },
          "Management": { ViewChannel: true, SendMessages: true },
          "Owner": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "server-status", 
        type: "text", 
        overwrites: {
          "@everyone": { SendMessages: false, ViewChannel: false },
          "Member": { ViewChannel: true },
          "VIP": { ViewChannel: true },
          "Support": { ViewChannel: true, SendMessages: true },
          "Moderator": { ViewChannel: true, SendMessages: true },
          "Admin": { ViewChannel: true, SendMessages: true },
          "Management": { ViewChannel: true, SendMessages: true },
          "Owner": { ViewChannel: true, SendMessages: true }
        }
      },
    ],
  },
  {
    category: "🎮 GTA RP",
    channels: [
      { 
        name: "general", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "rp-discussion", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "character-development", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "rp-events", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "media", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "screenshots", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "videos", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
    ],
  },
  {
    category: "🎯 GAMEPLAY",
    channels: [
      { 
        name: "jobs", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "businesses", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "properties", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "vehicles", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "gangs", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "police", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "ems", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "mechanic", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
    ],
  },
  {
    category: "🎵 VOICE CHANNELS",
    channels: [
      { 
        name: "Lobby", 
        type: "voice",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
      { 
        name: "RP-1", 
        type: "voice",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
      { 
        name: "RP-2", 
        type: "voice",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
      { 
        name: "RP-3", 
        type: "voice",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
      { 
        name: "Music", 
        type: "voice",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
      { 
        name: "AFK", 
        type: "voice",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
    ],
  },
  {
    category: "🛠️ SUPPORT",
    channels: [
      { 
        name: "tickets", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "help-desk", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "bug-reports", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "suggestions", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "appeals", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
    ],
  },
  {
    category: "👥 STAFF",
    channels: [
      { 
        name: "staff-chat", 
        type: "text", 
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Support": { ViewChannel: true, SendMessages: true },
          "Moderator": { ViewChannel: true, SendMessages: true },
          "Admin": { ViewChannel: true, SendMessages: true },
          "Management": { ViewChannel: true, SendMessages: true },
          "Owner": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "staff-voice", 
        type: "voice", 
        overwrites: {
          "@everyone": { ViewChannel: false, Connect: false, Speak: false },
          "Support": { ViewChannel: true, Connect: true, Speak: true },
          "Moderator": { ViewChannel: true, Connect: true, Speak: true },
          "Admin": { ViewChannel: true, Connect: true, Speak: true },
          "Management": { ViewChannel: true, Connect: true, Speak: true },
          "Owner": { ViewChannel: true, Connect: true, Speak: true }
        }
      },
      { 
        name: "management-only", 
        type: "text", 
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Admin": { ViewChannel: true, SendMessages: true },
          "Management": { ViewChannel: true, SendMessages: true },
          "Owner": { ViewChannel: true, SendMessages: true }
        }
      },
    ],
  },
  {
    category: "🎉 COMMUNITY",
    channels: [
      { 
        name: "off-topic", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "memes", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "gaming", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "music", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
      { 
        name: "art", 
        type: "text",
        overwrites: {
          "@everyone": { ViewChannel: false },
          "Member": { ViewChannel: true, SendMessages: true }
        }
      },
    ],
  },
];
