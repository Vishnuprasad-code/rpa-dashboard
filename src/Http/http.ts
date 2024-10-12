import {mainStatsDataType} from '../Types/types.ts'


export async function fetchLatestMainStatsData(): Promise<mainStatsDataType>{
    const currentEpochSeconds = Math.floor(Date.now() / 1000);
    const response = await fetch(
      `http://0.0.0.0:8000/api/graphs/v2/filings_graph?fromDate=${currentEpochSeconds - 86400}&toDate=${currentEpochSeconds}&callType=prod`);
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to fetch user places');
    }
  
    return resData;

};