const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    list: '.books-list',
  },
};

const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};


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

render();
