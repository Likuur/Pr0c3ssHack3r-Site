document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.button');

    let activeTabIndex = 0;
    let activeButtonIndex = -1;

    function showTab(index) {
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
                contents[i].classList.add('active');
                contents[i].hidden = false;
                // Устанавливаем фокус на первом элементе контента
                contents[i].querySelector('button')?.focus();
            } else {
                tab.classList.remove('active');
                contents[i].classList.remove('active');
                contents[i].hidden = true;
            }
        });
    }

    function showButton(index) {
        buttons.forEach((button, i) => {
            if (i === index) {
                button.classList.add('active');
                button.focus(); // Устанавливаем фокус на активную кнопку
            } else {
                button.classList.remove('active');
            }
        });
    }

    function updateTabIndex(newIndex) {
        activeTabIndex = newIndex;
        showTab(activeTabIndex);
        activeButtonIndex = -1; // При переключении на вкладки сбрасываем активную кнопку
    }

    function updateButtonIndex(newIndex) {
        activeButtonIndex = newIndex;
        showButton(activeButtonIndex);
    }

    // Инициализируем первую вкладку как активную
    showTab(activeTabIndex);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            if (activeButtonIndex !== -1) {
                // Переключение между кнопками
                activeButtonIndex = (activeButtonIndex + 1) % buttons.length;
                updateButtonIndex(activeButtonIndex);
            } else {
                // Переключение между вкладками
                activeTabIndex = (activeTabIndex + 1) % tabs.length;
                updateTabIndex(activeTabIndex);
            }
        } else if (event.key === 'ArrowLeft') {
            if (activeButtonIndex !== -1) {
                // Переключение между кнопками
                activeButtonIndex = (activeButtonIndex - 1 + buttons.length) % buttons.length;
                updateButtonIndex(activeButtonIndex);
            } else {
                // Переключение между вкладками
                activeTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
                updateTabIndex(activeTabIndex);
            }
        } else if (event.key === 'Enter') {
            if (activeButtonIndex !== -1) {
                // Нажатие на кнопку
                buttons[activeButtonIndex].click();
            }
        } else if (event.key === 'Tab') {
            // Переход к кнопкам
            if (activeButtonIndex === -1) {
                activeButtonIndex = 0;
                updateButtonIndex(activeButtonIndex);
            } else {
                activeButtonIndex = -1;
                buttons.forEach(button => button.classList.remove('active'));
            }
        }
    });

    // Save button functionality
    document.getElementById('save-btn').addEventListener('click', () => {
        alert('Changes Saved');
    });

    // Exit button functionality
    document.getElementById('exit-btn').addEventListener('click', () => {
        window.close();
    });

    // Save & Exit button functionality
    document.getElementById('save-exit-btn').addEventListener('click', () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
});
