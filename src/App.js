import './App.css';
import { useState } from 'react';
import Search from './js/Search';
import Form from './js/Form.jsx';
import Home from './js/Home.jsx';

function App() {

  const [state, setState] = useState("");

  const renderState = (state) => {
    switch(state) {
      case "search":
        return(<Search />);
      case "form":
        return(<Form />);
      default:
        return(<Home handler = {changeState}/>);
    }
  }

  const changeState = () => {
    setState("form");
  }

  return(
    <div className="App">
      <header className="App-header">
        {renderState(state)}
      </header>
    </div>
  );
}

export default App;
