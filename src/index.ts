// Theme
export type {
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
  ColorMode,
  DeepPartial,
} from './theme/types';
export { ThemeProvider } from './theme/ThemeProvider';
export { useTheme } from './theme/ThemeContext';
export { createTheme } from './theme/createTheme';
export type { CreateThemeOptions } from './theme/createTheme';
export { generatePalette } from './theme/generatePalette';

// Platform-inspired theme presets (012-platform-themes)
export { PureTheme } from './theme/presets/PureTheme';
export { BeautifulTheme } from './theme/presets/BeautifulTheme';
export { PencilTheme } from './theme/presets/PencilTheme';
export { AuroraTheme } from './theme/presets/AuroraTheme';
export { BreezeTheme } from './theme/presets/BreezeTheme';
export { NovaTheme } from './theme/presets/NovaTheme';
export { PulseTheme } from './theme/presets/PulseTheme';

// Tokens
export type { ColorScheme } from './tokens/colors';
export { baseLightColors, baseDarkColors } from './tokens/colors';
export type { TypographyScale, TypographyStyle } from './tokens/typography';
export { typography } from './tokens/typography';
export { spacing, getSpacing } from './tokens/spacing';
export { shape } from './tokens/shape';
export { elevation } from './tokens/elevation';
export { motion, motionDuration, motionEasing } from './tokens/motion';

// New tokens / shared types (009-mui-config-sync)
export type { SizeProp, SizeTokens } from './tokens/size';
export { SIZE_SCALE } from './tokens/size';
export type { ColorProp, SxObject, SxProps, SlotPropsConfig } from './types/shared';
export { isColorProp, colorRoleMap } from './types/shared';

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant } from './components/Button';

export { Card } from './components/Card';
export type { CardProps, CardVariant } from './components/Card';

export { TextField } from './components/TextField';
export type { TextFieldProps, TextFieldVariant } from './components/TextField';

export { AppBar } from './components/AppBar';
export type { AppBarProps, AppBarVariant } from './components/AppBar';

export { FAB } from './components/FAB';
export type { FABProps, FABSize, FABVariant } from './components/FAB';

export { Chip } from './components/Chip';
export type { ChipProps, ChipVariant } from './components/Chip';

export { Dialog } from './components/Dialog';
export type { DialogProps, DialogAction } from './components/Dialog';

export { BottomSheet } from './components/BottomSheet';
export type { BottomSheetProps } from './components/BottomSheet';

export { NavigationBar } from './components/NavigationBar';
export type { NavigationBarProps, NavigationBarItem } from './components/NavigationBar';
export { NavigationRail } from './components/NavigationRail';
export type { NavigationRailProps, NavigationRailItem } from './components/NavigationRail';

// New components (alphabetical)
export {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from './components/Accordion';
export type {
  AccordionProps,
  AccordionDataDrivenProps,
  AccordionComposableProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
  AccordionActionsProps,
} from './components/Accordion';

export { ActivityIndicator } from './components/ActivityIndicator';
export type { ActivityIndicatorProps } from './components/ActivityIndicator';

export { Alert } from './components/Alert';
export type { AlertProps, AlertSeverity } from './components/Alert';

export { Autocomplete } from './components/Autocomplete';
export type { AutocompleteProps, AutocompleteOption } from './components/Autocomplete';

export { Avatar } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { Backdrop } from './components/Backdrop';
export type { BackdropProps } from './components/Backdrop';

export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

export { Banner } from './components/Banner';
export type { BannerProps, BannerAction } from './components/Banner';

export { Box } from './components/Box';
export type { BoxProps } from './components/Box';

export { View } from './components/View';
export type { ViewProps } from './components/View';

export { Breadcrumbs } from './components/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/Breadcrumbs';

export { ButtonGroup, ButtonGroupContext } from './components/ButtonGroup';
export type { ButtonGroupProps, ButtonGroupContextValue } from './components/ButtonGroup';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps, CheckboxStatus } from './components/Checkbox';

