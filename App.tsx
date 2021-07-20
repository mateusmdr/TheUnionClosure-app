import React, {useState, useEffect} from 'react';
import {View, Text, TextInput,FlatList, Image, TouchableWithoutFeedback} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {Page, Header, BigCard} from './Components';

import {styles, colors} from './stylesheet';

import {getData} from './getData';
import credentials from './credentials';

const App: React.FC = () => {
  const [currentPage, switchPage] = useState('login');
  const [data, setData] = useState<any>(null);

  const [date,setDate] = useState('2021-06-07');

  useEffect(() => {
    async function load() {
      setData(await getData(date));
      switchPage('main');
    };

    if(currentPage==="loading"){
      load();
    }
  },[currentPage]);

  const passwordCheck = (text: string) => {
    if (text === credentials.APP_PASSWORD) {
      switchPage('loading');
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
        <View style={styles.MainBackground}/>
        <Header/>
        <View style={styles.TitleContainer}>
          <Text style={styles.MainText}>Fechamento PPPOKER</Text>
        </View>
        <FlatList
          style={styles.CardList}
          data={(data.bigCards).concat(data.smallCards)}
          renderItem={({item, index}) => {
            if(data.bigCards.indexOf(item) !== -1) {
              return (
                <BigCard 
                  title={item.title} 
                  sources={item.sources}
                  total={item.total}
                />
              );
            }

            return null;
          }}
          keyExtractor={(item) => item.title}
        />
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
