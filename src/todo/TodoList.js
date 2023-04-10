import React from "react";
import { atom, selector, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";

import TodoListFilters, { todoListFiltersState } from "./TodoListFilters";
import TodoItem from "./TodoItem";

// 1. Atoms 를 정의한다.
// atom (state) 을 정의할 때는  atoms() 를 활용한다.
export const todoListState = atom({
  // key 는 중복되지 않음.
  // 일반적으로 변수명과 동일하게
  key: "todoListState",
  // 기본값은 원하는 값으로 초기셋팅
  default: [],
});

// todoListState 와 todoListFiltersState 를 활용
// selector 를 구성한다.
// 2 개의 atom 즉, state를 추적해 새로운 상태를 만든다.
export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    // 필터의 값을 읽어온다.
    const filter = get(todoListFiltersState);
    // todoListState 목록
    const list = get(todoListState);
    // filter 에 따른 처리
    switch (filter) {
      case "Show All Completed":
        return list.filter((item) => item.isComplete);
      case "Show All Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const TodoList = () => {
  // 정의한 atom 항목을 읽어들이기 위해서
  // useRecoilValue 를 활용
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);
  return (
    <>
      <TodoListFilters />
      {/* 목록생성 */}
      <TodoItemCreator />
      {/* 목록출력 */}
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
