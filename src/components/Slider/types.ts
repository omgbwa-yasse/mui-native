export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  marks?: boolean | SliderMark[];
  testID?: string;
  accessibilityLabel?: string;
}
