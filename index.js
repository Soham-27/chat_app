import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log("user connected", socket.id); // Optional: log when a user connects
    
    // Listen for 'message' event from client
    socket.on("message", (message) => {
        console.log("a message from client is", message);
        io.emit("message", message); // Broadcast the message to all connected clients
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
