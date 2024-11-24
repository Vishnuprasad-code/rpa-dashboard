import { MainStatsDataType, QueueCountType } from '../Types/types.ts'

import { CaptchaBalanceDataType } from '../Scenes/CaptchaBalance.tsx'
import { APIOverviewCardDataType } from '../Scenes/APIOverview.tsx'


import { mockStatsData } from './MockStatsData.ts';
import { RPAListingsMockData } from "./RPAListingsMockData.ts";
import { CaptchaBalanceMockData } from "./CaptchaBalanceMockData.ts";
import { APIStatsMockData } from "./APIStatsMockData.ts";
import { BrowserlessStatsMockData } from './BrowserlessStatsMockData.ts';



export async function fetchLatestMainStatsData(
  rpaSlug: string | null = "all",
  startDateTime: number | null = null,
  endDateTime: number | null = null
): Promise<MainStatsDataType> {
  if (mockStatsData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockStatsData
  }

  if (!startDateTime || !endDateTime) {
    endDateTime = Math.floor(Date.now() / 1000);
    startDateTime = endDateTime - 86400
  }
  const response = await fetch(
    `http://0.0.0.0:8000/api/graphs/v2/filings_graph?fromDate=${startDateTime}&toDate=${endDateTime}&rpaId=${rpaSlug}&callType=prod`);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData;
};


export async function fetchQueueCount(): Promise<QueueCountType[]> {
  const url = "http://0.0.0.0:8000/api/rpa_data/queue_count"
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchCaptchaBalance(): Promise<CaptchaBalanceDataType[]> {

  if (CaptchaBalanceMockData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return CaptchaBalanceMockData
  }

  const url = "http://0.0.0.0:8000/api/captcha_balance/"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchBrowserlessStats(): Promise<any[]> {
  if (BrowserlessStatsMockData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return BrowserlessStatsMockData
  }

  const url = "http://0.0.0.0:8000/api/browserless_stats/"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchAPIStatsData(): Promise<APIOverviewCardDataType[]> {

  if (APIStatsMockData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return APIStatsMockData
  }

  const url = "http://0.0.0.0:8000/api/api_stats/"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchRPAListingsData(): Promise<any> {
  if (RPAListingsMockData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return RPAListingsMockData
  }

  const url = "http://0.0.0.0:8000/api/"
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}


export async function fetchPayloadText(processId: string): Promise<any> {
  if (processId) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { payloadText: processId }
  }

  const url = "http://0.0.0.0:8000/api/"
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }
  const resData = await response.json();
  return resData
}