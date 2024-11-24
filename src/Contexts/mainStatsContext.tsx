import { createContext } from 'react';

import { MainStatsDataType } from '../Types/types.ts'


export interface MainStatsContextType {
  'mainStatsData': MainStatsDataType | null,
  'setMainStatsData': (statsData: MainStatsDataType) => void,
  'selectedState'?: string | null,
  // 'setSelectedState'?: (value: (null | string | ((prevState: string) => string | null))) => void,
  'setSelectedState'?: React.Dispatch<React.SetStateAction<string | null>>,
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
  setSelectedState: () => null,
});