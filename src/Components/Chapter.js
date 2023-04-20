import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

const Subjects = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chap, setChap] = useState([]);
  const [className, setClassName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [newChapter, setNewChapter] = useState("");
  const [popup, setpopup] = useState(false);

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
      setSubjects(subject);
      setClassName(className);
    }
  };

  const ShowChapters = async (chapterName) => {
    const docRef = doc(db, "classes", `${className} ${chapterName}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { chapter } = docSnap.data();
      setChap(chapter);
      setChapterName(chapterName);
    }
  };

  const handleAddChapter = () => {
    if (newChapter) {
      const addingNewChapter = [...chap, newChapter];
      updateDoc(doc(db, "classes", `${className} ${chapterName}`), {
        chapter: addingNewChapter,
      })
        .then(() => {
          setChap(addingNewChapter);
          const newDocRef = doc(
            db,
            "classes",
            `${className} ${chapterName} ${newChapter}`
          );
          setDoc(newDocRef, {
            MCQs: [],
            TrueFalse: [],
            FillBlanks: [],
            ShortQ: [],
            ColumnMatch: [],
            LongQ: [],
            Grammar: [],
          })
            .then(() => console.log("New document created"))
            .catch((error) =>
              console.log("Error creating new document:", error)
            );
        })
        .catch((error) => console.log("Error adding class:", error));
      setpopup(false);
      setNewChapter("");
    }
  };

  const handleDeleteChapter = async (s) => {
      const docRef = doc(db, "classes", `${className} ${chapterName}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { chapter } = docSnap.data();
        const index = chapter.indexOf(s);
        if (index > -1) {
          chapter.splice(index, 1);
          await updateDoc(docRef, { chapter });
          setChap(chapter);

          const classDocRef = doc(
            db,
            "classes",
            `${className} ${chapterName} ${s}`
          );
          await deleteDoc(classDocRef);
        }
    }
  };

  return (
    <div className="mphm">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div className="subjects">
          <h1>Chapters</h1>
          <h4>
            There is class list shown click on the class name to load it's
            subjects. <br />
            Now You Click on Subject Name to see it's Chapters.
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
        <div className="subjects">
          <h3>Claas: {className}</h3>
          <ul>
            {subjects &&
              subjects.map((s) => (
                <li key={s} onClick={() => ShowChapters(s)}>
                  {s}
                </li>
              ))}
          </ul>
        </div>
        <div className="add-class">
          <h3>Subject: {chapterName}</h3>
          <ul>
            {chap &&
              chap.map((s) => (
                <li key={s}>
                  {s}
                  <button onClick={() => handleDeleteChapter(s)}>Delete</button>
                </li>
              ))}
          </ul>
          <button className="add-btn" onClick={() => setpopup(true)}>
            Add Chapter
          </button>
          {popup && (
            <div className="modal">
              <div className="modal-content">
                <h2>
                  Add Chapter for class {className}, Book {chapterName}
                </h2>
                <input
                  type="text"
                  placeholder="Enter Subject name"
                  onChange={(e) => setNewChapter(e.target.value)}
                />
                <div className="modal-buttons">
                  <button onClick={() => setpopup(false)}>Cancel</button>
                  <button onClick={handleAddChapter}>Add</button>
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
