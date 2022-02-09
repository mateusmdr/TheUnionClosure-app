import {SafeAreaView} from 'react-native';

import {styles} from '../styles/stylesheet';

const Page = ({children}) => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>{children}</SafeAreaView>
  );
};

export default Page;
