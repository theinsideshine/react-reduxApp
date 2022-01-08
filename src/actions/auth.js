import Swal from 'sweetalert2'

import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { startLoading, finishLoading } from '../actions/ui'

export const startLoginEmailPassword = (email, password) =>{
return(dispatch) => { // El dispatch lo ofrece thunk, le manda la acciones a todos los reducers, como estas son unicas
                      // solo lo recibe el reducer correcto.
    
    dispatch ( startLoading ()); // Inicia el loading

    firebase.auth().signInWithEmailAndPassword( email, password)
    .then (  ({user}) => {          
        dispatch( login (user.uid, user.displayName))
        
        dispatch ( finishLoading ()); //Cancela el loading

    })
    .catch ( e => { // Por si el usuario no existe o el pass es incorrecto.
        console.log(e);        
        dispatch ( finishLoading () ); //Cancela el loading
        Swal.fire('Error', e.message, 'error');
    })


    }

}

export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return ( dispatch )=> { //el dispacht es provisto por el middleware thunk cuando la tarea termina
        firebase.auth().createUserWithEmailAndPassword( email, password)
        .then ( async ({user}) => {


            await user.updateProfile ( { displayName: name }) // Esto es un promesa, se puede poner en otro .then
                                                            // se opto por usar async             
            dispatch(
                login (user.uid, user.displayName)
            )
            
        })
        .catch ( e => { // Por si el usuario existe.
            console.log(e); 
            Swal.fire('Error', e.message, 'error');
        })

    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider)
        .then ( ({user}) => {
            dispatch(
                login (user.uid, user.displayName)
            )
        });
    } 
}

export const login = (uid, displayName)=> {

    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export  const logout = () => ({

    type: types.logout
})


/*
* Asincrona 
 si es Ok ejecuta el .then  si  no tira error
*/
export const startLogout = () => {

    return async ( dispatch )=> { // async Espero a que se ejecute
        firebase.auth().signOut(); 
        dispatch( logout() );
    }

}

