import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Question = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chap, setChap] = useState([]);
  const [className, setClassName] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [selectedType, setSelectedType] = useState();
  const [popup, setpopup] = useState(false);
  const [popup2, setpopup2] = useState(false);
  const [popup3, setpopup3] = useState(false);
  const [savedQ, setSavedQ] = useState("");
  const [savedQ2, setSavedQ2] = useState("");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");

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

  const ShowChapters = async (SubjectName) => {
    const docRef = doc(db, "classes", `${className} ${SubjectName}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { chapter } = docSnap.data();
      setChap(chapter);
      setSubjectName(SubjectName);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAddQuestion = async () => {
    if (
      (selectedType === "mcq") |
      (selectedType === "fill-blank") |
      (selectedType === "grammar")
    ) {
      if (selectedType === "mcq") {
        if (savedQ && A && B && C && D) {
          const docRef = doc(
            db,
            "classes",
            `${className} ${SubjectName} ${chapterName}`
          );
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const mcqs = docSnap.data().MCQs;
              const newMCQ = {
                Q: savedQ,
                A: A,
                B: B,
                C: C,
                D: D,
              };
              const updatedMCQs = [...mcqs, newMCQ];
              await updateDoc(docRef, { MCQs: updatedMCQs });
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error adding MCQ question: ", e);
          }
        } else {
          console.log("Please fill all fields!");
        }
      } else if (selectedType === "fill-blank") {
        if (savedQ && A && B && C && D) {
          const docRef = doc(
            db,
            "classes",
            `${className} ${SubjectName} ${chapterName}`
          );
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const fillblank = docSnap.data().fillBlank;
              const newQ = {
                Q: savedQ,
                A: A,
                B: B,
                C: C,
                D: D,
              };
              const updatedQ = [...fillblank, newQ];
              await updateDoc(docRef, { fillBlank: updatedQ });
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error adding MCQ question: ", e);
          }
        } else {
          console.log("Please fill all fields!");
        }
      } else if (selectedType === "grammar") {
        if (savedQ && A && B && C && D) {
          const docRef = doc(
            db,
            "classes",
            `${className} ${SubjectName} ${chapterName}`
          );
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const grammar = docSnap.data().Grammar;
              const newQ = {
                Q: savedQ,
                A: A,
                B: B,
                C: C,
                D: D,
              };
              const updatedQ = [...grammar, newQ];
              await updateDoc(docRef, { Grammar: updatedQ });
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error adding MCQ question: ", e);
          }
        } else {
          console.log("Please fill all fields!");
        }
      }
      setpopup2(false);
    } else if (
      (selectedType === "tf") |
      (selectedType === "shortq") |
      (selectedType === "longq")
    ) {
      if (selectedType === "tf") {
        if (savedQ) {
          const docRef = doc(
            db,
            "classes",
            `${className} ${SubjectName} ${chapterName}`
          );
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const array = docSnap.data().TrueFalse;
              const newQ = {
                Q: savedQ,
                A: "True",
                B: "False",
              };
              const updatedQ = [...array, newQ];
              await updateDoc(docRef, { TrueFalse: updatedQ });
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error adding MCQ question: ", e);
          }
        } else {
          console.log("Please fill all fields!");
        }
      } else if (selectedType === "shortq") {
        if (savedQ) {
          const docRef = doc(
            db,
            "classes",
            `${className} ${SubjectName} ${chapterName}`
          );
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const array = docSnap.data().ShortQ;
              const updatedQ = [...array, savedQ];
              await updateDoc(docRef, { ShortQ: updatedQ });
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error adding MCQ question: ", e);
          }
        } else {
          console.log("Please fill all fields!");
        }
      } else if (selectedType === "longq") {
        if (savedQ) {
          const docRef = doc(
            db,
            "classes",
            `${className} ${SubjectName} ${chapterName}`
          );
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const array = docSnap.data().LongQ;
              const updatedQ = [...array, savedQ];
              await updateDoc(docRef, { LongQ: updatedQ });
            } else {
              console.log("No such document!");
            }
          } catch (e) {
            console.error("Error adding MCQ question: ", e);
          }
        } else {
          console.log("Please fill all fields!");
        }
      }
      setpopup(false);
    } else if (selectedType === "column-match") {
      if (savedQ && savedQ2) {
        const docRef = doc(
          db,
          "classes",
          `${className} ${SubjectName} ${chapterName}`
        );
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const array = docSnap.data().ColumnMatch;
            const newQ = {
              coulmnA: savedQ,
              coulmnB: savedQ2,
            };
            const updatedQ = [...array, newQ];
            await updateDoc(docRef, { ColumnMatch: updatedQ });
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error adding MCQ question: ", e);
        }
      } else {
        console.log("Please fill all fields!");
      }
      setpopup3(false)
    }
  };

  const handleOpenPopup = () => {
    if (
      (selectedType === "mcq") |
      (selectedType === "fill-blank") |
      (selectedType === "grammar")
    ) {
      setpopup2(true);
    } else if (selectedType === "column-match") {
      setpopup3(true);
    } else if (
      (selectedType === "tf") |
      (selectedType === "shortq") |
      (selectedType === "longq")
    ) {
      setpopup(true);
    }
  };

  return (
    <div className="mphm">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div className="subjects">
          <h1>Questions</h1>
          <h4>
            There is class list loading click on the class name to load it's
            subjects.
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
          <h4>
            These are Subject of class {className} select subject to load
            chapters.
          </h4>
          <ul>
            {subjects &&
              subjects.map((s) => (
                <li key={s} onClick={() => ShowChapters(s)}>
                  {s}
                </li>
              ))}
          </ul>
        </div>
        <div className="subjects">
          <h3>Subject: {SubjectName}</h3>
          <h4>
            These are Chapters for {SubjectName} select chapter to add
            Questions.
          </h4>
          <ul>
            {chap &&
              chap.map((s) => (
                <li key={s} onClick={() => setChapterName(s)}>
                  {s}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2>Add a new question</h2>
          <label>
            <input
              type="radio"
              value="mcq"
              checked={selectedType === "mcq"}
              onChange={handleTypeChange}
            />
            MCQ (Multiple Choice Question)
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="tf"
              checked={selectedType === "tf"}
              onChange={handleTypeChange}
            />
            True/False
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="fill-blank"
              checked={selectedType === "fill-blank"}
              onChange={handleTypeChange}
            />
            Fill in the Blanks
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="shortq"
              checked={selectedType === "shortq"}
              onChange={handleTypeChange}
            />
            Short Questions
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="column-match"
              checked={selectedType === "column-match"}
              onChange={handleTypeChange}
            />
            Column Matching
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="longq"
              checked={selectedType === "longq"}
              onChange={handleTypeChange}
            />
            Long Questions
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="grammar"
              checked={selectedType === "grammar"}
              onChange={handleTypeChange}
            />
            Grammar
          </label>
          <br />
          <button className="add-btn" onClick={handleOpenPopup}>
            Add Question
          </button>
          {popup && (
            <div className="modal">
              <div className="modal-content">
                <h2>
                  Add {selectedType} for <br />
                  class {className} <br />
                  Book {SubjectName} <br />
                  Chapter {chapterName}
                </h2>
                <input
                  type="text"
                  placeholder="Type Question"
                  onChange={(e) => setSavedQ(e.target.value)}
                />
                <div className="modal-buttons">
                  <button onClick={() => setpopup(false)}>Cancel</button>
                  <button onClick={handleAddQuestion}>Add</button>
                </div>
              </div>
            </div>
          )}
          {popup2 && (
            <div className="modal">
              <div className="modal-content">
                <h2>
                  Add {selectedType} for <br />
                  class {className} <br />
                  Book {SubjectName} <br />
                  Chapter {chapterName}
                </h2>
                <input
                  type="text"
                  placeholder="Type Question"
                  onChange={(e) => setSavedQ(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="A)"
                  onChange={(e) => setA(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="B)"
                  onChange={(e) => setB(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="C)"
                  onChange={(e) => setC(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="D)"
                  onChange={(e) => setD(e.target.value)}
                />
                <div className="modal-buttons">
                  <button onClick={() => setpopup2(false)}>Cancel</button>
                  <button onClick={handleAddQuestion}>Add</button>
                </div>
              </div>
            </div>
          )}
          {popup3 && (
            <div className="modal">
              <div className="modal-content">
                <h2>
                  Add {selectedType} for <br />
                  class {className} <br />
                  Book {SubjectName} <br />
                  Chapter {chapterName}
                </h2>
                <input
                  type="text"
                  placeholder="Coulmn A"
                  onChange={(e) => setSavedQ(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Coulmn B"
                  onChange={(e) => setSavedQ2(e.target.value)}
                />
                <div className="modal-buttons">
                  <button onClick={() => setpopup3(false)}>Cancel</button>
                  <button onClick={handleAddQuestion}>Add</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
