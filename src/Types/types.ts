export interface FailedFilingType {
    env: string;
    process_id: string;
    rpa: string;
    filing_status: string;
    start_time: number; // You might want to consider a Date type if you convert timestamps
    end_time: number;   // Same as above
    total_execution_time: number;
    state: string;
    filing_type: string;
    success_on_retry: boolean;
    success_or_failed: 'success' | 'failed'; // Assuming these are the only possible values
    copy_payload?: null
  }
  
export interface GraphDataType {
success: number;
failed: number;
rpa: string;
}

export interface mainStatsDataType {
  totalCount: number;
  successCount: number;
  failedCount: number;
  failedFilings: FailedFilingType[];
  graphData: GraphDataType[];
}


export interface QueueCountType {
  state: string,
  count: number,
  filingType: string
}