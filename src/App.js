import { Route, Routes } from 'react-router-dom';

import './App.css';

import Search from './components/search/js/Search';
import EntityForm from './components/dashboard/entity-form/EntityForm';
import SearchResult from './components/search/js/SearchResult';
import Login from './components/login/Login';
import EntityGraph from './components/graph/js/EntityGraph';

function App() {

  return(
    <div className="App">
      <Routes>
        <Route path='/' element={<Search />}/>
        <Route path='/search' element={<SearchResult />}/>
        <Route path='/admin/create-entity' element={<EntityForm />}/>
        <Route path='/entity/:entityRequestMapping/:entityId' forceRefresh={true} element={<EntityGraph />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
