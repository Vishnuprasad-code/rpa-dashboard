interface Column {
    id: "process_id" | "rpa" | "filing_status";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }
  
  export const columns: readonly Column[] = [
    {
      id: "process_id",
      label: "UUID",
      minWidth: 10,
    },
    {
      id: "rpa",
      label: "RPA",
      minWidth: 10,
      align: "right",
    },
    {
      id: "filing_status",
      label: "STATUS",
      minWidth: 10,
      align: "right",
    },
  ];
  

  export const rows = [
    { uuid: "1", rpa: "ca-soi", status: "sos_succcessful_filing" },
    { uuid: "2", rpa: "ca-soi", status: "invalid_address" },
    { uuid: "3", rpa: "ca-soi", status: "incorrect_data_format" },
    { uuid: "4", rpa: "pa-llc", status: "invalid_address" },
    { uuid: "5", rpa: "ca-llc", status: "incorrect_data_format" },
    { uuid: "6", rpa: "ca-llc", status: "incorrect_data_format" },
    { uuid: "7", rpa: "ca-llc", status: "incorrect_data_format" },
    { uuid: "8", rpa: "ca-llc", status: "incorrect_data_format" },
  ]
