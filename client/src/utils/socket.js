import { io } from "socket.io-client";

const URL = "https://jkg-google-books.herokuapp.com";
// For Development:
// const URL = 'http://localhost:5000'

const socket = io(URL);

export default socket;
