import './App.css'
import Users from './components/users'

const userPromise=fetch('http://localhost:5000/users').then(res=>res.json())


function App() {

  return (
    <>
      <h1>Users Management</h1>
      <Users userPromise={userPromise}></Users>
    </>
  )
}

export default App
