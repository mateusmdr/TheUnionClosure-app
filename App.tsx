import React, {useState, useEffect} from 'react';
import {View, Text, TextInput,Alert, Image, TouchableWithoutFeedback} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {Page, Header, BigCard} from './Components';

import {styles, colors} from './stylesheet';

import getData from './getData';
import { FlatList } from 'react-native';

const App: React.FC = () => {
  const [currentPage, switchPage] = useState('login');
  const [data, setData] = useState<any>(null);

  const passwordCheck = (text: string) => {
    if (text === 'mateus') {
      Alert.alert('senha correta');
      switchPage('loading');
    }else {
      Alert.alert('senha incorreta');
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
    setTimeout(() => {
      setData(getData());
      switchPage('main');
    }, 2000);

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
          data={data}
          renderItem={({item}) => {
            return (
              <BigCard 
                title={item.title} 
                sources={item.sources}
              />
            );
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
