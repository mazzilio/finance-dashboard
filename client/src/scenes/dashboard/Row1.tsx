import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Legend,
	Line,
	CartesianGrid,
	Bar,
	BarChart,
} from 'recharts';

// https://recharts.org/en-US/examples/SimpleAreaChart
// Setting up data to represent data on line chart

const Row1 = () => {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();
	// console.log('data:', data);

	const revenueExpenses = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					expenses: expenses,
				};
			})
		);
	}, [data]);

	const revenueProfit = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					// Calculate it within the mapping function
					profit: (revenue - expenses).toFixed(2),
				};
			})
		);
	}, [data]);

	const revenue = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
				};
			})
		);
	}, [data]);

	return (
		<>
			{/* ----------------------------------- GRAPH 1 ---------------------------------------- */}
			<DashboardBox gridArea='a'>
				<BoxHeader
					title='Revenue and Expenses'
					subtitle='top line represents revenue, bottom line represents expenses'
					sideText='+4%'
				/>
				<ResponsiveContainer width='100%' height='100%'>
					<AreaChart
						width={50}
						height={40}
						data={revenueExpenses}
						margin={{
							top: 15,
							right: 25,
							left: -10,
							bottom: 60,
						}}
					>
						<defs>
							<linearGradient
								id='lineRevenue'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor={palette.primary[300]}
									stopOpacity={0.6}
								/>
								<stop
									offset='95%'
									stopColor={palette.primary[500]}
									stopOpacity={0.05}
								/>
							</linearGradient>

							<linearGradient
								id='lineExpenses'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor={palette.primary[300]}
									stopOpacity={0.6}
								/>
								<stop
									offset='95%'
									stopColor={palette.primary[500]}
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>
						<XAxis dataKey='name' style={{ fontSize: '12px' }} />
						<YAxis
							style={{ fontSize: '12px' }}
							domain={[8000, 23000]}
						/>
						<Tooltip />
						<Area
							type='monotone'
							dataKey='revenue'
							stroke={palette.primary.main}
							fillOpacity={1}
							fill='url(#lineRevenue)'
							dot={true}
						/>
						<Area
							type='monotone'
							dataKey='expenses'
							stroke={palette.primary.main}
							fillOpacity={1}
							fill='url(#lineExpenses)'
							dot={true}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>
			{/* ----------------------------------- GRAPH 2 ---------------------------------------- */}
			<DashboardBox gridArea='b'>
				<BoxHeader
					title='Profit and Revenue'
					subtitle='top line represents profit, bottom line represents revenue'
					sideText='+4%'
				/>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						data={revenueProfit}
						margin={{
							top: 20,
							right: 0,
							left: -10,
							bottom: 55,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke={palette.grey[800]}
						/>
						<XAxis dataKey='name' style={{ fontSize: '12px' }} />
						<YAxis
							style={{ fontSize: '12px' }}
							yAxisId='left'
							axisLine={false}
							orientation='left'
						/>
						<YAxis
							style={{ fontSize: '12px' }}
							orientation='right'
							yAxisId='right'
							axisLine={false}
						/>
						<Tooltip />
						<Legend
							height={20}
							wrapperStyle={{ margin: '0 0 10px 0' }}
						/>
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='profit'
							stroke={palette.tertiary[500]}
							dot={true}
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke={palette.primary.main}
							dot={true}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			{/* ----------------------------------- GRAPH 3 ---------------------------------------- */}
			<DashboardBox gridArea='c'>
				<BoxHeader
					title='Revenue Month by Month'
					subtitle='graph representing the revenue month by month'
					sideText='+4%'
				/>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						data={revenue}
						margin={{
							top: 17,
							right: 15,
							left: -5,
							bottom: 58,
						}}
					>
						<defs>
							<linearGradient
								id='barRevenue'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor={palette.primary[300]}
									stopOpacity={0.9}
								/>
								<stop
									offset='95%'
									stopColor={palette.primary[500]}
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							stroke={palette.grey[800]}
							vertical={false}
						/>
						<XAxis
							dataKey='name'
							axisLine={false}
							style={{ fontSize: '12px' }}
						/>
						<YAxis axisLine={false} style={{ fontSize: '12px' }} />
						<Tooltip />
						<Bar dataKey='revenue' fill='url(#barRevenue)' />
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row1;
