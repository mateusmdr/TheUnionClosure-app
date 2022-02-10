import { useEffect } from 'react';
import {View, Image, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Page from './components/Page';

import logoImg from '../assets/logo.png';

import {styles, colors} from './styles/stylesheet';

import {getAvailableDates, getData} from './queries/get';

const Loading = ({setAvailableDates, setCurrentPage, date, setData}) => {
    useEffect(() => {
        if (!date){
            getAvailableDates()
                .then(res => setAvailableDates(res))
                .then(() => setCurrentPage('main'))
                .catch(e => {
                    console.error(JSON.stringify(e));
                    Alert.alert("Não foi possível obter ou formatar os dados do servidor");
                });
        }else{
            setData(null);
            getData(date)
                .then(res => setData(res))
                .then(() => setCurrentPage('main'))
                .catch(e => {
                    console.error(JSON.stringify(e));
                    Alert.alert("Não foi possível obter ou formatar os dados do servidor");
                    setCurrentPage('main')
                });
        }
    },[]);

    return(
        <Page>
            <LinearGradient colors={colors.LinearGradient} style={styles.LinearGradient} locations={[0,0.5,0.77]}>
                <View style={styles.LoadingContainer}>
                    <Image source={logoImg} style={styles.LoadingLogo}/>
                </View>
            </LinearGradient>
        </Page>
    );
}

export default Loading;