export { Container } from './components/Container';
export type { ContainerProps, ContainerMaxWidth } from './components/Container';

export { DataTable } from './components/DataTable';
export type { DataTableProps, DataTableColumn } from './components/DataTable';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Drawer } from './components/Drawer';
export type { DrawerProps } from './components/Drawer';
export { SwipeableDrawer } from './components/SwipeableDrawer';
export type { SwipeableDrawerProps } from './components/SwipeableDrawer';

export { DrawerLayoutAndroid } from './components/DrawerLayoutAndroid';
export type { DrawerLayoutAndroidProps } from './components/DrawerLayoutAndroid';

export { FlatList } from './components/FlatList';
export type { FlatListProps, FlatListBaseProps } from './components/FlatList';

export { Grid, GridItem } from './components/Grid';
export type { GridProps, GridItemProps } from './components/Grid';

export { HelperText } from './components/HelperText';
export type { HelperTextProps } from './components/HelperText';

export { Icon } from './components/Icon';
export type { IconProps, IconSource } from './components/Icon';

export { IconButton } from './components/IconButton';
export type { IconButtonProps } from './components/IconButton';

export { Image } from './components/Image';
export type { ImageProps } from './components/Image';

export { ImageBackground } from './components/ImageBackground';
export type { ImageBackgroundProps } from './components/ImageBackground';

export { ImageList, ImageListItem } from './components/ImageList';
export type { ImageListProps, ImageListItemProps, ImageListVariant } from './components/ImageList';

export { Link } from './components/Link';
export type { LinkProps } from './components/Link';

export { KeyboardAvoidingView } from './components/KeyboardAvoidingView';
export type { KeyboardAvoidingViewProps } from './components/KeyboardAvoidingView';

export { MaterialIcon } from './components/MaterialIcon';
export { materialIconSource } from './components/MaterialIcon';
export type { MaterialIconProps, IconVariant, MaterialIconName } from './components/MaterialIcon';

export {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListSection,
  ListAccordion,
} from './components/List';
export type {
  ListProps,
  ListItemProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemAvatarProps,
  ListItemTextProps,
  ListSubheaderProps,
  ListSectionProps,
  ListAccordionProps,
} from './components/List';

export { Menu, MenuItem } from './components/Menu';
export type { MenuProps, MenuItemProps } from './components/Menu';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { NumberField } from './components/NumberField';
export type { NumberFieldProps } from './components/NumberField';

export { Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';

export { Paper, Paper as Surface } from './components/Paper';
export type { PaperProps, PaperElevation, PaperMode, PaperProps as SurfaceProps } from './components/Paper';

export { Portal, PortalHost } from './components/Portal';
export type { PortalProps, PortalHostProps } from './components/Portal';

export { Pressable } from './components/Pressable';
export type { PressableProps } from './components/Pressable';

export { RadioButton, Radio, RadioGroup } from './components/RadioButton';
export type { RadioButtonProps, RadioGroupProps, RadioGroupContextValue, RadioProps } from './components/RadioButton';

export { Rating } from './components/Rating';
export type { RatingProps } from './components/Rating';

export { RefreshControl } from './components/RefreshControl';
export type { RefreshControlProps } from './components/RefreshControl';

export { SafeAreaView } from './components/SafeAreaView';
export type { SafeAreaViewProps } from './components/SafeAreaView';

export { ScrollView } from './components/ScrollView';
export type { ScrollViewProps } from './components/ScrollView';

export { SectionList } from './components/SectionList';
export type { SectionListProps, SectionListBaseProps } from './components/SectionList';

export { Searchbar } from './components/Searchbar';
export type { SearchbarProps } from './components/Searchbar';

export { SegmentedButtons } from './components/SegmentedButtons';
export type { SegmentedButtonsProps, SegmentButtonItem, SegmentDensity } from './components/SegmentedButtons';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps } from './components/Skeleton';

export { Slider } from './components/Slider';
export type { SliderProps, SliderMark } from './components/Slider';

