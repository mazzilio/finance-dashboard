import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    Scatter,
    ScatterChart,
    ZAxis
} from "recharts";
import FlexBetween from "@/components/FlexBetween";

const Row2 = () => {
    const { palette } = useTheme();
    const pieColor = [palette.primary[800], palette.primary[300]];
    const pieData = [
        { name: "Group A", value: 600 },
        { name: "Group B", value: 400 }
    ];

    const { data: productData } = useGetProductsQuery();
    const { data: operationalData } = useGetKpisQuery();

    const operationalExpensesData = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return {
                    name: month.substring(0, 3),
                    "Operational Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses
                };
            })
        );
    }, [operationalData]);

    const productExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense
                };
            })
        );
    }, [productData]);

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader title="Operational vs Non-Operational Expenses and Revenue" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={operationalExpensesData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" style={{ fontSize: "12px" }} />
                        <YAxis style={{ fontSize: "12px" }} yAxisId="left" axisLine={false} orientation="left" />
                        <YAxis style={{ fontSize: "12px" }} orientation="right" yAxisId="right" axisLine={false} />
                        <Tooltip />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Non Operational Expenses"
                            stroke={palette.tertiary[500]}
                            dot={true}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="Operational Expenses"
                            stroke={palette.primary.main}
                            dot={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="e">
                <BoxHeader title="Campaigns and Targets" sideText="+2%" />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0
                        }}
                    >
                        <Pie
                            stroke="none"
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {/* eslint-disable-next-line */}
                            {pieData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColor[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                            83
                        </Typography>
                        <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
                    </Box>
                    <Box flexBasis="40%">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography m="0.3rem 0" variant="h6">
                            Losses are down 25%
                        </Typography>
                        <Typography variant="h5" mt="0.4rem">
                            Profit margins
                        </Typography>
                        <Typography variant="h6" mt="0.4rem">
                            Margins are up 30% from last month
                        </Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="f">
                <BoxHeader title="Product Prices vs Expenses" sideText="+10%" />
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -15
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            style={{ fontSize: "12px" }}
                            tickFormatter={(v) => `£${v} `}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            style={{ fontSize: "12px" }}
                            tickFormatter={(v) => `£${v} `}
                        />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `price: £${v} `} />
                        <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};

export default Row2;
