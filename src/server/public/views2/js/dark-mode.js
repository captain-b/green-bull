// dark-mode media query matched or not
const matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
const body = document.body;
const checkBox = document.getElementById('dark-mode-check-box');

const toggleDarkMode = (checked) => {
    body.classList.toggle("dark-mode");
    checkBox.checked = checked;
}

if(matched) {
    toggleDarkMode(matched);
}

checkBox.onclick = () => {
    toggleDarkMode(checkBox.checked);
}