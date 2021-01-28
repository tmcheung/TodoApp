import { render, screen } from "@testing-library/react";
import { TaskContext, TaskProvider, taskReducer } from "../data/TaskStore";
import React, { useContext, useReducer } from "react";
import { Task } from "./Task";

test("checkbox is checked when status is completed", () => {
	render(
		<TaskProvider>
			<Task description={"test"} index={0} status={true} />
		</TaskProvider>
	);
	const checkbox = screen.getByTestId("checkbox");
	expect(checkbox).toBeChecked();
});

test("checkbox is not checked when status is active", () => {
	render(
		<TaskProvider>
			<Task description={"test"} index={0} status={false} />
		</TaskProvider>
	);
	const checkbox = screen.getByTestId("checkbox");
	expect(checkbox).not.toBeChecked();
});