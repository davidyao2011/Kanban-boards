import React from "react";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Nav from "./Nav";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const Task = () => {
  return (
    <div>
      <Nav name="Jacob" />
      <AddTask socket={socket} />
      <TasksContainer socket={socket} />
    </div>
  );
};

export default Task;
