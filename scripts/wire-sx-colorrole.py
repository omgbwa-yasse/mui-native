"""
wire-sx-colorrole.py  v3
Wires useSx (US4) and useColorRole (US3) into all standard component .tsx files.

Run from: c:\wamp64_New\www\packages\Design
  python scripts/wire-sx-colorrole.py
"""
import os
import re

BASE = r"c:\wamp64_New\www\packages\Design\src\components"

# Components where color?: string -- skip useColorRole
SKIP_COLOR_ROLE = {
    'ActivityIndicator', 'Avatar', 'Badge', 'Checkbox', 'CircularProgress',
    'Icon', 'LinearProgress', 'Link', 'MaterialIcon', 'RadioButton', 'Switch', 'Text',
}

# Skip entirely
SKIP_ALL = {'Portal'}

# Already wired manually - skip automated processing
ALREADY_DONE = {
    'Button', 'Checkbox', 'RadioButton', 'IconButton', 'FAB', 'Chip',
    'ToggleButton', 'Alert', 'Box', 'LinearProgress', 'Accordion',
}


def ensure_import(content, import_line, marker):
    """Insert import_line if marker is not already in content."""
    if marker in content:
        return content
    lines = content.split('\n')
    last_idx = -1
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('import ') and ("from '../../" in line or 'from "../../' in line):
            last_idx = i
    if last_idx >= 0:
        lines.insert(last_idx + 1, import_line)
    return '\n'.join(lines)


def add_to_destructure(content, props_to_add):
    """Add props before ...rest (or before closing }) in the props destructure."""
    match = re.search(r'(const \{[^}]+\}\s*=\s*props\s*;)', content, re.DOTALL)
    if not match:
        return content

    destructure = match.group(0)
    lines = destructure.split('\n')

    close_idx = None
    rest_idx = None
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('...') and not stripped.startswith('...rest') == False:
            rest_idx = i  # any spread
        elif re.match(r'^\s*\.\.\.\w+', line):
            rest_idx = i
        if '} = props' in line:
            close_idx = i
            break

    if close_idx is None:
        return content

    # Use the indent of the previous non-empty line
    indent_line = None
    for i in range(close_idx - 1, -1, -1):
        if lines[i].strip():
            indent_line = lines[i]
            break
    if indent_line:
        pad = ' ' * (len(indent_line) - len(indent_line.lstrip()))
    else:
        pad = '    '

    insert_at = rest_idx if rest_idx is not None else close_idx
    full_text = destructure

    # Insert in reversed order so they come out in original order
    for prop in reversed(props_to_add):
        if re.search(r'\b' + re.escape(prop) + r'\b', full_text):
            continue  # already present
        lines.insert(insert_at, f'{pad}{prop},')
        full_text = '\n'.join(lines)

    new_destructure = '\n'.join(lines)
    if new_destructure != destructure:
        content = content.replace(destructure, new_destructure, 1)
    return content


def add_sxstyle(content):
    """Add const sxStyle = useSx(sx, theme); after useTheme call."""
    if 'const sxStyle = useSx(' in content:
        return content
    return re.sub(
        r'(const \{ theme \} = useTheme\(\);)',
        r'\1\n  const sxStyle = useSx(sx, theme);',
        content, count=1
    )


def add_colorrole(content):
    """Add useColorRole call after sxStyle."""
    if 'useColorRole(' in content:
        return content
    # After sxStyle line
    result = re.sub(
        r'(const sxStyle = useSx\([^;]+;)',
        r'\1\n  const { bg, fg, container, onContainer } = useColorRole(color);',
        content, count=1
    )
    if result != content:
        return result
    # Fallback: after useTheme
    return re.sub(
        r'(const \{ theme \} = useTheme\(\);)',
        r'\1\n  const { bg, fg, container, onContainer } = useColorRole(color);',
        content, count=1
    )


