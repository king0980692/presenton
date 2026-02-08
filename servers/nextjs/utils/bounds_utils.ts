/**
 * Bounds utilities for converting percentage-based bounds to pixel coordinates.
 * Standard slide dimensions: 1280×720 (16:9 aspect ratio).
 */

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

export type Bounds = [number, number, number, number]; // [x%, y%, w%, h%]

export interface PixelRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Convert percentage bounds [x%, y%, w%, h%] to pixel coordinates
 * based on 1280×720 slide dimensions.
 *
 * Useful as a bypass when Puppeteer's getBoundingClientRect() is not available.
 */
export function boundsToPixels(bounds: Bounds): PixelRect {
  const [x, y, w, h] = bounds;
  return {
    left: (x / 100) * SLIDE_WIDTH,
    top: (y / 100) * SLIDE_HEIGHT,
    width: (w / 100) * SLIDE_WIDTH,
    height: (h / 100) * SLIDE_HEIGHT,
  };
}

/**
 * Convert percentage bounds to a CSS style object for absolute positioning.
 */
export function boundsToCSSStyle(
  bounds: Bounds,
  zIndex?: number
): React.CSSProperties {
  const [x, y, w, h] = bounds;
  return {
    position: "absolute" as const,
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
    ...(zIndex !== undefined ? { zIndex } : {}),
  };
}
