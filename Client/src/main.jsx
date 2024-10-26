import React from 'react';
import './index.css'
import ReactDOM from "react-dom/client";

import App from './App.jsx'
import GridBackground from './Components/ui/GridBackground'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<App />
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);
