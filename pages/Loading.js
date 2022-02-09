import { useEffect } from 'react';
import {View, Image, Alert} from 'react-native';
// import { LinearGradient } from 'react-native-svg';

import Page from './components/Page';

import logoImg from '../assets/logo.png';

import {styles} from './styles/stylesheet';

import {getAvailableDates} from './queries/get';

const Loading = ({setAvailableDates, setCurrentPage}) => {
    useEffect(() => {
        getAvailableDates()
            .then(res => setAvailableDates(res))
            .then(() => setCurrentPage('main'))
            .catch(e => {
                console.error(e);
                Alert.alert("Não foi possível obter ou formatar os dados do servidor");
            });
    },[]);

    return(
        <Page>
            {/* <LinearGradient colors={colors.LinearGradient} style={styles.LinearGradient} locations={[0,0.5,0.77]}> */}
            <View style={styles.LoadingContainer}>
                <Image source={logoImg} style={styles.LoadingLogo}/>
            </View>
            {/* </LinearGradient> */}
        </Page>
    );
}

export default Loading;