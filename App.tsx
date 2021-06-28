import React, {useState} from 'react';
import {View, Text, TextInput,Alert, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {Page, Header} from './Components';

import {styles, colors} from './stylesheet';

const App: React.FC = () => {
  const [currentPage, switchPage] = useState('login');

  const passwordCheck = (text) => {
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
      switchPage('main');
    },5000)

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
        <View style={styles.MainBackground}>
          <Header/>
          <Text style={styles.MainText}>Fechamento PPPOKER</Text>
        </View>
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
