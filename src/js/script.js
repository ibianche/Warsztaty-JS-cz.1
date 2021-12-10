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


const filtersElem = [];

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

    const ratingBgc = determineRatingBgc(rating);
    const ratingWidth = ratingBgc * 10;
  }
}

// const images = document.querySelectorAll(select.containerOf.image);

const favoriteBooks = [];


// const filtersElem = [];

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


  filters.addEventListener('click', function (event) {
    // event.preventDefault();
    const clickedElement = event.target;

    if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
      console.log(clickedElement.value);

      if (clickedElement.checked === true) {  /*sprawdzam czy input jest zaznaczony */
        filtersElem.push(clickedElement.value); /*jezeli jest zaznaczony to dodaje value filtra do tablicy filters */
      } else {
        const indexEl = filtersElem.indexOf(clickedElement.value); /*jesli nie jest zaznaczony to musimy go usunąc z tablicy, szukam indeks tego elementu*/
        filtersElem.splice(indexEl, 1); /*potem usuwamy*/
      }
    }
    filterBooks();
  });

}


function filterBooks() {

  for (let book of dataSource.books) {
    let shouldBeHidden = false;

    for (let filter of filtersElem) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }
    const bookId = document.querySelector('.book__image[data-id="' + book.id +'"]');

    if (shouldBeHidden === true) {
      bookId.classList.add('hidden');
    } else {
      bookId.classList.remove('hidden');
    }
  }
}


function determineRatingBgc(rating) {

  if (rating < 6){
    let background1 = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  }else if (rating > 6 && <= 8){
    let background2 = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  }else if (rating  > 8 && <= 9){
    let background3 = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  }else (rating > 9){
    let background4 = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }




}















