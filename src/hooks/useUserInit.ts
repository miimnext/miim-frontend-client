import UserApi from "@/api/User";
import { store } from "@/store";
import { initializeAuth, initializeUserinfo } from "@/store/authSlice";
import { setToken } from "@/utils/cookies";
const UserInit = async (token: string | undefined) => {
  if (token) {
    setToken(token);
    store.dispatch(initializeAuth(token));
    await UserApi.userinfo().then((res) => {
      console.log(res);


      if (res) {
        store.dispatch(initializeUserinfo({ data: res.data }));
      }
    });
  }
};
export default UserInit;
