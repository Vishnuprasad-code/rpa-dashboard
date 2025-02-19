import { MainStatsDataType, QueueCountType, RpaListingType } from '../Types/types.ts'

import { CaptchaBalanceDataType } from '../Scenes/CaptchaBalance.tsx'
import { APIOverviewCardDataType } from '../Scenes/APIOverview.tsx'


// import { mockStatsData } from './MockStatsData.ts';
// import { RPAListingsMockData } from "./RPAListingsMockData.ts";
// import { CaptchaBalanceMockData } from "./CaptchaBalanceMockData.ts";
// import { APIStatsMockData } from "./APIStatsMockData.ts";
// import { BrowserlessStatsMockData } from './BrowserlessStatsMockData.ts';
// import {
//   CaptchaSolveMockDataHeatMap,
//   CaptchaSolveMockDataOverall
// } from './SolveCaptchaMockData.ts';


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);


export async function fetchLatestMainStatsData(
  rpaSlug: string | null = "all",
  startDateTime: number | null = null,
  endDateTime: number | null = null
): Promise<MainStatsDataType> {
  // if (mockStatsData) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return mockStatsData
  // }

  let url
  if (startDateTime && endDateTime) {
    url = `/api/graphs/filings_graph?fromDate=${startDateTime}&toDate=${endDateTime}&rpaId=${rpaSlug}&callType=prod`
  }
  else {
    url = `/api/graphs/filings_graph?callType=prod`
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData;
};


export async function fetchSearchResults(uuid: string): Promise<RpaListingType> {
  const url = `/api/rpa_data/search?uuid=${uuid}`
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchQueueCount(rpaId: string = "all"): Promise<QueueCountType[]> {
  const url = `/api/rpa_data/queue_count?rpaId=${rpaId}`
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchCaptchaBalance(): Promise<CaptchaBalanceDataType[]> {

  // if (CaptchaBalanceMockData) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return CaptchaBalanceMockData
  // }

  const url = "/api/service_stats/captcha_balance"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchsolveCaptchaOverallData(
  startDateTime: number,
): Promise<any> {

  // if (CaptchaSolveMockDataOverall) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return CaptchaSolveMockDataOverall
  // }

  const url = `/api/graphs/solve_captcha_overall?fromDate=${startDateTime}`

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}



export async function fetchsolveCaptchaHeatMapData(
  startDateTime: number,
  interval: number,
): Promise<any> {

  // if (CaptchaSolveMockDataHeatMap) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return CaptchaSolveMockDataHeatMap
  // }

  const url = `/api/graphs/solve_captcha_heatmap?fromDate=${startDateTime}&interval=${interval}`

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchBrowserlessStats(): Promise<any[]> {
  // if (BrowserlessStatsMockData) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return BrowserlessStatsMockData
  // }

  const url = "/api/service_stats/browser_stats"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchAPIStatsData(): Promise<APIOverviewCardDataType[]> {

  // if (APIStatsMockData) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return APIStatsMockData
  // }

  const url = "/api/service_stats/api_stats"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchRPAListingsData(): Promise<any> {
  // if (RPAListingsMockData) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return RPAListingsMockData
  // }

  const url = "/api/rpa_data/zb_rpas"
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchPayloadText(filingType: string, processId: string): Promise<any> {
  // if (processId) {
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   return { payloadText: processId }
  // }

  const url = `/api/rpa_data/backup_payload?filing_type=${filingType}&uuid=${processId}`
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}