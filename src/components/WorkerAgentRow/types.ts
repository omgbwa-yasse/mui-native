import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface WorkerAgentRowProps {
  workerId: string;
  sectionIndex: number;
  status: string;
  progressPercent: number;
  /** Optional label for the section heading. */
  label?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
