/**
 * Information about label
 */
export interface LabelInfo {
  /** Unique ID of the label */
  key: string;
  /** Text to display on the label */
  name: string;
  /** X coordinate of the interest point */
  cx: number;
  /** Y coordinate of the interest point */
  cy: number;
  /** X coordinate of the label start */
  tx: number;
  /** Y coordinate of the label start */
  ty: number;
  /** The with of the label in pixels */
  labelWidth: number;
  /** Label position (right or left) */
  labelPosition: 'right' | 'left';
  /** True when the line is crossed by another line */
  isCrossed: boolean;
}

/**
 * Settings of the current chart
 */
export interface ChartProps {
  /**
   * Seed of the chart: the same seed will generate exactly the same random result
   * similar to how it works in MineCraft in order to allow to share the URL of any
   * unusual combination
   */
  seed?: string;
}
