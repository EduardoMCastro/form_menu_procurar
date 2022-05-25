'use strict';

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();
window.onload = function () {
    var $search = document.querySelector('.search');
    var $root = document.querySelector('.root');
    var $curveOpen = document.querySelector('.curve-open');
    var $curveClose = document.querySelector('.curve-close');
    var stateOpen = { topPointX: 680,
        bottomPointY: 60,
        curvePointX: 690,
        curvePointY: 50 };
    var propsOpen = { topPointX: -150,
        bottomPointY: 500,
        curvePointX: -150,
        curvePointY: 450 };
    var stateClose = {
        leftPointY: 405,
        rightPointY: 405,
        curvePointY: 500
    };
    var propsClose = {
        leftPointY: 0,
        rightPointY: 0,
        curvePointY: 0
    };
    var drawClose = function drawClose(_ref) {
        var leftPointY = _ref.leftPointY;
        var rightPointY = _ref.rightPointY;
        var curvePointY = _ref.curvePointY;

        $curveClose.setAttribute('d', 'M0,' + leftPointY + ' L0,405 740,405 740,' + rightPointY + ' C370,' + curvePointY + ' 370,' + curvePointY + ' 0,' + leftPointY);
    };
    var drawOpen = function drawOpen(_ref2) {
        var topPointX = _ref2.topPointX;
        var bottomPointY = _ref2.bottomPointY;
        var curvePointX = _ref2.curvePointX;
        var curvePointY = _ref2.curvePointY;

        $curveOpen.setAttribute('d', 'M740,' + bottomPointY + ' L740,0 ' + topPointX + ',0 C' + curvePointX + ',' + curvePointY + ' ' + curvePointX + ',' + curvePointY + ' 740,' + bottomPointY);
    };
    $search.addEventListener('click', function () {
        var classes = $root.classList;
        if (classes.contains('search-open') && classes.contains('search-close')) {
            classes.remove('search-close');
            animate(300, drawOpen, stateOpen, propsOpen);
        } else if (classes.contains('search-open')) {
            classes.add('search-close');
            animate(300, drawClose, stateClose, propsClose);
        } else {
            classes.add('search-open');
            animate(300, drawOpen, stateOpen, propsOpen);
        }
    });
    var animate = function animate(time, draw, state, props) {
        var fCount = 1;
        var start = performance.now();
        var framesCount = time / (1000 / 60);
        var keys = Object.keys(props);
        var deltaState = {};
        var stepState = {};
        keys.map(function (i) {
            state[i] < props[i] ? deltaState[i] = props[i] - state[i] : deltaState[i] = -(state[i] - props[i]);
        });
        var _animate = function _animate(timestamp) {
            if (timestamp - start < time) {
                keys.map(function (j) {
                    stepState[j] = state[j] + deltaState[j] * (fCount / framesCount);
                });
                draw(stepState);
                fCount++;
                requestAnimFrame(_animate);
            } else {
                if (fCount <= framesCount) {
                    draw(props);
                }
            }
        };
        requestAnimFrame(_animate);
    };
};