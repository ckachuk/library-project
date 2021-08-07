
//global variables
const myLibrary = [];



const conteinerBooks = document.querySelector(".conteiner");

//functions

function Book(bookId, title, author, nPages, read){
    this.bookId = bookId;
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

const removeBookFromLibrary = function(divId){
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].bookId == divId){
            myLibrary.splice(i, 1);
            return;
        }
    }
}


const addStatementToDiv = function (pKey, pValue, element){
    const paragraph = document.createElement(`${element}`);
    paragraph.textContent = `${pKey}: ${pValue}`;

    return paragraph;
} 

const displayLibrary = function(array){
    array.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('books');
        
        div.appendChild(addStatementToDiv('Title', element.title, 'p'));
        div.appendChild(addStatementToDiv('Author', element.author, 'p'));
        div.appendChild(addStatementToDiv('Number of pages', element.nPages, 'p'));
        div.appendChild(addStatementToDiv('Read?', element.read, 'p'));
        div.id = element.bookId;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        
        deleteButton.onclick = function(){
            removeBookFromLibrary(div.id); 
            removeChildConteiner();  
            displayLibrary(myLibrary);
        }

        div.appendChild(deleteButton);
        
        conteinerBooks.appendChild(div);


       /*
       another way to resolve this function
        const p1 = document.createElement('p');
        p1.textContent = `Title: ${element.title}`;

    
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
        */
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
    const titleData = document.querySelector('#titleForm');
    const authorData = document.querySelector('#authorForm');
    const nPagesData = document.querySelector('#pagesForm');
    const readData = document.querySelector('#readForm').checked ? true : false;

   

    const book = new Book(myLibrary.length, titleData.value, authorData.value, parseInt(nPagesData.value), readData);
    addBookToLibrary(book);
}



// EVENTS


const displayFormAddBook = document.querySelector('#addBookButton');

displayFormAddBook.addEventListener('click', openFormAddBook);

const formAddBook = document.querySelector('.formAddBook');

formAddBook.addEventListener('submit', (e)=>{
    e.preventDefault();

    addBookFromFormToLibrary();

    document.forms[0].reset();

    closeFormAddBook();
    removeChildConteiner();
    displayLibrary(myLibrary);
});


