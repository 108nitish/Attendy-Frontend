import React, { useState, useContext } from 'react';
import './CreateClass.css';
import axios from 'axios';
import { StoreContext } from '../../context/storeContext.jsx';
import {toast} from 'react-toastify';

const CreateClass = ({ setCreateClass }) => {
    const { URL, token , fetchClasses} = useContext(StoreContext);
    const [name, setName] = useState('');

    const handleChange = (e) => {  
        setName(e.target.value);
    };

    const handleSubmit = async() => {
        if (!name.trim()) {
            alert("Class name cannot be empty!");
            return;
        }
        const response = await axios.post(`${URL}/api/classes`, { name : name }, {headers: {token}})
        if(response.data.sucess){
            toast.success(response.data.message);
            fetchClasses();
            setCreateClass();
        }else{
            toast.error(response.data.message);
            setCreateClass();
        }
    };

    return (
        <div className='create-class'> 
            <div className='create-class-container'>
                <div className='top'>
                    <h1>Create Class</h1>
                    <button className='close-btn' onClick={setCreateClass}>
                    <span className="material-symbols-outlined">
close
</span>
                    </button>
                </div>
                <div className='form'>
                    <input type='text' placeholder='Class Name' onChange={handleChange}/> 
                    <button className='create-btn' onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateClass;
