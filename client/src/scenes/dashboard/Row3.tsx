import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
} from '@/state/api';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';

const Row3 = () => {
	const { palette } = useTheme();
	const { data: productData } = useGetProductsQuery();
	const { data: kpiData } = useGetKpisQuery();
	const { data: transactionsData } = useGetTransactionsQuery();

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

	// useMemo(() => {
	// 	return (
	// 		productData &&
	// 		productData.map(({ _id, price, expense }) => {
	// 			return {
	// 				id: _id,
	// 				price: price,
	// 				expense: expense,
	// 			};
	// 		})
	// 	);
	// }, [productData]);

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
			<DashboardBox gridArea='i'></DashboardBox>
			<DashboardBox gridArea='j'></DashboardBox>
		</>
	);
};

export default Row3;
