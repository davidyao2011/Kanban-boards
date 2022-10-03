import React from "react";

function Nav({ name }) {
  return (
    <div>
      <nav className="navbar">
        <h1>`${name}'s todo list`</h1>
        <div>
          <h3>What a beautiful day!</h3>
        </div>
        <div>
          <img
            className="img-todo"
            src="https://images.unsplash.com/photo-1664142638093-9a78da96c425?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt="todo img"
          />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