export { Snackbar, SnackbarHost, useSnackbar } from './components/Snackbar';
export type { SnackbarProps, SnackbarItem, SnackbarHostProps, SnackbarContextValue, SnackbarDuration } from './components/Snackbar';

export { SpeedDial } from './components/SpeedDial';
export type { SpeedDialProps, SpeedDialActionItem } from './components/SpeedDial';

export { Stack } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Stepper, Step, StepLabel, StepContent, StepConnector, MobileStepper } from './components/Stepper';
export type {
  StepperProps,
  StepperDataDrivenProps,
  StepperComposableProps,
  StepItem,
  StepState,
  StepProps,
  StepLabelProps,
  StepContentProps,
  StepConnectorProps,
  MobileStepperProps,
  MobileStepperVariant,
  MobileStepperPosition,
} from './components/Stepper';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Tabs, TabPanel } from './components/Tabs';
export type { TabsProps, TabItem } from './components/Tabs';

export { Text } from './components/Text';
export type { TextProps, TypeScaleVariant } from './components/Text';

export { TextInput } from './components/TextInput';
export type { TextInputProps } from './components/TextInput';

export { ToggleButton, ToggleButtonGroup } from './components/ToggleButton';
export type { ToggleButtonProps, ToggleButtonGroupProps, ToggleButtonGroupContextValue } from './components/ToggleButton';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

export { TouchableRipple } from './components/TouchableRipple';
export type { TouchableRippleProps } from './components/TouchableRipple';

export { TouchableOpacity } from './components/TouchableOpacity';
export type { TouchableOpacityProps } from './components/TouchableOpacity';

export { TouchableHighlight } from './components/TouchableHighlight';
export type { TouchableHighlightProps } from './components/TouchableHighlight';

export { TransferList } from './components/TransferList';
export type { TransferListProps, TransferItem } from './components/TransferList';

// Progress indicators
export { CircularProgress } from './components/CircularProgress';
export type { CircularProgressProps, CircularProgressVariant } from './components/CircularProgress';

export { LinearProgress, LinearProgress as ProgressBar } from './components/LinearProgress';
export type { LinearProgressProps, LinearProgressVariant, LinearProgressProps as ProgressBarProps } from './components/LinearProgress';

// Popover
export { Popover } from './components/Popover';
export type { PopoverProps, AnchorOrigin } from './components/Popover';

// Hooks
export { useMediaQuery } from './hooks/useMediaQuery';

// Transition components
export { Fade } from './components/Fade';
export type { FadeProps } from './components/Fade';

export { Grow } from './components/Grow';
export type { GrowProps } from './components/Grow';

export { Slide } from './components/Slide';
export type { SlideProps, SlideDirection } from './components/Slide';

export { Zoom } from './components/Zoom';
export type { ZoomProps } from './components/Zoom';

export { Collapse } from './components/Collapse';
export type { CollapseProps } from './components/Collapse';

// Popper
export { Popper } from './components/Popper';
export type { PopperProps, PopperPlacement } from './components/Popper';

// Masonry
export { Masonry } from './components/Masonry';
export type { MasonryProps } from './components/Masonry';

