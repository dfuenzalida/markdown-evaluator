# This is a demo

## Code sample

```
let mytext = 'demo';
console.log(mytext + '!!!');
```

another block:

```
let anotherText = 'This is another block.';
console.log(anotherText);
```

typescript block:

```
let typedText: string = 'This is a TypeScript block.';
console.log(typedText);
```

## What just happened?

* the page loaded, retrieves a [demo Markdown file](demo.md) using an Ajax call
* it calls showdown to render a block of markdown inside the web page
* An extension/hook calls custom code when a snippet of code is found, evaluating it and capturing the output: *"it runs the code examples automatically"*
* You can call other files too: [example2](/index.html?file=example2.md)