import {SCREENS} from '@constants';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Category, Cost} from '@types';

export type RootStackParamList = {
  [SCREENS.SIGN_IN]: undefined;
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.BOTTOM_TAB]: undefined;
  [SCREENS.CATEGORIES]: {
    isBack: boolean;
  };
  [SCREENS.CREATE_CATEGORY]: undefined;
  [SCREENS.EDIT_CATEGORY]: {
    item: Category;
  };
  [SCREENS.CREATE_COST]: undefined;
  [SCREENS.EDIT_COST]: {
    item: Cost;
    key: 'incomes' | 'expenses';
  };
  [SCREENS.HOME]: undefined;
  [SCREENS.CHANGE_PASSWORD]: undefined;
  [SCREENS.STATISTIC]: undefined;
  [SCREENS.CHART]: undefined;
};

type EditCostProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.EDIT_COST
>;

type CaregoriesProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.CATEGORIES
>;

type EditCaregoryProps = NativeStackScreenProps<
  RootStackParamList,
  SCREENS.EDIT_CATEGORY
>;

type HomeProps = NativeStackScreenProps<RootStackParamList, SCREENS.HOME>;

export type EditCostNavigationProp = EditCostProps['navigation'];
export type EditCostRouteProp = EditCostProps['route'];

export type CategoriesNavigationProp = CaregoriesProps['navigation'];
export type CategoriesRouteProp = CaregoriesProps['route'];

export type EditCategoryNavigationProp = EditCaregoryProps['navigation'];
export type EditCategoryRouteProp = EditCaregoryProps['route'];

export type HomeNavigationProp = HomeProps['navigation'];
export type HomeRouteProp = HomeProps['route'];
