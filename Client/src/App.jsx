import Header from './Components/ui/Header'
import { Routes,Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TransactionPage from './pages/TransactionPage';
import NotFound from './pages/NotFound';
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from './graphql/queries/User.query';
import { Toaster } from 'react-hot-toast';
function App() {
	const{loading,data,error}=useQuery(GET_AUTHENTICATED_USER)
	if(loading) {return null}
	return (
		<>
			{data?.auth && <Header />}
			<Routes>
				<Route path='/' element={data?.auth ? <HomePage />:<Navigate to={'/login'}/>} />
				<Route path='/login' element={!data?.auth ? <LoginPage />:<Navigate to={'/'}/>} />
				<Route path='/signup' element={!data?.auth ?<SignUpPage />:<Navigate to={'/'}/>} />
				<Route path='/transaction/:id' element={data?.auth ?<TransactionPage />:<Navigate to={'/login'}/>}/>
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster/>
		</>
	);
}
export default App;