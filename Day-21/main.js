import { saveSettings, loadSettings } from './settings.js';

const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');

let settings = loadSettings();
applySettings();

function applySettings() {
  document.body.className = settings.theme;
  languageSelect.value = settings.language;
}

themeToggle.addEventListener('click', () => {
  settings.theme = settings.theme === 'light' ? 'dark' : 'light';
  saveSettings(settings);
  applySettings();
});

languageSelect.addEventListener('change', (e) => {
  settings.language = e.target.value;
  saveSettings(settings);
  applySettings();
});
