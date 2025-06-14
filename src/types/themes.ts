export const themeVariations = ['light', 'dark'] as const;

export type ThemeVariation = typeof themeVariations[number];

export type Theme = {
  background: string;
  serverName: string;
  header: string;
  serverIcon: string;
  acronymText: string;
  presenceText: string;
};

export type Themes = {
  [key in ThemeVariation]: Theme;
};
