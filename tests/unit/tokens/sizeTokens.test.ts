import { SIZE_SCALE } from '../../../src/tokens/size';

describe('SIZE_SCALE', () => {
  it('small.height === 32', () => {
    expect(SIZE_SCALE.small.height).toBe(32);
  });

  it('medium.height === 40', () => {
    expect(SIZE_SCALE.medium.height).toBe(40);
  });

  it('large.height === 48', () => {
    expect(SIZE_SCALE.large.height).toBe(48);
  });

  it('small.touchTarget >= 32', () => {
    expect(SIZE_SCALE.small.touchTarget).toBeGreaterThanOrEqual(32);
  });

  it('medium.touchTarget >= 40', () => {
    expect(SIZE_SCALE.medium.touchTarget).toBeGreaterThanOrEqual(40);
  });

  it('large.touchTarget >= 48', () => {
    expect(SIZE_SCALE.large.touchTarget).toBeGreaterThanOrEqual(48);
  });

  it('fontSizeScale values are 0.85 / 1.0 / 1.15', () => {
    expect(SIZE_SCALE.small.fontSizeScale).toBe(0.85);
    expect(SIZE_SCALE.medium.fontSizeScale).toBe(1.0);
    expect(SIZE_SCALE.large.fontSizeScale).toBe(1.15);
  });
});
