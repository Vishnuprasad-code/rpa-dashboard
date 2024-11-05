import CustomSkeleton from "../Components/LoadingAnimation/Skeleton.tsx";
import {GlossyBox} from "../Components/StyledComponents/styledBox.tsx"

import {AnimatedMuiTable} from "../Components/Table/Table.tsx"

import { MainStatsContext } from "../Contexts/mainStatsContext.tsx"

import { useContext } from "react"


export default function Table({isPaused=false, isFullTable=false}){
    const {mainStatsData} = useContext(MainStatsContext);

    if (!mainStatsData) return <CustomSkeleton/>

    return <GlossyBox>
        <AnimatedMuiTable dataRows={mainStatsData.failedFilings} isPaused={isPaused} isFullTable={isFullTable}/>
    </GlossyBox>
};