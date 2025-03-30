import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/storeContext.jsx";
import "./Sidebar.css"; 

const Sidebar = ({ setSelectedClass, setCreateClass }) => {
  const { token, logout, fetchClasses, classes} = useContext(StoreContext); 
  const [sidebarOpen, setSidebarOpen] = useState(false);  

  useEffect(() => { 
    fetchClasses();
  }, [token]); 
  
 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
    <button className="menu-btn" onClick={toggleSidebar}>
      <span className="material-symbols-outlined">
        menu
      </span>
    </button>
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        
      <button className="create-cls-btn" onClick={setCreateClass}><span className="material-symbols-outlined">add</span>Create Class</button>
      <h1 className="heading">Your Classes</h1>
      <div className="classes">
        {classes.length === 0 && <h2>No Classes Found</h2>}
        {classes.map((cls) => (
          <div
            key={cls._id}
            onClick={() => setSelectedClass(cls)}
            className="class"
          >
            {cls.name}
          </div>
        ))}
      </div> 
      
      <div className="logout" onClick={logout}>
        <span className="material-symbols-outlined">logout
        </span>
        <span>Logout</span>
      </div>
      
      <div className="footer-main">AttendyXpress⚡:- Product by Nitish.</div>
       
    </div>
    {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Sidebar;
