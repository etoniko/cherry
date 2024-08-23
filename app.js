let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
let isAutoPlay = false; // Добавлена переменная для отслеживания автопрокрутки

// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
    if (!isAutoPlay) { // Запускаем автопрокрутку только если она была выключена
        refreshInterval = setInterval(() => {
            next.click();
        }, 5000);
        isAutoPlay = true;
    }
}

//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
    if (!isAutoPlay) { // Запускаем автопрокрутку только если она была выключена
        refreshInterval = setInterval(() => {
            next.click();
        }, 5000);
        isAutoPlay = true;
    }
}

// auto run slider
let refreshInterval;

function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    isAutoPlay = false; // Отключаем автопрокрутку после ручного переключения
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
        clearInterval(refreshInterval); // Отключаем автопрокрутку при клике на миниатюру
        isAutoPlay = false; // Отключаем автопрокрутку после ручного переключения
    })
})

// Вызываем функцию для запуска автопрокрутки при загрузке страницы
window.onload = function() {
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
  isAutoPlay = true;
}