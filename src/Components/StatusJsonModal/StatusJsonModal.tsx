import { useState } from "react";
import { fetchSearchResults } from "../../Http/http";
import DataObjectIcon from '@mui/icons-material/DataObject';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import Modal from '@mui/material/Modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import { RpaListingType } from "../../Types/types";


export default function CustomStatusJsonModal(props: { filingType: string, processId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [result, setResult] = useState<RpaListingType | {}>({});

    const fetchData = async (uuid: string) => {
        try {
            return await fetchSearchResults(uuid);
        } catch (error) {
            console.log(error);
        }

        return {}
    };

    async function handleStatusJson() {
        setIsLoading(true);

        const resultObject = await fetchData(props.processId)
        setResult(resultObject)

        setIsLoading(false);

        handleOpen();
    }

    const componentToRender = (
        isLoading ?
            <HourglassBottomIcon /> :
            <>
                <DataObjectIcon sx={{ "&:hover": { cursor: "pointer" } }} onClick={handleStatusJson} />
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={(theme) => ({
                        backgroundColor: `${theme.palette.background.default}f2`,
                        minWidth: "50vw",

                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    })}
                    >
                        {<KeyValueTable data={result} />};
                    </Box >
                </Modal>
            </>
    );
    return componentToRender
};


const KeyValueTable = ({ data }: { data: RpaListingType }) => {
    if (!data || !Object.keys(data).length) return <Box p="10rem">NO RESULT!</Box>

    return (
        <TableContainer component={Paper} sx={(theme) => ({
            m: "1rem",
            "& td": {
                p: "0",
                pt: "10px",
                px: "10px",
                fontSize: "1rem",
                border: "1px solid grey"
            },
            "& th": {
                textAlign: "center",
                border: "1px solid grey",
                fontSize: "1.2rem",
            },
            "& a:visited": {
                textDecoration: "none",
                textDecorationColor: "blue"
            },
            "& a:hover": {
                // textDecoration: "none",
                textDecorationColor: "blue",
                color: "blue",
            },
            "& a": {
                color: theme.palette.text.primary
            }

        })}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Key</strong></TableCell>
                        <TableCell><strong>Value</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>
                                {value.toString().startsWith("http") ?
                                    <a
                                        href={value.toString()} target="_blank">{value.toString()}</a> :
                                    value.toString()} </TableCell> {/* Ensure values are displayed as strings */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};