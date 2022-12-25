import {ADD, LOAD_REMOTE_LIST, MOD, DELETECARD } from "../actions/types";
               //reducer SERVE A MODIFICARE LO STATO DOPo CHE RICEVE UN AZIONE CHE DA ACTION - lo stato si puo mod solo d qui 
  const initialState = {
    roadaccidents: []
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      
 //aggiungi     
      case ADD:
        return {
          //a diff di quando non si usa redux che basta solo caricarlo in firebase e in automatico viene aggiornata
          // la lista dal componentdidmount, qui si fa partire il comando per inserirlo a firebase (nell'action) e qui 
          //si inserisce come se lo dovessimo inserire senza l'uso di firebase aggiungengolo o con la push o con il 
          //metodo nuovo [...state.roadacc, todo]
          roadaccidents: state.roadaccidents // ogni case ritorna un nuovo oggetto infatti non è this.initialstate.roadccidents
        };




//carica lista da firebase
      case LOAD_REMOTE_LIST:
       return {
          roadaccidents: action.roadaccidents // ogni case ritorna un nuovo oggetto 
       };





//modifica
      case MOD: 
          // const newrow = state.roadaccidents.map(//perforza con map , forEach non funziona
          //   row => {
          //     row.id===action.item.id ? action.item : null;  
          //   }
          // )
          
          // if(newrow){
            
          //   let data = [];
          //   state.roadaccidents.filter(
          //     row => row.id!=newrow.id
          //   )
          //   data.push(newrow)
          //   this.data = data;
          // }
          return {
            roadaccidents: state.roadaccidents
          };
      

//delete 
      case DELETECARD:
      return {
        roadaccidents: state.roadaccidents
      }


     
      default:
        return state;
    }
  };
  
  export default Reducer;
  