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
  const listBox = document.querySelector('ul');
  const makeBtn = document.querySelector('#inputValue');
  const deleteAllTarget = document.querySelector('#del_all_box');
  const checkedClearBtn = document.querySelector('.del_checked_box');

  makeBtn.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
      makeTodo()
    }
  })
  deleteAllTarget.addEventListener('click', delTodoAll)
  checkedClearBtn.addEventListener('click', clearChecked)




  //리스트 만들기
  function makeTodo() {
    const name = document.getElementById('inputValue').value;
    const listLi = document.createElement('li');
    listLi.classList = 'todoLi'
    listLi.innerHTML = `<input type="checkbox"><label>${name}</label><span class="delete">x</span>`;
    document.getElementById('inputValue').value = null
    !name || name[0] === ' ' ? null : listBox.appendChild(listLi);

    //리스트 지우기
    $('li.todoLi > span.delete').on('click', function () {
      $(this).parent().remove();
    })
  }

  //모든 리스트 지우기
  function delTodoAll() {
    const listUl = document.querySelector('#todo_ul');

    while (listUl.hasChildNodes()) {
      listUl.removeChild(listUl.firstChild)
    }
  }

  //체크 리스트 지우기
  function clearChecked() {
    const listUl = $('#todo_ul');
    const listLi = $(listUl).children()
    const checkedLi = $(listLi).children('input').is(':checked')

    $(listLi).each(function () {
      if (checkedLi) {
        $($(listLi).children('input:checked')).parent().remove()
      }
    })
  }
}
