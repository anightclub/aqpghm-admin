import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

const Subjects = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [popup, setpopup] = useState(false);
  const [className, setClassName] = useState("");
  const [cruntClassName, setCruntClassName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      const docRef = doc(db, "classes", "classes");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { classes } = docSnap.data();
        setClasses(classes);
      }
    };
    fetchClasses();
  }, []);

  const ShowSubjects = async (className) => {
    const docRef = doc(db, "classes", className);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { subject } = docSnap.data();
      console.log(subject);
      setSubjects(subject);
      setClassName(className);
      setCruntClassName(className);
    }
  };

  const handleDeletesubject = async (subjectName) => {
    const docRef = doc(db, "classes", cruntClassName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { subject } = docSnap.data();
      const index = subject.indexOf(subjectName);
      if (index > -1) {
        subject.splice(index, 1);
        await updateDoc(docRef, { subject });
        setSubjects(subject);
        const classDocRef = doc(db, "classes", `${cruntClassName} ${subjectName}`);
        await deleteDoc(classDocRef);
      }
    }
  };

  const handleAddSubject = () => {
    if (newSubject) {
      const addingNewSubject = [...subjects, newSubject];
      updateDoc(doc(db, "classes", cruntClassName), { subject: addingNewSubject })
        .then(() => {
          setSubjects(addingNewSubject)
          const newDocRef = doc(db, "classes", `${cruntClassName} ${newSubject}`);
          setDoc(newDocRef, { chapter: [] })
            .then(() => console.log("New document created"))
            .catch((error) =>
              console.log("Error creating new document:", error)
            );
        })
        .catch((error) => console.log("Error adding class:", error));
      setpopup(false);
      setNewSubject("");
    }
  };

  return (
    <div className="mphm">
      <Sidebar />
      <div  style={{flex:1}}>
        <div className="subjects">
          <h1>Subjects</h1>
          <h4>
            There is class list shown click on the class name to load it's
            subjects
          </h4>
          <ul>
            {classes &&
              classes.map((className) => (
                <li key={className} onClick={() => ShowSubjects(className)}>
                  {className}
                </li>
              ))}
          </ul>
        </div>
        <div className="add-class">
          <h3>Class: {className}</h3>
          <ul>
            {subjects &&
              subjects.map((s) => (
                <li key={s}>
                  {s}
                  <button onClick={() => handleDeletesubject(s)}>
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          <button className="add-btn" onClick={() => setpopup(true)}>
            Add Subject
          </button>
          {popup && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Subject for class {className}</h2>
              <input type="text" placeholder="Enter Subject name" onChange={(e) => setNewSubject(e.target.value)} />
              <div className="modal-buttons">
                <button onClick={() => setpopup(false)}>Cancel</button>
                <button onClick={handleAddSubject}>Add</button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
