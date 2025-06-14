import strings from '../../const/strings.json';
import { LanguageCode } from 'iso-639-1';
import { APIInvite, GuildFeature } from 'discord-api-types/v10';

type Locale = {
	header: string;
	header_hub: string;
	online: string;
	members: string;
	button: string;
};

function getLocaleStrings(lang: string) {
	return (strings as Record<string, Locale>)[lang] || strings.en;
}

type ThemeVariation = 'dark' | 'light' | string;

interface InviteRendererProps {
	invite: APIInvite;
	language?: LanguageCode;
	animation?: boolean;
	theme?: ThemeVariation;
}

const INVITE_WIDTH = 400;
const INVITE_HEIGHT = 130;
const PADDING = 20;
const ICON_SIZE = 80;
const BUTTON_WIDTH = 120;
const BUTTON_HEIGHT = 40;
const BUTTON_MARGIN_LEFT = 15;
const HEADER_LINE_HEIGHT = 30;
const HEADER_FONT_SIZE = 22;
const SERVER_NAME_SIZE = 20;
const SERVER_NAME_LINE_HEIGHT = 25;
const SERVER_NAME_MARGIN_BOTTOM = 10;
const PRESENCE_LINE_HEIGHT = 25;
const PRESENCE_FONT_SIZE = 14;
const PRESENCE_DOT_SIZE = 10;
const PRESENCE_DOT_MARGIN_RIGHT = 6;
const PRESENCE_TEXT_MARGIN_RIGHT = 15;
const BADGE_MARGIN_RIGHT = 6;

// Dummy theme colors and locales (replace with your actual constants)
const COMMON_COLORS = {
	background: '#222',
	header: '#eee',
	serverIcon: '#555',
	joinButtonBackground: '#5865F2',
	joinButtonText: '#fff',
	serverName: '#fff',
	online: '#43B581',
	members: '#747F8D',
	presenceText: '#ccc',
	badges: {
		VERIFIED: { flowerStar: '#7289DA', icon: '#fff' },
		PARTNERED: { flowerStar: '#FAA61A', icon: '#fff' },
	},
};

const THEMES: Record<string, typeof COMMON_COLORS> = {
	dark: COMMON_COLORS,
	light: {
		...COMMON_COLORS,
		background: '#eee',
		header: '#111',
		serverIcon: '#ccc',
		serverName: '#111',
		presenceText: '#444',
	},
};

