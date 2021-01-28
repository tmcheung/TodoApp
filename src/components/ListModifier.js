import { TaskContext } from "../data/TaskStore";
import React, { useContext, useState } from "react";

export function ListModifier({ filter, setFilter }) {
	const [searchInput, setSearchInput] = useState("");
	const { dispatch } = useContext(TaskContext);

	const handleSearchChange = (value) => {
		setSearchInput(value);
		setFilter({ ...filter, search: value });
	};

	const handleClear = () => {
		dispatch({
			type: "clearTasks"
		})
	};

	return (
		<div>
			<label htmlFor="search">Search: </label>
			<input
				style={{ marginLeft: "0px" }}
				type="text"
				value={searchInput}
				onChange={(e) => handleSearchChange(e.target.value)}
				data-testid="searchInput"
			/>
			<select
				defaultValue="all"
				onChange={(e) =>
					setFilter({ ...filter, status: e.target.value })
				}
				style={{ marginLeft: "10px" }}
			>
				<option value="all">Show all</option>
				<option value="active">Active</option>
				<option value="completed">Completed</option>
			</select>
			<button onClick={handleClear} style={{ marginLeft: "10px" }}>
				Clear tasks
			</button>
			<hr />
		</div>
	);
}
