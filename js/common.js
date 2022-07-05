const listUl = document.querySelector('#todo_ul');
const doneUl = document.querySelector('#done_ul');
const makeBtn = document.querySelector('#inputValue');
const deleteAllTarget = document.querySelector('#del_all_box');
const checkedClearBtn = document.querySelector('.del_checked_box');
let listIndex = 1;
let localArr = [];
let orgTodo = loadList(); //웹스토리지에 담긴 투두 배열값

makeBtn.addEventListener('keypress', function (e) {if (e.key == 'Enter') { makeTodo() }})
deleteAllTarget.addEventListener('click', function () { delTodoAll(listUl) })
checkedClearBtn.addEventListener('click', function () { delTodoAll(doneUl) })

if (orgTodo.length > 0) {
  getTodoList();
}

function getTodoList() {
  orgTodo.forEach((item) => {
    makeTodo(item)
  });
}

function makeTodo(item) { //리스트 만들기
  let name;
  if (item === undefined || item === null) {
    name = makeBtn.value.trim();
  } else {
    name = item;
  }
  const listLi = document.createElement('li'); listLi.id = `index-${listIndex}`;
  const inputBtn = document.createElement('input');
  const checkBtn = document.createElement('input'); checkBtn.type = 'checkbox';
  const delBtn = document.createElement('span'); delBtn.innerHTML = `삭제`;
  const updateBtn = document.createElement('span'); updateBtn.innerHTML = `수정`; updateBtn.id = `listUpdateBtn`
  const label = document.createElement('label'); label.innerHTML = name; label.classList = 'listLabel';

  document.querySelector('#inputValue').value = null;
  !name ? null : addList();
  localArr.push(name);

  saveStorage();
  inValue();
  
  function inValue() {
    return inputBtn.value = name;
  }

  function addList() {
    listUl.appendChild(listLi);
    listLi.appendChild(checkBtn);
    listLi.appendChild(label);
    listLi.appendChild(delBtn);
    listLi.appendChild(updateBtn)
  }

  checkBtn.addEventListener('click', doneTodo);
  delBtn.addEventListener('click', function () { delTodo(this) });
  updateBtn.addEventListener('click', function () { todoUpdate(label, inputBtn) });

  // getLabel(listIndex)
  listIndex++;
}

// function getLabel(num) {
//   const target = document.querySelector(`#index-${num}`).children[1].innerText;
//   console.log(target)
// }

function saveStorage() {
  localStorage.setItem('todos', JSON.stringify(localArr))
}

function loadList() {
  let arrTodos = JSON.parse(localStorage.getItem('todos'));
  return arrTodos || [];
}

function delTodo(target) { //리스트 지우기
  target.parentNode.remove();
  localStorage.removeItem('todos')
}

function delTodoAll(target) { //모든 리스트 지우기
  target.innerHTML = '';
  localStorage.clear();
  }

function doneTodo(e) { //항목 완료 처리
  const targetParent = e.target.parentNode;

  if (e.target.checked) {
    targetParent.style.cssText = `color: #aaaaaa;`
    listUl.removeChild(targetParent)
    doneUl.appendChild(targetParent)
  } else {
    targetParent.style.cssText = `color: #555555;`
    doneUl.removeChild(targetParent)
    listUl.appendChild(targetParent)
  }
}

function todoUpdate(label, inputBtn) { //리스트 수정하기
  inputBtn.id = 'updateText';
  label.before(inputBtn);
  label.remove();

  inputBtn.addEventListener('keypress', function (e) {
    const values = inputBtn.value;

    if (e.key == 'Enter') {
      label.innerHTML = values
      inputBtn.after(label)
      inputBtn.remove();
    }
  })
}