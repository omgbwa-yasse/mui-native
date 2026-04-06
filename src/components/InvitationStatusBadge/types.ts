import type { StyleProp, ViewStyle } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps } from '../../types/shared';

export type InvitationStatus = 'active' | 'expired' | 'revoked' | 'converted';

export interface InvitationStatusBadgeProps {
  status: InvitationStatus;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
