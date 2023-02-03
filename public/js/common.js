document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');
    let uri = window.location.pathname.toString();

    let link = document.querySelector(`.menu-link[href^='${uri}']`);
    if (link) {
        link.classList.add('active');
    }

    let menuBtnToggle = document.querySelector('.menu-toggle');
    menuBtnToggle.addEventListener('click', function () {
        body.classList.toggle('menu-open');
    });
});
