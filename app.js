
//global variables
const myLibrary = [];
let formOpen = false;


const conteinerBooks = document.querySelector(".conteiner");

//functions

function Book(bookId, title, author, nPages, read){
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.read = read;
}

Book.prototype.changeReadThisBook = function(){
    if(this.read === true){
        return this.read = false
    }
    else{
        return this.read = true;
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

const addCheckboxToDiv = function(){
    const label = document.createElement('label');
    label.className = 'switch';
    const input = document.createElement('input');
    input.className = 'readForm'
    input.type = 'checkbox';
    input.id = 'checkBook';
    const span = document.createElement('span');
    span.className = 'slider round';

    label.appendChild(input);
    label.appendChild(span);

    return label;
}



const displayLibrary = function(array){
    array.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('books');
        
        div.appendChild(addStatementToDiv('Title', element.title, 'p'));
        div.appendChild(addStatementToDiv('Author', element.author, 'p'));
        div.appendChild(addStatementToDiv('Number of pages', element.nPages, 'p'));
        
        div.id = element.bookId;

        const bookReadButton = document.createElement('button');
        bookReadButton.className = 'bookReadButton'
        if(element.read === true){
            bookReadButton.textContent = 'READ';
            bookReadButton.id = 'bookReadButton'
        }
        else{
            bookReadButton.textContent = 'UNREAD';
            bookReadButton.id = 'bookUnreadButton'
        }

        bookReadButton.onclick = function(){
            element.changeReadThisBook();
            removeChildConteiner(); 
            displayLibrary(myLibrary);
            
        }

        div.appendChild(bookReadButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.className = 'deleteButton';
        
        deleteButton.onclick = function(){
            removeBookFromLibrary(div.id); 
            removeChildConteiner();  
            displayLibrary(myLibrary);
        }

        div.appendChild(deleteButton);
        
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
    const titleData = document.querySelector('#titleForm');
    const authorData = document.querySelector('#authorForm');
    const nPagesData = document.querySelector('#pagesForm');
    const readData = document.querySelector('#readForm').checked ? true : false;

   

    const book = new Book(myLibrary.length, titleData.value, authorData.value, parseInt(nPagesData.value), readData);
    addBookToLibrary(book);
}



// EVENTS


//const displayFormAddBook = document.querySelector('#addBookButton');

//displayFormAddBook.addEventListener('click', openFormAddBook);

const formAddBook = document.querySelector('.formAddBook');

formAddBook.addEventListener('submit', (e)=>{
    e.preventDefault();

    addBookFromFormToLibrary();

    document.forms[0].reset();

    closeFormAddBook();
    removeChildConteiner();
    displayLibrary(myLibrary);
});


document.addEventListener('click', (e) =>{
    if (e.target.matches('#addBookButton')) {
        openFormAddBook();
    }
    else if(!e.target.closest('.formAddBookConteiner')){
        closeFormAddBook();
    }
   
    
    
}, false);

