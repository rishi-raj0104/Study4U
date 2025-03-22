import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
function App() {

  return (
    // <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inte'>
    <div className='w-screen min-h-screen bg-white flex flex-col font-inte'> 
    <Navbar></Navbar>
    <main>
      <Outlet></Outlet>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default App
