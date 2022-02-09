import {APP_PASSWORD} from '@env';
import {View, Text, TextInput, Alert} from 'react-native';

import Page from './components/Page';
import Header from './components/Header';

import {styles} from './styles/stylesheet';

const Login = ({setCurrentPage}) => {
    const passwordCheck = (password) => {
        if (password === APP_PASSWORD) {
            setCurrentPage('loading');
        }else {
            Alert.alert('Senha incorreta');
        }
    }
    return(
        <Page>
            {/* <LinearGradient colors={colors.LinearGradient} style={styles.LinearGradient} locations={[0,0.5,0.77]}> */}
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
            {/* </LinearGradient> */}
        </Page>
    );
}

export default Login;