import React, { useContext, useState } from "react";
import { TaskContext } from "../data/TaskStore";
import { ListModifier } from "./ListModifier";
import { Task } from "./Task";

export function TaskList() {
	const { state: tasks, dispatch: taskDispatch } = useContext(TaskContext);
	const [filter, setFilter] = useState({ search: "", status: "all" });
	const [taskInputText, setTaskInputText] = useState("");

	const handleTaskSubmit = () => {
		if (!taskInputText) return;

		taskDispatch({
			type: "addTask",
			payload: { description: taskInputText },
		});
		setTaskInputText("");
	};

	const getFilteredTasks = () => {
		return tasks.filter((t) => {
            let include = true;
            if (!t.description.startsWith(filter.search)) include = false;
            if(filter.status !== "all"){
                if (!t.status && filter.status !== "active") include = false;
                if (t.status && filter.status !== "completed") include = false;
            }
            return include;
		});
	};

	return (
		<React.Fragment>
			<ListModifier filter={filter} setFilter={setFilter} />
			<div>
				<label htmlFor="taskInput">Enter task description:</label>
				<br />
				<input
					name="taskInput"
					type="text"
					value={taskInputText}
					placeholder="Buy books"
					onChange={(e) => setTaskInputText(e.target.value)}
					data-testid="taskDescriptionInput"
				/>
				<button onClick={handleTaskSubmit}>Add task</button>
			</div>
			<ol data-testid="taskList">
				{getFilteredTasks().map((t, i) => (
					<Task
						key={t.id}
						index={i}
						description={t.description}
						status={t.status}
						data-testid={t.id}
					/>
				))}
			</ol>
		</React.Fragment>
	);
}
