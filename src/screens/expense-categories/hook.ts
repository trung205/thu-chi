import {SCREENS} from '@constants';
import {CategoriesNavigationProp, CategoriesRouteProp} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootState} from '@redux';
import {Category} from '@types';
import {useSelector} from 'react-redux';

const useCategories = () => {
  const navigation = useNavigation<CategoriesNavigationProp>();
  const route = useRoute<CategoriesRouteProp>();
  const categories = useSelector((state: RootState) => state.expenseCategories.data);

  const onPressFab = () => {
    navigation.navigate(SCREENS.CREATE_CATEGORY, {key: 'expenses'});
  };

  const onPressItem = (item: Category) => {
    navigation.navigate(SCREENS.EDIT_CATEGORY, {item, key: 'expenses'});
  };

  return {
    categories,
    onPressItem,
    onPressFab,
  };
};
export default useCategories;
