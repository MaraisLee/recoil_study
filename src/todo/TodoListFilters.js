import React from "react";
import { atom, useRecoilState } from "recoil";

// 기존의 todoList.js 에 정의한 todoListState를 참조
// Show All : 전체 목록 todoListState 보여줌.
// Show All Completed : 전체 목록 todoListState 필터링 보여줌.
// Show All Uncompleted : 전체 목록 todoListState 필터링 보여줌.
export const todoListFiltersState = atom({
  key: "todoListFiltersState",
  default: "Show All",
});



const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFiltersState);
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show All Completed">Completed</option>
        <option value="Show All Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
