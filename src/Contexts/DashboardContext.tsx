
import { createContext } from 'react';

import {DashboardContextType} from '../Types/types.ts'


export const DashboardContext = createContext<DashboardContextType>({
    selectedTab: "Home",
    setSelectedTab: () => null,
    rpaListings: {}
  });