const initialState = {

    usuario:  {
      _id: null,
      imail: "",
      nombres: "",
      apellidos: "",
      password: "",
      tipo_usuario:""
    },

    session: false,
    paso:"cliente"
  };

  const usuario_reducers = (state = initialState, action) => {
    console.log("AdminReducer :: Action :: Type: ", action.type);
    console.log("AdminReducer :: Action :: action: ", action);
    console.log("AdminReducer :: Action :: state: ", state);
    switch (action.type) {
      case 'login':
        return {
          ...state,
          session: true,
          usuario: action.new_user.user
        };
      case 'logout':
        return initialState
      default:
        return state;
    }
  };
  
  export default usuario_reducers;

