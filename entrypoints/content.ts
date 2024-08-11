import './inject.css'

export default defineContentScript({
  matches: ['*://*.thirtydollar.website/*'],
  async main() {
    // init
    const button = await (await fetch(browser.runtime.getURL('/button.html'))).text();
    const popup = await (await fetch(browser.runtime.getURL('/popup.html'))).text();

    const buttonDiv = document.getElementById('main')?.children[9]
    const popupDiv = document.getElementById('everything')

    buttonDiv?.insertAdjacentHTML('afterbegin', button)
    popupDiv?.insertAdjacentHTML('beforeend', popup)

    // hook
    const audioText = document.getElementById('audioFileName')
    const iconText = document.getElementById('iconFileName')

    const iconInput = document.getElementById('iconInput')
    const audioInput = document.getElementById('audioInput')

    const listener = (e: Event) => {
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

    iconInput.addEventListener('change', listener)
    audioInput.addEventListener('change', listener)

    const form = document.getElementById('fileForm') as HTMLFormElement
    form.addEventListener('submit', function(event: Event) {
        event.preventDefault()

        console.log(new FormData(form))
    })
  },
});
