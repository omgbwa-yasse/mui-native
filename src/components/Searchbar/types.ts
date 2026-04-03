export interface SearchbarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  onClearIconPress?: () => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
}