// Timeline
export { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from './components/Timeline';
export type { TimelineProps, TimelinePosition, TimelineItemProps, TimelineSeparatorProps, TimelineDotProps, TimelineDotVariant, TimelineDotColor, TimelineConnectorProps, TimelineContentProps, TimelineOppositeContentProps } from './components/Timeline';

// Feature 005 — Advanced MUI Components
export { DatePicker, LocalizationProvider, useLocalization, IntlDateAdapter } from './components/DatePicker';
export type { DatePickerProps, DateAdapter, LocalizationProviderProps, PickerBaseProps, PickerValidationProps, PickerSlots, MaybeDate } from './components/DatePicker';

export { TimePicker } from './components/TimePicker';
export type { TimePickerProps } from './components/TimePicker';

export { DateTimePicker } from './components/DateTimePicker';
export type { DateTimePickerProps } from './components/DateTimePicker';

export { DataGrid, useGridApiRef } from './components/DataGrid';
export type { DataGridProps, GridColDef, GridRowData, GridRowId, GridSortItem, GridSortModel, GridFilterItem, GridFilterModel, GridPaginationModel, GridSelectionModel, GridApiRef, GridDensity, GridEditMode } from './components/DataGrid';

export { BarChart, LineChart, ChartLegend, ChartLoadingOverlay } from './components/Charts';
export * as seriesAdapter from './components/Charts';
export type { BarChartProps, LineChartProps, ChartSeries, ChartDataPoint, ChartAxisConfig, ChartBaseProps } from './components/Charts';

export { SimpleTreeView, TreeItem } from './components/TreeView';
export type { SimpleTreeViewProps, TreeItemProps, TreeViewItemId, TreeViewContextValue } from './components/TreeView';

// Feature 008 — Domain components
export { CodeInput } from './components/CodeInput/CodeInput';
export type { CodeInputProps } from './components/CodeInput/CodeInput';

export { default as HumanizationScoreBar } from './components/HumanizationScoreBar/HumanizationScoreBar';
export type { HumanizationScoreBarProps } from './components/HumanizationScoreBar/HumanizationScoreBar';

export { InvitationStatusBadge } from './components/InvitationStatusBadge/InvitationStatusBadge';
export type { InvitationStatus } from './components/InvitationStatusBadge/InvitationStatusBadge';

export { default as WorkerAgentRow } from './components/WorkerAgentRow/WorkerAgentRow';
export type { WorkerAgentRowProps } from './components/WorkerAgentRow/WorkerAgentRow';

// Feature 010 — Full MUI Alignment

// AvatarGroup
export { AvatarGroup } from './components/AvatarGroup';
export type { AvatarGroupProps } from './components/AvatarGroup';

// Card sub-components
export { CardHeader, CardMedia, CardContent, CardActions, CardActionArea } from './components/Card';
export type { CardHeaderProps, CardMediaProps, CardContentProps, CardActionsProps, CardActionAreaProps } from './components/Card';

// Dialog sub-components
export { DialogTitle, DialogContent, DialogContentText, DialogActions } from './components/Dialog';
export type { DialogTitleProps, DialogContentProps, DialogContentTextProps, DialogActionsProps } from './components/Dialog';

// Table family
export { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TableSortLabel, TablePagination } from './components/Table';
export type { TableContainerProps, TableProps, TableHeadProps, TableBodyProps, TableFooterProps, TableRowProps, TableCellProps, TableSortLabelProps, TablePaginationProps } from './components/Table';

// Typography MD2 variant map
export type { TypographyMD2Variant } from './tokens/typography';
export { typographyVariantMap } from './tokens/typography';

// Typography alias — MUI Web naming compatibility (source: Text component)
export { Text as Typography } from './components/Text';
export type { TextProps as TypographyProps } from './components/Text';

export { VirtualizedList } from './components/VirtualizedList';
export type { VirtualizedListProps, VirtualizedListBaseProps } from './components/VirtualizedList';

// ─── React Native core utilities ─────────────────────────────────────────────
// Re-exported for consumers who want a single import surface.
// These are standard RN APIs with no wrapping applied.
export {
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
  LayoutAnimation,
  Linking,
  Vibration,
  AppState,
  Keyboard,
  useColorScheme,
  StatusBar,
  // Re-exported as NativeAlert to avoid conflict with the MUI Alert component
  Alert as NativeAlert,
  // Android-specific APIs
  BackHandler,
  PermissionsAndroid,
  ToastAndroid,
  // iOS-specific APIs
  ActionSheetIOS,
  // Utility APIs
  PixelRatio,
  AccessibilityInfo,
  AppRegistry,
  Easing,
  InteractionManager,
  NativeEventEmitter,
  NativeModules,
  PanResponder,
  PlatformColor,
  Share,
  // Hooks
  useWindowDimensions,
  useAnimatedValue,
} from 'react-native';


