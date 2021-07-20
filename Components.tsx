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

const Card = (props: {title: string, sources: Array<{description: string, value: string, percentage: string}>, total: any,isBig: boolean}) => {
    const isGreen = (title: string,description: string) => {
        if (!description) return null;
        return(
            description.toLowerCase() === 'receita' ||
            (description === '' && title.toLowerCase() === 'receita')||
            (description === '' && title.toLowerCase() === 'total')
        );
    }
    const isRed = (title: string,description: string) => {
        return(
            description.toLowerCase() === 'despesas' ||
            (description === '' && title.toLowerCase().includes('despesas'))
        );
    }

    const colorStyle = (title: string,description: string) => {
        if (isGreen(title,description)) return styles.CardRevenueText;
        
        if (isRed(title,description)) return styles.CardExpenseText;
        
        return styles.CardNeutralText;
    }
    return(
        <View style={props.isBig ? styles.BigCard : styles.SmallCard}>
            <Text style={styles.CardTitle}>{props.title}</Text>
            <View>
                {Object.entries(props.sources).map(([key,source]) => {
                    return(
                        <View key={key} style={styles.BigCardContentRow}>
                            <View style={styles.CardDescriptionContainer}>
                                <Text style={styles.CardDescription}>{source.description}</Text>
                            </View>
                            <View style={styles.CardCurrencyContainer}>
                                <Text style={colorStyle(props.title, source.description)}>R$</Text>
                            </View>
                            <View style={props.isBig ? styles.BigCardValueContainer : styles.SmallCardValueContainer}>
                                <Text style={colorStyle(props.title, source.description)}>{source.value}</Text>
                            </View>
                            {props.isBig && <View style={styles.CardPercentageContainer}>
                                <Text style={styles.CardPercentageText}>{source.percentage}</Text>
                            </View>}
                        </View>
                    );
                })}
                <View key={"marker"} style={styles.BigCardContentRow}>
                    <View style={styles.CardDescriptionContainer}></View>
                    <View style={styles.CardCurrencyContainer}></View>
                    <View style={props.isBig ? styles.BigCardMarkerContainer : styles.SmallCardMarkerContainer}>
                        <Text style={styles.CardMarkerText}>............</Text>
                    </View>
                    {props.isBig &&<View style={styles.CardPercentageContainer}></View>}
                </View>
                <View key={"total"} style={styles.BigCardContentRow}>
                    <View style={styles.CardDescriptionContainer}>
                        <Text style={styles.CardDescription}>{props.total.description}</Text>
                    </View>
                    <View style={styles.CardCurrencyContainer}>
                        <Text style={colorStyle(props.title, props.total.description)}>R$</Text>
                    </View>
                    <View style={props.isBig ? styles.BigCardValueContainer : styles.SmallCardValueContainer}>
                        <Text style={colorStyle(props.title, props.total.description)}>{props.total.value}</Text>
                    </View>
                    {props.isBig &&<View style={styles.CardPercentageContainer}>
                        <Text style={styles.CardPercentageText}>{props.total.percentage}</Text>
                    </View>}
                </View>
            </View>
        </View>
    );
}

export {Page, Header, Card};