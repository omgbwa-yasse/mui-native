# Quickstart: Full MUI-Native ↔ Material UI Alignment

**Feature**: `010-full-mui-alignment` | **Phase**: 1 — Design | **Date**: 2026-04-06

Copy-paste examples covering all 6 User Stories. All examples assume Feature 009 (`mui-config-sync`) is merged first.

---

## User Story 1 — Familiar API for MUI Web Migrants

Developers migrating code from MUI Web can use MUI-idiomatic prop names directly.

### Dialog

```tsx
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from 'mui-native';

function ConfirmDialog({ open, onConfirm }: { open: boolean; onConfirm: () => void }) {
  const [isOpen, setOpen] = React.useState(open);

  return (
    <Dialog
      open={isOpen}
      onClose={(reason) => {
        // reason: 'backdropPress' | 'hardwareBackPress'
        // RN-DEVIATION: MUI Web uses 'backdropClick' | 'escapeKeyDown'
        setOpen(false);
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to continue? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onPress={() => setOpen(false)}>Cancel</Button>
        <Button onPress={onConfirm} variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
```

### Switch with checked / onChange

```tsx
import { Switch, FormControlLabel } from 'mui-native';

const [enabled, setEnabled] = React.useState(false);

<Switch
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
```

### Badge with badgeContent / invisible

```tsx
import { Badge, IconButton } from 'mui-native';

// Show count
<Badge badgeContent={4} color="primary">
  <IconButton icon="mail" />
</Badge>

// Hide badge
<Badge badgeContent={4} invisible={notificationsVisible === false}>
  <IconButton icon="mail" />
</Badge>
```

### TextField with helperText / error

```tsx
import { TextField } from 'mui-native';

// Helper text (alias for supportingText)
<TextField
  label="Email"
  helperText="We'll never share your email."
  error={false}
/>

// String error auto-renders as helper text when no helperText is given
<TextField
  label="Username"
  error="This username is already taken"
/>

// Explicit helperText takes precedence over string error
<TextField
  label="Password"
  helperText="Minimum 8 characters"
  error={passwordTooShort}
/>
```

---

## User Story 2 — Progress Indicators

### CircularProgress

```tsx
import { CircularProgress } from 'mui-native';

// Indeterminate spinner (default)
<CircularProgress />

// Determinate at 75%
<CircularProgress variant="determinate" value={75} />

// Custom size and thickness
<CircularProgress size={64} thickness={6} />

// With background track ring
<CircularProgress variant="determinate" value={40} enableTrackSlot />

// Disable the shrink animation
<CircularProgress disableShrink />

// Color variants
<CircularProgress color="secondary" />
<CircularProgress color="success" />
<CircularProgress color="#e91e63" /> {/* custom hex — consumer responsibility */}
```

### LinearProgress

```tsx
import { LinearProgress } from 'mui-native';

// Indeterminate (default)
<LinearProgress />

// Determinate at 50%
<LinearProgress variant="determinate" value={50} />

// Buffer (two-track with primary fill + buffer fill)
<LinearProgress variant="buffer" value={40} valueBuffer={70} />

// Query (reverse indeterminate)
<LinearProgress variant="query" />
```

---

## User Story 3 — Full-Featured Form TextField

```tsx
import { TextField } from 'mui-native';

// Standard variant (underline-only)
<TextField variant="standard" label="Name" />

// Filled variant
<TextField variant="filled" label="Name" />

// Multiline — fixed rows
<TextField multiline rows={4} label="Description" placeholder="Enter description..." />

// Multiline — auto-grow between 2 and 6 rows
<TextField multiline minRows={2} maxRows={6} label="Notes" />

// Full-width with required indicator
<TextField
  variant="outlined"
  label="Email"
  fullWidth
  required
  helperText="Required field"
/>

// Full form field with validation
<TextField
  label="Email"
  fullWidth
  required
  error={!isValidEmail}
  helperText={!isValidEmail ? 'Enter a valid email address' : 'We'll never share your email'}
/>

// Select mode (children become options)
<TextField select label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
  <MenuItem value="us">United States</MenuItem>
  <MenuItem value="gb">United Kingdom</MenuItem>
  <MenuItem value="de">Germany</MenuItem>
</TextField>
```

