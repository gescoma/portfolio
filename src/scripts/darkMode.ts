  const btn = document.querySelector("#dark-mode__button") as HTMLButtonElement 
  const time = 100
  const localStorageName = "theme"
  const THEME = {
    DARK: "theme-dark",
    LIGHT: "theme-light",
  }
  const ANIMATION = {
    IN: "animate-in__right",
    OUT: "animate-out__right",
  }
  const ICON_CLASS = {
    DARK: ".dark",
    LIGHT: ".light",
  }
  const MATCH_MEDIA = "(prefers-color-scheme: dark)"



  function setTheme(themeName: string) {
    const currentTheme = localStorage.getItem(localStorageName)
    if (!currentTheme) {
      localStorage.setItem(localStorageName, themeName)
      document.documentElement.className = themeName
      btn.dataset.theme = themeName
      return
    }
    addAnimation(btn, ANIMATION.OUT, themeName)
    setTimeout(() => {
      document.documentElement.className = themeName
    }, time/2)
    setTimeout(() => {
      localStorage.setItem(localStorageName, themeName)
      btn.dataset.theme = themeName
      removeAnimation(btn, ANIMATION.OUT, currentTheme)
    }, time)
  }

  function addAnimation(
    btn: HTMLButtonElement,
    className: string,
    currentTheme?: string
  ) {
    btn
      ?.querySelector(currentTheme === THEME.DARK ? ICON_CLASS.DARK : ICON_CLASS.LIGHT)
      ?.classList.add(className)
  }

  function removeAnimation(
    btn: HTMLButtonElement,
    className: string,
    currentTheme?: string
  ) {
    btn
      ?.querySelector(currentTheme === THEME.DARK ? ".light" : ".dark")
      ?.classList.remove(className)
  }

  function toggleTheme() {
    if (localStorage.getItem(localStorageName) === THEME.DARK) {
      setTheme(THEME.LIGHT)
    } else {
      setTheme(THEME.DARK)
    }
  }

  ;(() => {
    const theme = localStorage.getItem(localStorageName)
    if (theme === THEME.DARK || theme === THEME.LIGHT) {
      setTheme(theme)
    } else {
      const preferedTheme = window.matchMedia(MATCH_MEDIA)
        .matches
        ? THEME.DARK
        : THEME.LIGHT
      setTheme(preferedTheme)
    }
  })()

  window
    .matchMedia(MATCH_MEDIA)
    .addEventListener("change", ({ matches }) => {
      const theme = matches ? THEME.DARK : THEME.LIGHT
      const currentTheme = localStorage.getItem(localStorageName)
      if (currentTheme === theme) return
      toggleTheme()
    })

  btn &&
    btn.addEventListener("click", () => {
      toggleTheme()
    })