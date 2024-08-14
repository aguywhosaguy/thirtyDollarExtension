import '~/assets/css/inject.css'

import * as tools from '~/assets/tools.ts'

type Sound = {
    name: string;
    audio: string;
    image: string;
    source: string;
    tag: "tag_percussion" | "tag_note";
}

export default defineContentScript({
    matches: ['*://*.thirtydollar.website/*'],
    async main() {
    // init

        const autoSave = true
        const button = await (await fetch(browser.runtime.getURL('/button.html'))).text();
        const popup = await (await fetch(browser.runtime.getURL('/menu.html'))).text();

    // compatability with thirty dollar rewrite
        const buttonDiv = document.getElementById('main')?.children[document.getElementById('sideboxes') ? 9 : 10]
        const popupDiv = document.getElementById('everything')

        buttonDiv?.insertAdjacentHTML('afterbegin', button)
        popupDiv?.insertAdjacentHTML('beforeend', popup)

    // hook
        const hoverText = document.getElementById('soundHelp')    
        
        const audioText = document.getElementById('audioFileName')
        const iconText = document.getElementById('iconFileName')

        const iconInput = document.getElementById('iconInput')
        const audioInput = document.getElementById('audioInput')

        const form = document.getElementById('fileForm') as HTMLFormElement
        const submitButton = document.getElementById('subButton')

        iconInput.addEventListener('change', tools.fileListener)
        audioInput.addEventListener('change', tools.fileListener)

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

        const addSound = (sound: Sound) => {
            const audioDiv = document.createElement('div')
            audioDiv.className = "sound"
            audioDiv.setAttribute('soundname', sound.name)
            audioDiv.setAttribute('soundorigin', sound.source)
            audioDiv.setAttribute(sound.tag, '')
            audioDiv.setAttribute('str', tools.convertName(sound.name))
            audioDiv.setAttribute('sound', sound.audio) 
            const image = document.createElement('img')
            image.src = sound.image
            image.alt = sound.name
            audioDiv.appendChild(image)
            document.getElementById('icons').appendChild(audioDiv)
            notify('Successfully added sound ' + sound.name + '!', 3, "#00ff00")
        }

        const convertSound = (name: string, audio: File, image: File, source: string, tag: string) => {
            const fr = new FileReader()

            fr.onload = function(event) {
                const audioURL = fr.result as string

                fr.onload = function(event) {
                    const imageURL = fr.result as string
                    const data: Sound = {name: name, audio: audioURL, image: imageURL, source: source, tag: tag}
                    addSound(data)
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

        form.addEventListener('submit', async (event: Event) => {
            event.preventDefault()

            
            if (event.submitter.id != "subButton") {
                return
            }

            const data = new FormData(event.target)
            if (document.querySelectorAll('[str="' + tools.convertName(data.get('soundName')) + '"]').length) {
                notify("Sound name is taken!", 3, "#ff0000")
                return
            }

            if (!tools.validateForm(data)) {
                notify("Options with asterisks must be filled out!", 3, "#ff0000")
                return
            }

            convertSound(data.get("soundName"), data.get("audioInput"), data.get("iconInput"), data.get("soundSource"), data.get("audioType"))
        })
    }
});
