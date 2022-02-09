import {View, Text, Image} from 'react-native';

import logoImg from '../../assets/logo.png';

import {styles} from '../styles/stylesheet';

const Header = () => {
    return (
      <View style={styles.Header}>
        <Image source={logoImg} style={styles.HeaderLogo} />
        <View>
            <Text style={styles.HeaderText}>Empresa The Union</Text>
            <Text style={styles.HeaderText}>35.447.430/0001-30</Text>
        </View>
      </View>
    );
};

export default Header;