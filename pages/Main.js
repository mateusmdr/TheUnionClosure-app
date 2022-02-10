import { useEffect } from 'react';
import {View, Text, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Page from './components/Page';
import Header from './components/Header';
import Card from './components/Card';

import dateFormat from 'dateformat';

import {styles, colors} from './styles/stylesheet';

const Main = ({availableDates, setCurrentPage, setDate, date, data}) => {
    return(
        <Page>
            <View style={data ? styles.MainBackgroundLoaded : styles.MainBackgroundUnloaded}/>
            <Header/>
            <View style={data ? styles.TitleContainerLoaded : styles.TitleContainerUnloaded}>
            <Text style={styles.MainText}>Fechamento PPPOKER</Text>
            </View>
            <View style={styles.DatePicker}>
            <Picker
                mode={'dropdown'}
                selectedValue={date}
                onValueChange={item =>{
					setDate(item);
					setCurrentPage('loading');
				}}
                style={styles.DatePickerText}
                dropdownIconColor={colors.DatePicker}
            >    
                <Picker.Item enabled={false} key="placeholder" label={"Selecione uma data:"} value={null}/>
                {availableDates.sort((a,b) => a<b ? 1 : -1).map((item) => {
                return(
                    <Picker.Item 
                    	key={new Date(item).toISOString()}
                    	label={dateFormat(item,'dd/mm/yy')}
                    	value={new Date(item).toISOString()} 
                    />
                );
                })}
            </Picker>
            </View>
            {data && <FlatList
            style={styles.CardList}
            data={(data.bigCards).concat(data.smallCards)}
            renderItem={({item, index}) => {
                if(data.bigCards.indexOf(item) !== -1) {
                return (
                    <Card 
                    title={item.title} 
                    sources={item.sources}
                    total={item.total}
                    isBig={true}
                    />
                );
                }

                return (
                <Card 
                    title={item.title} 
                    sources={item.sources}
                    total={item.total}
                    isBig={false}
                />
                );
            }}
            keyExtractor={(item) => item.title}
            />}
        </Page>
    );
}

export default Main;