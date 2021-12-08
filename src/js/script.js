const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    list: '.books-list',
    image: '.book___image'
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



const favoriteBooks =[];

function initActions() {

  const elementOfList = document.querySelector(select.containerOf.list);

  elementOfList.addEventListener('dblclick', function (event) {
    event.preventDefault();

    elementOfList.classList.add('favorite');

    const dataId = document.querySelector(dataSource.books.id);

    const favoriteBooks = dataId;


  });




}
























