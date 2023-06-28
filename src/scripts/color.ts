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

export function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}