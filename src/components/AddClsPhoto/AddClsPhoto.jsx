import React, { useContext, useState, useEffect } from "react";
import "./AddClsPhoto.css";
import axios from "axios";
import { StoreContext } from "../../context/storeContext.jsx";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";

const AddClsPhoto = (fetchClassData) => {
  const { URL, token, selectedClass, setShowAddClsPhoto } = useContext(StoreContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      } catch (error) {
        console.error("Error loading models:", error);
        toast.error("Error loading face detection models.");
      }
    };
    loadModels();
  }, []);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleUpload = async () => {
    if (!photo) {
      toast.error("Please select a photo!");
      return;
    } 
    setLoading(true);
  
    try {
      const image = await faceapi.bufferToImage(photo);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
  
      if (!ctx) {
        toast.error("Failed to create canvas context.");
        setLoading(false);
        return;
      }
  
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
  
      // Run face detection
      const detections = await faceapi
        .detectAllFaces(canvas)
        .withFaceLandmarks()
        .withFaceDescriptors();
  
      if (detections.length === 0) {
        toast.error("No faces detected!");
        setLoading(false);
        return;
      }
  
      const descriptors = detections.map((d) => Array.from(d.descriptor));
   
      const response = await axios.post(
        `${URL}/mark-attendance`,
        { descriptors, classId: selectedClass._id },
        { headers: { token } }
      );
  
      if (response.data.sucess) {
        toast.success(response.data.message);
        fetchClassData(); 
      } else {
        toast.error(response.data.message || "Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error processing image:", error); 
    } finally {
      setLoading(false);
      setShowAddClsPhoto(false);
    }
  };
  

  return (
    <div className="add-cls-photo">
      <div className="add-cls-photo-container">
        <div className="add-cls-top">
          <h1 className="add-cls-photo-heading">Add Class Photo</h1>
          <button className="close-btn" onClick={() => setShowAddClsPhoto(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="add-photo">
          <input type="file" id="filecls" onChange={handleChange} accept="image/*" />
          <label htmlFor="filecls">Choose a file</label>
        </div>

        <div className="upload-btn">
          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Processing..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClsPhoto;
