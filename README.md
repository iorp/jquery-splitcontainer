# SplitContainer jQuery Plugin

The SplitContainer jQuery plugin allows you to create infinitely splittable container elements, making it easy to design flexible layouts.

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