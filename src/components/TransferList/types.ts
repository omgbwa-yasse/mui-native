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
  testID?: string;
}
