import React , { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';


export const AppRouter = () => {

  const dispatch = useDispatch();
  const [ checking, setchecking ] = useState( true );      // Esta chequeando el estado de firbase
  const [isLoggedIn, setIsLoggedIn ] = useState( false ); // El usuario esta logeado?

// Esta observando si la auth cambia y la actualiza
    useEffect(() => {
        
        // Esto crea un objeto observable lo llama user, pero es igual a la autorizacion de firebase, si esta cambia se dispara esto 

        firebase.auth().onAuthStateChanged( (user)=> {

           /*
           * Si user existe "user?" entonces evalua user.id 
           */
            if ( user?.uid ) {

                dispatch (login( user.uid, user.displayName));
                //console.log('observando user');
                setIsLoggedIn( true ); 

            }else {
                setIsLoggedIn( false );
            }

            setchecking( false ); // Termino de checkear firebase.
        });
    // Como el useDispacth puede cambiar el useEffect tira un warning ,para evita los ponemos como dependencia

    }, [ dispatch, setchecking, setIsLoggedIn ]) // Todo lo que cambie dentro del useEffect es una dependencia.

    
    /*
    * Se queda aca hasta que cambie checking
    */
    if ( checking ){
        return (
            <h1> Espere...</h1>
        );
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isAuthenticated= { isLoggedIn }
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
