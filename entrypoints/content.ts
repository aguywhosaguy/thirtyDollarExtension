export default defineContentScript({
  matches: ['*://*.thirtydollar.website/*'],
  async main() {
    const button = await (await fetch(browser.runtime.getURL('/button.html'))).text();
    const div = document.getElementById('main')?.children[9]
    div?.insertAdjacentHTML('afterbegin', button)
  },
});
