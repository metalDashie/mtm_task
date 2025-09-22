import Refresh from './instances/refresh.tsx';
import LeftArrow from './instances/leftArrow.tsx';

export const ALL_ICONS = {
  refresh: Refresh,
  leftArrow: LeftArrow,
};

export type AllIconsNames = keyof typeof ALL_ICONS;
