export async function fetchLatestMainStatsData(){
    const response = await fetch('http://0.0.0.0:8000/api/graphs/v2/filings_graph?fromDate=1728000000&toDate=1728086400');
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to fetch user places');
    }
  
    return resData;

};