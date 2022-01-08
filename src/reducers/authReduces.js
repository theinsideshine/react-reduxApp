import { types } from "../types/types";

/*
        Si se pudo autenticar 
        {
            uid: 'asdasdsadsd'
            name: 'Fernando'
        }
        Si no esta autenticado 
        {}
*/
 
export const authReducers = ( state ={}, action) =>{ // Siempre hay que inicializar el state

  switch (action.type) {
        case types.login:
          return {
              udi:action.payload.uid,
              name:action.payload.displayName
          }

        case types.logout:
        return {}
          
  
      default:
          return state;
  }


}