import React from "react";
import "./App.css";
import { TaskList } from "./components/TaskList";
import { TaskProvider } from "./data/TaskStore";

function App() {
	return (
		<TaskProvider>
			<TaskList />
		</TaskProvider>
	);
}

export default App;
