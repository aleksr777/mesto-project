export default class Section {
  // Первым параметром конструктор принимает объект с двумя свойствами: items и renderer, второй параметр — селектор контейнера
  constructor(renderer, cardsBlock, splashScreen) {
    this._renderer = renderer;
    this._cardsBlockNode = cardsBlock;
    this._splashScreen = splashScreen;
  }

 // Отрисовываем карточку
  renderItem(cardData, profileId) {
    this.addItem(this._renderer(cardData, profileId, this._splashScreen));
  }

  // Отрисовываем карточки при загрузке страницы
  renderInitialItems(cardsData, profileId) {
    cardsData.forEach(item => this.renderItem(item, profileId));
  }
  // Принимаем DOM-элемент и добавляем его в контейнер
  addItem(element) {
    this._cardsBlockNode.prepend(element);
  }
}