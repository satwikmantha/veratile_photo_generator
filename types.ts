
export interface ImageStyle {
  name: string;
  promptSuffix: string;
}

export interface HistoryItem {
  id: number;
  prompt: string;
  style: ImageStyle;
  isFavorite: boolean;
}
