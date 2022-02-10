import {useState} from 'react';
import {useFonts} from 'expo-font';

import LoginPage from './pages/Login';
import LoadingPage from './pages/Loading';
import MainPage from './pages/Main';

import Lato from './assets/fonts/Lato-Regular.ttf';

export default () => {
	const [currentPage, setCurrentPage] = useState('login');
	const [availableDates, setAvailableDates] = useState([]);
	const [date, setDate] = useState(null);
	const [data, setData] = useState(null);

	const [loaded] = useFonts({Lato});
	  
	if (!loaded) {
		return null;
	}

	if(currentPage === 'login'){
		return (
			<LoginPage setCurrentPage={setCurrentPage}/>
		);
	}

	if(currentPage === 'loading'){
		return(
			<LoadingPage 
				setAvailableDates={setAvailableDates}
				setCurrentPage={setCurrentPage}
				date={date}
				setData={setData}
			/>
		);
	}

	if(currentPage === 'main') {
		return(
			<MainPage
				availableDates={availableDates}
				setCurrentPage={setCurrentPage}
				setDate={setDate}
				date={date}
				data={data}
			/>
		);
	}

	return null;  
}
