import {GlossyBox} from "../components/StyledComponents/styledBox.tsx"
import {ResponsiveStackBar} from '../components/Charts/BarChart.tsx'

// import data from "../components/Charts/BarChartMockData.ts"

import { useContext } from "react"
import { MainStatsContext } from "../Contexts/mainStatsContext.tsx"


export default function AllRpaBar(){
    const {mainStatsData} = useContext(MainStatsContext);

    return <GlossyBox>
        <ResponsiveStackBar data={mainStatsData.graphData}/>
    </GlossyBox>      

}