import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import styles from './stylesheet';

// const getPage = (pageName: string): number => {
//   if (pageName === 'login') {
//     return 0;
//   }

//   return -1;
// };

const App: React.FC = () => {
  //const [currentPage, switchPage] = useState(getPage('login'));

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text>Teste</Text>
    </SafeAreaView>
  );
};

export default App;