---

## User Story 4 — Composable Sub-Components

### Card with all sub-components

```tsx
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  IconButton,
  Avatar,
  Typography,
} from 'mui-native';

<Card>
  <CardHeader
    avatar={<Avatar src="https://example.com/chef.jpg" alt="Chef" />}
    title="Paella"
    subheader="September 14, 2016"
    action={<IconButton icon="more-vert" />}
  />
  <CardActionArea onPress={() => navigation.navigate('RecipeDetail')}>
    <CardMedia
      image="https://example.com/paella.jpg"
      alt="Traditional Spanish Paella"
      height={194}
    />
    <CardContent>
      <Typography variant="body2">
        This impressive paella is a perfect party dish and a fun meal to cook together with
        your guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" onPress={handleShare}>Share</Button>
    <Button size="small" onPress={handleLearnMore}>Learn More</Button>
  </CardActions>
</Card>
```

### Composable Table with sort and pagination

```tsx
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
} from 'mui-native';

type Order = 'asc' | 'desc';

function SortableTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <>
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Dessert</TableCell>
              <TableCell variant="head" align="right" sortDirection={order}>
                <TableSortLabel
                  active={orderBy === 'calories'}
                  direction={orderBy === 'calories' ? order : 'asc'}
                  onPress={() => {
                    setOrderBy('calories');
                    setOrder(order === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Calories
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.name} hover selected={selectedRow === row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(newRowsPerPage) => {
          setRowsPerPage(newRowsPerPage);
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton
        showLastButton
      />
    </>
  );
}
```

### Dialog with sub-components (full width)

```tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from 'mui-native';

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  fullWidth
  maxWidth="md"
  scroll="paper"
>
  <DialogTitle>Subscription Details</DialogTitle>
  <DialogContent dividers>
    <DialogContentText>
      Your subscription renews on December 31, 2026. To manage your subscription,
      visit your account settings page.
    </DialogContentText>
  </DialogContent>
  <DialogActions disableSpacing={false}>
    <Button onPress={() => setOpen(false)}>Close</Button>
    <Button variant="contained" onPress={handleManage}>Manage Subscription</Button>
  </DialogActions>
</Dialog>
```

---

## User Story 5 — Transition Utilities

All 5 transitions are exported from `mui-native`. Each wraps `Reanimated` internally.

```tsx
import { Fade, Grow, Slide, Zoom, Collapse } from 'mui-native';
import { View, StyleSheet } from 'react-native';

// Fade
<Fade in={show} timeout={300}>
  <View style={styles.box} />
</Fade>

// Grow (scale from origin point)
<Grow in={show} timeout={{ enter: 500, exit: 300 }}>
  <View style={styles.box} />
</Grow>

// Slide — direction prop
<Slide direction="up" in={panelOpen}>
  <View style={styles.bottomPanel}>
    {/* Slides up from bottom of screen */}
  </View>
</Slide>

// All four Slide directions
<Slide direction="down" in={headerVisible}><View style={styles.header} /></Slide>
<Slide direction="left" in={drawerOpen}><View style={styles.drawer} /></Slide>
<Slide direction="right" in={sidebarOpen}><View style={styles.sidebar} /></Slide>

// Zoom
<Zoom in={fabVisible}>
  <FAB icon="add" onPress={handleAdd} />
</Zoom>

// Collapse (vertical auto-height transition)
<Collapse in={expanded}>
  <View>
    <Typography variant="body2">
      Expanded content appears here when `in` is true.
    </Typography>
  </View>
</Collapse>

const styles = StyleSheet.create({
  box: { width: 100, height: 100, backgroundColor: '#1976d2' },
  bottomPanel: { position: 'absolute', bottom: 0, width: '100%', height: 200, backgroundColor: '#fff' },
  header: { height: 64, backgroundColor: '#1976d2' },
  drawer: { width: 280, height: '100%', backgroundColor: '#fff' },
  sidebar: { width: 240, height: '100%', backgroundColor: '#f5f5f5' },
});
```

