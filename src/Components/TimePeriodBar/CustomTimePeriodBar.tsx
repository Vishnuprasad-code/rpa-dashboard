import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatDateFromEpoch } from "../../Utils/utils";
import dayjs from "dayjs";



interface TimePeriodBarPropsType {
    startDateTime: number;
    endDateTime: number;
    handleStartDateTimeChange: (newValue: dayjs.Dayjs | null) => void;
    handleEndDateTimeChange: ((newValue: dayjs.Dayjs | null) => void) | null;
    selectedDateButtonText: string;
    buttonTextsArray: string[];
    handleSingleDateTimeChange: (newValue: string) => void;
    timeZone: string
}


const selectedDateFilerStyle = (theme: any) => ({
    "backgroundColor": theme.palette.company.zb_main,
    "color": "black",
    "& button": {
        "color": "black",
    }
});


export default function TimePeriodBar(
    {
        startDateTime, endDateTime,
        handleStartDateTimeChange,
        handleEndDateTimeChange,
        selectedDateButtonText,
        buttonTextsArray,
        handleSingleDateTimeChange,
        timeZone
    }: TimePeriodBarPropsType) {

    return (
        <Box
            display={"flex"}
            sx={{
                flexDirection: { xl: "row", lg: "row", md: "column", sm: "column", xs: "column" },
                flex: "1 0",
                width: "100%",
            }}
            justifyContent="space-between"
            alignItems="center"
        >
            <Box
                sx={{
                    p: 1,
                    borderRadius: "10px"
                }}
            >
                <Typography variant="h5">{formatDateFromEpoch(startDateTime)} - {formatDateFromEpoch(endDateTime)} CST</Typography>
            </Box>
            <Box
                display={"flex"}
                justifyContent="flex-start"
                alignItems="center"
                columnGap={0.75}
                sx={{
                    "& > div": {
                        maxHeight: "50px",
                        borderRadius: "15px",
                        textAlign: "center",
                        px: 1,
                        py: 0.5,
                        border: "1px solid transparent",
                    },
                    "&> div:hover": {
                        border: "1px solid cyan",
                        cursor: "pointer"
                    },
                }}
            >
                {buttonTextsArray.map((buttonText) => (<Box key={buttonText} sx={(theme) => ({
                    ...(selectedDateButtonText === buttonText) && selectedDateFilerStyle(theme)
                })}
                    onClick={() => handleSingleDateTimeChange(buttonText)}>
                    <Typography variant='h5' textAlign={"center"}>{buttonText}</Typography>
                </Box>))}
                <Box sx={(theme) => ({
                    ...(selectedDateButtonText === "dateRange") && selectedDateFilerStyle(theme)
                })}
                >
                    <MUIDateTimeRangePicker
                        handleEndDateTimeChange={handleEndDateTimeChange}
                        handleStartDateTimeChange={handleStartDateTimeChange}
                        timeZone={timeZone}
                    />
                </Box>
            </Box>
        </Box>
    );
}


interface MUIDateTimeRangePickerPropsType {
    handleStartDateTimeChange: (newValue: dayjs.Dayjs | null) => void;
    handleEndDateTimeChange: ((newValue: dayjs.Dayjs | null) => void) | null;
    timeZone: string;
}

const MUIDateTimeRangePicker = (
    { handleStartDateTimeChange,
        handleEndDateTimeChange,
        timeZone
    }: MUIDateTimeRangePickerPropsType) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.tz.setDefault(timeZone)}>
            <DateTimePicker
                // label="Start Date & Time"
                // value={startDateTime}
                onChange={handleStartDateTimeChange}
                sx={{
                    "& input": {
                        display: "none"
                    },
                    "& .MuiFormControl-root": {
                        padding: 0,
                    },
                }}
            />
            {handleEndDateTimeChange && <>
                <span> - </span>
                <DateTimePicker
                    // label="End Date & Time"
                    // value={endDateTime}
                    onChange={handleEndDateTimeChange}
                    sx={{
                        "& input": {
                            display: "none"
                        },
                        "& .MuiFormControl-root": {
                            padding: 0,
                        },
                    }}
                // minDateTime={startDateTime}
                />
            </>}
        </LocalizationProvider>
    );
};