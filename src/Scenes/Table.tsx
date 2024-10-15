import {GlossyBox} from "../components/StyledComponents/styledBox.tsx"

import {AnimatedMuiTable} from "../components/Tables/Table.tsx"

import { MainStatsContext } from "../Contexts/mainStatsContext.tsx"

import { useContext } from "react"


export default function Table({isPaused=false, isFullTable=false}){
    const {mainStatsData} = useContext(MainStatsContext);
    return <GlossyBox>
        <AnimatedMuiTable dataRows={mainStatsData.failedFilings} isPaused={isPaused} isFullTable={isFullTable}/>
    </GlossyBox>
};