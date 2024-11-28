import { useState } from "react";
import { unsecuredCopyToClipboard } from "../../Utils/utils";
import { fetchPayloadText } from "../../Http/http";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


export default function CustomCopyClipboard({ processId }: { processId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleCopyClipboard() {
        setIsLoading(true);

        unsecuredCopyToClipboard("");

        const payloadObject = await fetchPayloadText(processId);
        const copyText = payloadObject.payloadText;

        unsecuredCopyToClipboard(copyText);

        setIsLoading(false);
    }

    const componentToRender = (
        isLoading ? <HourglassBottomIcon /> :
            <ContentCopyIcon sx={{ "&:hover": { cursor: "pointer" } }} onClick={handleCopyClipboard} />
    );
    return componentToRender
};