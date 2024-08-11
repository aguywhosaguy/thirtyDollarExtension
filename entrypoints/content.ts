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
  },
});
