import { useAppSelector } from "../redux/store";

export const useTheme = () => {
  //Get theme
  const theme = useAppSelector((state) => state.theme.data);

  return theme;
};
