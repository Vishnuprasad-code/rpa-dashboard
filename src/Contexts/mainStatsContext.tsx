import { createContext } from 'react';

import {mainStatsDataType} from '../Types/types.ts'


export interface MainStatsContextType {
    'mainStatsData': mainStatsDataType,
    'setMainStatsData': (statsData: mainStatsDataType) => void,
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
  });