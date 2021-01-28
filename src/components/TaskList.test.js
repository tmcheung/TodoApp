import { fireEvent, render, screen } from "@testing-library/react";
import { TaskContext, TaskProvider, taskReducer } from "../data/TaskStore";
import React, { useContext, useReducer } from "react";
import { TaskList } from "./TaskList";


test("added task is added to state and displayed", () => {
	render(
		<TaskProvider>
			<TaskList/>
		</TaskProvider>
    );
    
    const input = screen.getByTestId("taskDescriptionInput");
    const button = screen.getByText("Add task");
    
    fireEvent.change(input, { target: { value: 'testTask' } })
    fireEvent.click(button);
    
    const task = screen.getByText("testTask");
    
    expect(task).not.toBeNull();
});

test("add task adds to displayed list", () => {
	render(
		<TaskProvider>
			<TaskList/>
		</TaskProvider>
    );
    
    const input = screen.getByTestId("taskDescriptionInput");
    const button = screen.getByText("Add task");

    fireEvent.change(input, { target: { value: 'testTask' } })
    fireEvent.click(button);
    
    const task = screen.getByTestId("taskList");
    expect(task.children.length).toBe(1);
});

test("filter search only shows task that start with search criteria", () => {
    render(
		<TaskProvider>
			<TaskList/>
		</TaskProvider>
    );
    
    const input = screen.getByTestId("taskDescriptionInput");
    const button = screen.getByText("Add task");

    fireEvent.change(input, { target: { value: 'testTask' } })
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'testTestTask' } })
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'notShownTask' } })
    fireEvent.click(button);


    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    const task = screen.getByTestId("taskList");
    expect(task.children.length).toBe(2);
})