export default function LegacyTemplate({ invite, language = 'en', animation = true, theme = 'dark' }: InviteRendererProps) {
	const locale = getLocaleStrings(language);
	const themeColors = { ...COMMON_COLORS, ...(THEMES[theme] || THEMES.dark) };

	if (!invite.guild) throw new Error("Invalid invite, Guild is missing")

	const hasVerified = invite.guild.features.includes(GuildFeature.Verified);
	const hasHub = invite.guild.features.includes(GuildFeature.Hub);
	const hasPartnered = invite.guild.features.includes(GuildFeature.Partnered);

	// Format numbers with commas
	const formatNumber = (num: number) => num.toLocaleString();

	// Extra padding for badges
	let extraServerNamePadding = 0;
	// Simple badge rendering for example
	const renderBadge = () => {
		if (hasVerified && hasHub) {
			extraServerNamePadding = 22;
			return (
				<g>
					<circle cx={8} cy={8} r={8} fill={themeColors.badges.VERIFIED.flowerStar} />
					{/* Render HUB badge icon paths here */}
					{/* Simplified as star */}
					<text x={4} y={12} fontSize={12} fill={themeColors.badges.VERIFIED.icon} fontWeight="bold">
						H
					</text>
				</g>
			);
		} else if (hasVerified) {
			extraServerNamePadding = 22;
			return (
				<g>
					<circle cx={8} cy={8} r={8} fill={themeColors.badges.VERIFIED.flowerStar} />
					<text x={4} y={12} fontSize={12} fill={themeColors.badges.VERIFIED.icon} fontWeight="bold">
						V
					</text>
				</g>
			);
		} else if (hasPartnered) {
			extraServerNamePadding = 22;
			return (
				<g>
					<circle cx={8} cy={8} r={8} fill={themeColors.badges.PARTNERED.flowerStar} />
					<text x={4} y={12} fontSize={12} fill={themeColors.badges.PARTNERED.icon} fontWeight="bold">
						P
					</text>
				</g>
			);
		}
		return null;
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg" version="1.1"
			width={INVITE_WIDTH}
			height={INVITE_HEIGHT}
			viewBox={`0 0 ${INVITE_WIDTH} ${INVITE_HEIGHT}`}
			style={{ backgroundColor: themeColors.background, borderRadius: 3 }}
			role="img"
			aria-label="Discord Invite Card"
		>
			{/* Header */}
			<text
				x={PADDING}
				y={PADDING + HEADER_FONT_SIZE}
				fontSize={HEADER_FONT_SIZE}
				fontWeight="bold"
				fill={themeColors.header}
				style={{ textTransform: 'uppercase', fontFamily: 'Whitney, Arial, sans-serif' }}
			>
				{hasHub ? locale.header_hub : locale.header}
			</text>

			{/* Content container */}
			<g transform={`translate(${PADDING}, ${PADDING + HEADER_LINE_HEIGHT + 10})`}>
				{/* Server Icon */}
				<rect width={ICON_SIZE} height={ICON_SIZE} rx={16} ry={16} fill={themeColors.serverIcon} />

				<defs>
					<clipPath id="iconClip">
						<rect width={ICON_SIZE} height={ICON_SIZE} rx={16} ry={16} />
					</clipPath>
				</defs>

				{/* Join Button */}
					<rect
						x={INVITE_WIDTH - PADDING * 2 - BUTTON_WIDTH}
						y={(ICON_SIZE - BUTTON_HEIGHT) / 2}
						width={BUTTON_WIDTH}
						height={BUTTON_HEIGHT}
						rx={3}
						ry={3}
						fill={themeColors.joinButtonBackground}
					/>
					<text
						x={INVITE_WIDTH - PADDING * 2 - BUTTON_WIDTH / 2}
						y={(ICON_SIZE - BUTTON_HEIGHT) / 2 + BUTTON_HEIGHT / 2 + 5}
						fontSize={14}
						fill={themeColors.joinButtonText}
						fontWeight="500"
						textAnchor="middle"
						fontFamily="Whitney, Arial, sans-serif"
					>
						{locale.button}
					</text>

				{/* Server Name + Badges */}
				<g transform={`translate(${ICON_SIZE + PADDING}, 0)`}>
					<g>{renderBadge()}</g>
					<text
						x={extraServerNamePadding}
						y={SERVER_NAME_SIZE}
						fontSize={SERVER_NAME_SIZE}
						fontWeight="600"
						fill={themeColors.serverName}
						fontFamily="Whitney, Arial, sans-serif"
					>
						{invite.guild.name}
					</text>

					{/* Presence */}
					<g transform={`translate(0, ${SERVER_NAME_LINE_HEIGHT + SERVER_NAME_MARGIN_BOTTOM})`}>
						<circle cx={PRESENCE_DOT_SIZE / 2} cy={PRESENCE_LINE_HEIGHT / 2} r={PRESENCE_DOT_SIZE / 2} fill={themeColors.online} />
						<text
							x={PRESENCE_DOT_SIZE + PRESENCE_DOT_MARGIN_RIGHT}
							y={PRESENCE_LINE_HEIGHT / 2 + PRESENCE_FONT_SIZE / 2 - 2}
							fontSize={PRESENCE_FONT_SIZE}
							fill={themeColors.presenceText}
							fontWeight="600"
							fontFamily="Whitney, Arial, sans-serif"
						>
							{locale.online.replace('{{count}}', formatNumber(invite.approximate_presence_count ? invite.approximate_presence_count : 0))}
						</text>

						<circle
							cx={
								PRESENCE_DOT_SIZE +
								PRESENCE_DOT_MARGIN_RIGHT +
								locale.online.replace('{{count}}', formatNumber(invite.approximate_presence_count ? invite.approximate_presence_count : 0)).length * 7 + // approximate width
								PRESENCE_TEXT_MARGIN_RIGHT +
								PRESENCE_DOT_SIZE / 2
							}
							cy={PRESENCE_LINE_HEIGHT / 2}
							r={PRESENCE_DOT_SIZE / 2}
							fill={themeColors.members}
						/>
						<text
							x={
								PRESENCE_DOT_SIZE * 2 +
								PRESENCE_DOT_MARGIN_RIGHT * 2 +
								locale.online.replace('{{count}}', formatNumber(invite.approximate_presence_count ? invite.approximate_presence_count : 0)).length * 7 +
								PRESENCE_TEXT_MARGIN_RIGHT
							}
							y={PRESENCE_LINE_HEIGHT / 2 + PRESENCE_FONT_SIZE / 2 - 2}
							fontSize={PRESENCE_FONT_SIZE}
							fill={themeColors.presenceText}
							fontWeight="600"
							fontFamily="Whitney, Arial, sans-serif"
						>
							{locale.online.replace('{{count}}', formatNumber(invite.approximate_presence_count ? invite.approximate_presence_count : 0))}
						</text>
					</g>
				</g>
			</g>
		</svg>
	);
}
