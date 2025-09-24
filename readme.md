# Customsheet

<video src='https://github.com/jsr-p/customsheet/assets/49307119/a993a491-3063-4e20-ae7b-a4743c005e9f' width=180/>
</video>

## Firefox

### Temporary

- clone this repository
- go to `about:debugging#/runtime/this-firefox`
- click on `Load Temporary Add-on...`
- insert path to [manifest.json](manifest.json)

### Permanent

- [add-on signing](https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox)

### Usage

- Press `Ctrl+Shift+F` to toggle custom sheet

## Extension

- Add sheet inside [sheets/](sheets/)
- Add if statement inside function [`getStyleSheet`](background.js)
