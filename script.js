'use strict';

const carouselContent = document.querySelector('.carousel');
const btnLeft = document.querySelector('.btn--left');
const btnRight = document.querySelector('.btn--right');
const dots = document.querySelector('.dots');

const items = [...carouselContent.querySelectorAll('.item')];

let currentItem = 1;

const setupDots = function () {
  const markup = items.reduce(
    (acc, _, i) => acc + `<button class="dot" data-item="${i + 1}"></button>`,
    ''
  );

  dots.insertAdjacentHTML('beforeend', markup);
};

const activateDot = function (itemIndex) {
  document
    .querySelectorAll('.dot')
    .forEach((dot) => dot.classList.remove('dot--active'));

  document
    .querySelector(`.dot[data-item="${itemIndex}"]`)
    .classList.add('dot--active');
};

const selectItem = function (itemIndex) {
  items.forEach((item, i) => {
    item.style.transform = `translateX(${(i - (itemIndex - 1)) * 100}%)`;
  });

  activateDot(itemIndex);
};

setupDots();
selectItem(currentItem);

btnLeft.addEventListener('click', function () {
  if (currentItem === 1) currentItem = items.length;
  else currentItem--;

  selectItem(currentItem);
});

btnRight.addEventListener('click', function () {
  if (currentItem === items.length) currentItem = 1;
  else currentItem++;

  selectItem(currentItem);
});

dots.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dot')) return;

  selectItem(e.target.dataset.item);
});
