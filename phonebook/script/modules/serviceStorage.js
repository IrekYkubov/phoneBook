const getStorage = (key) => {
  const localItems = localStorage.getItem(key);
  if (localItems === '') {
    return [];
  }
  return JSON.parse(localItems);
};
const setStorage = (key, contObj) => {
  localStorage.setItem(key, contObj);
};

const removeStorage = (nubmberDel) => {
  const allItem = getStorage('contact');
  const delItem = allItem.filter(arrItem => arrItem.phone !== nubmberDel);
  setStorage('contact', JSON.stringify(delItem));
};
export default {
  getStorage,
  setStorage,
  removeStorage,
};
