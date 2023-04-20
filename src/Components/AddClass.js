import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

const AddClass = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState("");

  // Fetch classes data from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "classes", "classes");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { classes } = docSnap.data();
        setClasses(classes)
      }
    };
    return fetchData;
  }, []);


  const handleDeleteClass = async (className) => {
    const docRef = doc(db, "classes", "classes");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { classes } = docSnap.data();
      const index = classes.indexOf(className);
      if (index > -1) {
        classes.splice(index, 1);
        await updateDoc(docRef, { classes });
        setClasses(classes);
  
        // Delete the document with the same name as the class name
        const classDocRef = doc(db, "classes", className);
        await deleteDoc(classDocRef);

      }
    }
  };
  
  
  const handleAddClass = () => {
    if (className) {
      const newClasses = [...classes, className];
      updateDoc(doc(db, "classes", "classes"), { classes: newClasses })
        .then(() => {
          setClasses(newClasses);
          const newDocRef = doc(db, "classes", className);
          setDoc(newDocRef, { subject: [] })
            .then(() => console.log("New document created"))
            .catch((error) => console.log("Error creating new document:", error));
        })
        .catch((error) => console.log("Error adding class:", error));
      setShowModal(false);
      setClassName("");
    }
  };
  
  
  
  return (
    <div className="mphm">
      <Sidebar />
      <div className="add-class">
        <h1>Classes</h1>
        <ul>
          {classes.map((className) => (
            <li>
              {className}
              <button onClick={() => handleDeleteClass(className)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="add-btn" onClick={() => setShowModal(true)}>Add Class</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Class</h2>
              <input type="text" placeholder="Enter class name" value={className} onChange={(e) => setClassName(e.target.value)} />
              <div className="modal-buttons">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={handleAddClass}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClass;
