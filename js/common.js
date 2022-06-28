/* TODO LIST
1. 입력한 내용이 아래 목록에 표출(항목 추가 기능)
2. 항목 삭제 기능
3. 선택 목록 삭제하기
4. 전체 목록 삭제하기 

<1차 수정사항>
1. css / html 폴더별로 파일 나눠서 정리
2. html 태그에 직접 이벤트 삽입 하지 말고 script에서 호출해주기
3. 체크한 리스트만 삭제하기 기능 추가

<2차 수정사항>
1. 항목 완료 처리 기능 추가
2. 수정하기 기능 추가
3. 체크리스트지우기 jquery -> js로 바꾸기

<3차 수정사항>
1. onload 안에 있는 함수 밖으로 빼기
2. onload 안에 있는 전역변수 밖으로 빼기
3. 삼항식 정리(본래 간결한 코드 작성을 위함)
4. done list 삭제시 생기는 에러 확인
5. 수정 UI 추가하기(더블클릭시 수정이 가능합니다 문구 넣기 or 수정 버튼 추가)
*/
let listUl = document.querySelector('#todo_ul');
let doneUl = document.querySelector('#done_ul')
let makeBtn = document.querySelector('#inputValue');
let deleteAllTarget = document.querySelector('#del_all_box');
let checkedClearBtn = document.querySelector('.del_checked_box');


window.onload = function () { 
  makeBtn.addEventListener('keypress', function (e) {if (e.key == 'Enter') { makeTodo(checkedClearBtn) }})
  deleteAllTarget.addEventListener('click', function () { delTodoAll() })
  checkedClearBtn.addEventListener('click', function () { clearChecked() })
}

function makeTodo() { //리스트 만들기
  let name = document.querySelector('#inputValue').value;
  let listLi = document.createElement('li');
  let inputBtn = document.createElement('input');
  let checkBtn = document.createElement('input'); checkBtn.type = 'checkbox';
  let label = document.createElement('label'); label.innerHTML = `${name}`; label.id = 'listLabel';
  let updateBtn = document.createElement('span'); updateBtn.innerHTML = `수정`; updateBtn.id = `listUpdateBtn`
  let delBtn = document.createElement('span'); delBtn.innerHTML = `삭제`;

  document.querySelector('#inputValue').value = null;
  
  if (!name || name[0] === ' ') {
    null;
  } else {
    listUl.appendChild(listLi);
    listLi.appendChild(checkBtn);
    listLi.appendChild(label);
    listLi.appendChild(delBtn);
    listLi.appendChild(updateBtn)
  }

  checkBtn.addEventListener('click', function () { doneTodo(this) })
  delBtn.addEventListener('click', function () { delTodo(this) })
  updateBtn.addEventListener('click', function () { todoUpdate(label, inputBtn) })
}

function delTodo(target) { //리스트 지우기
  target.parentNode.remove();
}

function delTodoAll() { //모든 리스트 지우기
  let listUlLength = listUl.children.length;

  for (let i = 0; i < listUlLength; i++) {
    listUl.removeChild(listUl.firstElementChild)
  }
}

function clearChecked() { //완료된 리스트 전부 지우기
  let doneUlLength = doneUl.children.length;

  for (let i = 0; i < doneUlLength; i++) {
    doneUl.removeChild(doneUl.firstElementChild)
  }
}

function doneTodo(checkBtn) { //항목 완료 처리
  let listLi = checkBtn.parentNode;

  if (checkBtn.checked) {
    listLi.style.cssText = `color: #aaaaaa;`
    listUl.removeChild(listLi)
    doneUl.appendChild(listLi)
  } else {
    listLi.style.cssText = `color: #555555;`
    doneUl.removeChild(listLi)
    listUl.appendChild(listLi)
  }
}

function todoUpdate(label, inputBtn) { //리스트 수정하기
  let listLi = label.parentNode;

  inputBtn.value = null;
  inputBtn.id = 'updateText';
  listLi.removeChild(label);
  listLi.appendChild(inputBtn);

  inputBtn.addEventListener('keypress', function (e) {
    let values = inputBtn.value;

    if (e.key == 'Enter') {
      label.innerHTML = `${values}`
      listLi.removeChild(inputBtn)
      listLi.appendChild(label)
    }
  })
}