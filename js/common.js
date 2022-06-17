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
*/
window.onload = function () { 
  const listBox = document.querySelector('#todo_ul');
  const makeBtn = document.querySelector('#inputValue');
  const deleteAllTarget = document.querySelector('#del_all_box');
  const checkedClearBtn = document.querySelector('.del_checked_box');

  makeBtn.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) { makeTodo(checkedClearBtn) }
  })
  deleteAllTarget.addEventListener('click', function () { delTodoAll() })

  //리스트 만들기
  function makeTodo(checkedClearBtn) {
    const listLi = document.createElement('li')
    const delBtn = document.createElement('span')
    const checkBtn = document.createElement('input')
    const label = document.createElement('label')
    const name = document.querySelector('#inputValue').value;
    
    checkBtn.type = 'checkbox'
    label.innerHTML = `${name}`
    delBtn.innerHTML = `삭제`
    document.querySelector('#inputValue').value = null
    !name || name[0] === ' ' ? null :  listBox.appendChild(listLi) && listLi.appendChild(checkBtn) && listLi.appendChild(label) && listLi.appendChild(delBtn);

    checkedClearBtn.addEventListener('click', function () { clearChecked() })
    checkBtn.addEventListener('click', function () { doneTodo(checkBtn, listLi, delBtn) })
    delBtn.addEventListener('click', function () { delTodo(listLi) })
    
    

  }

  //리스트 지우기
  function delTodo(element) {
    document.querySelector('#todo_ul').removeChild(element)
  }

  //모든 리스트 지우기
  function delTodoAll() {
    const listUl = document.querySelector('#todo_ul');
    const listUlLength = listUl.children.length;

    for (let i = 0; i < listUlLength; i++) {
      listUl.removeChild(listUl.firstElementChild)
    }
  }

  //항목 완료 처리
  function doneTodo(element, listLi, delBtn) {
    const listUl = document.querySelector('#todo_ul');
    const doneUl = document.querySelector('#done_ul')

    if (element.checked) {
      console.log(listLi)
      listLi.style.cssText= `color: #aaaaaa; text-decoration: line-through; `
      listUl.removeChild(listLi)
      doneUl.appendChild(listLi)
    } else {
      listLi.style.cssText= `color: #555555; text-decoration: none;`
      doneUl.removeChild(listLi)
      listUl.appendChild(listLi)
    }

    delBtn.addEventListener('click', function () { delDone(listLi) })
  }

  //완료된 리스트 지우기
  function delDone(listLi) {
    document.querySelector('#done_ul').removeChild(listLi)
  }

  //완료된 리스트 전부 지우기
  function clearChecked() {
    const doneUl = document.querySelector('#done_ul')
    const doneUlLength = doneUl.children.length;

    for (let i = 0; i < doneUlLength; i++) {
      doneUl.removeChild(doneUl.firstElementChild)
    }
  }
}