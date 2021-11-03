/* eslint-disable class-methods-use-this */
import feedEngine from './FeedEngine';
import geolocation from './Geolocation';
import postTemplate from './PostTemplate';

export default class Feed {
  constructor(feed, tooltip) {
    this.feed = feed;
    this.tooltip = tooltip;
    this.feedContent = this.feed.querySelector('.feed__content');
    this.input = this.feed.querySelector('.feed__input');

    this.modal = document.querySelector('.modal__form');
    this.modalInput = this.modal.querySelector('.modal__input');
    this.modalCancel = this.modal.querySelector('.modal__close');
    this.modalOk = this.modal.querySelector('.modal__ok');

    this.onAdd = this.onAdd.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);

    this.input.addEventListener('keypress', this.onAdd);
    this.modalCancel.addEventListener('click', this.onCancel);
    this.modalOk.addEventListener('click', this.onOk);
  }

  init() {
    this.onAdd();
  }

  async onAdd(e) {
    if (e === undefined) return;

    // create post
    if (e.key === 'Enter') {
      // set location
      this.location = await this.coordinates();

      if (this.location === null) {
        this.showModal();
      } else {
        this.addPost();
      }
    }
  }

  async coordinates() {
    try {
      return await geolocation();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  showModal() {
    this.modal.classList.add('show');
  }

  onOk() {
    if (this.modalInput.value) {
      if (this.validateInput(this.modalInput.value)) {
        this.location = this.modalInput.value;
        this.addPost();
        this.onCancel();
      } else {
        this.tooltip.addTooltip('Неверный формат, должно быть: 51.50851, 0.12572');
      }
    } else {
      this.tooltip.addTooltip('Введите координаты');
    }
  }

  onCancel() {
    this.modal.classList.remove('show');
  }

  addPost() {
    // set the time
    const date = new Date();
    const day = [date.getDate(), date.getMonth(), date.getFullYear()].join('.');
    const time = [date.getHours(), ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes())].join(':');
    const created = `${day} ${time}`;
    // create post
    const post = feedEngine(postTemplate([created], [this.input.value], [this.location]));
    this.feedContent.appendChild(post);
    this.feedContent.insertBefore(post, this.feedContent.firstChild);
    this.input.value = '';
  }

  validateInput(value) {
    const templateRegExp = /^\[?([-+]?\d{1,2}[.]\d+),\s*([-+]?\d{1,3}[.]\d+)\]?$/gm;
    return templateRegExp.test(value);
  }
}
