import './App.css';
import Search from './js/Search';
import EntityForm from './js/EntityForm.jsx';
import SearchResult from './js/SearchResult';
import EntityDetails from './js/EntityDetails';
import Flow from './js/Flow';
import { Route, Routes } from 'react-router-dom';

function App() {

  return(
    <div className="App">
      <Routes>
        <Route path='/' element={<Search />}/>
        <Route path='/search' element={<SearchResult />}/>
        <Route path='/admin/create-entity' element={<EntityForm />}/>
        <Route path='/entity/:entityRequestMapping/:entityId' element={<EntityDetails />}/>
        <Route path='/flow' element={<Flow />}/>
      </Routes>
    </div>
  );
}

export default App;
