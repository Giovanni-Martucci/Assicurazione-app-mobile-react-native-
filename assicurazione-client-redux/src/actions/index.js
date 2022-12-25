import {ADD, LOAD_REMOTE_LIST, MOD, DELETECARD} from "./types";
import * as firebase from "firebase";
 import uuid from "uuid";                         

                              //creazione di funzioni da passare al reducer che cambierà lo stato






export const addleft = item => dispatch => {
  firebase
  .database()
  .ref("/users/" + this.uid + "/roadaccidents")
  .push(item)
  .then( () => dispatch({ type: ADD, item}) );
}





//funzione separata per caricare la lista da firebase
const loadfromfirebase = dispatch => {
  
 const uid = firebase.auth().currentUser.uid;
 this.uid = uid;

firebase
  .database()
  .ref("/users/" + uid + "/roadaccidents/")
  .on("value", snap => { //con redux si PUO metteRE "once" a posto di "on" significa che viene letto una volta sola.
  // PERO IN QUESTO CASO E MEGLIO ON COSI ANCHE QUANDO SI MODIFICA IN AUTOMATICO SI AGGIORNA LA FLATLIST 
  //E NEL REDUCER SIA IN ADD CHE IN MOD NON C'è BISOGNO DI FARE NIENTE ,INVECE SE METTEVAMO ONCE C'ERA BISOGNO DI FARE OP. LOCALI 
      let data = [];
      snap.forEach(child => { //per forza con forEach, map non funziona in qst caso
         data.push({
            id:child.key,
            ...child.val()
         });
          
      });
      dispatch({ type: LOAD_REMOTE_LIST, roadaccidents: data});
    });
}
export const loadRemoteList = () => loadfromfirebase;





export const modificacard = item => dispatch => {
  const id = item.id;
  delete item.id;
    firebase
        .database()
        .ref("/users/" + this.uid + "/roadaccidents/" + id)
        .set(item)
        .then( () => dispatch({type: MOD, item}));
  
}


export const deletecard = id => dispatch => {
  firebase
  .database()
  .ref("/users/" + this.uid + "/roadaccidents/" + id)
  .remove()
  .then(dispatch({type:DELETECARD}))
}