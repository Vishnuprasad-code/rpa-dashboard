import {mainStatsDataType, QueueCountType} from '../Types/types.ts'


export async function fetchLatestMainStatsData(
  startDateTime: number | null = null, 
  endDateTime: number | null = null
): Promise<mainStatsDataType>{
    if (!startDateTime || !endDateTime){
      endDateTime = Math.floor(Date.now() / 1000);
      startDateTime = endDateTime - 86400
    }
    const response = await fetch(
      `http://0.0.0.0:8000/api/graphs/v2/filings_graph?fromDate=${startDateTime}&toDate=${endDateTime}&callType=prod`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch user places');
    }
    const resData = await response.json();
    return resData;

};


export async function fetchQueueCount():Promise<QueueCountType[]>{
  const url = "http://0.0.0.0:8000/api/rpa_data/queue_count"
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}