---

## User Story 6 — MD2 Typography Variants

After feature 010, the `Text` (and `Typography`) component accepts both MD3 and MD2 variant names.

```tsx
import { Typography, Text } from 'mui-native';

// ── MD2 variant names (new) ───────────────────────────────────────────────────
<Typography variant="h1">Display Large (maps to displayLarge)</Typography>
<Typography variant="h2">Display Medium</Typography>
<Typography variant="h3">Display Small</Typography>
<Typography variant="h4">Headline Large</Typography>
<Typography variant="h5">Headline Medium</Typography>
<Typography variant="h6">Headline Small</Typography>
<Typography variant="subtitle1">Title Large</Typography>
<Typography variant="subtitle2">Title Medium</Typography>
<Typography variant="body1">Body Medium — primary body copy</Typography>
<Typography variant="body2">Body Small — secondary body copy</Typography>
<Typography variant="caption">Label Small — captions, footnotes</Typography>
<Typography variant="button">Label Large — button labels</Typography>
<Typography variant="overline">Label Medium — overline text</Typography>

// ── MD3 variant names (unchanged, always valid) ───────────────────────────────
<Typography variant="displayLarge">Same as h1</Typography>
<Typography variant="bodyMedium">Same as body1</Typography>
<Typography variant="labelSmall">Same as caption</Typography>

// ── Both produce identical output ─────────────────────────────────────────────
<Typography variant="body1">Hello world</Typography>
{/* renders identically to: */}
<Typography variant="bodyMedium">Hello world</Typography>

// ── Text alias also works ─────────────────────────────────────────────────────
<Text variant="h4">Headline text using MD2 name</Text>
```

---

## AvatarGroup

```tsx
import { Avatar, AvatarGroup, Typography } from 'mui-native';

// Default — shows max 5, surplus as "+N" Avatar
<AvatarGroup max={4}>
  <Avatar src="https://example.com/a.jpg" alt="Alice" />
  <Avatar src="https://example.com/b.jpg" alt="Bob" />
  <Avatar src="https://example.com/c.jpg" alt="Carol" />
  <Avatar src="https://example.com/d.jpg" alt="Dave" />
  <Avatar src="https://example.com/e.jpg" alt="Eve" />
  <Avatar src="https://example.com/f.jpg" alt="Frank" />
  {/* Renders first 3 + "+3" surplus Avatar */}
</AvatarGroup>

// Custom surplus renderer
<AvatarGroup
  max={3}
  renderSurplus={(surplus) => (
    <Avatar style={{ backgroundColor: '#bdbdbd' }}>
      <Typography variant="caption">+{surplus}</Typography>
    </Avatar>
  )}
>
  {contributors.map((c) => (
    <Avatar key={c.id} src={c.avatarUrl} alt={c.name} />
  ))}
</AvatarGroup>

// Small overlap spacing with rounded variant
<AvatarGroup max={5} spacing="small" variant="rounded">
  {teamMembers.map((m) => (
    <Avatar key={m.id} src={m.photo} alt={m.name} />
  ))}
</AvatarGroup>

// Override total count (e.g., when not all avatars are rendered)
<AvatarGroup max={3} total={24}>
  <Avatar src={a1} alt="User 1" />
  <Avatar src={a2} alt="User 2" />
  <Avatar src={a3} alt="User 3" />
  {/* Renders first 2 avatars + "+22" surplus (total 24 - (max-1) 2) */}
</AvatarGroup>
```
