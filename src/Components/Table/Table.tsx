import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { columnsPartOne, columnsPartTwo, columnsExtra } from "./Columns.ts";

import {FailedFilingType} from "../../Types/types.ts"


export const AnimatedMuiTable = ({dataRows, isPaused, isFullTable}: {
  dataRows: FailedFilingType[],
  isPaused: boolean,
  isFullTable: boolean,
}) => {
  const scrollRef = useRef<HTMLTableSectionElement>(null);
  const currentPosRef = useRef(0); // Store the current scroll position
  const [isHovered, setIsHovered] = useState(false); // State to track if animation is paused

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
  if (isFullTable){
    reqColumns = [...reqColumns, ...columnsPartTwo, ...columnsExtra]
  }

  return (
    <TableContainer
      component={Paper}
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
          "& th, & td": {
            fontSize: "15px",
          },
          // "& th:hover":{
            
          // }
        }}
        >
        {/* Table Header */}
        <TableHead
            sx={(theme) => ({
              ".MuiTableCell-head ": {
                backgroundColor: theme.palette.primary.dark
              },
            })}
          >
          <TableRow tabIndex={-1}>
            {reqColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody ref={scrollRef}>
          {dataRows.map((row) => (
            <TableRow key={`${row.process_id}-${row.start_time}`} hover role="checkbox" tabIndex={-1}>
              {
                columnsPartOne.map((column) => {
                let value = String(row[column.id])
                return (
                  <TableCell key={column.id} align={column.align}>
                    {value}
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
                    {column.componentToRender && <column.componentToRender processId={row.process_id}/>}
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
