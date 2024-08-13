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
        const hoverText = document.getElementById('soundHelp')    
        
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

        const notify = async (msg: string, length: number, color: string) => {
            hoverText.style.opacity = 1
            hoverText.textContent = msg
            hoverText.style.color = color
            setTimeout(function() {
                hoverText.style.opacity = 0.5
                hoverText.textContent = "(an asterisk means the option is required)" 
                hoverText.style.color = "#ffffff"
            }, length*1000)
        }

        const addSound = (name: string, audio: File, image: File, source: string, type: string) => {
            const fr = new FileReader()

            fr.onload = function(event) {
                const audioURL = fr.result as string

                fr.onload = function(event) {
                    const imageURL = fr.result as string
                    const audioDiv = document.createElement('div')
                    audioDiv.className = "sound"
                    audioDiv.setAttribute('soundname', name)
                    audioDiv.setAttribute('soundorigin', source)
                    audioDiv.setAttribute(type, '')
                    audioDiv.setAttribute('str', name) 
                    audioDiv.setAttribute('sound', audioURL) 
                    const image = document.createElement('img')
                    image.src = imageURL
                    image.alt = name
                    audioDiv.appendChild(image)
                    document.getElementById('icons').appendChild(audioDiv)
                    notify('Successfully added sound ' + name + '!', 3, "#00ff00")
               }

                fr.onerror = function(event) {
                    notify('Failed to load image file!', 5, "#ff0000")
                    console.log(event)
                }

                fr.readAsDataURL(image)
            }

            fr.onerror = function(event) {
                notify('Failed to load audio file!', 5, "#ff0000")
                console.log(event)
            }

            fr.readAsDataURL(audio)
        }

        iconInput.addEventListener('change', listener)
        audioInput.addEventListener('change', listener)

        const form = document.getElementById('fileForm') as HTMLFormElement
        const submitButton = document.getElementById('subButton')

        const validateForm = (data: FormData) => {
            if (!data.get("soundName") || !data.get("iconInput") || !data.get("audioInput")) {
                return false
            }

            return true
        }

        form.addEventListener('submit', async function(event: Event) {
            event.preventDefault()

            if (event.submitter.id != "subButton") {
                return
            }

            const data = new FormData(event.target)
            if (!validateForm(data)) {
                notify("Options with asterisks must be filled out!", 3, "#ff0000")
                return
            }

            addSound(data.get("soundName"), data.get("audioInput"), data.get("iconInput"), data.get("soundSource"), data.get("audioType"))
        })
    }
});
