import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TasksContainer = ({ socket }) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    function fetchTasks() {
      fetch("http://localhost:4000/api")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTasks(data);
        });
    }
    fetchTasks();
  }, []);
  return (
    <div className="container">
      {Object.entries(tasks).map((task) => (
        <div
          className={`${task[1].title.toLowerCase()}__wrapper`}
          key={task[1].title}
        >
          <h3>{task[1].title} Tasks</h3>
          <div>
            {task[1].items.map((item, index) => (
              <div
                className={`${task[1].title.toLowerCase()}__items`}
                key={item.id}
              >
                <p>{item.title}</p>
                <p className="comment">
                  <Link to="/comments">
                    {item.comments.length > 0 ? `View Comments` : `Add Comment`}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksContainer;
