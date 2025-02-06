"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/";
import { login, logout } from "@/store/authSlice";

export default function Auth() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user?.name}</h2>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <button
          onClick={() =>
            dispatch(login({ name: "John Doe", email: "john@example.com" }))
          }
        >
          Login
        </button>
      )}
    </div>
  );
}
