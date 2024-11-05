import {GlossyBox} from "../Components/StyledComponents/styledBox.tsx"
import {ResponsiveStackBar} from '../Components/Charts/BarChart.tsx'

// import data from "../components/Charts/BarChartMockData.ts"

import { useContext } from "react"
import { MainStatsContext } from "../Contexts/mainStatsContext.tsx"
import CustomSkeleton from "../Components/LoadingAnimation/Skeleton.tsx";


export default function AllRpaBar(){
    const {mainStatsData, setSelectedState} = useContext(MainStatsContext);
    const handleStateSelection = setSelectedState && ((state: string) => setSelectedState(state))  || null

    if (!mainStatsData) return <CustomSkeleton/>

    return <GlossyBox>
        <ResponsiveStackBar data={mainStatsData.graphData} clicHandler={handleStateSelection}/>
    </GlossyBox>      

}