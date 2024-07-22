document.addEventListener('DOMContentLoaded', () => {
    let currentTab = 0;
    const tabs = document.querySelectorAll('a.tab');
    const contents = document.querySelectorAll('.tab-content');
    const bootScreen = document.getElementById('boot-screen');
    const biosContainer = document.getElementById('bios-container');
    let currentSaveExitOption = 0;
    const saveExitOptions = document.querySelectorAll('.save-exit-option');

    function showTab(index) {
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
        contents.forEach((content, i) => {
            content.classList.toggle('active', i === index);
        });
    }
    showTab(currentTab);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            currentTab = (currentTab + 1) % tabs.length;
            showTab(currentTab);
        } else if (event.key === 'ArrowLeft') {
            currentTab = (currentTab - 1 + tabs.length) % tabs.length;
            showTab(currentTab);
        } else if (event.key === 'F8' || event.key === 'Delete') {
            bootScreen.classList.add('hidden');
            biosContainer.classList.remove('hidden');
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            if (contents[currentTab].id === 'content-save-exit') {
                saveExitOptions[currentSaveExitOption].classList.remove('active');
                if (event.key === 'ArrowUp') {
                    currentSaveExitOption = (currentSaveExitOption - 1 + saveExitOptions.length) % saveExitOptions.length;
                } else {
                    currentSaveExitOption = (currentSaveExitOption + 1) % saveExitOptions.length;
                }
                saveExitOptions[currentSaveExitOption].classList.add('active');
            }
        } else if (event.key === 'Enter') {
            if (contents[currentTab].id === 'content-save-exit') {
                const selectedOption = saveExitOptions[currentSaveExitOption];
                if (selectedOption.dataset.action === 'save') {
                    alert('Сохранение настроек...');
                } else if (selectedOption.dataset.action === 'exit') {
                    window.close();
                }
            }
        }
    });
});
