import { useAppSelector } from "../redux/store";

export const useUserStatus = () => {
  //Get theme
  const userStatus = useAppSelector(
    (state) => state.user.loginInformation.isLoggedIn
  );
  return userStatus;
};
