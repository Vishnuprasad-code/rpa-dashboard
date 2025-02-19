import Typography from '@mui/material/Typography';

import {
    // AltBox,
    GlossyBox
} from "../Components/StyledComponents/styledBox.tsx"

import { CustomResponsivePie } from "../Components/Charts/PieChartCircle.tsx"


export default function SolveCaptchaTotalPie(props: any) {
    const totalCount = props.data.total
    const pieChartData = [
        {
            id: "pa_llc",
            label: "pa_llc",
            value: props.data.pa_llc ?? 0,
        },
        {
            id: "ga_llc",
            label: "ga_llc",
            value: props.data.ga_llc ?? 0,
        },
        {
            id: "ga_annual",
            label: "ga_annual",
            value: props.data.ga_annual ?? 0,
        },
    ].filter(({ value }) => value > 0);


    return <GlossyBox
        sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',

            width: "100%",
            height: "100%",
            flexDirection: 'column',
            paddingTop: 2,
            "& > div": {
                flexBasis: 'auto'
            }
        }
        }>
        <Typography variant="h5" align="center">
            TOTAL CAPTCHAS SOLVED: {totalCount}
        </Typography>
        {(totalCount || pieChartData.length > 0) && <CustomResponsivePie
            data={pieChartData}
            innerRadius={0}
            colors={["#33f08a", "#cc6b3c", "#8437a6"]}
            enableArcLabels={true}
        />}
    </GlossyBox>
};