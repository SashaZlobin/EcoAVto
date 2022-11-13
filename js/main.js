window.addEventListener('DOMContentLoaded', () => {
    //TABS//
    const tabs = document.querySelectorAll('.services__box'),
        tabsContent = document.querySelectorAll('.services__about'),
        tabsParent = document.querySelectorAll('.services__boxs');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('services__box_active');
        });
    }

    function showContentTab(i = 0) {
        tabsContent[i].classList.remove('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('services__box_active');
    }

    hideTabContent();
    showContentTab();

    tabsParent.forEach(elem => {
        elem.addEventListener('click', (event) => {
            let target = event.target;
            if (target && target.classList.contains('services__box')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showContentTab(i);
                    }
                });
            }
        });
    });

    //ANIMATIONS
    const animAtimes = document.querySelectorAll('._anim-items');

    if (animAtimes.length > 0) {
        function animOnSroll(params) {
            window.addEventListener('scroll', animOnSroll);
            for (let index = 0; index < animAtimes.length; index++) {
                const animItem = animAtimes[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animAtimePoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animAtimePoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animAtimePoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }

                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }

        setTimeout(() => {
            animOnSroll();
        },);

    }

    //ANIMATIONS

    //POPUP

    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');

    let unlock = true;

    const timeout = 800;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener('click', function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }


    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });


    const swiper = new Swiper('.swiper', {
        // Optional parameters
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

});

$('[data-fancybox="gallery"]').fancybox({
    // Options will go here

    frameWidth: 50,

});



