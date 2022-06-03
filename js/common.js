/* TODO LIST

1. 입력한 내용이 아래 목록에 표출(항목 추가 기능)
2. 항목 삭제 기능
3. 선택 목록 삭제하기
4. 전체 목록 삭제하기 

<수정사항>
1. css / html 폴더별로 파일 나눠서 정리
2. html 태그에 직접 이벤트 삽입 하지 말고 script에서 호출해주기
3. 체크한 리스트만 삭제하기 기능 추가

*/
window.onload = function () { 
  const makeBtn = document.querySelector('#inputValue')
  const deleteBtn = document.querySelector('#delete');
  const deleteAllTarget = document.querySelector('#del_all_box');


  console.log(deleteAllTarget)
  console.log(deleteBtn)
  console.log(makeBtn)

  makeBtn.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
      makeTodo()
    } else {
      return false;
    }
  })
  
  // deleteBtn.addEventListener('click', delTodo)
  deleteAllTarget.addEventListener('click', delTodoAll)
  
  //리스트 만드는 함수
  function makeTodo() {
    const name = document.getElementById('inputValue').value;
    const listBox = document.querySelector('ul');
    const listLi = document.createElement('li');

    listLi.innerHTML = `<input type="checkbox"><label>${name}</label><span id="delete">x</span>`;
    document.getElementById('inputValue').value = null
    !name || name[0] === ' ' ? null : listBox.appendChild(listLi); //input값이 스페이스바로 시작하면 리스트 생성 X
  }
  
  
  //리스트 지우는 함수
  function delTodo(event) {
    const targetLi = event.target.parentNode
  
    targetLi.parentNode.removeChild(targetLi);
  }
  
  //모든 리스트 지우는 함수
  function delTodoAll() {
    const listUl = document.querySelector('#todo_ul');
  
    while (listUl.hasChildNodes()) {
      listUl.removeChild(listUl.firstChild)
    }
  }
}
