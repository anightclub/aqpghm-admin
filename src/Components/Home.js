import React from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  function navigatation(e) {
    if (e === "p") navigate("/usercreation");
    else if (e === "ac") navigate("/addclass");
    else if (e === "s") navigate("/subjects");
    else if (e === "c") navigate("/chapter");
    else if (e === "q") navigate("/question");
  }
  return (
    <div className="mphm">
      <Sidebar />
      <div className="mpdbparenthm">
        <h1 className="mpdbheadinghm">
          Admin Panel For Abbasi Auto Paper Genrator
        </h1>
        <div className="mpdbboxesparenthm">
          <div
            className="mpdbboxeshm"
            onClick={() => {
              navigatation("p");
            }}
          >
            <h1>Create User</h1>
            <p>
              Register Your Customer and delete your self as your rules. You
              Have free hand for this. User Can't change anything exept Password
              CHanging.
            </p>
          </div>
          <div
            className="mpdbboxeshm"
            onClick={() => {
              navigatation("ac");
            }}
          >
            <h1>Classes</h1>
            <p>You Can see list of classes, add class and remove class.</p>
          </div>
          <div
            className="mpdbboxeshm"
            onClick={() => {
              navigatation("s");
            }}
          >
            <h1>Subject</h1>
            <p>
              First You will se the list of Claases here but can't add or
              remove(if you want go to classes Tab)You will see list of Subjects
              under every class and can add and remove subjects of any class.
            </p>
          </div>
          <div
            className="mpdbboxeshm"
            onClick={() => {
              navigatation("c");
            }}
          >
            <h1>Chapters</h1>
            <p>
              You will see the list of Class and it's Chapter list on Your Selction then You Add Chapters for every subject easyly. 
            </p>
          </div>
          <div
            className="mpdbboxeshm"
            onClick={() => {
              navigatation("q");
            }}
          >
            <h1>Question</h1>
            <p>
              select Class, Subject, Chapter and Question Type to add Questions. <br />
              if you want to delete any question click on the load Question to see list and then you can delete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
