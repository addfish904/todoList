// 點擊按鈕新增
document.querySelector('.btn-new').addEventListener('click', function(){
    addTodos()
});

// 按Enter新增
document.querySelector('.todo_input').addEventListener('keypress',function(e){
    if(e.which === 13){
        addTodos();
    }
});

function addTodos(){
    const inputValue = document.querySelector('.todo_input').value;
    // 檢查輸入欄位是否為空值，trim() 清除字串前後空白
    if (inputValue.trim().length === 0) return;
    // 新增todo
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo');
    newTodo.innerHTML = `
        <label class="todo_title">
        <input class="todo_check" type="checkbox">${escapeHtml(inputValue)}</input>
        </label>
        <button class="btn-delete">刪除</button>
        `;
    document.querySelector('.todo_list').appendChild(newTodo);
    document.querySelector('.todo_input').value = '';

}

function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


document.querySelector('.todo_list').addEventListener('click', function (event) {
    const target = event.target;
    console.log(event);
    // 刪除 todo
    if (target.classList.contains('btn-delete')) {
      target.parentNode.remove()
    }
    // 切換完成狀態
    if (target.classList.contains('todo_check')) {
        const todoItem = target.closest('.todo');
        if (target.checked) {
            // 加上刪除線並移到底部
            todoItem.classList.add('completed');
            todoItem.querySelector('.todo_title').style.textDecoration = 'line-through';
            todoItem.querySelector('.todo_title').style.color = 'gray';
            moveToBottom(todoItem);
        } else {
            // 移除刪除線並恢復到清單頂部
            todoItem.classList.remove('completed');
            todoItem.querySelector('.todo_title').style.textDecoration = 'none';
            todoItem.querySelector('.todo_title').style.color = '#000';
            moveToTop(todoItem);
        }
    }
  });
  // 將完成的項目移到底部
function moveToBottom(todoItem) {
    const todoList = document.querySelector('.todo_list');
    // 把完成的項目放在清單的最後
    todoList.appendChild(todoItem);
}

// 將未完成的項目移回到清單頂部
function moveToTop(todoItem) {
    const todoList = document.querySelector('.todo_list');
    // 找到第一個未完成項目
    const firstUncompleted = Array.from(todoList.children).find(
        (item) => !item.classList.contains('completed')
    );
    if (firstUncompleted) {
        // 插入到第一個未完成項目之前
        todoList.insertBefore(todoItem, firstUncompleted);
    } else {
        // 如果沒有未完成項目，就放在清單最前面
        todoList.insertBefore(todoItem, todoList.firstChild);
    }
}