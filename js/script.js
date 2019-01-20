(function(){

// Локальное хранилище

    var isStorageSupport = true;
    var storage = '';
    try {
        storage = localStorage.getItem('login');
        if (storage.length > 0) {
            document.signinform.email.value = storage; // Вставляем логин в поле
        }
    } catch (err) {
        isStorageSupport = false;
    }

// События

    document.querySelector('.search').addEventListener('click', toggle_form_search); // Показ/скрытие формы поиска
    document.querySelector('.search').addEventListener('mouseover', form_search_focus); // Фокус в форме поиска при наведении на кнопку

    document.querySelector('.sign-in-link').addEventListener('click', toggle_form_signin); // Показ/скрытие формы входа
    document.querySelector('.sign-in-link').addEventListener('mouseover', form_signin_focus); // Фокус в форме входа при наведении на кнопку
    document.signinform.addEventListener('submit', form_signin_submit); // Отправка формы входа

    document.querySelector('.feedback-button').addEventListener('click', show_form_feedback); // Показ формы обратной связи
    document.querySelector('.feedback-modal .modal-close').addEventListener('click', hide_form_feedback); // Закрытие формы обратной связи

    window.addEventListener('keydown', close_form_esc); // Закрытие форм по кнопке Escape


// Функции

    // Закрытие форм по кнопке Escape
    function close_form_esc(event)
    {
        var e = event || window.event;

        if (e.keyCode === 27) {
            var modal = document.getElementsByClassName('modal-show');

            for (var i = 0; i < modal.length; i++) {
                console.log(i);
                if (modal[i].classList.contains('modal-show')) {
                    modal[i].classList.remove('modal-show');
                    modal[i].classList.remove('modal-error');
                    modal[i].classList.remove('shake');
                }
            }
        }
    }

    // Показ/скрытие формы поиска
    function toggle_form_search()
    {
        // Скрываем форму входа
        var modal = document.querySelector('.sign-in-modal');
        if (modal.classList.contains('modal-show')) {
            modal.classList.remove('modal-show');
        }

        // Переключаем класс modal-show
        var modal = document.querySelector('.search-modal');
        if (modal.classList.contains('modal-show')) {
            modal.classList.remove('modal-show');
        } else {
            modal.classList.add('modal-show');
        }
    }

    // Фокус в форме поиска
    function form_search_focus()
    {
        // Интервал
        search_visible_interval = setInterval(function(){
            // Если появилось окно
            var modal = document.querySelector('.search-modal');
            if (modal.offsetWidth > 0 || modal.offsetHeight > 0) {
                document.searchform.search.focus(); // Устанавливаем фокус
                clearInterval(search_visible_interval); // Удаляем интервал
            }
        }, 0);
    }

    // Показ/скрытие формы входа
    function toggle_form_signin()
    {
        // Скрываем форму поиска
        var modal = document.querySelector('.search-modal');
        if (modal.classList.contains('modal-show')) {
            modal.classList.remove('modal-show');
        }

        // Переключаем класс modal-show
        var modal = document.querySelector('.sign-in-modal');
        if (modal.classList.contains('modal-show')) {
            modal.classList.remove('modal-show');
        } else {
            modal.classList.add('modal-show');
        }
    }

    // Фокус в форме входа
    function form_signin_focus()
    {
        // Интервал
        login_visible_interval = setInterval(function(){
            // Если появилось окно
            var modal = document.querySelector('.sign-in-modal');
            if (modal.offsetWidth > 0 || modal.offsetHeight > 0) {
                // Если в локальном хранилище есть логин
                if (storage && storage.length > 0) {
                    document.signinform.password.focus(); // Устанавливаем фокус на пароль
                // Иначе
                } else {
                    document.signinform.email.focus(); // Устанавливаем фокус на логин
                }

                clearInterval(login_visible_interval); // Удаляем интервал
            }
        }, 0);
    }

    // Отправка формы входа
    function form_signin_submit(event)
    {
        var e = event || window.event;
        e.preventDefault();

        var modal = document.querySelector('.sign-in-modal');

        if (document.signinform.email.value.length == 0 || document.signinform.password.value.length == 0) {
            modal.classList.add('modal-error');

            // Трясем форму
            modal.classList.add('shake');
            setTimeout(function(){
                modal.classList.remove('shake');
            }, 200);
        } else {
            if (isStorageSupport) {
                localStorage.setItem('login', document.signinform.email.value);
            }

            modal.classList.remove('shake');
            modal.classList.remove('modal-error');
            modal.classList.remove('modal-show');
        }
    }

    // Показ/скрытие формы обратной связи
    function show_form_feedback()
    {
        var e = event || window.event;
        e.preventDefault();

        document.querySelector('.feedback-modal-wrapper').classList.add('modal-show');
    }

    // Закрытие формы обратной связи
    function hide_form_feedback()
    {
        var e = event || window.event;
        e.preventDefault();

        document.querySelector('.feedback-modal-wrapper').classList.remove('modal-show');
    }

})();
