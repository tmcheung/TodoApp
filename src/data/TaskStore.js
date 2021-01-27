import React, { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = React.createContext(null);

const taskReducer = (state, action) => {
	console.log(action);
	let payload = action.payload;
	switch (action.type) {
		case "addTask":
			return [
				...state,
				{ id: uuidv4(), description: payload.description, status: false },
			];
		case "deleteTask":
			const d = [...state];
			d.splice(payload.index, 1)
			return d;
		case "editDescription":
			const a = [...state];
			a[payload.index].description = payload.description;
			return a;
		case "completeTask":
			const b = [...state];
			b[payload.index].status = true;
			return b;
		case "restartTask":
			const c = [...state];
			c[payload.index].status = false;
			return c;
		case "clearTasks":
			return [];
		default:
			throw new Error();
	}
};

export const TaskProvider = ({ children }) => {
	const [state, dispatch] = useReducer(taskReducer, []);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
};
