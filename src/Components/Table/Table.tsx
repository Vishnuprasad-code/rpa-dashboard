import { useContext, useEffect, useRef, useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Paper,
  Box,
  IconButton,
} from "@mui/material";
import { columnsPartOne, columnsPartTwo, columnsExtra } from "./Columns.ts";

import { FailedFilingType, RpaListingsType } from "../../Types/types.ts"
import { DashboardContext } from "../../Contexts/DashboardContext.tsx";
import { formatDateFromEpoch } from "../../Utils/utils.ts";


export const AnimatedMuiTable = ({ dataRows, isPaused, isFullTable }: {
  dataRows: FailedFilingType[],
  isPaused: boolean,
  isFullTable: boolean,
}) => {
  const scrollRef = useRef<HTMLTableSectionElement>(null);
  const currentPosRef = useRef(0); // Store the current scroll position
  const [isHovered, setIsHovered] = useState(false); // State to track if animation is paused
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const { rpaListings } = useContext(DashboardContext)

  function handleFilterChange(selectedStatusFilter: string) {
    setSelectedStatusFilter(selectedStatusFilter)
  }

  // Scroll logic with requestAnimationFrame
  useEffect(() => {
    const totalHeight = scrollRef.current?.offsetHeight ?? 0;
    let animationFrame: number;

    const scrollSpeed = 0.33; // Adjust this value to change the speed of the scroll

    const scroll = () => {
      if (!isPaused && !isHovered && dataRows.length > 3) {
        // Only scroll if not paused
        if (currentPosRef.current <= -totalHeight) {
          currentPosRef.current = 0; // Reset scroll position when reaching the end
        }
        currentPosRef.current -= scrollSpeed; // Move upwards by scrollSpeed
        scrollRef.current!.style.transform = `translateY(${currentPosRef.current}px)`;
      } else {
        currentPosRef.current = 0;
        scrollRef.current!.style.transform = `translateY(${0}px)`;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame); // Clean up animation on component unmount
  }, [isPaused, isHovered, dataRows.length]); // Depend on isPaused to pause/resume animation and rows.length

  let reqColumns = [...columnsPartOne]
  if (isFullTable) {
    reqColumns = [...reqColumns, ...columnsPartTwo, ...columnsExtra]
  }

  const [filteredDataRows, statusCountMap] = getFilteredDataRows(dataRows, selectedStatusFilter)
  return (
    <TableContainer
      // component={Paper}
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (isPaused) {
          e.currentTarget.style.overflow = "auto";
          return
        }
        e.currentTarget.scrollTop = 0;
        e.currentTarget.style.overflow = "auto";
        setIsHovered(true);
      }} // Pause on hover
      onMouseLeave={(e) => {
        if (isPaused) {
          return
        }
        e.currentTarget.scrollTop = 0;
        e.currentTarget.style.overflow = "hidden";
        setIsHovered(false);
      }} // Resume when hover ends
    >
      <Table
        stickyHeader
        sx={{
          backgroundColor: "transparent",
          "& th, & td": {
            fontSize: "15px",
            p: "10px",
          },
          "& th:hover": {
            // border: ".5px solid grey",
          }
        }}
      >
        {/* Table Header */}
        <TableHead
          sx={(theme) => ({
            ".MuiTableCell-head": {
              backgroundColor: theme.palette.primary.dark
            },
          })}
        >
          <TableRow tabIndex={-1}>
            {reqColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                }}
              >
                <CustomTableHeadCell
                  name={column.label}
                  selectedStatusFilter={selectedStatusFilter}
                  statusCountMap={statusCountMap}
                  onFilterChange={handleFilterChange}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody ref={scrollRef}>
          {filteredDataRows.map((row) => (
            <TableRow key={`${row.process_id}-${row.start_time}`} hover role="checkbox" tabIndex={-1}>
              {
                columnsPartOne.map((column) => {
                  let value = String(row[column.id])
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ maxWidth: column.maxWidth, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {(Object.keys(rpaListings).length > 0 && column.componentToRender) ? <column.componentToRender href={getRpaLogsHref(rpaListings, row)} icon={<VisibilityIcon />} /> : value}
                    </TableCell>
                  );
                })}
              {
                isFullTable && columnsPartTwo.map((column) => {
                  let value = String(row[column.id])
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {value}
                    </TableCell>
                  );
                })}
              {
                isFullTable && columnsExtra.map((column) => {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.componentToRender && <column.componentToRender filingType={row.filing_type} processId={row.process_id} />}
                    </TableCell>
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



function CustomTableHeadCell(
  props: {
    name: string,
    selectedStatusFilter: string,
    statusCountMap: { [k: string]: number },
    onFilterChange: (selectedStatusFilter: string) => void
  }) {

  if (props.name !== "STATUS") return <Box>{props.name}</Box>

  return <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <Box>{props.name}</Box>
    <FilterMenu
      statusCountMap={props.statusCountMap}
      selectedStatusFilter={props.selectedStatusFilter}
      onFilterChange={props.onFilterChange}
    />
  </Box>
}


export default function FilterMenu(
  props: {
    statusCountMap: { [k: string]: number },
    selectedStatusFilter: string,
    onFilterChange: (selectedStatusFilter: string) => void
  }
) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (key: string) => {
    props.onFilterChange(key);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="filter-button"
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterAltIcon />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(props.selectedStatusFilter)}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        {Object.entries(props.statusCountMap).map(([key, value]) => {
          return <MenuItem key={key} onClick={() => handleClose(key)}>{`${key} (${value})`}</MenuItem>
        })}
      </Menu>
    </div>
  );
}


function getFilteredDataRows(
  dataRows: FailedFilingType[],
  selectedStatusFilter: string = "all"
): [FailedFilingType[], { [k: string]: number }] {

  const filteredDataRows: FailedFilingType[] = []
  const statusCountMap: { [k: string]: number } = { "all": dataRows.length }

  for (const jData of dataRows) {
    statusCountMap[jData.filing_status] = 1 + (statusCountMap[jData.filing_status] ?? 0)
    if (selectedStatusFilter === "all") {
      filteredDataRows.push(jData)
    }
    else if (jData.filing_status === selectedStatusFilter) {
      filteredDataRows.push(jData)
    }
  }

  return [filteredDataRows, statusCountMap]
}


function getRpaLogsHref(rpaListings: RpaListingsType, row: FailedFilingType) {
  const { state, rpa, process_id, start_time, end_time } = row;
  let rpaId = null;
  const rpaArray = rpaListings[`${state}`]

  for (const rpaObj of rpaArray) {
    if (rpaObj.slug === rpa) rpaId = rpaObj.rpa_id
  }

  const fromDate = formatDateFromEpoch(start_time - 60 * 10, 'Asia/Calcutta', 'YYYY-MM-DDTHH:mm:ss')
  const endDate = formatDateFromEpoch(end_time + 60 * 10, 'Asia/Calcutta', 'YYYY-MM-DDTHH:mm:ss')
  const url = `https://nest.scrapehero.com/nest/api/${rpaId}/development_logs/?` +
    `from_date=${(fromDate)}&search=${process_id}&` +
    `time_zone=Asia/Calcutta&to_date=${(endDate)}`

  return url
}