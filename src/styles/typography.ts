import { TextStyle } from 'react-native';

export const typography: { [key: string]: TextStyle } = {
  heading: {
    fontFamily: 'Almarai-Bold',
    fontSize: 24,
    fontWeight: '700',
  },
  subheading: {
    fontFamily: 'Almarai-Regular',
    fontSize: 18,
    fontWeight: '400',
  },
  body: {
    fontFamily: 'Almarai-Light',
    fontSize: 16,
    fontWeight: '300',
  },
  boldText: {
    fontFamily: 'Almarai-ExtraBold',
    fontSize: 16,
    fontWeight: '800',
  },
};
