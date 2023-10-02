 

# SplitContainer Plugin

The SplitContainer plugin is a JavaScript library that allows you to create a split container with resizable panels in either row or column mode. It provides various functions and methods for manipulating and interacting with the panels within the container. This readme.md file will explain the functions and methods provided by the plugin and provide examples of how to use them.

## Table of Contents
- [Features](#features)
- [Usage](#usage)
- [Plugin Functions](#plugin-functions)
  - [`panels(selector, findDescendants)`](#panels-selector-findDescendants)
  - [`updatePanels()`](#updatepanels)
  - [`updateControls()`](#updatecontrols)
  - [`initializeEvents()`](#initializeevents)
- [Example Usage](#example-usage)

---

## Features

- Split container elements horizontally (row mode) or vertically (column mode).
- Dynamically add, remove, hide, and show panels within the container.
- Lock or unlock panels to maintain their sizes when resizing.
- Customizable separator styles.
- Event triggers for panel interactions.
- Easy-to-use jQuery plugin.

## Usage

1. Include jQuery and the SplitContainer plugin in your HTML:
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="splitcontainer.js"></script>
```
2.Create an HTML container element:
```html 
<div id="myContainer"></div>
```
3.Initialize the SplitContainer plugin on your container element:
 ```javascript 
 $(document).ready(function() {
    //...
    $('#myContainer').SplitContainer({
        mode: 'row', // or 'column'
        separator: {
            style: 'background-color: black; min-width: 6px; min-height: 6px',
        },
        on: {
            // Define event handlers here (e.g., clickpanel).
        },
        panels: [
            // Define initial panels here (as objects).
        ],
    });
});
```

## Plugin Functions

### `panels(selector='', findDescendants=true)`

This function allows you to interact with and manipulate the panels within the SplitContainer. It returns an object with various methods to control the panels. The `selector` parameter is optional and can be used to filter the panels by index or jQuery selector. The `findDescendants` parameter, also optional, specifies whether to search for panels among descendants or immediate children of the container.

- `hide()`: Hides the selected panels.

- `show()`: Shows the selected panels.

- `lock()`: Locks the selected panels' size and prevents resizing.

- `unlock()`: Unlocks the selected panels, allowing resizing.

- `append(elements)`: Appends new panels to the container.

- `prepend(elements)`: Prepends new panels to the container.

- `remove(el)`: Removes the selected panels.

### `updatePanels()`

This function updates the panels within the SplitContainer. It compensates for any size discrepancies between panels and ensures they fill the available space correctly.

### `updateControls()`

This function initializes mouse events for resizing panels within the SplitContainer. It allows users to drag separators to resize panels.

### `initializeEvents()`

This function initializes custom events for the SplitContainer, such as `addpanel`, `removepanel`, `showpanel`, `hidepanel`, `lockpanel`, `unlockpanel`, and `clickpanel`. These events can be used for custom actions or event handling when panels are added, removed, shown, hidden, locked, unlocked, or clicked.

## Example Usage

```javascript
// Initialize the SplitContainer plugin on an element with id "e0"
$("#e0").SplitContainer({
    mode: 'row',  // or 'column'
    panels: [
        { style: 'background-color:red;', html: 'A' },
        { style: 'width:40%;background-color:green;', html: 'B' },
        { style: 'background-color:blue;', html: 'C' },
        { locked: true, style: 'width:10%;background-color:yellow;', html: 'D' }
    ],
    on: {
        addpanel: (e) => { console.log(e) },
        removepanel: (e) => { console.log(e) },
        showpanel: (e) => { console.log(e) },
        hidepanel: (e) => { console.log(e) },
        lockpanel: (e) => { console.log(e) },
        unlockpanel: (e) => { console.log(e) },
        clickpanel: (e) => {
            let index = $(e.target).parent().children('.scontainer-panel').index(e.target);
            console.log('Clicked panel index:', index);
            $('#e0panelSelector').val(index);
        }
    }
});

// Example usage of plugin functions (starting with 'target.data')
const target = $("#e0");

$('<button>', {
    text: 'append',
    click: () => {
        target.data('fn.SplitContainer').panels().append({
            style: 'background-color:green',
            html: 'Panel ' + target.data('fn.SplitContainer').panels().selected.length
        });
    }
});

// Other buttons with similar click functions for 'prepend', 'remove', 'hide', 'show', 'lock', 'unlock', 'lock all', 'unlock all'
