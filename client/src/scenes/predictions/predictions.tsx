import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
    const { palette } = useTheme();
    const [isPredictions, setIsPredictions] = useState<boolean>(false);
    const { data: kpiData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!kpiData) return [];

        // Formatting and creating the data formatt to be mapped onto the line graph
        const monthlyData = kpiData[0].monthlyData;

        const formatted: Array<DataPoint> = monthlyData.map(({ revenue }, i: number) => {
            // i = x value (month), revenue = y value
            return [i, revenue];
        });

        const regressionLine = regression.linear(formatted);
        return monthlyData.map(({ month, revenue }, i: number) => {
            // Indvidual data points for each graph point
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                // Represents next years predictions (12 months on)
                "Predicted Revenue": regressionLine.predict(i + 12)[1]
            };
        });
    }, [kpiData]);

    return (
        <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
            <FlexBetween m="1rem 2.5rem" gap="1.5rem">
                <Box>
                    <Typography variant="h3">Revenue and Predictions</Typography>
                    <Typography variant="h6">
                        chartered revenue and predicted revenue based on a simple linear regression model
                    </Typography>
                </Box>
                <Button
                    onClick={() => setIsPredictions(!isPredictions)}
                    sx={{
                        color: palette.grey[900],
                        bgcolor: palette.grey[700],
                        boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)"
                    }}
                >
                    Predicted Revenue for Upcoming Fiscal Year
                </Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="95%">
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 75,
                        left: 20,
                        bottom: 80
                    }}
                >
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: "12px" }}>
                        <Label value="Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis
                        domain={[12000, 26000]}
                        style={{ fontSize: "12px" }}
                        axisLine={{ strokeWidth: "0" }}
                        tickFormatter={(v) => `£${v}`}
                        orientation="left"
                    >
                        <Label value="Revenue in GBP" offset={-5} position="insideLeft" angle={-90} />
                    </YAxis>

                    <Tooltip />
                    <Legend height={35} wrapperStyle={{ margin: "0 0 10px 0" }} verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="Actual Revenue"
                        stroke={palette.primary.main}
                        strokeWidth={0}
                        dot={{ strokeWidth: 5 }}
                    />
                    <Line type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />

                    {isPredictions && (
                        <Line strokeDasharray="3" dataKey="Predicted Revenue" stroke={palette.secondary[500]} />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    );
};

export default Predictions;
