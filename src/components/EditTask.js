import { TaskContext } from "../data/TaskStore";
import React, { useContext, useEffect, useMemo, useState } from "react";

export function EditTask({ setShowEdit, description, index }) {
    const { dispatch } = useContext(TaskContext);
    const [editText, setEditText] = useState(description);

    useEffect(() => {
        setEditText(description)
    }, [description])

    const saveEdit = () => {
		dispatch({
			type: "editDescription",
			payload: { description: editText, index: index },
		});
		setShowEdit(false);
	};

	const cancelEdit = () => {
		setShowEdit(false);
		setEditText(description);
	};

	const deleteTask = () => {
		dispatch({
			type: "deleteTask",
			payload: { index: index },
		});
		setShowEdit(false);
	};

	return (
		<div>
			<input
				value={editText}
				onChange={(e) => setEditText(e.target.value)}
				type="text"
			/>
			<button onClick={() => saveEdit()}>Save</button>
			<button onClick={() => cancelEdit()}>Cancel edit</button>
			<button onClick={() => deleteTask()}>Delete</button>
		</div>
	);
}
