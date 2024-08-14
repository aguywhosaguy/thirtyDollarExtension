export const fileListener = (e: Event) => {
    const fileInput = e.target
    if (fileInput.files && fileInput.files.length > 0) {
    // Get the name of the selected file
    const fileName = fileInput.files[0].name;
    // Update the <p> tag with the selected file name
    const fileNameDisplay = fileInput.nextElementSibling
    fileNameDisplay.textContent = fileName;
  } else {
    // Reset the <p> tag if no file is selected
    fileNameDisplay.textContent = 'No file selected';
  }
}

export const convertName = (name: string) => {return 'cs-' + name.toLowerCase().replace('/\s/g', '-')}

export const validateForm = (data: FormData) => {
    if (!data.get("soundName") || !data.get("iconInput") || !data.get("audioInput")) {
        return false
    }

    return true
}
