export type UiMode = "zen";
export type ZenTheme = "fire" | "rain";
export type AmbientTrack = "wind" | "fireplace";

export const AMBIENT_TRACKS: AmbientTrack[] = [
  "wind",
  "fireplace",
];

export const AMBIENT_KEY_MAP: Record<string, AmbientTrack> = {
  "1": "wind",
  "2": "fireplace",
};
