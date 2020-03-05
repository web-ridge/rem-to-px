# What

rem-to-px cli program which you can put in your package.json. It replaces rem with px.

# Why?

We use this to fix wordpress styling in the admin because all font-sizes of our template looks off.

## Install

```
npm install https://github.com/web-ridge/rem-to-px --save-dev
```

or

```
yarn add https://github.com/web-ridge/rem-to-px --dev
```

## Example

We are using this in our "scripts" in our projects like this

```
node node_modules/rem-to-px --file ./assets/css/editor-style-block.css --multiplier 10
```

Multiplier of 10 takes care of e.g. 1.5rem to 15px;
