// MUI-related
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

// Other
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '@/scenes/navbar/navbar';
import Dashboard from '@/scenes/dashboard/dashboard';
import Predictions from '@/scenes/predictions/predictions';
import './App.css';

function App() {
	// Only happens once on initial load
	const theme = useMemo(() => createTheme(themeSettings), []);

	return (
		<>
			<div className='app'>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Box className='app__box'>
							<Navbar />
							<Routes>
								<Route path='/' element={<Dashboard />} />
								<Route
									path='/predictions'
									element={<Predictions />}
								/>
							</Routes>
						</Box>
					</ThemeProvider>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
