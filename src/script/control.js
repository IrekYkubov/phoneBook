import createElements from './createElements';
import serviceStorage from './serviceStorage';
import {renderContacts} from './render';

const {createRow} = createElements;
const {
  getStorage,
  setStorage,
  removeStorage,
} = serviceStorage;

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};
const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };
  btnAdd.addEventListener('click', openModal);
  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    }
  });
  return {
    closeModal,
  };
};
const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const delNumber =
      target.closest('.contact').querySelector('a').textContent;
      removeStorage(delNumber);
      target.closest('.contact').remove();
    }
  });
};

const addContactPage = (contact, list) => {
  renderContacts(list, contact);
};
const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);
    const listData = getStorage('contact');
    if (listData !== []) {
      const contact = document.querySelectorAll('.contact');
      contact.forEach(element => {
        element.remove();
      });
    }
    listData.push(newContact);
    setStorage('contact', JSON.stringify(listData));
    addContactPage(getStorage('contact'), list);
    form.reset();
    closeModal();
  });
};

export default {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
};
