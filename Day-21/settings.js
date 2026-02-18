export function saveSettings(settings) {
  localStorage.setItem("userSettings", JSON.stringify(settings));
}

export function loadSettings() {
  const data = localStorage.getItem("userSettings");
  return data ? JSON.parse(data) : { theme: "light", language: "en" };
}
