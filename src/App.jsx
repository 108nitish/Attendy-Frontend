import { useState, useContext } from 'react' 
import './App.css'
import { StoreContext} from './context/storeContext.jsx'
import {ToastContainer} from 'react-toastify'
import Login from './components/Login/Login.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import AttendanceTable from './components/AttendenceTable/AttendenceTable.jsx'
import CreateClass from './components/CreateClass/CreateClass.jsx'
import AddClsPhoto from './components/AddClsPhoto/AddClsPhoto.jsx' 

function App() {
  const { token,selectedClass, setSelectedClass } = useContext(StoreContext)
   
  const [createClass, setCreateClass] = useState(false)
  const setCreateClassfn = () => {
    setCreateClass(!createClass)
  }
  return ( 
      <> 
          
        <ToastContainer/>
        {createClass && <CreateClass setCreateClass={setCreateClassfn} />}
        {/* {showAddClsPhoto && <AddClsPhoto />} */}
        {/* {showAddStudent && <AddStudent />} */}

        {}
          {token ? 
            <div className="App">
              <Sidebar setSelectedClass={setSelectedClass} setCreateClass={setCreateClassfn} /> 
              <AttendanceTable selectedClass={selectedClass} />
            </div>
           : 
            <Login />
          } 
      </> 
  )
}

export default App
