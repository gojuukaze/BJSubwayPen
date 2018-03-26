var modal = document.getElementById('modal');
modal.onclick = function (ev) {
    modal.setAttribute('class', 'modal');
};

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
    var temp = document.createElement("div");
    var x = min_x - 50;
    if (x < 0) x = 0;
    var y = min_y - 50;
    if (y < 0) y = 0;
    var w = (max_x + 50) - x;
    if (w > 3486) w = 3486;
    var h = (max_y + 50) - y;
    if (h > 1821) h = 1821;
    var viewBox = '' + x + ' ' + y + ' ' + w + ' ' + h;
    temp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + w + ' ' + h + '"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="' + viewBox + '" xlink="http://www.w3.org/1999/xlink">' + svg_data + '</svg><svg>';
    // temp.innerHTML = svg_data2;
    if (!download_type) {
        modal.setAttribute('class', 'modal is-active');
        var app_div = document.getElementById("app");

        var div = document.getElementById("map_img_div");

        if (div == null) {
            div = document.createElement("div");
            div.setAttribute('id', 'map_img_div');
        }

        div.innerHTML = '<div class="notification is-info">图片生成中，完成后需手动保存下面图片：</div>';

        var img = document.createElement("img");
        svgAsPngUri(temp.firstChild, {'backgroundColor': '#ffffff', scale: 0.58}, function (uir) {
            img.src = uir;
        });
        div.appendChild(img);
        app_div.appendChild(div);

    }
    else {
        saveSvgAsPng(temp.firstChild, "diagram.png", {'backgroundColor': '#ffffff', scale: 0.8});

    }
};


var oBtn3 = document.getElementById('change');
oBtn3.onclick = function () {
    download_type = !download_type;
    if (download_type)
        oBtn2.innerHTML = '<span style="padding-left: 10px">下载图片</span>';
    else
        oBtn2.innerHTML = '<span style="padding-left: 10px">生成图片</span>';
};

zoomSvg = svgPanZoom('#map', {
    zoomEnabled: true,
    controlIconsEnabled: true,
    fit: false,
    center: true,
    zoomScaleSensitivity: 0.5
});
flush_svg();
init_flag = false;