def update_root_style(content):
    """Wire sxStyle and style into the root element's style prop."""
    if 'sxStyle' in content:
        return content  # already done

    # Pattern A: style={styles.X} with something after (no array)
    new = re.sub(
        r'\bstyle=\{(styles\.\w+)\}',
        r'style={[\1, sxStyle, style]}',
        content, count=1
    )
    if new != content:
        return new

    # Pattern B: style={[styles.X, ...more..., style]} -- style already at end
    new = re.sub(
        r'\bstyle=\{\[([^\]]+?),\s*style\s*\]\}',
        r'style={[\1, sxStyle, style]}',
        content, count=1
    )
    if new != content:
        return new

    # Pattern C: style={[...anything...]} (array, no style at end yet)
    new = re.sub(
        r'\bstyle=\{\[([^\]]+?)\]\}',
        r'style={[\1, sxStyle, style]}',
        content, count=1
    )
    if new != content:
        return new

    return content


def process(name, fpath):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    needs_cr = name not in SKIP_COLOR_ROLE

    # 1. Imports
    content = ensure_import(content,
        "import { useSx } from '../../hooks/useSx';",
        "from '../../hooks/useSx'")
    if needs_cr:
        content = ensure_import(content,
            "import { useColorRole } from '../../hooks/useColorRole';",
            "from '../../hooks/useColorRole'")

    # 2. Add props to destructure
    props = (['color'] if needs_cr else []) + ['sx', 'style']
    content = add_to_destructure(content, props)

    # 3. Hook calls
    content = add_sxstyle(content)
    if needs_cr:
        content = add_colorrole(content)

    # 4. Root element style
    content = update_root_style(content)

    if content != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


def main():
    modified, skipped, errors = [], [], []

    for name in sorted(os.listdir(BASE)):
        if not os.path.isdir(os.path.join(BASE, name)):
            continue
        if name in SKIP_ALL or name in ALREADY_DONE:
            print(f"SKIP  : {name}")
            continue

        fpath = os.path.join(BASE, name, f'{name}.tsx')
        if not os.path.exists(fpath):
            skipped.append((name, 'no tsx'))
            continue

        try:
            if process(name, fpath):
                modified.append(name)
                print(f"DONE  : {name}")
            else:
                print(f"SAME  : {name}")
        except Exception as e:
            errors.append((name, str(e)))
            print(f"ERROR : {name}: {e}")

    print(f"\nModified={len(modified)}  Skipped={len(skipped)}  Errors={len(errors)}")
    for n, r in skipped:
        print(f"  SKIP {n}: {r}")
    for n, e in errors:
        print(f"  ERR  {n}: {e}")


if __name__ == '__main__':
    main()


# Components where color?: string  → skip useColorRole
SKIP_COLOR_ROLE = {
    'ActivityIndicator', 'Avatar', 'Badge', 'Checkbox', 'CircularProgress',
    'Icon', 'LinearProgress', 'Link', 'MaterialIcon', 'RadioButton', 'Switch', 'Text',
}

# Portal: skip useSx (returns null)
SKIP_ALL = {'Portal'}

# Special-case components handled separately – skip automated transform for them
# but they still need useSx added
SPECIAL_MANUAL = {'Button', 'Checkbox', 'RadioButton', 'IconButton', 'FAB', 'Chip',
                  'ToggleButton', 'Alert', 'Box', 'LinearProgress'}

def has_pattern(content, pattern):
    return bool(re.search(pattern, content))

def add_import_after(content, anchor_pattern, new_import):
    """Insert new_import after the last line matching anchor_pattern."""
    if new_import in content:
        return content  # already present
    # Find the last import matching anchor
    lines = content.split('\n')
    insert_at = -1
    for i, line in enumerate(lines):
        if re.search(anchor_pattern, line):
            insert_at = i
    if insert_at >= 0:
        lines.insert(insert_at + 1, new_import)
    return '\n'.join(lines)

