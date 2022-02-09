import { useState } from 'react';
import {View, Text, FlatList} from 'react-native';

import Page from './components/Page';
import Header from './components/Header';
import Card from './components/Card';

import {styles} from './styles/stylesheet';

const Main = ({availableDates, setCurrentPage}) => {
    const [data, setData] = useState(null);
    return(
        <Page>
            <View style={data ? styles.MainBackgroundLoaded : styles.MainBackgroundUnloaded}/>
            <Header/>
            <View style={data ? styles.TitleContainerLoaded : styles.TitleContainerUnloaded}>
            <Text style={styles.MainText}>Fechamento PPPOKER</Text>
            </View>
            <View style={styles.DatePicker}>
            {/* <Picker
                mode={'dropdown'}
                selectedValue={date}
                onValueChange={async (itemValue, itemIndex) =>{
                try{
                    setData(null);
                    setDate(itemValue);
                    switchPage('loading');
                }catch(e){
                    Alert.alert("Não foi possível obter ou formatar os dados do servidor:\n" + e.message);
                    console.error(e);
                }
                }}
                style={styles.DatePickerText}
                dropdownIconColor={colors.DatePicker}
            >    
                <Picker.Item enabled={false} key="placeholder" label={"Selecione uma data:"} value="placeholder"/>
                {availableDates.map((item) => {
                return(
                    <Picker.Item 
                    key={new Date(item).toISOString()}
                    label={dateFormat(item,"dd/mm/yyyy")}
                    value={new Date(item).toISOString()} 
                    />
                );
                })}
            </Picker> */}
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