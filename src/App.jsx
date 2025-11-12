import { Toaster } from 'react-hot-toast'
import './App.css'
import Users from './components/Banner'

const userPromise=fetch('http://localhost:5000/users').then(res=>res.json())


function App() {

  return (
    <>
      <h1>Users Management</h1>
      <Users userPromise={userPromise}></Users>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