def ensure_sx_import(content):
    if "from '../../hooks/useSx'" in content or 'from "../../hooks/useSx"' in content:
        return content
    return add_import_after(content, r"from '../../hooks/useComponent|from '../../theme|from '../../hooks/", 
                             "import { useSx } from '../../hooks/useSx';")

def ensure_color_role_import(content):
    if "from '../../hooks/useColorRole'" in content or 'from "../../hooks/useColorRole"' in content:
        return content
    return add_import_after(content, r"from '../../hooks/useSx'",
                             "import { useColorRole } from '../../hooks/useColorRole';")

def ensure_theme_import(content):
    if "from '../../theme'" in content or "from '../../theme/index'" in content:
        return content
    return add_import_after(content, r"^import",
                             "import { useTheme } from '../../theme';")

def add_sxstyle_after_theme(content):
    """Add const sxStyle = useSx(sx, theme); after const { theme } = useTheme();"""
    if 'const sxStyle = useSx(' in content:
        return content
    # Pattern: const { theme } = useTheme();
    content = re.sub(
        r'(const \{ theme \} = useTheme\(\);)',
        r'\1\n  const sxStyle = useSx(sx, theme);',
        content
    )
    return content

def add_colorrole_after_theme(content, component_name):
    """Add const { bg, fg, container, onContainer } = useColorRole(color); after sxStyle or theme."""
    if 'useColorRole(' in content:
        return content
    # Try after sxStyle line
    if 'const sxStyle = useSx(' in content:
        content = re.sub(
            r'(const sxStyle = useSx\([^)]+\);)',
            r'\1\n  const { bg, fg, container, onContainer } = useColorRole(color);',
            content
        )
    else:
        content = re.sub(
            r'(const \{ theme \} = useTheme\(\);)',
            r'\1\n  const { bg, fg, container, onContainer } = useColorRole(color);',
            content
        )
    return content

def add_props_to_destructure(content, props_to_add):
    """Add props to the const { ... } = props; destructure block."""
    # Find the destructure pattern: const { ... } = props;
    # We need to add sx, style, color to it if not present
    
    # Pattern: const {\n  ...,\n  ...,\n} = props;
    # or: const { ..., ..., } = props;
    
    for prop in props_to_add:
        if re.search(r'\b' + prop + r'\b', content[:content.find('} = props;')+20] if '} = props;' in content else content[:500]):
            continue  # already there
        # Check if prop is destructured  
        # Look for the destructure block
        match = re.search(r'(const \{[^}]+\}\s*=\s*props\s*;)', content, re.DOTALL)
        if match:
            destructure = match.group(0)
            if prop not in destructure:
                # Add before closing }
                new_destructure = re.sub(
                    r'(\s+)(testID[^,\n]*)(\s*)\} = props',
                    r'\1\2,\n\1' + prop + r'\3} = props',
                    destructure
                )
                if new_destructure == destructure:
                    # Try adding before last item
                    new_destructure = re.sub(
                        r'(\n\s+)(\} = props)',
                        r',\n' + '    ' + prop + r'\1\2',
                        destructure
                    )
                if new_destructure != destructure:
                    content = content.replace(destructure, new_destructure, 1)
    return content

def update_root_view_style(content, component_name):
    """Add sxStyle and style to root View or Animated.View style."""
    # Pattern 1: style={styles.container} → style={[styles.container, sxStyle, style]}
    content = re.sub(
        r'style=\{(styles\.container)\}(\s+(?:accessible|accessibilityRole|testID|\.\.\.))',
        r'style={[\1, sxStyle, style]}\2',
        content
    )
    # Pattern 2: style={[styles.container]} → style={[styles.container, sxStyle, style]}
    content = re.sub(
        r'style=\{\[(styles\.container)\]\}',
        r'style={[\1, sxStyle, style]}',
        content
    )
    # Pattern 3: style={[styles.container, style]} → style={[styles.container, sxStyle, style]}
    content = re.sub(
        r'style=\{\[styles\.container,\s*style\]\}',
        r'style={[styles.container, sxStyle, style]}',
        content
    )
    # Pattern 4: style={[styles.container, ... ]} where style isn't last
    # Only update if sxStyle not already in style
    if 'sxStyle' not in content:
        # General: try to find the first Animated.View or View in the return
        # with style={[...]} and add sxStyle, style
        pass
    return content

