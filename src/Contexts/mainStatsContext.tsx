import { createContext } from 'react';

import {MainStatsDataType} from '../Types/types.ts'


export interface MainStatsContextType {
    'mainStatsData': MainStatsDataType | null,
    'setMainStatsData': (statsData: MainStatsDataType) => void,
    'selectedState'?: string | null,
    'setSelectedState'?: (selectedState: string| null) => void,
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