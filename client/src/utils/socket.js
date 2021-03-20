import { io } from "socket.io-client";

let URL = "https://jkg-google-books.herokuapp.com";

const socket = io(URL);

export default socket;
