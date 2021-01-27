import React, { useCallback, useContext, useEffect, useState } from "react";
import { TaskContext } from "../data/TaskStore";
import { EditTask } from "./EditTask";

export function Task({ description, index, status}) {
	const { dispatch } = useContext(TaskContext);
	const [showEdit, setShowEdit] = useState(false);

	const handleTaskCheckbox = (checked) => {
		dispatch({
			type: checked ? "completeTask" : "restartTask",
			payload: { index: index },
		});
    };
    
    const setShowEditCallback = useCallback(() => {
        setShowEdit(false);
    }, [])

	return (
		<div>
			<input
                type="checkbox"
                checked={status}
				onChange={(e) => handleTaskCheckbox(e.target.checked)}
			/>
			<span onClick={() => setShowEdit(true)}>{description}</span>
			{showEdit && <EditTask setShowEdit={setShowEditCallback} index={index} description={description} />}
		</div>
	);
}
