import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3005;

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast message to other users
    socket.on('message', (Message) => {
        socket.broadcast.emit('message', Message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
