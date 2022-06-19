import control from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import serviceStorage from './modules/serviceStorage.js';
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = control;

const {getStorage} = serviceStorage;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);
    const allRow = renderContacts(list, getStorage('contact'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    // Сортировка по имени
    const SortArrayName = (x, y) => x.name.localeCompare(y.name);
    // Шапка таблицы, пункт "имя"
    const nameHeadTab = document.querySelector('.name');
    // клик по пункту "имя"
    nameHeadTab.addEventListener('click', () => {
      // получаем все контакты
      const contact = document.querySelectorAll('.contact');
      // удаляем не сортированый список
      contact.forEach(element => {
        element.remove();
      });
      // сортируем список и рендерим его
      renderContacts(list, getStorage('contact').sort(SortArrayName));
    });
    // Сортировка по фамилии
    const SortArraySur = (x, y) => x.surname.localeCompare(y.surname);
    // Шапка таблицы, пункт "Фамилия"
    const surnameTab = document.querySelector('.surname');
    // клик по пункту "Фамилия"
    surnameTab.addEventListener('click', () => {
      // получаем все контакты
      const contact = document.querySelectorAll('.contact');
      // удаляем не сортированый список
      contact.forEach(element => {
        element.remove();
      });
      // сортируем список и рендерим его
      renderContacts(list, getStorage('contact').sort(SortArraySur));
    });
  };
  window.phoneBookInit = init;
}
