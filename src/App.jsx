import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePagePre from './pages/HomePagePre';
import Index from './pages/Index';
// import ShowBridge from './pages/ShowBridge';
import Show3D from './pages/Show3D';
import ShowGML from './pages/ShowGML';
import Survey from './pages/Survey';
import Vote from './pages/Vote';
import '@coreui/coreui/dist/css/coreui.min.css'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePagePre/>} />
        <Route path="/index" element={<Index/>} />
        <Route path='/survey' element = {<Survey/>} />
        <Route path='/bridges/details/:id' element = {<Vote/>} /> 
        <Route path='/bridges/3d/:id' element = {<Show3D/>} /> 
        <Route path='/bridges/gml/:id' element = {<ShowGML/>} />
        {/* <Route path='/books/delete/:id' element = {<DeleteBook/>} /> */}
      </Routes> 
    </>
  )
}

export default App
