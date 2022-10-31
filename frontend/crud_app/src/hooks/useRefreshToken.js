import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();
  console.log(auth, "AUTH REFRESH");
  const refresh = async () => {
    // const params = new URLSearchParams();
    // params.append(
    //   "Authorization",
    //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxcXExMiIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwiZXhwIjoxNjY2NTc5NzUyfQ.pwbD-s3K7yQ_pIYmdJDlK40OLEw3nrCW538MZN6OLlA"
    // );
    const x = localStorage.getItem("auth");
    console.log("x", x);
    const object_auth = JSON.parse(x);
    console.log("auth", object_auth);
    console.log("auth", object_auth.accessToken);
    const response = await axios.get("/api/v1/token/refresh", {
      headers: {
        Authorization: `Bearer ${object_auth.accessToken}`,
      },
    });
    console.log(response, "REFRESHHHH");
    console.log(response?.data?.access_token, "DEMON SLAYER");
    console.log(object_auth, "KAKKAKAKKAK");
    object_auth.accessToken = response?.data?.access_token;
    console.log(object_auth, "HUUI OHUO");
    // setAuth((prev) => {
    //   console.log(JSON.stringify(prev));
    //   console.log(response?.data?.access_token);
    //   console.log(object_auth, "GUGIUGUIHH");
    //   return { ...prev, accessToken: response?.data?.access_token };
    // });
    setAuth(object_auth);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
