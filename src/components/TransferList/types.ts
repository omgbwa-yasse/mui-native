import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export interface TransferItem {
  id: string;
  label: string;
}

export interface TransferListProps {
  left: TransferItem[];
  right: TransferItem[];
  onTransfer: (left: TransferItem[], right: TransferItem[]) => void;
  leftTitle?: string;
  rightTitle?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
