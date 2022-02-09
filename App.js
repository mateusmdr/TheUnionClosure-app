import {useState} from 'react';

// import {getAvailableDates, getData} from './getData';
// import credentials from './credentials';

import LoginPage from './pages/Login';
import LoadingPage from './pages/Loading';
import MainPage from './pages/Main';

export default () => {
	const [currentPage, setCurrentPage] = useState('login');
	const [availableDates, setAvailableDates] = useState([]);

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
			/>
		);
	}

	if(currentPage === 'main') {
		return(
			<MainPage
				availableDates={availableDates}
				setCurrentPage={setCurrentPage}
			/>
		);
	}

	return null;  
}
