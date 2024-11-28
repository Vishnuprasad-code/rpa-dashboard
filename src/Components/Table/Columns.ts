import CustomCopyClipboard from "../CopyClipboard/CopyClipboard";
import { CustomLinkIconComponent } from "../LinkIcon/CustomLinkIconComponent";

interface Column {
  id: "process_id" | "rpa" | "view_logs" | "filing_status" | "success_on_retry" | "copy_payload";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  format?: (value: boolean | string) => string;
  componentToRender?: (props: any) => JSX.Element,
}

export const columnsPartOne: readonly Column[] = [
  {
    id: "process_id",
    label: "UUID",
    minWidth: 10,
    maxWidth: 150,
    align: "left",
  },
  {
    id: "view_logs",
    label: "LOGS",
    minWidth: 10,
    maxWidth: 50,
    align: "center",
    componentToRender: CustomLinkIconComponent
  },
  {
    id: "rpa",
    label: "RPA",
    minWidth: 10,
    maxWidth: 150,
    align: "center",
  },
  {
    id: "filing_status",
    label: "STATUS",
    minWidth: 10,
    maxWidth: 150,
    align: "justify",
  },
]

export const columnsPartTwo: readonly Column[] = [
  {
    id: "success_on_retry",
    label: "SUCCESS ON RETRY",
    minWidth: 10,
    align: "center",
  },
];

export const columnsExtra: readonly Column[] = [
  {
    id: "copy_payload",
    label: "COPY PAYLOAD",
    minWidth: 5,
    align: "center",
    componentToRender: CustomCopyClipboard
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
