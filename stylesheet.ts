import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');

const vw = window.width / 100;
const vh = window.height / 100;

const colors = {
  LinearGradient: ['#38154A','#572074','#8027AF'],
  TextInputBorder: '#668899',
  MainBackground: '#38154A',
  CardTitle: '#29363D',
  CardDescription: '#29363D',
}

const styles = StyleSheet.create({
  SafeAreaView: {
    width: 100*vw,
    minHeight: 100*vh,
  },
  LinearGradient: {
    width: 100*vw,
    height: 100*vh
  },
  Header: {
    paddingTop: 3.6*vh,
    width: 91.4*vw,
    paddingRight: 3*vw,
    paddingLeft: 3*vw,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  HeaderLogo: {
    width: 25*vw,
    height: 32/94.95 * 25*vw,
    resizeMode: 'contain',
  },
  HeaderText: {
    fontFamily: 'Lato',
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'right'
  },
  MainText: {
    fontFamily: 'Lato',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
  },
  /*Login*/
  LoginForm: {
    height: 100*vh,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  LoginLabel: {
    fontFamily: 'Lato',
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
    paddingLeft: 24,
    paddingBottom: 8,
  },
  LoginInput: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.TextInputBorder,
    width: 72*vw,

    fontFamily: 'Lato',
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
  },
  /***/

  /*Loading*/
  LoadingContainer: {
    width: 100*vw,
    height: 100*vh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingLogo: {
    width: 53.6*vw,
    resizeMode: 'contain',
    transform: [{translateY: (-53.6*vw)*(67.88/201.76)/2}],
  },
  /***/

  /*Main*/
  MainBackground: {
    backgroundColor: colors.MainBackground,
    width: 100*vw,
    height: 60.5*vh,
    position: 'absolute'
  },
  TitleContainer: {
    paddingTop: 13.5*vh,
  },
  CardList: {
    width: 100*vw,
    marginBottom: 30,
  },
  BigCard: {
    width: 91.5*vw,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignSelf: 'center',

    marginBottom: 8,
  },
  SmallCard: {
    width: 73.3*vw,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignSelf: 'center',
  },
  CardTitle: {
    fontFamily: 'Lato',
    fontWeight: '700',
    color: colors.CardTitle,
    fontSize: 16,
    paddingBottom: 14,
  },
  CardDescription: {
    fontFamily: 'Lato',
    fontWeight: '400',
    color: colors.CardDescription,
    fontSize: 12,
  },
  CardContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10*vw,
  }
  /***/
});

export {styles, colors};
