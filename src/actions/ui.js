import { types } from "../types/types";

export const setError = (err) => ({
   type: types.uidSetError,
   payload: err

});

export const removeError = () => ({
    type: types.uidRemoveError,
    
 });


 export const startLoading = () => ({
   type: types.uiStartLoading
   
});

export const finishLoading = () => ({
   type: types.uiFinishLoading   
});
