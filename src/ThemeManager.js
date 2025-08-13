export default class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark']
    this.themeIndex = 1
    this.storageKey = 'app-theme'
    this.themeBtn = document.querySelector('.theme-toggle')
    this.init()
  }

  init() {
    const storedTheme = localStorage.getItem(this.storageKey)
    if (storedTheme) {
      this.setTheme(this.themes.indexOf(storedTheme))
    } else {
      this.setTheme(0)
    }
    this.themeBtn.addEventListener('click', () => this.toggleTheme())
  }

  setTheme(index) {
    const theme = this.themes[index]
    this.themeIndex = index
    localStorage.setItem(this.storageKey, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  toggleTheme() {
    this.setTheme((this.themeIndex + 1) % this.themes.length)
  }
}
