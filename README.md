# Thirty Dollar Extension

## About
An extension that adds custom sound functionality to GDColon's Thirty Dollar Website.

## Usage
Once the extension is installed (instructions below), go to the [website](https://thirtydollar.website). You will see an "Add Sound" button at the bottom of the screen. Clicking it opens a popup. Fill out the required inputs, click submit, and you have your very own custom sound!

## Install
At the time of writing, the extension hasn't been added to any official browser extension stores.

However, you can still install the extension using the source files.
(You will have to do this every time you boot your browser)

### Chromium-based browsers
Works for Chrome, Edge, Opera, and Brave.
(You will have to do this every time you boot your browser)

1. Download the latest release ending in -chrome from the [releases page](https://github.com/aguywhosaguy/thirtyDollarExtension/releases/)
2. Unzip the contents of the file (using a program like 7-Zip or WinRAR) to a folder
3. Go to your browsers' extension page
4. Turn on "Developer Mode"
5. Click "Load Unpacked" then select the folder you unzipped to

### Firefox
1. Download the latest release ending in -firefox from the [releases page](https://github.com/aguywhosaguy/thirtyDollarExtension/releases/)
2. Unzip the contents of the file (using a program like 7-Zip or WinRAR) to a folder
3. Go to the debugging page ([about:debugging](about:debugging))
4. Click on "This Firefox"
5. Click "Load Temporary Add-on" and select any file in the folder you unzipped to

## Build
To build the extension, first run
```bash
npm install
```
or the equivalent command for your package manager.
Then, run the following command in your package manager depending on what you want to build:
```bash
# For Chromium-based browsers
npm run build
# For Firefox
npm run build:firefox
# For both
npm run buildall
```
From there, you can find the built files in the .output directory. Follow the instructions in the install section to install the extension.

Additionally, if you wish to generate zipped files, you can run the following commands:
```bash
# For Chromium-based browsers
npm run zip
# For Firefox
npm run zip:firefox
# For both
npm run zipall
```
These also generate zip files in the .output directory.

### Thanks
- To the Thirty Dollar Website Community, for being alive enough to give me a reason to remake this extension
- To GDColon, for making the Thirty Dollar Website
- To the WXT team, for making extensions fun to make
