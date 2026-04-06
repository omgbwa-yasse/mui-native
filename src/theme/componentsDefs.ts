/**
 * ComponentsConfig — maps every component name to its override shape.
 *
 * This file is the registry that allows `createTheme({ components: { ... } })`
 * callers to set `defaultProps` and `styleOverrides` for any component.
 *
 * Implementation notes:
 *  - Keys are unprefixed component display names (e.g. 'Button', not 'MuiButton').
 *  - `defaultProps` are merged at render time by `useComponentDefaults` (not at
 *    createTheme() time), so component prop types are resolved correctly.
 *  - `styleOverrides` are plain-object style maps compatible with React Native.
 */

import type { AccordionProps } from '../components/Accordion/types';
import type { ActivityIndicatorProps } from '../components/ActivityIndicator/types';
import type { AlertProps } from '../components/Alert/types';
import type { AppBarProps } from '../components/AppBar/types';
import type { AutocompleteProps } from '../components/Autocomplete/types';
import type { AvatarProps } from '../components/Avatar/types';
import type { BackdropProps } from '../components/Backdrop/types';
import type { BadgeProps } from '../components/Badge/types';
import type { BannerProps } from '../components/Banner/types';
import type { BottomSheetProps } from '../components/BottomSheet/types';
import type { BoxProps } from '../components/Box/types';
import type { BreadcrumbsProps } from '../components/Breadcrumbs/types';
import type { ButtonProps } from '../components/Button/types';
import type { ButtonGroupProps } from '../components/ButtonGroup/types';
import type { CardProps } from '../components/Card/types';
import type { ChartBaseProps } from '../components/Charts/types';
import type { CheckboxProps } from '../components/Checkbox/types';
import type { ChipProps } from '../components/Chip/types';
import type { CircularProgressProps } from '../components/CircularProgress/types';
import type { CollapseProps } from '../components/Collapse/types';
import type { ContainerProps } from '../components/Container/types';
import type { DataGridBaseProps } from '../components/DataGrid/types';
import type { DataTableProps } from '../components/DataTable/types';
import type { PickerBaseProps } from '../components/DatePicker/types';
import type { DateTimePickerProps } from '../components/DateTimePicker/types';
import type { DialogProps } from '../components/Dialog/types';
import type { DividerProps } from '../components/Divider/types';
import type { DrawerProps } from '../components/Drawer/types';
import type { FABProps } from '../components/FAB/types';
import type { TransitionBaseProps } from '../components/Fade/types';
import type { GridProps } from '../components/Grid/types';
import type { GrowProps } from '../components/Grow/types';
import type { HelperTextProps } from '../components/HelperText/types';
import type { IconProps } from '../components/Icon/types';
import type { IconButtonProps } from '../components/IconButton/types';
import type { ImageListItemProps } from '../components/ImageList/types';
import type { LinearProgressProps } from '../components/LinearProgress/types';
import type { LinkProps } from '../components/Link/types';
import type { ListProps } from '../components/List/types';
import type { MasonryProps } from '../components/Masonry/types';
import type { MaterialIconProps } from '../components/MaterialIcon/types';
import type { MenuItemProps } from '../components/Menu/types';
import type { ModalProps } from '../components/Modal/types';
import type { NavigationBarProps } from '../components/NavigationBar/types';
import type { NumberFieldProps } from '../components/NumberField/types';
import type { PaginationProps } from '../components/Pagination/types';
import type { PaperProps } from '../components/Paper/types';
import type { PopoverProps } from '../components/Popover/types';
import type { PopperProps } from '../components/Popper/types';
import type { PortalProps } from '../components/Portal/types';
import type { RadioGroupProps } from '../components/RadioButton/types';
import type { RatingProps } from '../components/Rating/types';
import type { SearchbarProps } from '../components/Searchbar/types';
import type { SegmentedButtonsProps } from '../components/SegmentedButtons/types';
import type { SelectProps } from '../components/Select/types';
import type { SkeletonProps } from '../components/Skeleton/types';
import type { SlideProps } from '../components/Slide/types';
import type { SliderProps } from '../components/Slider/types';
import type { SnackbarProps } from '../components/Snackbar/types';
import type { SpeedDialProps } from '../components/SpeedDial/types';
import type { StackProps } from '../components/Stack/types';
import type { StepperProps } from '../components/Stepper/types';
import type { SwitchProps } from '../components/Switch/types';
import type { TabsProps } from '../components/Tabs/types';
import type { TextProps } from '../components/Text/types';
import type { TextFieldProps } from '../components/TextField/types';
import type { TimelineProps } from '../components/Timeline/types';
import type { TimePickerProps } from '../components/TimePicker/types';
import type { ToggleButtonGroupProps } from '../components/ToggleButton/types';
import type { TooltipProps } from '../components/Tooltip/types';
import type { TouchableRippleProps } from '../components/TouchableRipple/types';
import type { TransferListProps } from '../components/TransferList/types';
import type { TreeItemProps } from '../components/TreeView/types';
import type { ZoomProps } from '../components/Zoom/types';

