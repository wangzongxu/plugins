var book = require('./book.vue')
book.install = function (Vue) {
  Vue.component(book.name, book)
}
module.exports = book
