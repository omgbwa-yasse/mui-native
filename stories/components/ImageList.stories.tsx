import React from 'react';
import { ImageList } from '../../src/components/ImageList/ImageList';
import { ImageListItem } from '../../src/components/ImageList/ImageListItem';

export default {
  title: 'Layout/ImageList',
};

const IMAGES = [
  { key: '1', source: { uri: 'https://picsum.photos/seed/1/400/300' }, title: 'Mountains' },
  { key: '2', source: { uri: 'https://picsum.photos/seed/2/400/300' }, title: 'Forest' },
  { key: '3', source: { uri: 'https://picsum.photos/seed/3/400/300' }, title: 'Ocean' },
  { key: '4', source: { uri: 'https://picsum.photos/seed/4/400/300' }, title: 'Desert' },
  { key: '5', source: { uri: 'https://picsum.photos/seed/5/400/300' } },
  { key: '6', source: { uri: 'https://picsum.photos/seed/6/400/300' } },
];

export const Standard = () => (
  <ImageList cols={2} gap={4} rowHeight={120} variant="standard">
    {IMAGES.map((img) => (
      <ImageListItem key={img.key} img={img.source} title={img.title} />
    ))}
  </ImageList>
);

export const ThreeColumns = () => (
  <ImageList cols={3} gap={2} rowHeight={100} variant="standard">
    {IMAGES.map((img) => (
      <ImageListItem key={img.key} img={img.source} />
    ))}
  </ImageList>
);

export const Masonry = () => (
  <ImageList cols={2} gap={4} variant="masonry">
    {IMAGES.map((img) => (
      <ImageListItem key={img.key} img={img.source} title={img.title} />
    ))}
  </ImageList>
);

export const Quilted = () => (
  <ImageList cols={4} gap={4} rowHeight={100} variant="quilted">
    <ImageListItem key="1" img={IMAGES[0].source} title="Span 2×2" cols={2} rows={2} />
    <ImageListItem key="2" img={IMAGES[1].source} title="1×1" />
    <ImageListItem key="3" img={IMAGES[2].source} />
    <ImageListItem key="4" img={IMAGES[3].source} title="Span 1×2" rows={2} />
    <ImageListItem key="5" img={IMAGES[4].source} />
    <ImageListItem key="6" img={IMAGES[5].source} />
  </ImageList>
);

export const WithTitles = () => (
  <ImageList cols={2} gap={4} rowHeight={140}>
    {IMAGES.map((img) => (
      <ImageListItem
        key={img.key}
        img={img.source}
        title={img.title ?? `Photo ${img.key}`}
      />
    ))}
  </ImageList>
);
