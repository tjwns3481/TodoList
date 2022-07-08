const listUl = document.querySelector('#todo_ul');
const todoList = document.querySelector('li')
const doneUl = document.querySelector('#done_ul');
const makeBtn = document.querySelector('#inputValue');
const deleteAllTarget = document.querySelector('#del_all_box');
const checkedClearBtn = document.querySelector('.del_checked_box');
let listIndex = 0;
let localArr = [];
let doneArr = [];
let orgTodo = loadList('todos');
let orgDone = loadList('dones');

makeBtn.addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    if (localArr.includes(makeBtn.value) || doneArr.includes(makeBtn.value)) { //중복된문자 생성차단
      return false;
    } else {
      makeTodo();
    }
  }
})
deleteAllTarget.addEventListener('click', function () { delTodoAll(listUl,'todos') })
checkedClearBtn.addEventListener('click', function () { delTodoAll(doneUl,'dones') })

if (orgTodo.length > 0) {
  getTodoList();
}

if (orgDone.length > 0) {
  getDoneList();
}

function getTodoList() { //새로고침 했을때 각각의 투두리스트 넣어주기
  orgTodo.forEach((item) => {
    makeTodo(item)
  });
}

function getDoneList() { //새로고침 했을때 각각의 완료리스트 넣어주기
  orgDone.forEach((item) => {
    makeDone(item)
  });
}

function makeDone(item) { //새로고침 했을때 완료항목 만들기
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
  const updateBtn = document.createElement('span'); updateBtn.innerHTML = `수정`; updateBtn.id = `listUpdateBtn`;
  const label = document.createElement('label'); label.innerHTML = name; label.classList = 'listLabel';

  document.querySelector('#inputValue').value = null;

  if (!name) {
    return null
  } else {
    doneArr.push(name);
    addList()
  }

  saveStorage();
  inValue();
  
  function inValue() {
    return inputBtn.value = name;
  }

  function addList() {
    doneUl.appendChild(listLi);
    listLi.appendChild(checkBtn);
    listLi.appendChild(label);
    listLi.appendChild(delBtn);
    listLi.appendChild(updateBtn);
  }
  
  checkBtn.checked = true;
  listLi.style.cssText = `color: #aaaaaa;`
  checkBtn.addEventListener('click', doneTodo);
  delBtn.addEventListener('click', function () { delTodo(this) });
  updateBtn.addEventListener('click', function () { todoUpdate(label, inputBtn) });

  listIndex++;
}
//자바스크립트
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
  const updateBtn = document.createElement('span'); updateBtn.innerHTML = `수정`; updateBtn.id = `listUpdateBtn`;
  const label = document.createElement('label'); label.innerHTML = name; label.classList = 'listLabel';

  document.querySelector('#inputValue').value = null;

  if (!name) {
    return null
  } else {
    localArr.push(name);
    addList()
  }
  
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
    listLi.appendChild(updateBtn);
  }
  checkBtn.addEventListener('click', doneTodo);
  delBtn.addEventListener('click', function () { delTodo(this) });
  updateBtn.addEventListener('click', function () { todoUpdate(label, inputBtn) });

  listIndex++;
}

function saveStorage() { //storage에 저장
  localStorage.setItem('todos', JSON.stringify(localArr))
  localStorage.setItem('dones', JSON.stringify(doneArr))
}

function loadList(target) { //HTML에 뿌려줄 리스트 로드
  let arrTodos = JSON.parse(localStorage.getItem(target));
  return arrTodos || [];
}

function delTodo(target) { //리스트 지우기
  const li = target.parentNode;
  li.remove();

  delStorage(localArr);
  delStorage(doneArr);

  function delStorage(target) { // 스토리지안에 있는 특정 요소 지우기
    for(let i = 0; i < target.length; i++) {
      if(target[i] === li.children[1].innerText)  {
        target.splice(i, 1);
        i--;
      }
    }
  }
  saveStorage();
}


function delTodoAll(target, StorageKey) { //모든 리스트 지우기
  target.innerHTML = '';
  localStorage.removeItem(StorageKey);
}

function doneTodo(e) { //항목 완료 처리
  const targetParent = e.target.parentNode;
  
  if (e.target.checked) {
    targetParent.style.cssText = `color: #aaaaaa;`
    targetParent.classList.add('done')
    listUl.removeChild(targetParent)
    doneUl.appendChild(targetParent)
    doneArr.push(targetParent.children[1].innerText);
    delStorage(localArr);
  } else {
    targetParent.style.cssText = `color: #555555;`
    targetParent.classList.remove('done')
    doneUl.removeChild(targetParent)
    listUl.appendChild(targetParent)
    localArr.push(targetParent.children[1].innerText)
    delStorage(doneArr);
  }

  function delStorage(target) {
    for(let i = 0; i < target.length; i++) {
      if(target[i] === targetParent.children[1].innerText)  {
        target.splice(i, 1);
        i--;
      }
    }
  }
  saveStorage();
}

function todoUpdate(label, inputBtn) { //리스트 수정하기
  const labelValue = label.innerText
  inputBtn.id = 'updateText';
  label.before(inputBtn);
  label.remove();

  inputBtn.addEventListener('keypress', function (e) {
    const values = inputBtn.value;

    if (e.key == 'Enter') {
      if (localArr.includes(label.innerText)) { //투두항목
        localArr.filter((item,index) => {
          if (item === labelValue) {
            localArr[index] = values;
          }
        })
      } else if (doneArr.includes(label.innerText)) { //완료항목
        doneArr.filter((item,index) => {
          if (item === labelValue) {
            doneArr[index] = values;
          }
        })
      };
      label.innerHTML = values;
      inputBtn.after(label);
      inputBtn.remove();
      saveStorage();
    }
  })
}