import React, { useContext, useState, useEffect, useRef } from "react";
import "./AddStudent.css";
import axios from "axios";
import { StoreContext } from "../../context/storeContext.jsx";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";

const AddStudent = ({fetchClassData}) => {
    const { URL, token, setShowAddStudent, selectedClass } = useContext(StoreContext);
    const [name, setName] = useState("");
    const [rollNo, setRollno] = useState("");
    const [filestu, setFilestu] = useState(null);
    const [faceDescriptor, setDescriptor] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    
    const imgRef = useRef(null);   
    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models")
                ]);
                setModelsLoaded(true);
                console.log("Face-api.js models loaded");
            } catch (error) {
                console.error("Error loading face-api.js models:", error);
            }
        };
        loadModels();
    }, []);

    const handleChange = async (e) => {
        if (e.target.id === "name") {
            setName(e.target.value);
        } else if (e.target.id === "rollNo") {
            setRollno(e.target.value);
        } else if (e.target.id === "filestu") {
            const file = e.target.files[0];
            if (!file) return;

            if (!modelsLoaded) {
                toast.error("Face recognition models are still loading. Please wait.");
                return;
            }

            let imageUrl;
            if (window.URL && window.URL.createObjectURL) {
                imageUrl = window.URL.createObjectURL(file);
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imageUrl = event.target.result;
                    processImage(imageUrl, file);
                };
                reader.readAsDataURL(file);
                return;
            }

            await processImage(imageUrl, file);
        }
    };

    const processImage = async (imageUrl, file) => {
        imgRef.current.src = imageUrl;

        imgRef.current.onload = async () => {
            const detection = await faceapi
                .detectSingleFace(imgRef.current)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                toast.error("No face detected! Please upload a clear photo.");
                return;
            }

            setFilestu(file);
            setDescriptor(detection.descriptor); 
        };
    };

    const handleSubmit = async() => {
        if(!name){
            toast.error("Add Name of Student")
            return;
        }
        if(!rollNo){
            toast.error("Add RollNo of Student")
            return;
        }
        const response = await axios.post(`${URL}/api/students/`, {
            name,
            rollNo,
            faceDescriptor: faceDescriptor ? Array.from(faceDescriptor) : null, // Convert to array
            classId: selectedClass._id
        }, { headers: { token } });
        if(response.data.sucess){
            setShowAddStudent(false);
            fetchClassData();
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
    };

    return (
        <div className="add-student">
            <div className="add-student-container">
                <div className="add-student-top">
                    <h1 className="add-student-heading">Add Student</h1>
                    <button className="close-btn" onClick={() => setShowAddStudent(false)}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="add-student-form">
                    <div className="add-student-form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={handleChange} />
                    </div>
                    <div className="add-student-form-group">
                        <label htmlFor="rollNo">Roll_No.</label>
                        <input type="number" id="rollNo" value={rollNo} onChange={handleChange} />
                    </div>
                    <div className="add-student-form-group">
                        <label htmlFor="filestu">Select a file</label>
                        <input type="file" id="filestu" accept="image/*" onChange={handleChange} />
                    </div>
                    <p>Please wait 5 to 20 seconds after uploading the photo before clicking the "Add" button to ensure the image is properly processed.</p>
                </div>
                <div className="add-student-btn">
                    <button disabled={!modelsLoaded} onClick={handleSubmit}>Add</button>
                </div>
            </div>
            {/* 🔹 Hidden image for face detection */}
            <img ref={imgRef} style={{ display: "none" }} alt="face" />
        </div>
    );
};

export default AddStudent;
