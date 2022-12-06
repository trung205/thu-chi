import React from 'react';

import {OpaqueColorValue} from 'react-native';
import {getIconType} from './utils';

import {IconButtonProps} from 'react-native-vector-icons/Icon';

export type IconType =
  | 'ant-design'
  | 'entypo'
  | 'evilicon'
  | 'feather'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'fontisto'
  | 'foundation'
  | 'ionicon'
  | 'material'
  | 'material-community'
  | 'octicon'
  | 'zocial'
  | 'simple-line-icon';

export interface IconProps extends IconButtonProps {
  color?: string | OpaqueColorValue;
  size?: number;
  type: IconType;
}

const defaultProps: IconProps = {
  size: 24,
  type: 'ionicon',
  color: 'white',
  name: '',
};

export const Icon: React.FC<IconProps> = ({size, type, color, ...rest}) => {
  const IconComponent = getIconType(type);

  return (
    <>
      <IconComponent type={type} size={size} color={color} {...rest} />
    </>
  );
};

Icon.defaultProps = defaultProps;
