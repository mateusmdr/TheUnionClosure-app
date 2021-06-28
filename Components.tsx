import React, { ReactChildren } from 'react';
import {SafeAreaView,View,Text,Image} from 'react-native';

import {styles} from './stylesheet';

const Page: React.FC = (props) => {
    return(
        <SafeAreaView style={styles.SafeAreaView}>
            {props.children}
        </SafeAreaView>
    );
}

const Header: React.FC = () => {
    return(
        <View style={styles.Header}>
            <Image source={require('./assets/logo.png')} style={styles.HeaderLogo}/>
            <View>
                <Text style={styles.HeaderText}>Empresa The Union</Text>
                <Text style={styles.HeaderText}>00.000.000/0000-00</Text>
            </View>
        </View>
    );
}

export {Page, Header};