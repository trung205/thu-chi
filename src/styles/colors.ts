export interface ColorThemes {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  card: string;
  backdrop: string;
  shadow: string;
  border: string;
  notification: string;
  // status: {
  //   success: string;
  //   warning: string;
  //   error: string;
  // };
  black: string;
  white: string;
  divider: string;
  grey: string;
  'primary-icon': string;
  'primary-text': string;
  'secondary-text': string;
}

export const lightTheme: ColorThemes = {
  primary: '#3498db',
  secondary: '#f1c40f',
  tertiary: '#a1b2c3',
  background: '#f3f4f7',
  backdrop: `rgba(0, 0, 0, 0.4)`,
  shadow: '',
  border: '#c4c4c4',
  notification: '',
  card: 'white',
  black: '',
  white: 'white',
  divider: '#f3f4f7',
  grey: '#a1b2c3',
  'primary-icon': '#a1b2c3',
  'primary-text': 'black',
  'secondary-text': '#a1b2c3',
};

export const palette = {
  red: '#f5222d',
};
