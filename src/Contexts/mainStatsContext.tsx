import { createContext } from 'react';

import { MainStatsDataType } from '../Types/types.ts'
import { BarDatum } from '@nivo/bar/dist/types/types';


export interface MainStatsContextType {
  'mainStatsData': MainStatsDataType | null,
  'setMainStatsData': (statsData: MainStatsDataType) => void,
  'selectedState'?: string | null,
  // 'setSelectedState'?: (value: (null | string | ((prevState: string) => string | null))) => void,
  'handleStateSelection': (data: BarDatum) => void,
  'handleStateSelectMap'?: (state: string) => void,
}

export const MainStatsContext = createContext<MainStatsContextType>({
  mainStatsData: {
    "totalCount": 0,
    "successCount": 0,
    "failedCount": 0,
    "failedFilings": [],
    "graphData": []
  },
  setMainStatsData: () => null,
  selectedState: null,
  handleStateSelection: () => null,
});