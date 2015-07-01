/**
 * @license eLife 1.0 Copyright (c) 2015, Vitaliy Bogoroditskiy All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/am1k/project-electronic-life for details
 */

function charFromElement(element) {
    if (element == null)
        return ' ';
    else
        return element.originChar;
}

module.exports = charFromElement;