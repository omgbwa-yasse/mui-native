import React, { createContext, useContext } from 'react';
import type { TimelineContextValue } from './types';

const TimelineContext = createContext<TimelineContextValue>({
  position: 'right',
  registerItem: () => 0,
});

export const TimelineContextProvider = TimelineContext.Provider;

export function useTimelineContext(): TimelineContextValue {
  return useContext(TimelineContext);
}
