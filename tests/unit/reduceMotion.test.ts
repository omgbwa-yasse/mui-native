import { AccessibilityInfo } from 'react-native';
import { renderHook, act } from '@testing-library/react-native';
import { useReducedMotionValue } from '../../src/theme/useReduceMotion';

// Mock AccessibilityInfo
const mockIsReduceMotionEnabled = jest.spyOn(
  AccessibilityInfo,
  'isReduceMotionEnabled',
);
const mockAddEventListener = jest.spyOn(
  AccessibilityInfo,
  'addEventListener',
).mockReturnValue({ remove: jest.fn() });

afterEach(() => {
  jest.clearAllMocks();
});

describe('useReducedMotionValue', () => {
  it('returns false when reduce motion is disabled', async () => {
    mockIsReduceMotionEnabled.mockResolvedValue(false);

    const { result } = renderHook(() => useReducedMotionValue());
    await act(async () => { /* flush promises */ });

    expect(result.current.value).toBe(false);
  });

  it('returns true when reduce motion is enabled', async () => {
    mockIsReduceMotionEnabled.mockResolvedValue(true);

    const { result } = renderHook(() => useReducedMotionValue());
    await act(async () => { /* flush promises */ });

    expect(result.current.value).toBe(true);
  });

  it('subscribes to reduceMotionChanged event', () => {
    mockIsReduceMotionEnabled.mockResolvedValue(false);
    renderHook(() => useReducedMotionValue());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'reduceMotionChanged',
      expect.any(Function),
    );
  });

  it('removes listener on unmount', () => {
    const removeFn = jest.fn();
    mockIsReduceMotionEnabled.mockResolvedValue(false);
    mockAddEventListener.mockReturnValue({ remove: removeFn });

    const { unmount } = renderHook(() => useReducedMotionValue());
    unmount();

    expect(removeFn).toHaveBeenCalled();
  });
});
