import {
  APIGuildWidget,
  APIInvite,
} from 'discord-api-types/v10'

const API_BASE_URL = 'https://discord.com/api/v10'
const CDN_BASE_URL = 'https://cdn.discordapp.com'

export default class DiscordApi {
  static async getWidget(guildId: string): Promise<APIGuildWidget> {
    const res = await fetch(`${API_BASE_URL}/guilds/${guildId}/widget.json`)
    if (!res.ok) throw new Error(`Failed to fetch widget for guild ${guildId}: ${res.statusText}`)
    return res.json()
  }

  static async getInvite(inviteCode: string): Promise<APIInvite> {
    const res = await fetch(`${API_BASE_URL}/invites/${inviteCode}?with_counts=true`)
    if (!res.ok) throw new Error(`Failed to fetch invite ${inviteCode}: ${res.statusText}`)
    return res.json()
  }

  static async fetchIcon(iconUrl: string): Promise<string> {
    const res = await fetch(iconUrl)
    if (!res.ok) throw new Error(`Failed to fetch icon from ${iconUrl}: ${res.statusText}`)
    const arrayBuffer = await res.arrayBuffer()
    return Buffer.from(arrayBuffer).toString('base64')
  }

  static getIconUrl(guildId: string, iconId: string): string {
    const ext = iconId.startsWith('a_') ? '.gif' : '.jpg'
    return `${CDN_BASE_URL}/icons/${guildId}/${iconId}${ext}`
  }
}
