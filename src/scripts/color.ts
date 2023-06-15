const white = "#fff"
const black = "#000"

export function getContrastColor(color: string) {
  const hexColor = color.replace("#", "")
  const red = parseInt(hexColor.substr(0, 2), 16)
  const green = parseInt(hexColor.substr(2, 2), 16)
  const blue = parseInt(hexColor.substr(4, 2), 16)
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255

  if (luminance > 0.5) {
    return black // Color de texto para fondos claros
  } else {
    return white // Color de texto para fondos oscuros
  }
}