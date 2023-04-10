import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
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

const TodoList = () => {
  // 정의한 atom 항목을 읽어들이기 위해서
  // useRecoilValue 를 활용
  const todoList = useRecoilValue(todoListState);
  return (
    <>
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
