


export const login = (user) => {
    return {
      type: 'login',
      new_user: {user}
    };
  };
  export const logout = () => {
    return {
      type: 'logout'
    };
  };