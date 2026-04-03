export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
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
}
