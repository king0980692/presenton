export interface ThemeDefinition {
  themeId: string;         // "minimal", "bold", "corporate", "dark"
  themeName: string;
  colors: {
    primary: string;       // → --primary-accent-color
    secondary: string;     // → --secondary-accent-color
    tertiary: string;      // → --tertiary-accent-color
    background: string;    // → --card-background-color
    headingText: string;   // → --text-heading-color
    bodyText: string;      // → --text-body-color
  };
  fonts: {
    heading: { family: string; weight: number };
    body: { family: string; weight: number };
    sizes: { h1: number; h2: number; h3: number; body: number; caption: number };
  };
  spacing: {
    preset: "compact" | "normal" | "wide";
    baseUnit: number;
    lineHeight: number;
    paragraphGap: number;
  };
  background?: { type: "solid" | "gradient" | "image"; value: string };
  pageNumber?: { show: boolean; position: string };
}

/**
 * Convert a ThemeDefinition to a CSS variables map for inline style injection.
 */
export function themeToCSS(theme: ThemeDefinition): Record<string, string> {
  return {
    '--primary-accent-color': theme.colors.primary,
    '--secondary-accent-color': theme.colors.secondary,
    '--tertiary-accent-color': theme.colors.tertiary,
    '--card-background-color': theme.colors.background,
    '--text-heading-color': theme.colors.headingText,
    '--text-body-color': theme.colors.bodyText,
    '--heading-font-family': theme.fonts.heading.family,
    '--heading-font-weight': String(theme.fonts.heading.weight),
    '--body-font-family': theme.fonts.body.family,
    '--body-font-weight': String(theme.fonts.body.weight),
    '--font-size-h1': `${theme.fonts.sizes.h1}px`,
    '--font-size-h2': `${theme.fonts.sizes.h2}px`,
    '--font-size-h3': `${theme.fonts.sizes.h3}px`,
    '--font-size-body': `${theme.fonts.sizes.body}px`,
    '--font-size-caption': `${theme.fonts.sizes.caption}px`,
    '--spacing-base-unit': `${theme.spacing.baseUnit}px`,
    '--spacing-line-height': String(theme.spacing.lineHeight),
    '--spacing-paragraph-gap': `${theme.spacing.paragraphGap}px`,
  };
}
