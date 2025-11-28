// Sotér vedhæftede filer
window.onload = function() {
    console.log('sorter vedhæftede filer');
  if (!document.querySelector('ul.attachments')) return;
  document.querySelector('ul.attachments').setAttribute('id', 'sortMe');
  function sortList(list) {
    const mylist = list;
    const listitems = Array.from(mylist.getElementsByTagName("li"));
    listitems.sort((a, b) => {
      const compA = a.textContent.toUpperCase();
      const compB = b.textContent.toUpperCase();
      return (compA < compB) ? -1 : 1;
    });
    listitems.forEach(itm => {
      mylist.appendChild(itm);
    });
  }

  sortList(document.querySelector("ul#sortMe"));
};