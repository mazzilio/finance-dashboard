import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
	reducerPath: 'main',
	// Tags to keep info of each api data
	tagTypes: ['Kpis', ''],
	// Where we create our API Calls
	endpoints: (build) => ({
		getKpis: build.query<void, void>({
			query: () => 'kpi/kpis/',
			providesTags: ['Kpis'],
		}),
	}),
});

export const { useGetKpisQuery } = api;
