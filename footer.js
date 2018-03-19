var oBtn = document.getElementById('add_line');
oBtn.onclick = function () {
    add_select_data();
};

oBtn.onclick();

var div = document.getElementById('container');
var svg = document.getElementById('map');
svg.setAttribute('width', div.offsetWidth);
svg.setAttribute('height', div.offsetHeight);

var oBtn2 = document.getElementById('download');
oBtn2.onclick = function () {
    alert("生成图片中，不要重复点击\n(android只支持uc,qq,原生浏览器)");
    var temp = document.createElement("div");
    temp.innerHTML = '<svg id="map" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 3486 1821" xlink="http://www.w3.org/1999/xlink">' + svg_data + '</svg>';

    var ua = navigator.userAgent;
    if (ua.indexOf('UCBrowser') > -1 || ua.indexOf('QQBrowser') > -1) {
        var app = document.getElementById("app");

        var div = document.getElementById("img_map");
        if (div == null) {
            div = document.createElement("div");
            div.setAttribute('class', "column");
            div.setAttribute('id', 'img_map');
        }
        div.innerHTML = '<p>UC、QQ浏览器不支持下载，需手动保存下面图片：</p>';
        var img = document.createElement("img");
        svgAsPngUri(temp.firstChild, {'backgroundColor': '#ffffff', scale: 0.7}, function (uir) {
            img.setAttribute('src', uir);
        });
        div.appendChild(img);
        app.appendChild(div);

    }
    else {
        saveSvgAsPng(temp.firstChild, "diagram.png", {'backgroundColor': '#ffffff', scale: 0.8});

    }
};

zoomSvg = svgPanZoom('#map', {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: false,
    center: true,
    zoomScaleSensitivity: 0.6
});
flush_svg();
init_flag = false;


