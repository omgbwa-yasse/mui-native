# MUI X Advanced Components — API Reference

> Source: [mui.com/x/api](https://mui.com/x/)  
> MUI X version: **v8.28.2**  
> Collected for feature `005-mui-advanced-components`

---

## Table of Contents

1. [Date & Time Pickers](#1-date--time-pickers)
   - [DatePicker](#11-datepicker)
   - [TimePicker](#12-timepicker)
   - [DateTimePicker](#13-datetimepicker)
   - [LocalizationProvider (required wrapper)](#14-localizationprovider-required-wrapper)
2. [Charts](#2-charts)
   - [BarChart](#21-barchart)
   - [LineChart](#22-linechart)
   - [ChartsContainer (composition API)](#23-chartscontainer-composition-api)
3. [TreeView](#3-treeview)
   - [SimpleTreeView](#31-simpletreeview)
   - [TreeItem](#32-treeitem)
4. [DataGrid](#4-datagrid)

---

## 1. Date & Time Pickers

**Package**: `@mui/x-date-pickers`  
**Install**: `npm install @mui/x-date-pickers`  
**Peer dependency**: A date adapter (e.g. `@date-io/dayjs`, `@date-io/date-fns`, `@date-io/luxon`)

> All picker components **must** be wrapped in `<LocalizationProvider dateAdapter={...}>`.

---

### 1.1 DatePicker

**Import**:
```ts
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
```

**API**: https://mui.com/x/api/date-pickers/date-picker/

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `object` | — | Controlled selected date |
| `defaultValue` | `object` | — | Uncontrolled default date |
| `onChange` | `func` | — | `(value, context) => void` — fires on every change |
| `onAccept` | `func` | — | Fires when the user confirms the value |
| `onError` | `func` | — | `(error, value) => void` |
| `label` | `node` | — | Input field label |
| `disabled` | `bool` | `false` | Disables interaction |
| `readOnly` | `bool` | `false` | Display only, no editing |
| `open` | `bool` | `false` | Controlled open/close state |
| `onOpen` | `func` | — | Popup open callback |
| `onClose` | `func` | — | Popup close callback |
| `closeOnSelect` | `bool` | `true` (desktop) | Auto-close after selection |
| `disableOpenPicker` | `bool` | `false` | Hide the calendar icon button |
| `format` | `string` | — | Display format string |
| `views` | `Array<'day'\|'month'\|'year'>` | — | Available calendar views |
| `openTo` | `'day'\|'month'\|'year'` | — | Default visible view |
| `minDate` | `object` | `1900-01-01` | Minimum selectable date |
| `maxDate` | `object` | `2099-12-31` | Maximum selectable date |
| `disableFuture` | `bool` | `false` | Disables dates after today |
| `disablePast` | `bool` | `false` | Disables dates before today |
| `shouldDisableDate` | `func` | — | `(day) => boolean` |
| `shouldDisableMonth` | `func` | — | `(month) => boolean` |
| `shouldDisableYear` | `func` | — | `(year) => boolean` |
| `displayWeekNumber` | `bool` | — | Show week numbers in calendar |
| `loading` | `bool` | `false` | Show loading state |
| `orientation` | `'landscape'\|'portrait'` | — | Force calendar orientation |
| `reduceAnimations` | `bool` | from media query | Disable heavy animations |
| `timezone` | `string` | from value | e.g. `"UTC"`, `"America/New_York"` |
| `referenceDate` | `object` | — | Reference when value is empty |
| `inputRef` | `ref` | — | Ref to the input element |
| `name` | `string` | — | HTML name attribute |
| `localeText` | `object` | — | i18n text overrides |
| `slotProps` | `object` | `{}` | Props for each slot component |
| `slots` | `object` | `{}` | Component slot overrides |
| `sx` | `object\|array\|func` | — | MUI sx styling prop |
| `yearsOrder` | `'asc'\|'desc'` | `'asc'` | Year list ordering |
| `fixedWeekNumber` | `number` | — | Fixed number of calendar weeks |
| `monthsPerRow` | `3\|4` | `3` | Months per row in month view |
| `yearsPerRow` | `3\|4` | `4` (desktop) | Years per row in year view |
| `showDaysOutsideCurrentMonth` | `bool` | `false` | Show prev/next month days |
| `dayOfWeekFormatter` | `func` | — | Format `(date) => string` for weekday headers |

#### Key Slots

| Slot | Default Component | Description |
|------|------------------|-------------|
| `textField` | `PickersTextField` | The input field |
| `field` | — | Keyboard input component |
| `toolbar` | `DatePickerToolbar` | Top toolbar |
| `actionBar` | `PickersActionBar` | Bottom action bar |
| `calendarHeader` | `PickersCalendarHeader` | Month/year navigation header |
| `day` | `PickersDay` | Individual day cell |
| `leftArrowIcon` / `rightArrowIcon` | `ArrowLeft` / `ArrowRight` | Navigation arrows |
| `openPickerButton` | `IconButton` | Calendar open button |
| `openPickerIcon` | — | Icon inside open button |
| `popper` | `Popper` | Desktop popup container |
| `dialog` | `PickersModalDialogRoot` | Mobile dialog container |
| `shortcuts` | `PickersShortcuts` | Keyboard shortcut hints |
| `switchViewButton` | `IconButton` | View switch button |

---

### 1.2 TimePicker

**Import**:
```ts
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
```

**API**: https://mui.com/x/api/date-pickers/time-picker/

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `object` | — | Controlled time value |
| `defaultValue` | `object` | — | Uncontrolled default |
| `onChange` | `func` | — | `(value, context) => void` |
| `onAccept` | `func` | — | Fires on user confirmation |
| `onError` | `func` | — | `(error, value) => void` |
| `label` | `node` | — | Input label |
| `disabled` | `bool` | `false` | Disable interaction |
| `readOnly` | `bool` | `false` | Read-only mode |
| `open` | `bool` | `false` | Controlled open state |
| `onOpen` / `onClose` | `func` | — | Open/close callbacks |
| `closeOnSelect` | `bool` | `false` | Auto-close after selection |
| `disableOpenPicker` | `bool` | `false` | Hide clock button |
| `format` | `string` | — | Display format string |
| `views` | `Array<'hours'\|'minutes'\|'seconds'>` | — | Available time views |
| `openTo` | `'hours'\|'meridiem'\|'minutes'\|'seconds'` | — | Initial view |
| `ampm` | `bool` | locale-based | 12h vs 24h clock |
| `ampmInClock` | `bool` | `true` (desktop) | Show AM/PM in clock face |
| `minutesStep` | `number` | `1` | Minute selection increment |
| `timeSteps` | `{hours?,minutes?,seconds?}` | `{h:1,m:5,s:5}` | Clock step increments |
| `minTime` | `object` | — | Minimum selectable time |
| `maxTime` | `object` | — | Maximum selectable time |
| `disableFuture` | `bool` | `false` | Disable future times |
| `disablePast` | `bool` | `false` | Disable past times |
| `shouldDisableTime` | `func` | — | `(value, view) => boolean` |
| `skipDisabled` | `bool` | `false` | Hide disabled clock items |
| `thresholdToRenderTimeInASingleColumn` | `number` | `24` | Threshold for single-column layout |
| `orientation` | `'landscape'\|'portrait'` | — | Force orientation |
| `reduceAnimations` | `bool` | from media query | Disable animations |
| `timezone` | `string` | from value | Timezone string |
| `localeText` | `object` | — | i18n text overrides |
| `name` | `string` | — | HTML name attribute |
| `inputRef` | `ref` | — | Ref to input element |
| `slotProps` | `object` | `{}` | Slot props |
| `slots` | `object` | `{}` | Component slot overrides |
| `sx` | `object\|array\|func` | — | MUI sx prop |

#### Key Slots

| Slot | Default Component | Description |
|------|------------------|-------------|
| `textField` | `PickersTextField` | Input field |
| `field` | — | Keyboard input |
| `toolbar` | `TimePickerToolbar` | Top toolbar |
| `actionBar` | `PickersActionBar` | Bottom action bar |
| `digitalClockItem` | `MenuItem` | Single clock option item |
| `digitalClockSectionItem` | `MenuItem` | Multi-section clock item |
| `openPickerButton` | `IconButton` | Clock open button |
| `openPickerIcon` | — | Icon inside open button |
| `clearButton` | `IconButton` | Clear value button |
| `clearIcon` | `ClearIcon` | Clear button icon |
| `popper` | `Popper` | Desktop popup |
| `dialog` | `PickersModalDialogRoot` | Mobile dialog |

---

### 1.3 DateTimePicker

**Import**:
```ts
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
```

**API**: https://mui.com/x/api/date-pickers/date-time-picker/

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `object` | — | Controlled date-time value |
| `defaultValue` | `object` | — | Uncontrolled default |
| `onChange` | `func` | — | `(value, context) => void` |
| `onAccept` | `func` | — | Fires on full selection |
| `onError` | `func` | — | `(error, value) => void` |
| `label` | `node` | — | Input label |
| `disabled` | `bool` | `false` | Disable component |
| `readOnly` | `bool` | `false` | Read-only mode |
| `open` | `bool` | `false` | Controlled open state |
| `onOpen` / `onClose` | `func` | — | Open/close callbacks |
| `closeOnSelect` | `bool` | `false` | Auto-close after full selection |
| `disableOpenPicker` | `bool` | `false` | Hide picker button |
| `format` | `string` | — | Display format |
| `views` | `Array<'day'\|'hours'\|'minutes'\|'month'\|'seconds'\|'year'>` | — | Available views |
| `openTo` | `'day'\|'hours'\|'meridiem'\|'minutes'\|'month'\|'seconds'\|'year'` | — | Default visible view |
| `minDate` / `maxDate` | `object` | `1900-01-01` / `2099-12-31` | Date bounds |
| `minDateTime` / `maxDateTime` | `object` | — | DateTime bounds |
| `minTime` / `maxTime` | `object` | — | Time bounds |
| `ampm` | `bool` | locale-based | 12h vs 24h |
| `minutesStep` | `number` | `1` | Minute step |
| `timeSteps` | `{hours?,minutes?,seconds?}` | `{h:1,m:5,s:5}` | Clock steps |
| `timezone` | `string` | from value | Timezone string |
| `disableFuture` / `disablePast` | `bool` | `false` | Disable date ranges |
| `shouldDisableDate/Month/Year/Time` | `func` | — | Custom disable logic |
| `displayWeekNumber` | `bool` | — | Show week numbers |
| `loading` | `bool` | `false` | Loading state |
| `orientation` | `'landscape'\|'portrait'` | — | Force orientation |
| `reduceAnimations` | `bool` | from media query | Disable animations |
| `localeText` | `object` | — | i18n text overrides |
| `slotProps` | `object` | `{}` | Slot props |
| `slots` | `object` | `{}` | Slot overrides |
| `sx` | `object\|array\|func` | — | MUI sx prop |

#### Key Slots

| Slot | Default Component | Description |
|------|------------------|-------------|
| `textField` | `PickersTextField` | Input field |
| `field` | — | Keyboard input |
| `tabs` | `DateTimePickerTabs` | Date/Time tab switcher |
| `toolbar` | — | Top toolbar |
| `actionBar` | `PickersActionBar` | Bottom action bar |
| `calendarHeader` | `PickersCalendarHeader` | Month/year navigation |
| `day` | `PickersDay` | Day cell |
| `openPickerButton` | `IconButton` | Picker open button |
| `openPickerIcon` | — | Button icon |
| `layout` | — | Wraps entire picker layout |
| `popper` | `Popper` | Desktop popup |
| `dialog` | `PickersModalDialogRoot` | Mobile dialog |

---

### 1.4 LocalizationProvider (required wrapper)

**Import**:
```ts
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
```

**Usage**:
```tsx
<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
  <DatePicker ... />
  <TimePicker ... />
  <DateTimePicker ... />
</LocalizationProvider>
```

**Supported adapters**: `AdapterDayjs`, `AdapterDateFns`, `AdapterLuxon`, `AdapterMoment`

| Prop | Type | Description |
|------|------|-------------|
| `dateAdapter` | `class` | **Required** — adapter class |
| `adapterLocale` | `string\|object` | Locale for the adapter (e.g. `"fr"`, `"en-US"`) |
| `localeText` | `object` | Override component text strings |

---

## 2. Charts

**Package**: `@mui/x-charts`  
**Install**: `npm install @mui/x-charts`  
**Note**: No wrapper component required. Charts are self-contained SVG components.

---

### 2.1 BarChart

**Import**:
```ts
import { BarChart } from '@mui/x-charts/BarChart';
```

**API**: https://mui.com/x/api/charts/bar-chart/

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `series` | `Array<object>` | — | **Required** — bar series data (array of `BarSeries`) |
| `width` | `number` | parent width | Chart width in px |
| `height` | `number` | parent height | Chart height in px |
| `xAxis` | `Array<object>` | — | X-axis configuration array |
| `yAxis` | `Array<object>` | — | Y-axis configuration array |
| `dataset` | `Array<object>` | — | Shared dataset; series can reference via `dataKey` |
| `colors` | `Array<string>\|func` | `rainbowSurgePalette` | Color palette |
| `layout` | `'horizontal'\|'vertical'` | `'vertical'` | Bar orientation |
| `borderRadius` | `number` | — | Bar corner radius |
| `loading` | `bool` | `false` | Show loading overlay |
| `grid` | `{horizontal?,vertical?}` | — | Show cartesian grid |
| `margin` | `number\|object` | — | SVG drawing margins `{top,bottom,left,right}` |
| `onAxisClick` | `func` | — | `(event, data) => void` — axis click |
| `onItemClick` | `func` | — | `(event, identifier) => void` — bar click |
| `highlightedItem` | `{dataIndex?,seriesId}` | — | Controlled highlighted bar |
| `hiddenItems` | `Array` | — | Controlled hidden series/items |
| `initialHiddenItems` | `Array` | — | Initially hidden (uncontrolled) |
| `hideLegend` | `bool` | — | Hide the legend |
| `skipAnimation` | `bool` | — | Skip animations |
| `showToolbar` | `bool` | `false` | Show default toolbar |
| `disableAxisListener` | `bool` | `false` | Disable mouse move on axes |
| `renderer` | `'svg-single'\|'svg-batch'` | `'svg-single'` | Rendering strategy |
| `axisHighlight` | `{x?,y?}` | — | Axis highlight config |
| `brushConfig` | `object` | — | Brush interaction |
| `localeText` | `object` | — | i18n text overrides |
| `slotProps` | `object` | `{}` | Slot props |
| `slots` | `object` | `{}` | Slot overrides |

#### Key Slots

| Slot | Description |
|------|-------------|
| `bar` | Bar element renderer (`BarElementPath`) |
| `barLabel` | Bar label renderer (`BarLabel`) |
| `axisLabel` | Axis label (`ChartsText`) |
| `axisTick` | Axis tick (`'line'`) |
| `axisTickLabel` | Tick label (`ChartsText`) |
| `legend` | Chart legend (`ChartsLegend`) |
| `tooltip` | Tooltip (`ChartsTooltipRoot`) |
| `toolbar` | Toolbar (`ChartsToolbar`) |
| `loadingOverlay` | Loading state overlay |
| `noDataOverlay` | No-data state overlay |

#### BarSeries Object

```ts
{
  id?: string | number;
  data: Array<number | null>;  // or use dataKey with dataset
  dataKey?: string;
  label?: string;
  color?: string;
  stack?: string;          // group bars for stacking
  stackOffset?: 'expand' | 'none' | 'diverging' | 'silhouette' | 'wiggle';
  valueFormatter?: (value, context) => string;
  highlightScope?: { highlighted?: 'item'|'series'|'none', faded?: 'global'|'series'|'none' };
}
```

---

### 2.2 LineChart

**Import**:
```ts
import { LineChart } from '@mui/x-charts/LineChart';
```

**API**: https://mui.com/x/api/charts/line-chart/

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `series` | `Array<object>` | — | **Required** — line series data (array of `LineSeries`) |
| `width` | `number` | parent width | Chart width in px |
| `height` | `number` | parent height | Chart height in px |
| `xAxis` | `Array<object>` | — | X-axis configuration |
| `yAxis` | `Array<object>` | — | Y-axis configuration |
| `dataset` | `Array<object>` | — | Shared dataset |
| `colors` | `Array<string>\|func` | `rainbowSurgePalette` | Color palette |
| `loading` | `bool` | `false` | Loading overlay |
| `grid` | `{horizontal?,vertical?}` | — | Cartesian grid |
| `margin` | `number\|object` | — | SVG margins |
| `onAxisClick` | `func` | — | Axis click handler |
| `onLineClick` | `func` | — | Line element click |
| `onAreaClick` | `func` | — | Area element click |
| `onMarkClick` | `func` | — | Data point mark click |
| `onItemClick` | `func` | — | Item click handler |
| `highlightedItem` | `object` | — | Controlled highlight |
| `hiddenItems` | `Array` | — | Hidden series |
| `initialHiddenItems` | `Array` | — | Initially hidden |
| `hideLegend` | `bool` | — | Hide legend |
| `skipAnimation` | `bool` | `false` | Skip animations |
| `showToolbar` | `bool` | `false` | Show toolbar |
| `disableAxisListener` | `bool` | `false` | Disable mouse move |
| `disableLineItemHighlight` | `bool` | — | Disable line highlight |
| `axisHighlight` | `{x?,y?}` | `{x:'line'}` | Axis highlight |
| `brushConfig` | `object` | — | Brush interaction |
| `localeText` | `object` | — | i18n text overrides |
| `slotProps` | `object` | `{}` | Slot props |
| `slots` | `object` | `{}` | Slot overrides |

#### Key Slots

| Slot | Description |
|------|-------------|
| `line` | Line element renderer (`LineElementPath`) |
| `area` | Area fill renderer (`AnimatedArea`) |
| `mark` | Data point mark |
| `lineHighlight` | Line hover highlight |
| `axisLabel` | Axis label |
| `legend` | Chart legend |
| `tooltip` | Tooltip |
| `toolbar` | Toolbar |
| `loadingOverlay` | Loading state |
| `noDataOverlay` | No-data state |

#### LineSeries Object

```ts
{
  id?: string | number;
  data: Array<number | null>;  // or use dataKey with dataset
  dataKey?: string;
  label?: string;
  color?: string;
  area?: boolean;             // fill area under the line
  showMark?: boolean | func;  // show/hide data point marks
  curve?: 'catmullRom' | 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepBefore' | 'stepAfter';
  connectNulls?: boolean;
  stackOffset?: string;
  valueFormatter?: (value, context) => string;
  highlightScope?: object;
}
```

---

### 2.3 ChartsContainer (composition API)

**Import**:
```ts
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
```

**API**: https://mui.com/x/api/charts/chart-container/

> Use `ChartsContainer` when you need full composition control over chart elements (axes, plots, tooltips, legends rendered separately).

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `series` | `Array<object>` | — | **Required** — chart series data |
| `width` | `number` | — | Width in px |
| `height` | `number` | — | Height in px |
| `xAxis` | `Array<object>` | — | X-axis configuration |
| `yAxis` | `Array<object>` | — | Y-axis configuration |
| `zAxis` | `Array<object>` | — | Z-axis (scatter charts) |
| `radiusAxis` | `Array<object>` | — | Radius axis (polar charts) |
| `rotationAxis` | `Array<object>` | — | Rotation axis (polar charts) |
| `colors` | `Array<string>\|func` | `rainbowSurgePalette` | Color palette |
| `dataset` | `Array<object>` | — | Shared dataset |
| `margin` | `number\|object` | — | Drawing area margins |
| `onAxisClick` | `func` | — | `(event, data) => void` |
| `onItemClick` | `func` | — | `(event, identifier) => void` |
| `onHighlightChange` | `func` | — | `(highlightedItem) => void` |
| `highlightedItem` | `object` | — | Controlled highlighted item |
| `hiddenItems` | `Array` | — | Controlled hidden items |
| `initialHiddenItems` | `Array` | — | Initially hidden (uncontrolled) |
| `skipAnimation` | `bool` | — | Skip animations |
| `disableAxisListener` | `bool` | `false` | No mouse move events |
| `disableVoronoi` | `bool` | — | Disable voronoi interaction |
| `brushConfig` | `object` | — | Brush interaction |
| `localeText` | `object` | — | i18n text |
| `experimentalFeatures` | `object` | — | Opt-in future features |
| `slotProps` | `object` | — | Slot props |
| `slots` | `object` | — | Slot overrides |

#### Axis Configuration Object

```ts
{
  id?: string | number;
  data?: any[];
  dataKey?: string;
  label?: string;
  min?: number | Date;
  max?: number | Date;
  scaleType?: 'linear' | 'log' | 'pow' | 'sqrt' | 'time' | 'utc' | 'band' | 'point';
  valueFormatter?: (value, context) => string;
  tickNumber?: number;
  tickMinStep?: number;
  tickMaxStep?: number;
  disableLine?: boolean;
  disableTicks?: boolean;
  colorMap?: object;
  domainLimit?: 'nice' | 'strict' | func;
}
```

---

## 3. TreeView

**Package**: `@mui/x-tree-view`  
**Install**: `npm install @mui/x-tree-view`

---

### 3.1 SimpleTreeView

**Import**:
```ts
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
```

**API**: https://mui.com/x/api/tree-view/simple-tree-view/

> `SimpleTreeView` renders the tree from JSX `<TreeItem>` children (declarative). For programmatic data, use `RichTreeView`.

#### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `node` | — | `<TreeItem>` nodes |
| `expandedItems` | `Array<string>` | — | Controlled expanded item IDs |
| `defaultExpandedItems` | `Array<string>` | `[]` | Uncontrolled initial expanded items |
| `selectedItems` | `any` | — | Controlled selected item IDs |
| `defaultSelectedItems` | `any` | `[]` | Uncontrolled initial selection |
| `multiSelect` | `bool` | `false` | Allow multiple selection |
| `checkboxSelection` | `bool` | `false` | Show selection checkboxes |
| `disableSelection` | `bool` | `false` | Prevent any selection |
| `disabledItemsFocusable` | `bool` | `false` | Allow focus on disabled items |
| `expansionTrigger` | `'content'\|'iconContainer'` | `'content'` | Click area for expand/collapse |
| `itemChildrenIndentation` | `number\|string` | `12px` | Indent depth per level |
| `selectionPropagation` | `{descendants?,parents?}` | both `false` | Cascade selection |
| `onExpandedItemsChange` | `func` | — | `(event, itemIds[]) => void` |
| `onItemExpansionToggle` | `func` | — | `(event, itemId, isExpanded) => void` |
| `onSelectedItemsChange` | `func` | — | `(event, itemIds) => void` |
| `onItemSelectionToggle` | `func` | — | `(event, itemId, isSelected) => void` |
| `onItemClick` | `func` | — | `(event, itemId) => void` |
| `onItemFocus` | `func` | — | `(event, itemId) => void` |
| `apiRef` | `object` | — | `useSimpleTreeViewApiRef()` |
| `slots` | `object` | — | Slot overrides |
| `slotProps` | `object` | — | Slot props |
| `sx` | `object\|array\|func` | — | MUI sx prop |

#### Slots

| Slot | Description |
|------|-------------|
| `root` | Root container element |
| `collapseIcon` | Icon shown when item is expanded |
| `expandIcon` | Icon shown when item is collapsed |
| `endIcon` | Icon shown on leaf items |

#### apiRef Methods

```ts
apiRef.current.focusItem(event, itemId)
apiRef.current.getItem(itemId)                        // Returns item data
apiRef.current.getItemDOMElement(itemId)              // Returns DOM node
apiRef.current.getItemOrderedChildrenIds(itemId)      // Returns ordered children IDs
apiRef.current.getItemTree()                          // Returns full tree structure
apiRef.current.getParentId(itemId)                    // Returns parent ID or null
apiRef.current.isItemExpanded(itemId)                 // Returns boolean
apiRef.current.setIsItemDisabled(itemId, isDisabled)
apiRef.current.setItemExpansion(event, itemId, isExpanded)
apiRef.current.setItemSelection(event, itemId, isSelected)
```

---

### 3.2 TreeItem

**Import**:
```ts
import { TreeItem } from '@mui/x-tree-view/TreeItem';
```

**API**: https://mui.com/x/api/tree-view/tree-item/

#### Core Props

| Prop | Type | Description |
|------|------|-------------|
| `itemId` | `string` | **Required** — unique identifier |
| `label` | `node` | Display label |
| `disabled` | `bool` | Disables this item |
| `children` | `node` | Nested `<TreeItem>` children |
| `slots` | `object` | Slot overrides |
| `slotProps` | `object` | Slot props |
| `sx` | `object` | MUI sx prop |

**Usage Example**:
```tsx
<SimpleTreeView defaultExpandedItems={['folder-1']}>
  <TreeItem itemId="folder-1" label="Documents">
    <TreeItem itemId="file-1" label="report.pdf" />
    <TreeItem itemId="file-2" label="notes.txt" />
  </TreeItem>
  <TreeItem itemId="folder-2" label="Images">
    <TreeItem itemId="file-3" label="photo.jpg" />
  </TreeItem>
</SimpleTreeView>
```

---

## 4. DataGrid

**Package**: `@mui/x-data-grid`  
**Install**: `npm install @mui/x-data-grid`  
**Note**: Community (free) tier. Pro/Premium tiers available for advanced features.

**Import**:
```ts
import { DataGrid } from '@mui/x-data-grid';
```

**API**: https://mui.com/x/api/data-grid/data-grid/

---

### Core Props (Required)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `Array<object>` | `[]` | **Required** — row data array (each row must have a unique `id` field by default) |
| `columns` | `Array<GridColDef>` | — | **Required** — column definitions |

### Data & State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `getRowId` | `func` | — | Custom row ID: `(row) => string\|number` |
| `loading` | `bool` | `false` | Show loading overlay |
| `initialState` | `object` | — | Uncontrolled initial grid state |
| `dataSource` | `{getRows, updateRow?}` | — | Server-side data source |
| `rowCount` | `number` | — | Total server-side row count |

### Layout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `density` | `'comfortable'\|'compact'\|'standard'` | `'standard'` | Row density |
| `columnHeaderHeight` | `number` | `56` | Header height in px |
| `rowHeight` | `number` | `52` | Default row height in px |
| `getRowHeight` | `func` | — | Dynamic row height: `(params) => number\|'auto'\|null` |
| `autoHeight` | `bool` | `false` | Grid height matches content |
| `showCellVerticalBorder` | `bool` | `false` | Vertical cell borders |
| `showColumnVerticalBorder` | `bool` | `false` | Vertical column borders |

### Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checkboxSelection` | `bool` | `false` | Show selection checkboxes |
| `rowSelection` | `bool` | `true` | Enable row selection |
| `rowSelectionModel` | `object` | — | Controlled selection model |
| `onRowSelectionModelChange` | `func` | — | `(model, details) => void` |
| `disableMultipleRowSelection` | `bool` | `false` | Single selection only |
| `isRowSelectable` | `func` | — | `(params) => boolean` |
| `keepNonExistentRowsSelected` | `bool` | `false` | Persist removed rows in selection |

### Sorting Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortModel` | `Array<GridSortItem>` | — | Controlled sort model |
| `onSortModelChange` | `func` | — | `(model, details) => void` |
| `sortingMode` | `'client'\|'server'` | `'client'` | Sort processing location |
| `sortingOrder` | `Array` | `['asc','desc',null]` | Sort cycle order |
| `disableMultipleColumnsSorting` | `bool` | `false` | Single column sort only |

### Filtering Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filterModel` | `object` | — | Controlled filter model |
| `onFilterModelChange` | `func` | — | `(model, details) => void` |
| `filterMode` | `'client'\|'server'` | `'client'` | Filter processing location |
| `disableColumnFilter` | `bool` | `false` | Disable column filtering |

### Pagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `paginationModel` | `{page, pageSize}` | — | Controlled pagination state |
| `onPaginationModelChange` | `func` | — | `(model, details) => void` |
| `pageSizeOptions` | `Array<number\|{value,label}>` | `[25,50,100]` | Available page sizes |
| `paginationMode` | `'client'\|'server'` | `'client'` | Pagination processing |
| `autoPageSize` | `bool` | `false` | Auto-calculate page size |
| `hideFooter` | `bool` | `false` | Hide footer bar |
| `hideFooterPagination` | `bool` | `false` | Hide pagination in footer |
| `hideFooterSelectedRowCount` | `bool` | `false` | Hide selection count |

### Editing Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `editMode` | `'cell'\|'row'` | `'cell'` | Editing granularity |
| `processRowUpdate` | `func` | — | `(newRow, oldRow) => Row\|Promise<Row>` |
| `onProcessRowUpdateError` | `func` | — | Error handler for `processRowUpdate` |
| `isCellEditable` | `func` | — | `(params) => boolean` |
| `cellModesModel` | `object` | — | Controlled cell modes (cell edit mode) |
| `rowModesModel` | `object` | — | Controlled row modes (row edit mode) |

### Column Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnVisibilityModel` | `object` | — | Controlled column show/hide |
| `onColumnVisibilityModelChange` | `func` | — | Visibility change callback |
| `disableColumnMenu` | `bool` | `false` | Disable column context menu |
| `disableColumnResize` | `bool` | `false` | Disable column resizing |
| `disableColumnSelector` | `bool` | `false` | Disable column selector |
| `disableColumnSorting` | `bool` | `false` | Disable sorting globally |
| `columnGroupingModel` | `Array` | — | Column grouping config |

### Event Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onRowClick` | `func` | `(params, event, details) => void` |
| `onRowDoubleClick` | `func` | `(params, event, details) => void` |
| `onCellClick` | `func` | `(params, event, details) => void` |
| `onCellDoubleClick` | `func` | `(params, event, details) => void` |
| `onCellEditStart` / `onCellEditStop` | `func` | Edit mode transitions |
| `onRowEditStart` / `onRowEditStop` | `func` | Row edit mode transitions |
| `onColumnHeaderClick` | `func` | Column header click |

### Other Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiRef` | `object` | — | `useGridApiRef()` — programmatic control |
| `showToolbar` | `bool` | `false` | Show default toolbar |
| `localeText` | `object` | — | i18n text overrides |
| `autosizeOptions` | `object` | — | Column auto-size config |
| `scrollbarSize` | `number` | — | Scrollbar size override |
| `sx` | `object\|array\|func` | — | MUI sx prop |
| `classes` | `object` | — | CSS class overrides |
| `slots` | `object` | — | Component slot overrides |
| `slotProps` | `object` | — | Slot props |

### GridColDef Fields

```ts
{
  field: string;                    // Required — maps to row data key
  headerName?: string;              // Column header display text
  type?: 'string'|'number'|'date'|'dateTime'|'boolean'|'singleSelect'|'actions'|'custom';
  width?: number;                   // Column width in px
  minWidth?: number;
  maxWidth?: number;
  flex?: number;                    // Flex grow ratio
  align?: 'left'|'center'|'right';
  headerAlign?: 'left'|'center'|'right';
  sortable?: boolean;               // Default: true
  filterable?: boolean;             // Default: true
  resizable?: boolean;              // Default: true
  editable?: boolean;               // Default: false
  hideable?: boolean;               // Default: true
  disableColumnMenu?: boolean;
  pinnable?: boolean;
  renderCell?: (params: GridRenderCellParams) => ReactNode;
  renderHeader?: (params: GridColumnHeaderParams) => ReactNode;
  renderEditCell?: (params: GridRenderEditCellParams) => ReactNode;
  valueGetter?: (value, row, column, apiRef) => any;
  valueSetter?: (value, row) => object;
  valueFormatter?: (value, row, column, apiRef) => string;
  valueParser?: (value, row, column, event) => any;
  getActions?: (params) => Array<JSX.Element>;  // For 'actions' type
  colSpan?: number | func;
  cellClassName?: string | func;
  headerClassName?: string | func;
  description?: string;             // Tooltip on header
  disableReorder?: boolean;
}
```

### useGridApiRef Methods (Selection)

```ts
const apiRef = useGridApiRef();

// Rows
apiRef.current.getRow(id)
apiRef.current.getRowModels()       // Map<id, row>
apiRef.current.updateRows([...])    // Batch update rows
apiRef.current.setRows([...])       // Replace all rows

// Selection
apiRef.current.selectRow(id, isSelected, resetSelection)
apiRef.current.selectRows(ids, isSelected)
apiRef.current.getSelectedRows()    // Returns Map<id, row>

// Pagination
apiRef.current.setPage(page)
apiRef.current.setPageSize(pageSize)

// Column visibility
apiRef.current.setColumnVisibility(field, isVisible)

// Export
apiRef.current.exportDataAsCsv(options)
apiRef.current.getDataAsCsv(options)

// Scroll
apiRef.current.scrollToIndexes({rowIndex, colIndex})
```

---

## Integration Priority Order

Per user request ("intégrer Un à Un") — recommended order:

1. **DatePicker + TimePicker + DateTimePicker** (grouped as "Date & Time Pickers" — same package, same wrapper requirement)
2. **DataGrid** (most commonly used data component)
3. **BarChart + LineChart** (most common chart types)
4. **SimpleTreeView + TreeItem** (hierarchical navigation)
5. **ChartsContainer** (advanced composition API, after basic charts)

---

## Peer Dependencies Summary

| Component Group | Package | Version | Notes |
|-----------------|---------|---------|-------|
| Date & Time Pickers | `@mui/x-date-pickers` | `^8.x` | Requires date adapter |
| Date Adapter | `@date-io/dayjs` (recommended) | `^3.x` | Or date-fns / luxon |
| Charts | `@mui/x-charts` | `^8.x` | No extra dependencies |
| TreeView | `@mui/x-tree-view` | `^8.x` | No extra dependencies |
| DataGrid | `@mui/x-data-grid` | `^8.x` | Community tier (free) |
| Core MUI | `@mui/material` | `^6.x` | Already in project |
