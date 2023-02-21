import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { auth, ENABLE_AUTH } from "../lib/auth";
// import { default as getProps } from "../lib/getProps";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    console.log("HANDLERS.INITIALIZE", user);
    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    console.log("HANDLERS.SIGN_IN", user);
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    console.log("HANDLERS.SIGN_OUT");
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  // console.log("aaaaaaaaaaa", children);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    const authSkipped = globalThis.sessionStorage.getItem("skip-auth") === "true";

    if (authSkipped) {
      const user = {};
      // console.log("11111111111111");
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
      return;
    }

    // Check if authentication with Zalter is enabled
    // If not, then set user as authenticated
    if (!ENABLE_AUTH) {
      const user = {};

      console.log("222222222222222");
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
      return;
    }

    try {
      // Check if user is authenticated
      const isAuthenticated = await auth.isAuthenticated();

      if (isAuthenticated) {
        // Get user from your database
        const user = {};

        console.log("333333333333333333");
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user,
        });
      } else {
        console.log("4444444444444444");
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
      }
    } catch (err) {
      console.error(err);
      console.log("55555555555555555");
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    // console.log("000000000000000000");
    initialize().catch(console.error);
  }, []);

  const signIn = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// export const getServerSideProps = getProps;
