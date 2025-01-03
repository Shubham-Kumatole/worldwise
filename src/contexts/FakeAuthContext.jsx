import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      throw new Error("Unknown action type ", action.type);
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context was used outside of scope");
  }
  return context;
}

export { AuthProvider, useAuth };
