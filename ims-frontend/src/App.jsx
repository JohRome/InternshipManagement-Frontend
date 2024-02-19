import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import InternshipComponent from './components/InternshipComponent'
import ListInternshipComponent from './components/ListInternshipComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>

          <Route path='/' element={<ListInternshipComponent />}></Route>

          <Route path='/internships' element={<ListInternshipComponent />}></Route>

          <Route path='/add-internship' element={<InternshipComponent />}></Route>

          <Route path='/edit-internship/:id' element={<InternshipComponent />}></Route>

        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
