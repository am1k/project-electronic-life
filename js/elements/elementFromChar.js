/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

define(function() {

    function elementFromChar(legend, ch) {
        if (ch == ' ')
            return null;
        var element = new legend[ch]();
        element.originChar = ch;
        return element;
    }

    return elementFromChar;

});