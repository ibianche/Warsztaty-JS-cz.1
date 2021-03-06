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

const favoriteBooks = [];
const filtersElem = [];


class BooksList {

  constructor() {
    const thisBookList = this;
    thisBookList.render();
    thisBookList.initActions();
    thisBookList.initData();

  }

  initData() {
    // const thisBookList = this;
    this.data = dataSource.books;
  }


  render() {/*wzorowałam się metodą Product.renderInMenu*/
    const thisBookList = this;

    for (let book of dataSource.books) {
      const bookInfo = {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      };

      const ratingBgc = thisBookList.determineRatingBgc(bookInfo.rating);
      bookInfo.ratingBgc = ratingBgc;
      const ratingWidth = bookInfo.rating * 10;
      bookInfo.ratingWidth = ratingWidth;
      const generatedHTML = templates.book(bookInfo);
      const newElement = utils.createDOMFromHTML(generatedHTML);
      const listContainer = document.querySelector(select.containerOf.list);
      listContainer.appendChild(newElement);
    }
  }


  initActions() {
    const thisBookList = this;

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
      thisBookList.filterBooks();
    });

  }


  filterBooks() {
    const thisBookList = this;

    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filtersElem) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookId = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if (shouldBeHidden === true) {
        bookId.classList.add('hidden');
      } else {
        bookId.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    const thisBookList = this;
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

}

const app = new BooksList();











