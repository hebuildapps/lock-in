export type UiMode = "normal" | "zen";
export type ZenTheme = "fire" | "rain";
export type AmbientTrack = "wind" | "rain" | "fireplace" | "cafe";

export const AMBIENT_TRACKS: AmbientTrack[] = [
  "wind",
  "rain",
  "fireplace",
  "cafe",
];

export const AMBIENT_KEY_MAP: Record<string, AmbientTrack> = {
  "1": "wind",
  "2": "rain",
  "3": "fireplace",
  "4": "cafe",
};
