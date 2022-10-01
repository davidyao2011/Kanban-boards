import React from "react";

function Nav({ name }) {
  return (
    <div>
      <nav className="navbar">
        <h3>`${name}'s todo list`</h3>
      </nav>
    </div>
  );
}

export default Nav;
