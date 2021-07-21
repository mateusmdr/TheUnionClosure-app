import React, {useState, useEffect} from 'react';
import {View, Text, TextInput,FlatList, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import LinearGradient from 'react-native-linear-gradient';
import dateFormat from 'dateformat';

import {Page, Header, Card} from './Components';

import {styles, colors} from './stylesheet';

import {getAvailableDates, getData} from './getData';
import credentials from './credentials';

const App: React.FC = () => {
  const [currentPage, switchPage] = useState('login');
  const [data, setData] = useState<any>(null);

  const [date,setDate] = useState<any>("placeholder");
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    async function load() {
      try{
        const response = await getAvailableDates();
        setAvailableDates(response);
        if(date!=="placeholder") setData(await getData(date));
        switchPage('main');
      }catch(e){
        Alert.alert("Não foi possível obter ou formatar os dados do servidor:\n" + e)
      }
    };

    if(currentPage==="loading"){
      load();
    }
  },[currentPage]);

  const passwordCheck = (text: string) => {
    if (text === credentials.APP_PASSWORD) {
      switchPage('loading');
    }else {
      Alert.alert('Senha incorreta');
    }
  }

  if (currentPage === 'login'){

    return (
      <Page>
        <LinearGradient colors={colors.LinearGradient} style={styles.LinearGradient} locations={[0,0.5,0.77]}>
          <Header/>
          <View style={styles.LoginForm}>
            <Text style={styles.MainText}>Fechamento PPPOKER</Text>
            <View>
              <Text style={styles.LoginLabel}>Senha</Text>
              <TextInput 
                style={styles.LoginInput}
                onSubmitEditing={(e) => passwordCheck(e.nativeEvent.text)}
                contextMenuHidden={true}
                enablesReturnKeyAutomatically={true}
                importantForAutofill='no'
                maxLength={16}
                secureTextEntry={true}
                spellCheck={false}
              />
            </View>
          </View>
        </LinearGradient>
      </Page>
    );
  }

  if (currentPage === 'loading'){

    return (
      <Page>
        <LinearGradient colors={colors.LinearGradient} style={styles.LinearGradient} locations={[0,0.5,0.77]}>
          <View style={styles.LoadingContainer}>
            <Image source={require('./assets/logo.png')} style={styles.LoadingLogo}/>
          </View>
        </LinearGradient>
      </Page>
    );
  }

  if (currentPage === 'main'){
    return(
      <Page>
        <View style={data ? styles.MainBackgroundLoaded : styles.MainBackgroundUnloaded}/>
        <Header/>
        <View style={styles.TitleContainer}>
          <Text style={styles.MainText}>Fechamento PPPOKER</Text>
        </View>
        <View style={styles.DatePicker}>
          <Picker
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
            {availableDates.map((item: string) => {
              return(
                <Picker.Item 
                  key={new Date(item).toISOString()}
                  label={dateFormat(item,"dd/mm/yyyy")}
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

  return (
    <Page>
      <Text>Página inexistente</Text>
    </Page>
  );
};

export default App;
