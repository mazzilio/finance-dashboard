import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
} from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const Row3 = () => {
	const { palette } = useTheme();
	const { data: productData } = useGetProductsQuery();
	const { data: kpiData } = useGetKpisQuery();
	const { data: transactionsData } = useGetTransactionsQuery();

	const pieColor = [palette.primary[800], palette.primary[500]];
	const pieChartData = useMemo(() => {
		if (kpiData) {
			const totalExpenses = kpiData[0].totalExpenses;
			return Object.entries(kpiData[0].expensesByCategory).map(
				([key, value]) => {
					return [
						{ name: key, value: value },
						{
							name: `${key} of Total`,
							value: totalExpenses - value,
						},
					];
				}
			);
		}
	}, [kpiData]);

	const productColumns = [
		{ field: '_id', headerName: 'Product ID', flex: 1 },
		{
			field: 'expense',
			headerName: 'Expense',
			flex: 0.5,
			renderCell: (params: GridCellParams) => `£${params.value}`,
		},
		{
			field: 'price',
			headerName: 'Price',
			flex: 0.5,
			renderCell: (params: GridCellParams) => `£${params.value}`,
		},
	];

	const transactionColumns = [
		{ field: '_id', headerName: 'Transaction ID', flex: 1 },
		{
			field: 'buyer',
			headerName: 'Buyer',
			flex: 0.67,
		},
		{
			field: 'amount',
			headerName: 'Amount',
			flex: 0.35,
		},
		{
			field: 'productIds',
			headerName: 'Count',
			flex: 0.35,
			renderCell: (params: GridCellParams) =>
				(params.value as Array<string>).length,
		},
	];

	return (
		<>
			<DashboardBox gridArea='g'>
				<BoxHeader
					title='List of Products'
					sideText={`${productData?.length} products`}
				/>{' '}
				<Box
					mt='0.5rem'
					p='0 0.5rem'
					height='85%'
					sx={{
						'& .MuiDataGrid-root': {
							color: palette.grey[300],
							border: 'none',
						},
						'& .MuiDataGrid-cell': {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						'& .MuiDataGrid-columnHeaders': {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						hideFooterSelectedRowCount={true}
						rowHeight={35}
						rows={productData || []}
						columns={productColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea='h'>
				<BoxHeader
					title='Recent Orders'
					sideText={`${transactionsData?.length} Transactions`}
				/>{' '}
				<Box
					mt='1rem'
					p='0 0.5rem'
					height='85%'
					sx={{
						'& .MuiDataGrid-root': {
							color: palette.grey[300],
							border: 'none',
						},
						'& .MuiDataGrid-cell': {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						'& .MuiDataGrid-columnHeaders': {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						hideFooterSelectedRowCount={true}
						rowHeight={35}
						rows={transactionsData || []}
						columns={transactionColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea='i'>
				<BoxHeader
					title='Expense Breakdown By Category'
					sideText='+3.2%'
				/>
				<FlexBetween
					mt='0.5rem'
					gap='0.5rem'
					p='0 1rem'
					textAlign='center'
				>
					{pieChartData?.map((data, i) => (
						<Box key={`${data[0].name}-${i}`}>
							<PieChart width={110} height={80}>
								<Pie
									stroke='none'
									data={data}
									innerRadius={18}
									outerRadius={35}
									paddingAngle={2}
									dataKey='value'
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={pieColor[index]}
										/>
									))}
								</Pie>
							</PieChart>
							<Typography variant='h5'>{data[0].name}</Typography>
						</Box>
					))}
				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea='j'>
				<BoxHeader
					title='Overall Summary and Explanation Data'
					sideText='+13.1%'
				/>{' '}
				<Box
					height='15px'
					margin='1.25rem 1rem 0.4rem 1rem'
					bgcolor={palette.primary[800]}
					borderRadius='1rem'
				>
					<Box
						height='15px'
						bgcolor={palette.primary[600]}
						borderRadius='1rem'
						width='40%'
					></Box>
				</Box>
				<Typography margin='0 1rem' variant='h6'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu.
				</Typography>
			</DashboardBox>
		</>
	);
};

export default Row3;
