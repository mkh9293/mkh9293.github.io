const imgGrids = document.getElementById("input-image").children;
const kernelGrids = document.getElementById("kernel").children;
const featGrids = document.getElementById("feature-map").children;
const convExpr = document.getElementById("conv_wrapper");
const stepCounter = document.getElementById("step");
const moveKernelBtn = document.getElementById("moveKernelBtn");
const imgGridColor = "#e96048";
const featGridColor = "#489be9";
const imgIndexList = [0, 1, 3, 4];
const imgItems = [9, 3, 5, 6, 2, 3, 7, 4, 6];
const kernelItems = [1, 0, 1, 1];
let idx = 0;

const imgPoolGrids = document.getElementById("input-image-pool").children;
const featPoolGrids = document.getElementById("feature-map-pool").children;
const stepPoolCounter = document.getElementById("step-pool");
const maxPoolBtn = document.getElementById("maxPoolBtn");
const imgPoolItems = [3, 7, 0, 1, 2, 6, 9, 3, 4];
let idxPool = 0;

function initGrids() {
    for (let imgIdx = 0; imgIdx < imgGrids.length; imgIdx++) {
        imgGrids[imgIdx].innerText = imgItems[imgIdx];
    }
    for (let kernelIdx = 0; kernelIdx < kernelGrids.length; kernelIdx++) {
        kernelGrids[kernelIdx].innerText = kernelItems[kernelIdx];
    }
}

function _clearFeatGrids() {
    /* idx == 4 */
    for (let featGrid of featGrids) {
        featGrid.innerText = "";
    }
}

function _updateStep(index) {
    stepCounter.innerText = `${index}/4 단계`;
}

function _fillGrid(imgColor, featColor, index) {
    let imgIndexs = _getImgIndex(index);
    for (let imgIndex of imgIndexs) {
        imgGrids[imgIndex].style.backgroundColor = imgColor;
    }
    featGrids[index].style.backgroundColor = featColor;
}

function _cleanUpGrid(index) {
    _fillGrid("#ffffff", "#ffffff", index);
}

function _getImgIndex(index) {
    let imgIndex = imgIndexList[index];
    return [imgIndex, imgIndex + 1, imgIndex + 3, imgIndex + 4];
}

function _get_conv(index) {
    let numRes = 0;
    let strRes = "";
    let imgIndexs = _getImgIndex(index);
    for (let i = 0; i < imgIndexs.length; i++) {
        let imgIndex = imgIndexs[i]
        numRes += imgItems[imgIndex] * kernelItems[i];
        if (i == 0) {
            strRes += `${imgItems[imgIndex]} x ${kernelItems[i]}`;
        } else {
            strRes += ` + ${imgItems[imgIndex]} x ${kernelItems[i]}`;
        }
    }
    strRes += ` = ${numRes}`;
    return [numRes, strRes];
}

function _fillFeatGrid(index, value) {
    featGrids[index].innerText = value;
}

function _fillConvExpr(expr) {
    convExpr.innerText = expr;
}

function initPoolGrids() {
    for (let imgIdx = 0; imgIdx < imgPoolGrids.length; imgIdx++) {
        imgPoolGrids[imgIdx].innerText = imgPoolItems[imgIdx];
    }
}

function _clearFeatPoolGrids() {
    /* idx == 4 */
    for (let featGrid of featPoolGrids) {
        featGrid.innerText = "";
    }
}

function _updatePoolStep(index) {
    stepPoolCounter.innerText = `${index}/4 단계`;
}

function _fillPoolGrid(imgColor, featColor, index) {
    let imgIndexs = _getImgIndex(index);
    for (let imgIndex of imgIndexs) {
        imgPoolGrids[imgIndex].style.backgroundColor = imgColor;
    }
    featPoolGrids[index].style.backgroundColor = featColor;
}

function _cleanUpPoolGrid(index) {
    _fillPoolGrid("#ffffff", "#ffffff", index);
}

function _fillFeatPoolGrid(index, value) {
    featPoolGrids[index].innerText = value;
}

function _getMaxPoolValue(index) {
    let max = -1
    let imgIndexs = _getImgIndex(index);
    for (let imgIdx of imgIndexs) {
        let value = imgPoolItems[imgIdx];
        if (value > max) {
            max = value;
        }
    }
    return max;
}

window.addEventListener("DOMContentLoaded", function() {
    initGrids();
    initPoolGrids();
    moveKernelBtn.addEventListener("click", function() {
        if (idx != 0) {
            _cleanUpGrid(idx - 1);
        }
        if (idx == 4) {
            _clearFeatGrids();
            _fillConvExpr("")
            idx = 0;
            _updateStep(idx);
            return;
        }
        _fillGrid(imgGridColor, featGridColor, idx);
        let [numRes, strRes] = _get_conv(idx);
        _fillFeatGrid(idx, numRes);
        _fillConvExpr(strRes);
        _updateStep(idx + 1);
        idx += 1;
        }
    );
    maxPoolBtn.addEventListener("click", function() {
        if (idxPool != 0) {
            _cleanUpPoolGrid(idxPool - 1);
        }
        if (idxPool == 4) {
            _clearFeatPoolGrids();
            idxPool = 0;
            _updatePoolStep(idxPool);
            return;
        }
        let numRes = _getMaxPoolValue(idxPool);
        _fillPoolGrid(imgGridColor, featGridColor, idxPool);
        _fillFeatPoolGrid(idxPool, numRes);
        _updatePoolStep(idxPool + 1);
        idxPool += 1;
        }
    );
})
