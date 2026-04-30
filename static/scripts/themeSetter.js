function setTheme(theme) {
  if (typeof theme !== "string" || !theme.trim()) return;

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