// Components without a separate types.ts — import from the tsx directly
import React from 'react';
import type { CodeInputProps } from '../components/CodeInput/CodeInput';
import type { HumanizationScoreBarProps } from '../components/HumanizationScoreBar/HumanizationScoreBar';
import type { InvitationStatusBadge as _InvitationStatusBadge } from '../components/InvitationStatusBadge/InvitationStatusBadge';
type InvitationStatusBadgeProps = React.ComponentProps<typeof _InvitationStatusBadge>;
import type { WorkerAgentRowProps } from '../components/WorkerAgentRow/WorkerAgentRow';

// ─── ComponentPropsMap ────────────────────────────────────────────────────────

/**
 * Maps every component name (unprefixed) to its full props interface.
 * This is the single source of truth for `ComponentsConfig` key types.
 */
export interface ComponentPropsMap {
  Accordion: AccordionProps;
  ActivityIndicator: ActivityIndicatorProps;
  Alert: AlertProps;
  AppBar: AppBarProps;
  Autocomplete: AutocompleteProps;
  Avatar: AvatarProps;
  Backdrop: BackdropProps;
  Badge: BadgeProps;
  Banner: BannerProps;
  BottomSheet: BottomSheetProps;
  Box: BoxProps;
  Breadcrumbs: BreadcrumbsProps;
  Button: ButtonProps;
  ButtonGroup: ButtonGroupProps;
  Card: CardProps;
  Charts: ChartBaseProps;
  Checkbox: CheckboxProps;
  Chip: ChipProps;
  CircularProgress: CircularProgressProps;
  CodeInput: CodeInputProps;
  Collapse: CollapseProps;
  Container: ContainerProps;
  DataGrid: DataGridBaseProps;
  DataTable: DataTableProps;
  DatePicker: PickerBaseProps;
  DateTimePicker: DateTimePickerProps;
  Dialog: DialogProps;
  Divider: DividerProps;
  Drawer: DrawerProps;
  FAB: FABProps;
  Fade: TransitionBaseProps;
  Grid: GridProps;
  Grow: GrowProps;
  HelperText: HelperTextProps;
  HumanizationScoreBar: HumanizationScoreBarProps;
  Icon: IconProps;
  IconButton: IconButtonProps;
  ImageList: ImageListItemProps;
  InvitationStatusBadge: InvitationStatusBadgeProps;
  LinearProgress: LinearProgressProps;
  Link: LinkProps;
  List: ListProps;
  Masonry: MasonryProps;
  MaterialIcon: MaterialIconProps;
  Menu: MenuItemProps;
  Modal: ModalProps;
  NavigationBar: NavigationBarProps;
  NumberField: NumberFieldProps;
  Pagination: PaginationProps;
  Paper: PaperProps;
  Popover: PopoverProps;
  Popper: PopperProps;
  Portal: PortalProps;
  RadioButton: RadioGroupProps;
  Rating: RatingProps;
  Searchbar: SearchbarProps;
  SegmentedButtons: SegmentedButtonsProps;
  Select: SelectProps;
  Skeleton: SkeletonProps;
  Slide: SlideProps;
  Slider: SliderProps;
  Snackbar: SnackbarProps;
  SpeedDial: SpeedDialProps;
  Stack: StackProps;
  Stepper: StepperProps;
  Switch: SwitchProps;
  Tabs: TabsProps;
  Text: TextProps;
  TextField: TextFieldProps;
  Timeline: TimelineProps;
  TimePicker: TimePickerProps;
  ToggleButton: ToggleButtonGroupProps;
  Tooltip: TooltipProps;
  TouchableRipple: TouchableRippleProps;
  TransferList: TransferListProps;
  TreeView: TreeItemProps;
  WorkerAgentRow: WorkerAgentRowProps;
  Zoom: ZoomProps;
}

// ─── ComponentOverride ────────────────────────────────────────────────────────

/**
 * Override shape for a single component.
 *
 * - `defaultProps`     — prop values used as fallbacks when a consuming component
 *                        does not pass those props explicitly.
 * - `styleOverrides`   — named React Native style overrides keyed by slot name
 *                        (e.g. `'root'`, `'label'`). Applied before instance style.
 */
export interface ComponentOverride<TProps> {
  defaultProps?: Partial<TProps>;
  styleOverrides?: Record<string, object>;
}

// ─── ComponentsConfig ─────────────────────────────────────────────────────────

/**
 * The full `theme.components` config shape.
 * Every entry is optional — omitting a key leaves that component using its
 * own built-in defaults.
 */
export type ComponentsConfig = {
  [K in keyof ComponentPropsMap]?: ComponentOverride<ComponentPropsMap[K]>;
};
