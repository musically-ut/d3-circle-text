# Circle Text

This is a small [D3](http://d3js.org/) plugin for writing text along the
bottom of a circle. This was conceived primarily for use with the 
[d3 circle packing layout](http://bl.ocks.org/mbostock/4063530), as a way of
placing the labels on intermediate nodes non-obtrusively.

## Examples

 1. [Simple demo](http://bl.ocks.org/musically-ut/5278601)
 2. [Bubble chart with simple labels](http://bl.ocks.org/musically-ut/5278614#index.html)

## Usage

This plugin is much like the [axis](https://github.com/mbostock/d3/wiki/SVG-Axes) plugin provided with D3.
To use `circleText`, you have to create and configure the following object:

```javascript
    var circleText = d3.circleText();
                      .radius(function (d) { return d.r - 5; })
                      .value(function (d) { return d.name; })
                      .method('align')
                      .spacing('exact')
                      .precision(0.1)
                      .fontSize('100%');
```

Then you can call it one a `g` element which has data joined with it. The call
returns the `text` elements which were added so that further properties may be
set on them:

```javascript
    gTexts.call(circleText)
      .style('fill', 'white');
```

This sets the `fill` of the `text` to be `white`.

This plugin will append the following elements to the `g` it acts on:

  1. `path.arc-path`: The path the text will follow. You can set `visibility` on this to `hidden` via the CSS rule:

        .arc-path { visibility: hidden; }

      Otherwise, be sure to at least set `fill` to `none` to see anything behind the path.

  2. `text.arc-text`: The text element. This is the element which will be returned.
    i. `textPath`: The text (along the above path)


### API

The following properties can be controlled by calling the appropriate functions:

#### `radius([value])`

Get/set the accessor for the radius of the path on which the text will be
written.

If called without any argument, the default accessor is returned:

```javascript
  function (d) { return d.r; }
```

`value` can be a constant number or a function which will be passed the data
elements for evaluation.


#### `value([value])`

Get/set the accessor for the text written.

If called without any argument, the default accessor is returned:

```javascript
  function (d) { return d.value; }
```

`value` can be a constant number or a function which will be passed the data
elements for evaluation.

#### `fontSize([value])`

Get/set the accessor for the font-size of the text written.

If called without any argument, the default accessor is returned:

```javascript
  function (d) { return '100%'; }
```

`value` can be a constant number or a function which will be passed the data
elements for evaluation.


#### `method([value])`

Get/set the [method](http://www.w3.org/TR/SVG/text.html#TextPathElementMethodAttribute) for the `textPath` element.

If called without any argument, the default value `"stretch"` is returned.
`value` should be either `"align"` or `"stretch"`.
 

#### `spacing([value])`

Get/set the [method](http://www.w3.org/TR/SVG/text.html#TextPathElementMethodAttribute) for the `textPath` element.

If called without any argument, the default value `"auto"` is returned.
`value` should be either `"exact"` or `"auto"`.
 

#### `precision([value])`

Get/set the precision used for determining the `startOffset` for the
`textPath` element. The `startOffset` ranges from `0%` to `50%` in steps of `precision`.

If called without any argument, the default value `1` is returned.
`value` should be a double number.
 

## Working

Internally, this plugin works by placing the `textPath` element with the `startoffset` ranging from `0%` to `50%` in steps of the `precision` provided and chooses the offset which results in:

 1. Most symmetrical placement of the bounding box around the vertical diameter
 2. If two placements are equally symmetrical, then chooses the one with the lesser height.

 Case 2 occurs for texts which are longer than half the circumference of the circle provided.
