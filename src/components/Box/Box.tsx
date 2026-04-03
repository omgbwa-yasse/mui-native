import React, { memo } from 'react';
import { View } from 'react-native';
import { spacing } from '../../tokens/spacing';
import type { SpacingKey } from '../../tokens/spacing';
import type { BoxProps } from './types';

function resolveSpacing(key: SpacingKey | undefined): number | undefined {
  return key !== undefined ? spacing[key] : undefined;
}

const Box = memo<BoxProps>(function Box({
  p, pt, pb, pl, pr, px, py,
  m, mt, mb, ml, mr, mx, my,
  sx,
  style,
  children,
  ...rest
}) {
  const spacingStyle = {
    ...(p  !== undefined && { padding:          resolveSpacing(p)  }),
    ...(pt !== undefined && { paddingTop:        resolveSpacing(pt) }),
    ...(pb !== undefined && { paddingBottom:     resolveSpacing(pb) }),
    ...(pl !== undefined && { paddingLeft:       resolveSpacing(pl) }), // RN-DEVIATION: physical side explicitly requested via pl/pr props
    ...(pr !== undefined && { paddingRight:      resolveSpacing(pr) }), // RN-DEVIATION: physical side explicitly requested via pl/pr props
    ...(px !== undefined && { paddingHorizontal: resolveSpacing(px) }),
    ...(py !== undefined && { paddingVertical:   resolveSpacing(py) }),
    ...(m  !== undefined && { margin:            resolveSpacing(m)  }),
    ...(mt !== undefined && { marginTop:         resolveSpacing(mt) }),
    ...(mb !== undefined && { marginBottom:      resolveSpacing(mb) }),
    ...(ml !== undefined && { marginLeft:        resolveSpacing(ml) }), // RN-DEVIATION: physical side explicitly requested via ml/mr props
    ...(mr !== undefined && { marginRight:       resolveSpacing(mr) }), // RN-DEVIATION: physical side explicitly requested via ml/mr props
    ...(mx !== undefined && { marginHorizontal:  resolveSpacing(mx) }),
    ...(my !== undefined && { marginVertical:    resolveSpacing(my) }),
  };

  return (
    <View style={[spacingStyle, style, sx]} {...rest}>
      {children}
    </View>
  );
});

export { Box };
