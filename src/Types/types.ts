export interface FailedFilingType {
  env: string;
  process_id: string;
  rpa: string;
  filing_status: string;
  start_time: number;
  end_time: number;
  total_execution_time: number;
  state: string;
  filing_type: string;
  success_on_retry: boolean;
  success_or_failed: string;
  copy_payload?: null;
  view_logs?: null;
  status_json?: null;
}

export interface GraphDataType {
  success: number;
  failed: number;
  rpa: string;
  state: string;
}

export interface MainStatsDataType {
  totalCount: number;
  successCount: number;
  failedCount: number;
  failedFilings: FailedFilingType[];
  graphData: GraphDataType[];
}


export interface QueueCountType {
  state: string;
  count: number;
  filingType: string;
}


export interface RpaListingType {
  [k: string]: string | number;
}


export interface RpaListingsType {
  [k: string]: RpaListingType[];
}

export interface DashboardContextType {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  rpaListings: RpaListingsType;
}