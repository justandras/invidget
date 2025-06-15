import { ReactElement } from 'react';
import { SERVER_NAME_SIZE } from './const';
import { LegacyThemeColors } from '../../types/themes';
export interface BadgeProps {
  hasVerified: boolean;
  hasHub: boolean;
  hasPartnered: boolean;
  themeColors: LegacyThemeColors;
}

export const FeatureBadge: React.FC<BadgeProps> = ({ hasVerified, hasHub, hasPartnered, themeColors }) => {
	let extraServerNamePadding = 0;

	if (hasVerified && hasHub) {
		extraServerNamePadding = 22;
		return (
			<g>
				<circle cx={8} cy={8} r={8} fill={themeColors.badges.VERIFIED.flowerStar} />
				{/* Render HUB badge icon paths here */}
				{/* Simplified as star */}
				<text x={4} y={12} fontSize={SERVER_NAME_SIZE} fill={themeColors.badges.VERIFIED.icon} fontWeight="bold">
					H
				</text>
			</g>
		);
	} else if (hasVerified) {
		extraServerNamePadding = 22;
		return (
			<g>
				<circle cx={8} cy={8} r={8} fill={themeColors.badges.VERIFIED.flowerStar} />
				<text x={4} y={12} fontSize={SERVER_NAME_SIZE} fill={themeColors.badges.VERIFIED.icon} fontWeight="bold">
					V
				</text>
			</g>
		);
	} else if (hasPartnered) {
		extraServerNamePadding = 22;
		return (
			<g>
				<circle cx={8} cy={8} r={8} fill={themeColors.badges.PARTNERED.flowerStar} />
				<text x={4} y={12} fontSize={SERVER_NAME_SIZE} fill={themeColors.badges.PARTNERED.icon} fontWeight="bold">
					P
				</text>
			</g>
		);
	}
	return null;
}
