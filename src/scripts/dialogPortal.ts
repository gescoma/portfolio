import "../../public/styles/dialog.css"

export function openDialog(element: HTMLElement) {
  if (isDialogOpen()) throw new Error("Dialog is already open")
  document.querySelector("body")?.style.setProperty("overflow", "hidden")
  const dialog = createDialogPortal()
  if (!dialog) throw new Error("Dialog portal not created")
  dialog.classList.add("dialog-portal--open")
  
  // add element to dialog__body
  addBodyToDialogPortal(element, dialog)

  // add close event listener
  generateEventListeners(dialog)
}


export function closeDialog() {
  if (!isDialogOpen()) throw new Error("Dialog is not open")
  document.querySelector("body")?.style.removeProperty("overflow")
  const dialog = getDialogPortal()
  dialog.classList.remove("dialog-portal--open")
  deleteDialogPortal()

  // remove close event listener
  removeEventListeners()
}

/* UTILITY FUNCTIONS */

function isDialogOpen() {
  const dialog = document.querySelector(".dialog-portal")
  if (!dialog) return false
  return dialog.classList.contains("dialog-portal--open")
}

function getDialogPortal() {
  const dialog = document.querySelector(".dialog-portal")
  if (!dialog) throw new Error("Dialog portal not found")
  return dialog
}

function getCloseButton() {
  const close = document.querySelector(".dialog__close")
  if (!close) throw new Error("Dialog close button not found")
  return close
}

function getOverlay() {
  const overlay = document.querySelector(".dialog-portal__overlay")
  if (!overlay) throw new Error("Dialog overlay not found")
  return overlay
}

function getBody(element: HTMLElement) {
  const dialog__body__content = element.querySelector(".dialog__body > div")
  if (!dialog__body__content) throw new Error("Dialog body not found")
  return dialog__body__content.cloneNode(true)
}

function addBodyToDialogPortal(element: HTMLElement, dialog: HTMLElement) {
  const dialog__body = dialog.querySelector(".dialog-portal__body")
  if (!dialog__body) throw new Error("Dialog body not found")
  const body = getBody(element)
  dialog__body.appendChild(body)
}

/* EVENT LISTENER FUNCTIONS */

function generateEventListeners(dialog: HTMLElement) {
  const dialog__overlay = getOverlay()
  const dialog__close = getCloseButton()
  
  dialog__overlay.addEventListener("click", overlayClickEventListener, false)
  dialog__close.addEventListener("click", closeDialog, false)
  document.addEventListener('keydown', keydownEventListener, false);
}

function removeEventListeners() {
  const dialog__overlay = getOverlay()
  const dialog__close = getCloseButton()

  dialog__close.removeEventListener("click", closeDialog, false)
  dialog__overlay.removeEventListener("click", overlayClickEventListener, false)
  document.removeEventListener('keydown', keydownEventListener, true)
}

// event listener for keydown
function keydownEventListener (event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDialog()
  }
}

function overlayClickEventListener(event: Event) {
  closeDialog()
}


/* DIALOG PORTAL FUNCTIONS */

// create dialog portal
function createDialogPortal() {
  const body = document.querySelector("body")
  if (!body) return
  const dialog = document.createElement("div")
  dialog.classList.add("dialog-portal")
  dialog.setAttribute("tabindex", "-1")
  const dialog__overlay = document.createElement("div")
  dialog__overlay.classList.add("dialog-portal__overlay")
  dialog.appendChild(dialog__overlay)
  const dialog__body = document.createElement("div")
  dialog__body.classList.add("dialog-portal__body")
  dialog.appendChild(dialog__body)
  body.appendChild(dialog)
  return dialog
}

// delete dialog portal
function deleteDialogPortal() {
  const dialog = getDialogPortal()
  dialog.classList.add("dialog-portal--close")
  setTimeout(() => {
    dialog.remove()
  }, 250)
}