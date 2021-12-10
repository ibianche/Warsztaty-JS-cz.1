const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    list: '.books-list',
    image: '.book__image',
    filters: '.filters'
  },
};

const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};


render();
initActions();


function render() {               /*wzorowałam się metodą Product.renderInMenu*/

  for (let book of dataSource.books) {
    const bookInfo = {
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
    };

    const generatedHTML = templates.book(bookInfo);
    const newElement = utils.createDOMFromHTML(generatedHTML);
    const listContainer = document.querySelector(select.containerOf.list);
    listContainer.appendChild(newElement);
  }
}


const favoriteBooks = [];
const filtersElem = [];

function initActions() {

  const elementOfList = document.querySelector(select.containerOf.list); /*szukam listę książek*/
  // const images = elementOfList.querySelectorAll(select.containerOf.image); /*wyszukuję obrazki w tej liście*/
  const filters = document.querySelector(select.containerOf.filters);

  elementOfList.addEventListener('dblclick', function (event) {
    event.preventDefault();

    const clickedElement = event.target.offsetParent;

    // image.classList.add('favorite'); /*dodaję do klikniętego obrazka klasę favorite*/
    const dataId = clickedElement.getAttribute('data-id'); /*pobieram identyfikator*/
    // favoriteBooks.push(dataId);

    if (favoriteBooks.includes(dataId)) { /*sprawdza czy ksiazka została już dodana do 'ulubionych' */
      clickedElement.classList.remove('favorite');
      favoriteBooks.pop(dataId);
    } else {
      clickedElement.classList.add('favorite');
      favoriteBooks.push(dataId);
    }
  });



  filters.addEventListener('click',function (event) {
    // event.preventDefault();
    const clickedElement = event.target;

    if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
      console.log(clickedElement.value);


      if (clickedElement.checked === true) {  /*sprawdzam czy input jest zaznaczony */
        filtersElem.push(clickedElement.value); /*jezeli jest zaznaczony to dodaje value filtra do tablicy filters */
      }else {
        const indexEl = filtersElem.indexOf(clickedElement.value); /*jesli nie jest zaznaczony to musimy go usunąc z tablicy, szukam indeks tego elementu*/
        filtersElem.splice(indexEl, 1); /*potem usuwamy*/

      }
    }
  });
}




// function filterBooks(){
//
// for(let book of dataSource.books){
//
//   let shouldBeHidden = false;
//
//   for(let filter of filters){
//
//
//   }
//
// }
//
//
// }
















