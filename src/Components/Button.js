import React from "react";
import { Link } from 'react-router-dom';

function Button(props) {
  return <button onClick={props.onClick} className="sbbhm"><Link className="sbblhm" to={props.Link}>{props.name}</Link> </button>;
}

export default Button;
