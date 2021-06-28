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

const BigCard = (props: {title: string, sources: Array<{description: string, value: number}>}) => {
    return(
        <View style={styles.BigCard}>
            <Text style={styles.CardTitle}>{props.title}</Text>
            <View>
                {Object.entries(props.sources).map(([key,source]) => {
                    return(
                        <View key={key} style={styles.CardContentRow}>
                            <Text style={styles.CardDescription}>{source.description}</Text>
                            <Text>
                                <Text>R$</Text>
                                <Text>{source.value}</Text>
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
export {Page, Header, BigCard};