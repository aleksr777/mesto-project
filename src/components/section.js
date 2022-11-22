export default class Section {
  // Первым параметром конструктор принимает объект с двумя свойствами: items и renderer, второй параметр — селектор контейнера
  constructor(renderer, cardsBlock, userId) {
    this._userId = userId;
    this._renderer = renderer;
    this._cardsBlockNode = cardsBlock;
  }

 // Отрисовываем новую карточку
  renderItem(cardData, userId) {
    this.addItem(this._renderer(cardData, userId));
  }

  // Отрисовываем карточки при загрузке страницы
  renderInitialItems(cardsData, userId) {
    cardsData.forEach(item => this.renderItem(item, userId));
  }
  // Принимаем DOM-элемент и добавляем его в контейнер
  addItem(element) {
    this._cardsBlockNode.prepend(element);
  }
}