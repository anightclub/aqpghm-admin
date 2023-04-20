import React from "react";
import Button from "./Button";

function Sidebar() {
  return (
    <>
    <div className="sb">
      <div className="sbcdhm">
        <Button Link='/' name="Dashboard" />
        <Button Link='/usercreation' name="Create User" />
        <Button Link='/addclass' name="Classes" />
        <Button Link='/subjects' name="Subjects" />
        <Button Link='/chapter' name="Chapters" />
        <Button Link='/question' name="Question" />
      </div>
    </div>
    </>
  );
}

export default Sidebar;
