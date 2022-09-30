const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.use(cors());

const fetchID = () => Math.random().toString(36).substring(2, 10);

let tasks = {
  pending: {
    title: "pending",
    items: [
      {
        id: fetchID(),
        title: "Send the Figma file to Dima",
        comments: [],
      },
    ],
  },
  ongoing: {
    title: "ongoing",
    items: [
      {
        id: fetchID(),
        title: "Review GitHub issues",
        comments: [
          {
            name: "David",
            text: "Ensure you review before merging",
            id: fetchID(),
          },
        ],
      },
    ],
  },
  completed: {
    title: "completed",
    items: [
      {
        id: fetchID(),
        title: "Create technical contents",
        comments: [
          {
            name: "Dima",
            text: "Make sure you check the requirements",
            id: fetchID(),
          },
        ],
      },
    ],
  },
};

socketIO.on("connection", (socket) => {
  console.log(`connected: ${socket.id} user just connected!`);

  socket.on("fetchComments", (data) => {
    const { category, id } = data;
    const taskItems = tasks[category].items;
    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === id) {
        socket.emit("comments", taskItems[i].comments);
      }
    }
  });

  socket.on("addComment", (data) => {
    const { category, userId, comment, id } = data;
    const taskItems = tasks[category].items;
    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === id) {
        taskItems[i].comments.push({
          name: userId,
          text: comment,
          id: fetchID(),
        });
        socket.emit("comments", taskItems[i].comments);
      }
    }
  });

  socket.on("createTask", (data) => {
    const newTask = { id: fetchID(), title: data.title, comments: [] };
    tasks["pending"].items.push(newTask);
    socket.emit("task", tasks);
  });

  socket.on("taskDragged", (data) => {
    console.log(data);
    const { source, destination } = data;
    const itemMoved = {
      ...tasks[source.droppableId].items[source.index],
    };
    console.log("DraggedItem--->", itemMoved);

    tasks[destination.droppableId].items.splice(
      destination.index,
      0,
      itemMoved
    );
    socket.emit("tasks", tasks);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log(`disconected: A user disconnected!`);
  });
});

app.get("/api", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
