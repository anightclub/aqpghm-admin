import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export default function UserCreation() {
  const [gender, setGender] = useState("male");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [school, setSchool] = useState(null);
  const [password, setPassword] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const submit = (auth) => {
    if (
      (email === null) |
      (password === null) |
      (name === null) |
      (phone === null) |
      (school === null)
    ) {
      alert("Please enter all required data");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setDoc(doc(db, "user", user.uid), userData)
          alert("The User is registerd Successfully...").then(
          nullData())
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode);
          alert(errorMessage);
          // ..
        });
    }
  };

  function nullData() {
    setName(null);
    setEmail(null);
    setPassword(null);
    setPhone(null);
    setSchool(null);
  }
  var userData = {
    name: name,
    phone: phone,
    email: email,
    school: school,
    gender: gender,
  };

  return (
    <div className="mphm">
      <Sidebar />
      <div className="profile">
        <h1>New Customer Registration</h1>
        <div className="ppidchm">
          <img alt="Avatar" src={`${gender}-avatar.png`} />
          <div className="form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <label htmlFor="school">School Name:</label>
            <input
              type="text"
              id="school"
              name="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
            <br />
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <br />
            <button onClick={() => submit(auth)}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
