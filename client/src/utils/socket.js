import { io } from "socket.io-client";

let URL;

if (process.env.NODE_ENV === "production") {
	console.log("production");
	URL = "https://jkg-google-books.herokuapp.com";
} else {
	URL = "http://localhost:5000";
}

const socket = io(URL);

export default socket;
