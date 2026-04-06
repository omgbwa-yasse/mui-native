import type { StyleProp, ViewStyle, ViewProps, TextInputProps } from 'react-native';
import type { SizeProp } from '../../tokens/size';
import type { ColorProp, SxProps, SlotPropsConfig } from '../../types/shared';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteSlots {
  [key: string]: React.ComponentType<any>;
  Root: React.ComponentType<ViewProps>;
  Input: React.ComponentType<TextInputProps>;
  Dropdown: React.ComponentType<ViewProps>;
  Option: React.ComponentType<ViewProps>;
  Loading: React.ComponentType<ViewProps>;
  NoOptions: React.ComponentType<ViewProps>;
}

export interface AutocompleteProps extends SlotPropsConfig<AutocompleteSlots> {
  value: string | string[] | null;
  onValueChange: (value: string | string[] | null) => void;
  options: AutocompleteOption[];
  filterOptions?: (
    options: AutocompleteOption[],
    inputValue: string
  ) => AutocompleteOption[];
  getOptionLabel?: (option: AutocompleteOption) => string;
  inputValue?: string;
  onInputChange?: (inputValue: string) => void;
  multiple?: boolean;
  freeSolo?: boolean;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  testID?: string;
  size?: SizeProp;
  color?: ColorProp;
  sx?: SxProps;
  style?: StyleProp<ViewStyle>;
}
