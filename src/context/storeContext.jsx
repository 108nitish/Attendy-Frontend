import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const URL = "http://localhost:3000";
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClsPhoto, setShowAddClsPhoto] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // useEffect(()=>{
  //     console.log(selectedClass?.name)
  // },[selectedClass])


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(token);
    } 
  }, [token]);
 

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    // console.log(localStorage.getItem("token"))
  };

  const [classes, setClasses] = useState([])


  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${URL}/api/classes`, {headers: {token}});
      if (response.data.sucess) {
        console.log(response.data.classes);
        setClasses(response.data.classes);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const store = {
    URL,
    token,
    setToken: saveToken,  
    logout,  
    selectedClass,
    setSelectedClass,
    showAddClsPhoto,
    setShowAddClsPhoto,
    showAddStudent,
    setShowAddStudent, 
    fetchClasses,
    classes,
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
