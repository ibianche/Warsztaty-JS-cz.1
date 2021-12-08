const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    list: '.books-list',
    image: '.book__image'
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

function initActions() {

  const elementOfList = document.querySelector(select.containerOf.list); /*szukam listę książek*/
  const images = elementOfList.querySelectorAll(select.containerOf.image); /*wyszukuję obrazki w tej liście*/

  for (let image of images) {

    elementOfList.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

      // image.classList.add('favorite'); /*dodaję do klikniętego obrazka klasę favorite*/
      const dataId = image.getAttribute('data-id'); /*pobieram identyfikator*/
      // favoriteBooks.push(dataId);

      if (favoriteBooks.includes(dataId)) { /*sprawdza czy ksiazka została już dodana do 'ulubionych' */
        image.classList.remove('favorite');
        favoriteBooks.pop(dataId);
      } else {
        image.classList.add('favorite');
        favoriteBooks.push(dataId);
      }
    });
  }


}






















