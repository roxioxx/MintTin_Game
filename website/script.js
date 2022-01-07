var dragndrop = (function() {
    var myX = '';
    var myY = '';
    var whichArt = '';

    function moveStart(e) {
        whichArt = e.target;
        myX = e.offsetX === undefined ? e.layerX : e.offsetX;
        myY = e.offsetY === undefined ? e.layerY : e.offsetY;
        whichArt.style.zIndex = 10;
    }

    function moveDragOver(e) {
        e.preventDefault();
    }

    function moveDrop(e) {
        e.preventDefault();
        whichArt.style.left = e.pageX - myX + 'px';
        whichArt.style.top = e.pageY - myY + 'px';
    }

    document.querySelector('#fullBoard').addEventListener('dragstart', moveStart, false);
    document.querySelector('#fullBoard').addEventListener('dragover', moveDragOver, false);
    document.querySelector('#fullBoard').addEventListener('drop', moveDrop, false);
})();