import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./TodoList";

// 인덱스에 해당하는 내용의 글자파악
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

// 인덱스에 해당하는 요소 삭제
function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const TodoItem = ({ item }) => {
  // TodoList.js 에 정의한 todoListState 읽어들임.
  const [todoList, setTodoList] = useRecoilState(todoListState);
  // 몇번째 index 인지를 파악한다.
  const index = todoList.findIndex((listItem) => item === listItem);
  // 사용자가 내용을 수정한 경우 처리
  const editItemText = ({ target: { value } }) => {
    // 변경할 todoList 의 index 변경
    const newList = replaceItemAtIndex(todoList, index, {
      ...item, // {id:~, text : ~ , isComplete: ~ }
      text: value,
    });
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  // TodoList.js 의 todoListState 목록중 index 삭제
  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>삭제</button>
    </div>
  );
};

export default TodoItem;
