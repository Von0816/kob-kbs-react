import './App.css';
import { useState } from 'react';
import Search from './js/Search';
import EntityForm from './js/EntityForm.jsx';
import Home from './js/Home.jsx';

function App() {

  // const [state, setState] = useState("");
  //
  // const renderState = (state) => {
  //   switch(state) {
  //     case "search":
  //       return(<Search />);
  //     case "form":
  //       return(<Form />);
  //     default:
  //       return(<Home handler = {changeState}/>);
  //   }
  // }

  return(
    <div className="App">
      <EntityForm />
    </div>
  );
}

export default App;