def process_standard_component(name, filepath):
    """Apply useSx and useColorRole to a standard (non-special) component."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Ensure useTheme import
    if 'useTheme' not in content:
        content = ensure_theme_import(content)
        # Add const { theme } = useTheme(); if not present
        if 'const { theme } = useTheme()' not in content:
            # Try to find a good insertion point
            content = re.sub(
                r'(const props = useComponentDefaults\([^;]+;\n)',
                r'\1  const { theme } = useTheme();\n',
                content
            )
    
    # 2. Add useSx import
    content = ensure_sx_import(content)
    
    # 3. Ensure sx and style are in props destructure
    # Check if there's a destructure
    if 'const {' in content and '} = props;' in content:
        destructure_match = re.search(r'(const \{[^}]+\}\s*=\s*props\s*;)', content, re.DOTALL)
        if destructure_match:
            destructure = destructure_match.group(0)
            props_to_add = []
            if 'sx' not in destructure:
                props_to_add.append('sx')
            if 'style' not in destructure:
                props_to_add.append('style')
            # Add each prop to the destructure
            for prop in props_to_add:
                new_dest = destructure.rstrip()
                # Find the last line before closing }
                lines = new_dest.split('\n')
                # Find closing } = props line
                for i in range(len(lines)-1, -1, -1):
                    if '} = props' in lines[i]:
                        # Add prop before this line
                        indent = '    '
                        lines.insert(i, indent + prop + ',')
                        break
                destructure_new = '\n'.join(lines)
                content = content.replace(destructure, destructure_new, 1)
                destructure = destructure_new
    
    # 4. Ensure useTheme call exists
    if 'const { theme } = useTheme()' not in content and 'useTheme(' in content:
        pass  # already using it somehow
    
    # 5. Add sxStyle after theme
    if 'const { theme } = useTheme()' in content:
        content = add_sxstyle_after_theme(content)
    
    # 6. Add useColorRole (for ColorProp components)
    needs_color_role = name not in SKIP_COLOR_ROLE
    if needs_color_role and 'useColorRole(' not in content:
        content = ensure_color_role_import(content)
        content = add_colorrole_after_theme(content, name)
    
    # 7. Update root view style - we handle various patterns
    content = update_root_view_style(content, name)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    modified = []
    skipped = []
    errors = []
    
    dirs = [d for d in os.listdir(BASE) if os.path.isdir(os.path.join(BASE, d))]
    dirs.sort()
    
    for name in dirs:
        if name in SKIP_ALL:
            skipped.append((name, 'Portal - no View'))
            continue
        
        filepath = os.path.join(BASE, name, f'{name}.tsx')
        if not os.path.exists(filepath):
            skipped.append((name, 'no .tsx found'))
            continue
        
        if name in SPECIAL_MANUAL:
            print(f"MANUAL: {name} (special case - skipping automated transform)")
            continue
        
        try:
            changed = process_standard_component(name, filepath)
            if changed:
                modified.append(name)
                print(f"✓ {name}")
            else:
                print(f"  {name} (no changes)")
        except Exception as e:
            errors.append((name, str(e)))
            print(f"✗ {name}: {e}")
    
    print(f"\n=== Summary ===")
    print(f"Modified: {len(modified)}")
    print(f"Skipped: {len(skipped)}")
    print(f"Errors: {len(errors)}")
    if errors:
        for name, err in errors:
            print(f"  ERROR {name}: {err}")
    if skipped:
        for name, reason in skipped:
            print(f"  SKIP {name}: {reason}")

if __name__ == '__main__':
    main()
