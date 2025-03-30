import React, { useState, useEffect, useContext } from "react";
import "./AttendenceTable.css";
import { StoreContext } from "../../context/storeContext.jsx";
import axios from "axios";
import AddStudent from "../AddStudent/AddStudent.jsx";
import AddClsPhoto from '../AddClsPhoto/AddClsPhoto.jsx' 
import { toast } from "react-toastify";



const AttendanceTable = ({ selectedClass }) => {
    if (!selectedClass) { 
        return <h2 className="empty-heading">Select a class</h2>;
    } 

    const { URL, token, showAddStudent, setSelectedClass, showAddClsPhoto, setShowAddClsPhoto, setShowAddStudent, fetchClasses } = useContext(StoreContext); 
    const [students, setStudents] = useState([]);
    const [dates, setDates] = useState([]);
    const fetchClassData = async () => {
      try {
          const response = await axios.get(`${URL}/api/classes/${selectedClass._id}`, {
              headers: {token} 
          });
    
          if (response.data.sucess) {
              let sortedStudents = response.data.classData.students.sort((a, b) => a.rollNo - b.rollNo);
              setStudents(sortedStudents); 
              const allDates = new Set();
              response.data.classData.students.forEach(student => {
                  student.attendance.forEach(entry => {
                      allDates.add(new Date(entry.date).toISOString().split('T')[0]);
                  });
              });
              setDates(Array.from(allDates).sort()); // Sort dates for display
          } else {
              console.log(response.data.message);
          }
      } catch (error) {
          console.error("Error fetching class data:", error);
      }
    };

    const deleteClass = async()=>{
        try{
          const response = await axios.post(`${URL}/api/classes/delete/${selectedClass._id}`,{
            headers : {token}
          });
          if(response.data.sucess){
            toast.success(response.data.message);
            setSelectedClass(null);
            fetchClasses();
            fetchClassData();
          }else{
            toast.error(response.data.message);
          }
        }catch(error){
          toast.error("Sever-Side Error.");
        }
    }
    
    useEffect(() => {
       

        fetchClassData();
    }, [selectedClass]); // Run only when selectedClass changes

    return (
      <div className= "right-bar">
        {showAddStudent && <AddStudent fetchClassData = {fetchClassData} />}
        {showAddClsPhoto && <AddClsPhoto fetchClassData = {fetchClassData} />}
      <div className = "class-header">  
          <h2 className="cls-name">{selectedClass.name} - Attendance</h2>
          <div className="cls-photo" onClick={()=>setShowAddClsPhoto(true)}><span className="material-symbols-outlined">place_item</span>Upload Photo of Class</div>
          <div className="register-stu" onClick={()=>setShowAddStudent(true)} ><span className="material-symbols-outlined">add</span>Add Student In Class</div>
          <div className="del-cls" onClick={()=>deleteClass()} ><span class="material-symbols-outlined">delete_forever</span></div>
      </div>
      <div className="table-container">

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead className="table-heading">
              <tr>
                <th className="roll-no-h">Roll No.</th>
                <th className="names-h">Name</th>
                {dates.map((date, index) => (
                  <th key={index} className="dates">{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.rollNo}>
                  <td className="roll-no">{student.rollNo}</td>
                  <td className="stu-name">{student.name}</td>
                  {dates.map((date, index) => {
                    const isPresent = student.attendance.some(a => 
                      new Date(a.date).toISOString().split('T')[0] === date && a.status === "Present");
                  
                    return (
                      <td key={index} className="h">
                        <input type="checkbox" defaultChecked={isPresent} readOnly />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> 
      </div>
    );
};

export default AttendanceTable;
