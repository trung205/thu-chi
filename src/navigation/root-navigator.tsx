import {SCREENS} from '@constants';
import {createStackNavigator} from '@react-navigation/stack';
import {RootState} from '@redux';
import {
  Categories,
  ChangePassword,
  Chart,
  CreateCategory,
  EditCategory,
  EditCost,
  SignIn,
  SignUp,
  Statistic,
  IncomeCategories,
  ExpenseCategories
} from '@screens';
import {useSelector} from 'react-redux';
// import { IncomeCategories } from 'src/screens/income-categories/income-categories';
import {CreateCost} from '../screens/create-cost/create-cost';
import {BottomTabNavigator} from './bottom-tab-navigator';
import {RootStackParamList} from './types/root-navigator.types';

const Stack = createStackNavigator<RootStackParamList>();
export const RootNavigator = () => {
  const checkIsSignedIn = useSelector(
    (state: RootState) => state.user.isSignedIn,
  );
  return (
    <Stack.Navigator
      initialRouteName={checkIsSignedIn ? SCREENS.BOTTOM_TAB : SCREENS.SIGN_IN}
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Group>
        <Stack.Screen name={SCREENS.SIGN_IN} component={SignIn} />
        <Stack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
      </Stack.Group>
      <Stack.Screen name={SCREENS.BOTTOM_TAB} component={BottomTabNavigator} />
      <Stack.Group>
        <Stack.Screen
          name={SCREENS.CATEGORIES}
          component={Categories}
          initialParams={{isBack: true}}
        />
        <Stack.Screen
          name={SCREENS.CREATE_CATEGORY}
          component={CreateCategory}
        />
        <Stack.Screen name={SCREENS.EDIT_CATEGORY} component={EditCategory} />
        <Stack.Screen name={SCREENS.CATEGORIES_INCOME} component={IncomeCategories} />
        <Stack.Screen name={SCREENS.CATEGORIES_EXPENSE} component={ExpenseCategories} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={SCREENS.CREATE_COST} component={CreateCost} />
        <Stack.Screen name={SCREENS.EDIT_COST} component={EditCost} />
      </Stack.Group>
      <Stack.Screen name={SCREENS.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={SCREENS.STATISTIC} component={Statistic} />
      <Stack.Screen name={SCREENS.CHART} component={Chart} />
    </Stack.Navigator>
  );
};
