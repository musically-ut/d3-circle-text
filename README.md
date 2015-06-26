# d3-circle-text

This is a small [D3](http://d3js.org/) plugin for writing text along the
bottom of a circle. This was conceived primarily for use with the 
[d3 circle packing layout](http://bl.ocks.org/mbostock/4063530), as a way of
placing the labels on intermediate nodes non-obtrusively.

## Examples

 1. [Simple demo](http://bl.ocks.org/musically-ut/5278601)
 2. [Bubble chart with simple labels](http://bl.ocks.org/musically-ut/5278614)

## Usage

This usage pattern this plugin follows is the same as [axis](https://github.com/mbostock/d3/wiki/SVG-Axes) plugin provided with D3.
To use `circleText`, you have to create and configure the following object:

```javascript
var circleText = d3.circleText();
        .radius(function (d) { return d.r - 5; })
        .value(function (d) { return d.name; })
        .method('align')
        .spacing('exact')
        .fontSize('100%');
```

Then you can call it on a `g` element which has data joined with it. The call
returns the `text` elements which were added so that further properties may be
set on them:

```javascript
gTexts.call(circleText)
  .style('fill', 'white');
```

This sets the `fill` of the `text` to be `white`.

### Internals

This plugin will append the following elements to the `g` it acts on:

  1. `path.arc-path`: The path the text will follow. You can set `visibility` on this to `hidden` via the CSS rule:

        .arc-path { visibility: hidden; }

      Otherwise, be sure to at least set `fill` to `none` to see anything behind the path.

  2. `text.arc-text`: The text element. This is the element which will be returned.
    i. `textPath`: The text (along the above path)


### API

The following properties can be controlled by calling the appropriate functions:

 * _radius([value])_
  
  Get/set the accessor for the radius of the path on which the text will be
  written.
  
  If called without any argument, the default accessor is returned:
  
  ```javascript
  function (d) { return d.r; }
  ```
  
  `value` can be a constant number or a function which will be passed the data
  elements for evaluation.
  
  
 * _value([value])_
  
  Get/set the accessor for the text written.
  
  If called without any argument, the default accessor is returned:
  
  ```javascript
    function (d) { return d.value; }
  ```
  
  `value` can be a constant number or a function which will be passed the data
  elements for evaluation.
  
 * _fontSize([value])_
  
  Get/set the accessor for the font-size of the text written.
  
  If called without any argument, the default accessor is returned:
  
  ```javascript
    function (d) { return '100%'; }
  ```
  
  `value` can be a constant number or a function which will be passed the data
  elements for evaluation.
  
  
 * _method([value])_
  
  Get/set the [method](http://www.w3.org/TR/SVG/text.html#TextPathElementMethodAttribute) for the `textPath` element.
  
  If called without any argument, the default value `"stretch"` is returned.
  `value` should be either `"align"` or `"stretch"`.
   
  
 * _spacing([value])_
  
  Get/set the [spacing](http://www.w3.org/TR/SVG/text.html#TextPathElementSpacingAttribute) for the `textPath` element.
  
  If called without any argument, the default value `"auto"` is returned.
  `value` should be either `"exact"` or `"auto"`.
   
  * _position([value])_
  
  Get/set the [startOffset](http://www.w3.org/TR/SVG/text.html#TextPathElementStartOffsetAttribute) for the `textPath` element.
  
  If called without any argument, the default value `"50%"` is returned.
  `value` should be either a percentage `"25%"` or a length in user-dimensions
  along the circle. The circle is drawn counter-clock wise.
  
 * _precision([value])_

  **Deprecated:** This function does NOT have any effect now.  
 
