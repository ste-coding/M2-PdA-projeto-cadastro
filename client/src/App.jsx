import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Items from './Items'
import CreateItem from './CreateItem'
import UpdateItem from './UpdateItem'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Items />} />
          <Route path='/create' element={<CreateItem />} />
          <Route path='/update/:id' element={<UpdateItem />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
