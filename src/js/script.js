
const select = {
  templateOf:{
    book: '#template-book',
  }
};

const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

