import { Route, Routes } from 'react-router-dom';

import './App.css';

import Search from './components/search/js/Search';
import EntityGraph from './components/graph/js/EntityGraph';

function App() {

  return(
    <div className="App">
      <Routes>
        <Route path='/' element={<Search />}/>
        <Route path='/entity/:entityRequestMapping/:entityId' forceRefresh={true} element={<EntityGraph />}/>
      </Routes>
    </div>
  );
}

export default App;
