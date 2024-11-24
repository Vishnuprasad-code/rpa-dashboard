import CustomSkeleton from "../Components/LoadingAnimation/Skeleton.tsx";
import { GlossyBox } from "../Components/StyledComponents/styledBox.tsx"

import { AnimatedMuiTable } from "../Components/Table/Table.tsx"

import { MainStatsContext } from "../Contexts/mainStatsContext.tsx"

import { useContext } from "react"


export default function Table({ isPaused = false, isFullTable = false }) {
    const { mainStatsData, selectedState } = useContext(MainStatsContext);

    if (!mainStatsData) return <CustomSkeleton />

    let dataRows = mainStatsData.failedFilings
    if (selectedState) {
        dataRows = dataRows.filter(({ state }) => state === selectedState)
    }
    return <GlossyBox>
        <AnimatedMuiTable dataRows={dataRows} isPaused={isPaused} isFullTable={isFullTable} />
    </GlossyBox>
};