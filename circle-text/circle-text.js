/*globals d3*/
(function () {
d3.circleText = function () {
    "use strict";
    var radius = function (d) { return d.r; },
        value = function (d) { return d.value; },
        fontSize = '100%',
        method = "stretch", spacing = "auto",
        position = "50%", precision = null;

    function _draw(selection) {

        selection.each(function (d, i) {
            var g = d3.select(this);

            // Reuse the old id, if present. Otherwise, generate a unique id
            // for the path.
            var oldPath = g.select('path.arc-path');
            var arcId = (oldPath.node() && oldPath.attr('id')) ||
                        'id-' + guid();

            g.selectAll('path.arc-path')
                .data([d])
              .enter()
                .append('path')
                .classed('arc-path', true)
                .attr('id', arcId)
                .attr('d', function (d) { return circle_d(radius(d)); });

            d3.transition(g.select('path.arc-path'))
                .attr('d', function (d) { return circle_d(radius(d)); });

            var arcText = g.selectAll('text.arc-text').data([d]);

            arcText.enter()
                .append('text')
                .classed('arc-text', true)
                .attr('text-anchor', 'middle')
                .append('textPath');

            // Not transitioning the `font-size` style since getComptedStyles
            // for it may not return the actual value which was set in CSS,
            // e.g., "font-size: 100%" may return "16px" when the font-size
            // is requested via getComptedStyles. Hence, the font-size will
            // be unnecessarily transitioned.
            // Also see: http://stackoverflow.com/a/10145250/987185
            arcText.style('font-size', fontSize);

            /* There is a bug in Chrome which makes it impossible to select
             * camel case tags, like textPath.  Hence, using the :first-child
             * selector to select the embedded textPath element.
             *
             * https://github.com/mbostock/d3/issues/925
             * https://bugs.webkit.org/show_bug.cgi?id=46800
             * https://bugs.webkit.org/show_bug.cgi?id=83438
             *
             * Keep the textPath hidden until the best position
             * has been found.
             */
            d3.transition(arcText.select(':first-child'))
                .attr('xlink:href', '#' + arcId)
                .attr('method', method)
                .attr('spacing', spacing)
                .text(value)
                .attr('startOffset', position);
        });

        return selection.selectAll('text.arc-text');
    }

    /***************************************
     * Private functions
     */

    /* Code for generating UUID version 4 from:
     * http://note19.com/2007/05/27/javascript-guid-generator/
     */
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    }

    function guid() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    }

    function circle_d(r) {
        return [ "M0,0",
                 "m", "0,", -r,
                 "a", r, ",", r, " 0 1,0 0,", 2*r,
                 "a", r, ",", r, " 0 1,0 0,", -2*r
               ].join('');
    }

    /***************************************
     * Public properties
     */

    _draw.radius = function (_) {
        if (arguments.length === 0) return radius;
        radius = d3.functor(_);
        return _draw;
    };

    _draw.value = function (_) {
        if (arguments.length === 0) return value;
        value = d3.functor(_);
        return _draw;
    };

    _draw.precision = function (_) {
        try {
            console.warn('circleText.precision has been deprecated.');
        } catch (e) {
            // Ignore if the warning could not be displayed.
        }

        if (arguments.length === 0) return precision;
        precision = _;
        return _draw;
    };

    _draw.fontSize = function (_) {
        if (arguments.length === 0) return fontSize;
        fontSize = d3.functor(_);
        return _draw;
    };

    _draw.method = function (_) {
        if (arguments.length === 0) return method;
        method = _;
        return _draw;
    };

    _draw.spacing = function (_) {
        if (arguments.length === 0) return spacing;
        spacing = _;
        return _draw;
    };

    _draw.position = function (_) {
        if (arguments.length === 0) return position;
        position = _;
        return _draw;
    };

    return _draw;
};
})();
