
export interface DetectedObject {
    bbox: [number, number, number, number];  // [x, y, width, height]
    class: string;
    score: number;
  }