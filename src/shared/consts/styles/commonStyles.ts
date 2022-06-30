import { StyleProp } from 'react-native';

export const commonStyles: { [key: string]: StyleProp<any> } = {
  row: { flexDirection: 'row' },
};

export const screenWrap = {
  flex: 1,
  backgroundColor: 'lightgray',
  paddingHorizontal: 20,
};
