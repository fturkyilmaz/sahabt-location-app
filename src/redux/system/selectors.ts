import {useSelector} from 'react-redux';
import {RootState} from '../reducer';

export const GetIsAuth = () => {
  const isAuth = useSelector((state: RootState) => state.system.isAuth);
  return isAuth;
};

export const GetTheme = () => {
  const theme = useSelector((state: RootState) => state.system.theme);
  return theme;
};
