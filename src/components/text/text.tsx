import {useTheme} from '@hooks';
import {ColorThemes, fonts} from '@styles';
import {
  StyleProp,
  Text as DefaultText,
  TextProps,
  TextStyle,
} from 'react-native';

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  type?: 'light' | 'regular' | 'medium' | 'bold';
  size?: 'small' | 'medium' | 'large' | 'x-large';
  color?: keyof ColorThemes;
}

export const Text: React.FC<CustomTextProps> = ({
  type,
  style,
  size,
  color,
  ...rest
}) => {
  const {colors} = useTheme();

  const fontFamilyStyle = () => {
    switch (type) {
      case 'light':
        return fonts.light;
      case 'regular':
        return fonts.regular;
      case 'medium':
        return fonts.medium;
      case 'bold':
        return fonts.bold;
      default:
        return fonts.medium;
    }
  };

  const fontSizeStyle = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 16;
      case 'large':
        return 16;
      case 'x-large':
        return 20;
      default:
        return 14;
    }
  };

  const lineHeightStyle = () => {
    switch (size) {
      case 'small':
        return 15;
      case 'medium':
        return 17.5;
      case 'large':
        return 22.5;
      case 'x-large':
        return 22.5;
      default:
        return 17.5;
    }
  };

  const colorText = () => {
    if (color !== undefined) {
      return colors[color];
    } else {
      return colors['primary-text'];
    }
  };

  return (
    <DefaultText
      style={[
        {
          color: colorText(),
          fontFamily: fontFamilyStyle(),
          fontSize: fontSizeStyle(),
          lineHeight: lineHeightStyle(),
        },
        style,
      ]}
      {...rest}
    />
  );
};
