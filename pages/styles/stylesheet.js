import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const window = Dimensions.get('window');

const vw = window.width / 100;
const vh = window.height / 100;

const colors = {
  LinearGradient: ['#38154A', '#572074', '#8027AF'],
  TextInputBorder: '#668899',
  MainBackground: '#38154A',
  DatePicker: '#475F6B',
  DatePickerText: '#F0F3F5',
  CardTitle: '#29363D',
  CardDescription: '#29363D',
  CardNeutralText: '#475F6B',
  CardRevenueText: '#44B400',
  CardExpenseText: '#C61800',
  CardPercentage: '#AFBEC6',
};

const styles = StyleSheet.create({
  SafeAreaView: {
    width: 100 * vw,
    minHeight: 100 * vh + StatusBar.currentHeight,
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  LinearGradient: {
    width: 100 * vw,
    height: 100 * vh,
  },
  Header: {
    paddingTop: 3.6 * vh,
    width: 91.4 * vw,
    paddingRight: 3 * vw,
    paddingLeft: 3 * vw,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  HeaderLogo: {
    width: 25 * vw,
    height: (32 / 94.95) * 25 * vw,
    resizeMode: 'contain',
  },
  HeaderText: {
    fontFamily: 'Lato',
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'right',
  },
  MainText: {
    fontFamily: 'Lato_Bold',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
  },
  /* Login */
  LoginForm: {
    height: 100 * vh,
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
    width: 72 * vw,

    fontFamily: 'Lato',
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
  },
  /***/

  /* Loading */
  LoadingContainer: {
    width: 100 * vw,
    height: 100 * vh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingLogo: {
    width: 53.6 * vw,
    resizeMode: 'contain',
    transform: [{translateY: (-53.6 * vw * 67.88) / 201.76 / 2}],
  },
  /***/

  /*Main*/
  MainBackgroundLoaded: {
    backgroundColor: colors.MainBackground,
    width: 100 * vw,
    height: 60.5 * vh,
    position: 'absolute',
  },
  MainBackgroundUnloaded: {
    backgroundColor: colors.MainBackground,
    width: 100 * vw,
    height: 100 * vh,
    position: 'absolute',
  },
  TitleContainerLoaded: {
    paddingTop: Platform.OS === 'ios' ? 4*vh : 8 * vh,
  },
  TitleContainerUnloaded: {
    paddingTop: 25 * vh,
    paddingBottom: 4 * vh,
  },
  DatePicker: {
    borderRadius: Platform.OS === 'ios' ? undefined : 6,
    borderWidth: Platform.OS === 'ios' ? undefined : 1,
    borderColor: colors.DatePicker,
    paddingRight: 10,
    paddingLeft: 10,
    color: colors.DatePicker,
    width: 72 * vw,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 40,
  },
  DatePickerText: {
    color: colors.DatePickerText,
    fontSize: 15,
    textAlign: 'center',
  },
  PickerItem: {
    color: 'white',
    padding: 0,
    height: 20*vh,
    fontSize: 15
  },
  CardList: {
    width: 100 * vw,
    marginBottom: 40 * vh,
    height: 'auto'
  },
  BigCard: {
    width: 91.5 * vw,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignSelf: 'center',

    marginBottom: 8,

    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#45636d',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  SmallCard: {
    width: 73.3 * vw,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignSelf: 'flex-start',
    marginLeft: 4.25 * vw,
    marginBottom: 8,

    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#45636d',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
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
  BigCardContentRow: {
    flexDirection: 'row',
  },
  CardDescriptionContainer: {
    width: 36 * vw,
  },
  BigCardValueContainer: {
    width: 25 * vw,
    paddingRight: 3 * vw,
  },
  SmallCardValueContainer: {
    width: 22 * vw,
    paddingRight: 3 * vw,
  },
  CardPercentageContainer: {
    width: 17 * vw,
  },
  BigCardMarkerContainer: {
    width: 26.5 * vw,
    marginRight: -10,
  },
  SmallCardMarkerContainer: {
    width: 22 * vw,
    marginRight: -10,
  },
  CardRevenueText: {
    color: colors.CardRevenueText,
    textAlign: 'right',
  },
  CardExpenseText: {
    color: colors.CardExpenseText,
    textAlign: 'right',
  },
  CardNeutralText: {
    color: colors.CardNeutralText,
    textAlign: 'right',
  },
  CardPercentageText: {
    color: colors.CardPercentage,
  },
  CardMarkerText: {
    textAlign: 'right',
    color: colors.CardNeutralText,
    fontSize: 12,
  },
  /***/
});

export {styles, colors};