let myLibrary = [];
function Novel(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
}
function open(){
    document.getElementById("form-container").style.display = "block";
}
function closeForm() {
    document.getElementById("form-container").style.display = "none";
  }
  function addBookToLibrary(title, author, pages, read) {
    let newNovel = new Novel(title, author, pages, read);
    myLibrary.push(newNovel);
    render();
  }
  
  function submitForm() {
    let title = document.getElementById('nTitle');
    let author = document.getElementById('nAuthor');
    let pages = document.getElementById('nPages');
    let read = getRadioValue();

    addBookToLibrary(title.value, author.value, pages.value, read);
    title.value = "";
    author.value = "";
    pages.value = "";
  
}

function getRadioValue() {
    let btns = document.getElementsByName('read');

    if (btns[0].checked) {
        return 'Yes';
    } else {
        return 'Not yet';
    }
}
function render() {
    table = document.querySelector('#novel');
}
while (novel.rows.length > 1) {
    novel.deleteRow(1);
}
for (i = 0; i < myLibrary.length; i++) {
    let booky = myLibrary[i];
    let delBtn = document.createElement('input');
    delBtn.type = 'image';
    delBtn.id = 'removeBtn';
    delBtn.src = './images/delete.png';
    delBtn.addEventListener('click', removeRow);
    let row = table.insertRow();
    row.id = i;
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let btn = document.createElement('button');
    btn.id = 'toggleRead';
    btn.addEventListener('click', changeRead);

    cell1.textContent = booky.title;
    cell2.textContent = booky.author;
    cell3.textContent = booky.pages;
    btn.textContent = booky.read;
    if (booky.read === "Yeah") {
      btn.style.backgroundColor = "lightblue";
    } else {
        btn.style.backgroundColor = "green";
    }
    cell4.append(btn);
    cell5.appendChild(delBtn);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    table.appendChild(row);
  }

function changeRead(e) {
    //current object
    let table = document.querySelector('#novel');  
    let read = e.target;
    let rowNum = read.parentNode.parentNode.rowIndex;
    let title = table.rows[rowNum].cells[0].textContent;
    let readValue = read.textContent;

    if (readValue === "Yeah") {

        read.style.backgroundColor = 'green';
    } else {
        read.style.backgroundColor = 'lightblue';
    }
  
    for (i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title == title) {
        if (myLibrary[i].read === "Yeah") {
          myLibrary[i].read = "Not yet";
          break;
        } myLibrary[i].read = "Yeah";
      }
    }

    render();
  }

  function removeRow() {
    let table = document.querySelector('#novel');
    let td = event.target.parentNode;
    let tr = td.parentNode;
    let row = tr.rowIndex;
    let title = table.rows[row].cells[0].textContent;
    removeFromArray(title);
    tr.parentNode.removeChild(tr);
  }

  
  function removeFromArray(title) {
      for (i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].title == title) {
              myLibrary.splice(i, 1);
              break;
          }
      }
  }
  
  let button = document.querySelector('#open');
  button.addEventListener('click', () => open());
  
  let submitBook = document.querySelector('#submitBook');
  submitBook.addEventListener('click', submitForm);