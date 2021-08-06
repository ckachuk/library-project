
//global variables
const myLibrary = [];

const conteinerBooks = document.querySelector(".conteiner");

//functions

function Book(title, author, nPages, read){
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.read = read;
}

Book.prototype.iReadThisBook = function(book){
    if(book === true){
        return true;
    }
    else{
        return false;
    }
}




const addBookToLibrary = function (bookObject){
    myLibrary.push(bookObject);
}

const removeBookToLibrary = function(bookObject){
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i] === bookObject){
            myLibrary.pop(bookObject);
            return;
        }
    }
}


const displayLibrary = function(array){
    array.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('books');

        const p1 = document.createElement('p');
        p1.textContent = element.title;

        div.appendChild(p1);

        const p2 = document.createElement('p');
        p2.textContent = element.author;

        div.appendChild(p2);

        const p3 = document.createElement('p');
        p3.textContent = element.nPages;

        div.appendChild(p3);

        const p4 = document.createElement('p');
        p4.textContent = element.read;
        div.appendChild(p4);

        conteinerBooks.appendChild(div);
    });   
}

const removeChildConteiner = function(){
    while(conteinerBooks.firstChild){
        conteinerBooks.removeChild(conteinerBooks.lastChild);
    }
}

const openFormAddBook = function(){
    document.querySelector('.formAddBookConteiner').style.display = 'block';
   
    document.getElementById('main').style.opacity = '0.2';
}

const closeFormAddBook = function(){
    document.querySelector('.formAddBookConteiner').style.display = 'none';
    document.getElementById('main').style.opacity = '1';
}



const addBookFromFormToLibrary = function(e){
    e.preventDefault();

    const titleData = document.querySelector('#titleForm')
    const authorData = document.querySelector('#authorForm')
    const nPagesData = document.querySelector('#pagesForm')
    const readData = document.querySelector('#readForm').checked ? true : false

   

    const book = new Book(titleData.value, authorData.value, parseInt(nPagesData.value), readData);
    addBookToLibrary(book);
    

    document.forms[0].reset();

    closeFormAddBook();
    removeChildConteiner();
    displayLibrary(myLibrary)

}


const displayFormAddBook = document.querySelector('#addBookButton')

displayFormAddBook.addEventListener('click', openFormAddBook);

const formAddBook = document.querySelector('.formAddBook');

formAddBook.addEventListener('submit', addBookFromFormToLibrary)
