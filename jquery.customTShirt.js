(function ($) {
    $.fn.customTShirt = function (options) {
        let settings = $.extend(
            {
                editor: true,
                data: {
                    point: 0,
                    canvas: [
                        {
                            name: "front",
                            data: {
                                version: "5.3.0",
                                objects: [],
                                background: "rgba(255, 255, 255)",
                                backgroundImage: {
                                    type: "image",
                                    version: "5.3.0",
                                    originX: "left",
                                    originY: "top",
                                    left: 0,
                                    top: 0,
                                    width: 1000,
                                    height: 1000,
                                    fill: "rgb(0,0,0)",
                                    stroke: null,
                                    strokeWidth: 0,
                                    strokeDashArray: null,
                                    strokeLineCap: "butt",
                                    strokeDashOffset: 0,
                                    strokeLineJoin: "miter",
                                    strokeUniform: false,
                                    strokeMiterLimit: 4,
                                    scaleX: 1,
                                    scaleY: 1,
                                    angle: 0,
                                    flipX: false,
                                    flipY: false,
                                    opacity: 1,
                                    shadow: null,
                                    visible: true,
                                    backgroundColor: "",
                                    fillRule: "nonzero",
                                    paintFirst: "fill",
                                    globalCompositeOperation: "source-over",
                                    skewX: 0,
                                    skewY: 0,
                                    cropX: 0,
                                    cropY: 0,
                                    src: "https://cdn.jsdelivr.net/gh/shwijoyo/jquery-customTShirt@v1.0.0/image/tshirt-front.png",
                                    crossOrigin: "anonymous",
                                    filters: [],
                                },
                            },
                        },
                        {
                            name: "back",
                            data: {
                                version: "5.3.0",
                                objects: [],
                                background: "rgba(255, 255, 255)",
                                backgroundImage: {
                                    type: "image",
                                    version: "5.3.0",
                                    originX: "left",
                                    originY: "top",
                                    left: 0,
                                    top: 0,
                                    width: 1000,
                                    height: 1000,
                                    fill: "rgb(0,0,0)",
                                    stroke: null,
                                    strokeWidth: 0,
                                    strokeDashArray: null,
                                    strokeLineCap: "butt",
                                    strokeDashOffset: 0,
                                    strokeLineJoin: "miter",
                                    strokeUniform: false,
                                    strokeMiterLimit: 4,
                                    scaleX: 1,
                                    scaleY: 1,
                                    angle: 0,
                                    flipX: false,
                                    flipY: false,
                                    opacity: 1,
                                    shadow: null,
                                    visible: true,
                                    backgroundColor: "",
                                    fillRule: "nonzero",
                                    paintFirst: "fill",
                                    globalCompositeOperation: "source-over",
                                    skewX: 0,
                                    skewY: 0,
                                    cropX: 0,
                                    cropY: 0,
                                    src: "https://cdn.jsdelivr.net/gh/shwijoyo/jquery-customTShirt@v1.0.0/image/tshirt-back.png",
                                    crossOrigin: "anonymous",
                                    filters: [],
                                },
                            },
                        },
                    ],
                },
                onSave: (data, canvas) => {},
                onReady: (data, canvas) => {},
                onRender: (data, canvas) => {},
            },
            options
        );
        let canvas = null;
        let $this = this;
        let unredo = {
            point: -1,
            data: [],
            store: () => {
                unredo.data.splice(unredo.point + 1, unredo.data.length - (unredo.point + 1));
                if (JSON.stringify(settings.data) != JSON.stringify(unredo.data[unredo.data.length - 1])) {
                    unredo.point += 1;
                    unredo.data.push(JSON.parse(`${JSON.stringify(settings.data)}`));
                }
            },
        };

        let element = () => {
            let main = `<div style="width: ${$this.width()}px; height: ${$this.width()}px; position: relative; overflow: hidden"><div style="width: 1000px; height: 1000px; position: absolute; font-size: 1000px; top: ${
                Number($this.width() / 1000) <= 1 ? "-" + Number((1 - Number($this.width() / 1000)) / 2) : Number((1 - Number($this.width() / 1000)) / 2) * -1
            }em; left: ${Number($this.width() / 1000) <= 1 ? "-" + Number((1 - Number($this.width() / 1000)) / 2) : Number((1 - Number($this.width() / 1000)) / 2) * -1}em; transform: scale(${$this.width() / 1000})"><canvas id="${$this.attr(
                "id"
            )}-canvas" width="1000" height="1000" style="position: absolute;"></canvas></div></div>`;
            let editor = `
 <div class="card">
  <div class="card-header">
    <input class="d-none cte-importfile" type="file"/>
    <div class="btn-group btn-group-sm float-first" role="group">
       <button type="button" class="btn btn-outline-primary p-0 m-0"><input class="cte-color" type="text" style="width: 30px; height: 20px; border: none" data-coloris /></button>
       <button type="button" class="btn btn-outline-primary cte-importbutton"><i class="fa fa-folder-open"></i></button>
       <button type="button" class="btn btn-outline-primary dropdown-toggle cte-pointname" data-bs-toggle="dropdown" aria-expanded="false"></button>
       <ul class="dropdown-menu cte-pointlist"></ul>
     </div>
     <div class="btn-group btn-group-sm float-end" role="group">
       <button type="button" class="btn btn-outline-primary cte-undo"><i class="fa fa-undo"></i></button>
       <button type="button" class="btn btn-outline-primary cte-redo"><i class="fa fa-repeat"></i></button>
       <button type="button" class="btn btn-outline-primary cte-save"><span class="spinner-grow spinner-grow-sm m-0 p-0" aria-hidden="true"></span>

     </div>
     
  </div>
  <div class="card-body m-0 p-0">
    ${main}
  </div>
  <div class="card-footer text-body-secondary">
  <input class="d-none cte-importdesignfile" type="file"/>
    <div class="btn-group btn-group-sm cte-a cte-amain float-first" role="group">
       <button type="button" class="btn btn-outline-primary cte-adddesign"><i class="fa fa-list-alt"></i></button>
       <button type="button" class="btn btn-outline-primary cte-addimage"><i class="fa fa-picture-o"></i></button>
       <button type="button" class="btn btn-outline-primary cte-addtext"><i class="fa fa-text-width"></i></button>
       <button type="button" class="btn btn-outline-primary cte-addshape"><i class="fa fa-star-o"></i></button>
     </div>
     <div class="btn-group btn-group-sm cte-a cte-amain float-end" role="group">
       <button type="button" class="btn btn-outline-primary cte-view"><i class="fa fa-eye"></i></button>
       <button type="button" class="btn btn-outline-primary cte-importdesignbutton"><i class="fa fa-folder-open-o"></i></button>
       
     </div>
     <nav>
  <div class="d-none nav nav-tabs cte-a cte-aedit" role="tablist">
  <button class="nav-link m-0 p-2 cte-ea cte-easelection cte-egroup" data-bs-toggle="tab" type="button" role="tab"><i class="fa fa-object-group"></i></button>
  <button class="nav-link m-0 p-2 cte-ea cte-eagroup cte-eselection" data-bs-toggle="tab" type="button" role="tab"><i class="fa fa-object-ungroup"></i></button>
     <button class="nav-link m-0 p-2 cte-ea cte-eaimage" data-bs-toggle="tab" data-bs-target=".cte-e6" type="button" role="tab"><i class="fa fa-paint-brush"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eaimage" data-bs-toggle="tab" data-bs-target=".cte-e7" type="button" role="tab"><i class="fa fa-cogs"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eatext" data-bs-toggle="tab" data-bs-target=".cte-e0" type="button" role="tab"><i class="fa fa-edit"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eatext" data-bs-toggle="tab" data-bs-target=".cte-e1" type="button" role="tab"><i class="fa fa-text-height"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eatext" data-bs-toggle="tab" data-bs-target=".cte-e2" type="button" role="tab"><i class="fa fa-circle-o-notch"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eatext cte-eashape" data-bs-toggle="tab" data-bs-target=".cte-e3" type="button" role="tab"><i class="fa fa-tint"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eaglobal" data-bs-toggle="tab" data-bs-target=".cte-e4" type="button" role="tab"><i class="fa fa-square-o"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eaglobal cte-eagroup" data-bs-toggle="tab" data-bs-target=".cte-e5" type="button" role="tab"><i class="fa fa-arrows-alt"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-eup cte-eaglobal cte-eagroup" data-bs-toggle="tab" type="button" role="tab"><i class="fa fa-arrow-up"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-edown cte-eaglobal cte-eagroup" data-bs-toggle="tab" type="button" role="tab"><i class="fa fa-arrow-down"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-ecopy cte-eaglobal cte-eagroup" data-bs-toggle="tab" type="button" role="tab"><i class="fa fa-copy"></i></button>
    <button class="nav-link m-0 p-2 cte-ea cte-edelete cte-eaglobal cte-eagroup" data-bs-toggle="tab" type="button" role="tab"><i class="fa fa-trash"></i></button>
  </div>
</nav>
<div class="tab-content ">
  <div class="tab-pane fade cte-e cte-e0" role="tabpanel" tabindex="0">


  <div class="row align-items-start pt-2 pb-2">
    <div class="col">
        <div class="input-group input-group-sm">
            <span class="input-group-text"><i class="fa fa-font"></i></span>
            <input type="text" readonly class="form-control cte-efontfamily" />
        </div>
    </div>
    <div class="col-4">
        <div class="btn-group btn-group-sm" role="group" style="float: right;">
            <button type="button" class="btn btn-outline-primary cte-efontweight"><i class="fa fa-bold"></i></button>
            <button type="button" class="btn btn-outline-primary cte-efontstyle"><i class="fa fa-italic"></i></button>
            <button type="button" class="btn btn-outline-primary cte-eunderline"><i class="fa fa-underline"></i></button>
        </div>
    </div>
</div>
<div class="input-group pt-0 pb-2">
    <span class="input-group-text">Text: </span>
    <textarea class="form-control cte-etext"></textarea>
</div>
<div class="row align-items-start pt-0 pb-2">
    <div class="col">
        <div class="input-group input-group-sm">
            <span class="input-group-text">Align</span>
            <select class="form-control cte-etextalign">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
            </select>
        </div>
    </div>
    <div class="col-4">
        <div class="btn-group btn-group-sm" role="group" style="float: right;">
            <button type="button" class="btn btn-outline-primary cte-eoverline" style="text-decoration: overline;">OL</button>
            <button type="button" class="btn btn-outline-primary cte-elinethrough" style="text-decoration: line-through;">LT</button>
        </div>
    </div>
</div>



  </div>
  <div class="tab-pane fade cte-e cte-e1" role="tabpanel" tabindex="0">

<div class="row align-items-start pt-2 pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Font-Size :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-efontsize" min="0" max="500">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-efontsize" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Char-Spacing :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-echarspacing" min="-250" max="500">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-echarspacing" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Line-Height :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-elineheight" min="0.5" step="0.01" max="2">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-elineheight" type="number">
    </div>
</div>



  </div>
  <div class="tab-pane fade cte-e cte-e2" role="tabpanel" ltabindex="0">

<div class="row align-items-start pt-2 pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Arc mode :</p>
    </div>
    <div class="col-3 text-end">
        <button type="button" class="btn btn-sm cte-epath"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Arc-X :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-earcx">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-earcx" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Arc-Y :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-earcy">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-earcy" type="number">
    </div>
</div>


</div>

  <div class="tab-pane fade cte-e cte-e3" role="tabpanel" tabindex="0">

<div class="row align-items-start pt-2 pb-2">
    <div class="col">
        <div class="input-group input-group-sm">
            <span class="input-group-text">fill type :</span>
            <select class="form-control cte-efilltype">
                <option value="normal">Normal</option>
                <option value="linear">Gradient Linear</option>
                <option value="radial">Gradient Radial</option>
                <option value="pattern">Pattern</option>
            </select>
        </div>
    </div>
    <div class="col-3 text-end">
        <button type="button" class="btn btn-sm cte-ecoloradd"><i class="fa fa-plus" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="cte-ec cte-ecn d-none">
<div class="row align-items-start pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Color :</p>
    </div>
    <div class="col-4">
        <input class="form-control form-control-sm cte-ecnormal" type="text" data-coloris>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Background-Color :</p>
    </div>
    <div class="col-4">
        <input class="form-control form-control-sm cte-ecbgcolor" type="text" data-coloris>
    </div>
</div>
</div>
<div class="cte-ec cte-ecg d-none">
<div class="row align-items-start pb-2">
    <div class="col-3">
            <select class="form-control form-control-sm cte-ecgradientitem">
                
            </select>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgradientoffset">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgradientcolor" type="text" data-coloris>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Coord-X1 :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgx1">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgx1" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Coord-Y1 :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgy1">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgy1" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Coord-X2 :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgx2">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgx2" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Coord-Y2 :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgy2">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgy2" type="number">
    </div>
</div>
<div class="row align-items-start pb-2 cte-ecgr">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Coord-R1 :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgr1">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgr1" type="number">
    </div>
</div>
<div class="row align-items-start pb-2 cte-ecgr">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Coord-R2 :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecgr2">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecgr2" type="number">
    </div>
</div>
</div>
<div class="cte-ec cte-ecp d-none">
<div class="row align-items-start pb-2">
    <div class="col">
       <div class="input-group input-group-sm">
            <span class="input-group-text"><i class="fa fa-image"></i></span>
            <input type="text" readonly class="form-control cte-ecpimage" placeholder="select image"/>
        </div>
        
    </div>
    <div class="col-5 text-end">
        <div class="input-group input-group-sm">
            <span class="input-group-text">repeat :</span>
            <select class="form-control cte-ecprepeat">
                <option value="repeat">Repeat</option>
                <option value="repeat-x">Repeat-X</option>
                <option value="repeat-y">Repeat-Y</option>
                <option value="no-repeat">No-Repeat</option>
            </select>
        </div>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Width :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecpwidth">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecpwidth" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Height :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecpheight">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecpheight" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Offset-X :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecpoffsetx">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecpoffsetx" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Offset-Y :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecpoffsety">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecpoffsety" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Skew :</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-ecpskew">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-ecpskew" type="number">
    </div>
</div>
</div>

</div>
  <div class="tab-pane fade cte-e cte-e4" role="tabpanel" tabindex="0">

<div class="row align-items-start pt-2 pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Stroke :</p>
    </div>
    <div class="col-4">
        <input class="form-control form-control-sm cte-estroke" type="text" data-coloris>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col">
        <input type="range" class="form-range mt-1 cte-estrokewidth" min="0" step="0.1" max="10">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-estrokewidth" type="number">
    </div>
</div>
<div class="row align-items-start pt-2 pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Shadow :</p>
    </div>
    <div class="col-4">
        <input class="form-control form-control-sm cte-eshadowcolor" type="text" data-coloris>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col">
        <input type="range" class="form-range mt-1 cte-eshadowblur" min="0" max="35">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-eshadowblur" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col">
        <input type="range" class="form-range mt-1 cte-eshadowoffsetx" min="-100" max="100">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-eshadowoffsetx" type="number">
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col">
        <input type="range" class="form-range mt-1 cte-eshadowoffsety" min="-100" max="100">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-eshadowoffsety" type="number">
    </div>
</div>

</div>
  <div class="tab-pane fade cte-e cte-e5" role="tabpanel" tabindex="0">


<div class="row align-items-start pt-2 pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Flip X:</p>
    </div>
    <div class="col-3 text-end">
        <button type="button" class="btn btn-sm cte-eflipx"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col">
        <p class="text-start mt-1" style="font-size: 12px">Flip Y :</p>
    </div>
    <div class="col-3 text-end">
        <button type="button" class="btn btn-sm cte-eflipy"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Skew:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-eskewx" min="-88" max="80">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-eskewx" type="number">
    </div>
</div>

</div>
  
  <div class="tab-pane fade cte-e cte-e6" role="tabpanel" tabindex="0">

<div class="row align-items-start pt-2 pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Grayscale:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efgrayscale"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Invert:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efinvert"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Sepia:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efsepia"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Black White:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efblackwhite"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Brownie:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efbrownie"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Vintage:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efvintage"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Kodachrome:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efkodachrome"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Technicolor:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-eftechnicolor"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Polaroid:</p>
    </div>
    <div class="col">
        
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efpolaroid"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>

</div>
  
  
 
<div class="tab-pane fade cte-e cte-e7" role="tabpanel" tabindex="0">

<div class="row align-items-start pt-2 pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Opacity:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-eopacity" min="0" step="0.01" max="1">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm cte-eopacity" type="number">
    </div>
</div>
<div class="row align-items-start pt-2 pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Brightness:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-efvalue cte-efvbrightness" min="-1" step="0.01" max="1">
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efbrightness"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Contrast:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-efvalue cte-efvcontrast" min="-1" step="0.01" max="1">
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efcontrast"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Saturation:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-efvalue cte-efvsaturation" min="-1" step="0.01" max="3">
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efsaturation"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">HueRotation:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-efvalue cte-efvhue" min="-2" step="0.01" max="2">
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efhue"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>
<div class="row align-items-start pb-2">
    <div class="col-3">
        <p class="text-start mt-1" style="font-size: 12px">Blur:</p>
    </div>
    <div class="col">
        <input type="range" class="form-range mt-1 cte-efvalue cte-efvblur" min="0" step="0.01" max="1">
    </div>
    <div class="col-3">
        <button type="button" class="btn btn-sm cte-efilter cte-efblur"><i class="fa fa-toggle-off" style="font-size: 22px"></i></button>
    </div>
</div>


</div>
  
  
  
  <div class="tab-pane fade cte-e cte-e8" role="tabpanel" tabindex="0">d</div>
</div>


  </div>
</div>
        `;
            return settings.editor ? editor : main;
        };
        let fillType = (fill) => {
            let type = "normal";
            if (typeof fill == "object") {
                type = "pattern";
                switch (fill.type) {
                    case "linear":
                        type = "linear";
                        break;
                    case "radial":
                        type = "radial";
                        break;
                }
            }
            return type;
        };
        let canvasLoad = () => {
            let arr = ["Roboto"];

            $.each(settings.data.canvas[settings.data.point].data.objects, (i, v) => {
                if (v.type == "text") {
                    arr.push(v.fontFamily);
                }
                if (v.type == "group") {
                    $.each(v.objects, (j, w) => {
                        if (w.type == "text") {
                            arr.push(w.fontFamily);
                        }
                        if (w.type == "group") {
                            $.each(w.objects, (k, x) => {
                                if (x.type == "text") {
                                    arr.push(x.fontFamily);
                                }
                            });
                        }
                    });
                }
            });
            WebFont.load({
                google: { families: arr },
                active: () => {
                    setTimeout(() => {
                        canvas.loadFromJSON(settings.data.canvas[settings.data.point].data);
                    }, 2000);
                },
            });
            $this.find(".cte-save").attr("disabled", true).html(`<span class="spinner-grow spinner-grow-sm m-0 p-0" aria-hidden="true"></span>`);
            $this.find(".cte-a").addClass("d-none");
            $this.find(".cte-e").removeClass("show").removeClass("active");
            $this.find(".cte-amain").removeClass("d-none");
        };
        let render = (isStore = true) => {
            if (isStore) {
                unredo.store();
            }

            $this.find(".cte-color").css({ backgroundColor: settings.data.canvas[settings.data.point].data.background, color: settings.data.canvas[settings.data.point].data.background });
            $this.find(".cte-pointname").html(settings.data.canvas[settings.data.point].name);
            $this.find(".cte-pointlist").empty();
            $.each(settings.data.canvas, (i, v) => {
                $this.find(".cte-pointlist").append(`<li><button class="dropdown-item cte-point" value="${i}">${v.name}</button></li>`);
            });
            unredo.point <= 0 ? $this.find(".cte-undo").attr({ disabled: true }) : $this.find(".cte-undo").removeAttr("disabled");
            unredo.point >= unredo.data.length - 1 ? $this.find(".cte-redo").attr({ disabled: true }) : $this.find(".cte-redo").removeAttr("disabled");
        };
        let renderGlobal = (obj) => {
            $this.find(`.cte-efilltype`).val(fillType(obj.fill));
            $this.find(`.cte-ecoloradd`).addClass("d-none");
            $this.find(`.cte-ec`).addClass("d-none");
            $this.find(`.cte-ecoloradd`).addClass("d-none");
            $this.find(`.cte-ecbgcolor`).val(obj.textBackgroundColor);
            $this.find(`.cte-ecgr`).addClass("d-none");
            let gradientItem = () => {
                let tempval = $this.find(`.cte-ecgradientitem`).val() != null ? Number($this.find(`.cte-ecgradientitem`).val()) : obj.fill.colorStops.length - 1;
                $this.find(`.cte-ecgradientitem`).empty();
                $.each(obj.fill.colorStops, (i, v) => {
                    $this.find(`.cte-ecgradientitem`).append(`<option value="${i}" ${i == tempval ? "selected" : ""}>color ${i + 1}</option>`);
                });

                Number($this.find(`.cte-ecgradientitem`).val()) == 0 || Number($this.find(`.cte-ecgradientitem`).val()) == obj.fill.colorStops.length - 1
                    ? $this.find(`.cte-ecgradientoffset`).addClass("d-none")
                    : $this.find(`.cte-ecgradientoffset`).removeClass("d-none");
                $this.find(`.cte-ecg`).removeClass("d-none");
                $this.find(`.cte-ecoloradd`).removeClass("d-none");
                $this.find(`.cte-ecgx1`).attr({ min: 0, max: obj.width }).val(obj.fill.coords.x1);
                $this.find(`.cte-ecgx2`).attr({ min: 0, max: obj.width }).val(obj.fill.coords.x2);
                $this.find(`.cte-ecgy1`).attr({ min: 0, max: obj.height }).val(obj.fill.coords.y1);
                $this.find(`.cte-ecgy2`).attr({ min: 0, max: obj.height }).val(obj.fill.coords.y2);
            };
            switch (fillType(obj.fill)) {
                case "normal":
                    $this.find(`.cte-ecn`).removeClass("d-none");
                    $this.find(`.cte-ecnormal`).val(obj.fill);
                    break;
                case "linear":
                    gradientItem();
                    break;
                case "radial":
                    $this.find(`.cte-ecgr1`).attr({ min: 0, max: obj.width }).val(obj.fill.coords.r1);
                    $this.find(`.cte-ecgr2`).attr({ min: 0, max: obj.height }).val(obj.fill.coords.r2);
                    $this.find(`.cte-ecgr`).removeClass("d-none");
                    gradientItem();
                    break;
                case "pattern":
                    $this.find(`.cte-ecp`).removeClass("d-none");
                    $this.find(`.cte-ecprepeat`).val(obj.fill.repeat);
                    $this.find(`.cte-ecpwidth`).val(obj.fill.patternTransform[0]);
                    $this.find(`.cte-ecpskew`).val(obj.fill.patternTransform[2]);
                    $this.find(`.cte-ecpheight`).val(obj.fill.patternTransform[3]);
                    $this.find(`.cte-ecpoffsetx`).attr({ min: -obj.width, max: obj.width }).val(obj.fill.patternTransform[4]);
                    $this.find(`.cte-ecpoffsety`).attr({ min: -obj.height, max: obj.height }).val(obj.fill.patternTransform[5]);
                    break;
            }

            $this.find(`.cte-estroke`).val(obj.stroke);
            $this.find(`.cte-estrokewidth`).val(obj.strokeWidth);

            $this.find(`.cte-eshadowcolor`).val(obj.shadow.color);
            $this.find(`.cte-eshadowblur`).val(obj.shadow.blur);
            $this.find(`.cte-eshadowoffsetx`).val(obj.shadow.offsetX);
            $this.find(`.cte-eshadowoffsety`).val(obj.shadow.offsetY);

            !obj.flipX ? $this.find(`.cte-eflipx`).find(`.fa`).addClass("fa-toggle-off").removeClass("fa-toggle-on") : $this.find(`.cte-eflipx`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
            !obj.flipY ? $this.find(`.cte-eflipy`).find(`.fa`).addClass("fa-toggle-off").removeClass("fa-toggle-on") : $this.find(`.cte-eflipy`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
            $this.find(`.cte-eskewx`).val(obj.skewX);
            let objpost = canvas.getObjects().indexOf(obj);
            $this.find(`.cte-edown`).removeClass("d-none");
            $this.find(`.cte-eup`).removeClass("d-none");
            if (objpost == 0) {
                $this.find(`.cte-edown`).addClass("d-none");
            }
            if (objpost == canvas.getObjects().length - 1) {
                $this.find(`.cte-eup`).addClass("d-none");
            }
        };
        let renderImage = (obj) => {
            $this.find(`.cte-efilter`).find(`.fa`).addClass("fa-toggle-off").removeClass("fa-toggle-on");
            $this.find(`.cte-efvalue`).attr({ disabled: true });
            $this.find(`.cte-eopacity`).val(obj.opacity);
            $.each(obj.filters, (i, v) => {
                switch (v.type) {
                    case "Grayscale":
                        $this.find(`.cte-efgrayscale`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Invert":
                        $this.find(`.cte-efinvert`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Sepia":
                        $this.find(`.cte-efsepia`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "BlackWhite":
                        $this.find(`.cte-efblackwhite`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Brownie":
                        $this.find(`.cte-efbrownie`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Vintage":
                        $this.find(`.cte-efvintage`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Kodachrome":
                        $this.find(`.cte-efkodachrome`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Technicolor":
                        $this.find(`.cte-eftechnicolor`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Polaroid":
                        $this.find(`.cte-efpolaroid`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        break;
                    case "Brightness":
                        $this.find(`.cte-efbrightness`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        $this.find(`.cte-efvbrightness`).removeAttr("disabled").val(v.brightness);
                        break;
                    case "Contrast":
                        $this.find(`.cte-efcontrast`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        $this.find(`.cte-efvcontrast`).removeAttr("disabled").val(v.contrast);
                        break;
                    case "Saturation":
                        $this.find(`.cte-efsaturation`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        $this.find(`.cte-efvsaturation`).removeAttr("disabled").val(v.saturation);
                        break;
                    case "HueRotation":
                        $this.find(`.cte-efhue`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        $this.find(`.cte-efvhue`).removeAttr("disabled").val(v.rotation);
                        break;
                    case "Blur":
                        $this.find(`.cte-efblur`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                        $this.find(`.cte-efvblur`).removeAttr("disabled").val(v.blur);
                        break;
                }
            });
        };
        let renderText = (obj) => {
            $this.find(`.cte-efontfamily`).val(obj.fontFamily).css({ fontFamily: obj.fontFamily });
            $this.find(`.cte-etext`).val(obj.text);
            $this.find(`.cte-etextalign`).val(obj.textAlign);
            obj.fontWeight == "normal" ? $this.find(`.cte-efontweight`).removeClass(`btn-primary`).addClass(`btn-outline-primary`) : $this.find(`.cte-efontweight`).addClass(`btn-primary`).removeClass(`btn-outline-primary`);
            obj.fontStyle == "normal" ? $this.find(`.cte-efontstyle`).removeClass(`btn-primary`).addClass(`btn-outline-primary`) : $this.find(`.cte-efontstyle`).addClass(`btn-primary`).removeClass(`btn-outline-primary`);
            !obj.underline ? $this.find(`.cte-eunderline`).removeClass(`btn-primary`).addClass(`btn-outline-primary`) : $this.find(`.cte-eunderline`).addClass(`btn-primary`).removeClass(`btn-outline-primary`);
            !obj.linethrough ? $this.find(`.cte-elinethrough`).removeClass(`btn-primary`).addClass(`btn-outline-primary`) : $this.find(`.cte-elinethrough`).addClass(`btn-primary`).removeClass(`btn-outline-primary`);
            !obj.overline ? $this.find(`.cte-eoverline`).removeClass(`btn-primary`).addClass(`btn-outline-primary`) : $this.find(`.cte-eoverline`).addClass(`btn-primary`).removeClass(`btn-outline-primary`);
            $this.find(`.cte-efontsize`).val(obj.fontSize);
            $this.find(`.cte-echarspacing`).val(obj.charSpacing);
            $this.find(`.cte-elineheight`).val(obj.lineHeight);
            $this.find(`.cte-epath`).find(`.fa`).addClass("fa-toggle-off").removeClass("fa-toggle-on");
            $this.find(`.cte-earcx`).attr("disabled", true);
            $this.find(`.cte-earcy`).attr("disabled", true);
            if (obj.path != null) {
                $this.find(`.cte-epath`).find(`.fa`).addClass("fa-toggle-on").removeClass("fa-toggle-off");
                $this
                    .find(`.cte-earcx`)
                    .attr({ min: `-${obj.path.path[1][5]}`, max: `${obj.path.path[1][5]}` })
                    .removeAttr("disabled")
                    .val(obj.path.path[1][2]);
                $this
                    .find(`.cte-earcy`)
                    .attr({ min: `-${obj.path.path[1][5]}`, max: `${obj.path.path[1][5]}` })
                    .removeAttr("disabled")
                    .val(obj.path.path[1][4]);
            }
        };

        let event = () => {
            let obj = null;
            canvas.exportImage = function () {
                let link = document.createElement("a");
                link.download = "capture.png";
                link.href = canvas.toDataURL({ format: "png" });
                link.click();
            };

            canvas.exportData = function () {
                let link = document.createElement("a");
                let file = new Blob([JSON.stringify(settings.data)], { type: "text/plain" });
                link.download = "data.json";

                link.href = URL.createObjectURL(file);

                link.click();
            };
            canvas.exportCanvas = function () {
                let link = document.createElement("a");
                let file = new Blob([JSON.stringify(settings.data.canvas[settings.data.point].data)], { type: "text/plain" });
                link.download = "canvas.json";

                link.href = URL.createObjectURL(file);

                link.click();
            };
            canvas.exportDesign = function () {
                let link = document.createElement("a");
                let file = new Blob([JSON.stringify(settings.data.canvas[settings.data.point].data.objects)], { type: "text/plain" });
                link.download = "design.json";
                link.href = URL.createObjectURL(file);
                link.click();
            };
            canvas.captureImage = function () {
                return canvas.toDataURL({ format: "png" });
            };
            canvas.captureSize = function () {
                let object = [];
                $.each(canvas._objects, (i, v) => {
                    object.push(v);
                });
                var selection = new fabric.ActiveSelection(object, {
                    canvas: canvas,
                });
                canvas.setActiveObject(selection);
                canvas.getActiveObject().toGroup();
                setTimeout(() => {
                    canvas.getActiveObject().toActiveSelection();
                    canvas.discardActiveObject();
                }, 500);
                return { width: canvas.getActiveObject().width, height: canvas.getActiveObject().height };
            };
            canvas.captureDesign = function () {
                let data = JSON.parse(`${JSON.stringify(settings.data)}`);
                let object = [];
                $.each(canvas._objects, (i, v) => {
                    object.push(v);
                });
                var selection = new fabric.ActiveSelection(object, {
                    canvas: canvas,
                });
                canvas.backgroundColor = "rgb(0, 0, 0, 0)";
                canvas.backgroundImage.opacity = 0;
                canvas.setActiveObject(selection);
                canvas.getActiveObject().toGroup();
                let scale = 1;
                if (canvas.getActiveObject().width >= canvas.getActiveObject().height) {
                    scale = 900 / canvas.getActiveObject().width;
                } else {
                    scale = 900 / canvas.getActiveObject().height;
                }
                canvas.getActiveObject().scaleX = scale;
                canvas.getActiveObject().scaleY = scale;
                canvas.centerObject(canvas.getActiveObject());
                canvas.renderAll();
                setTimeout(() => {
                    settings.data = data;
                    canvasLoad();
                }, 2000);
                return canvas.toDataURL({ format: "png" });
            };
            canvas.captureAll = function (callback) {
                let i = 0;
                let ret = [];
                let data = JSON.parse(`${JSON.stringify(settings.data)}`);
                let capture = () => {
                    if (i == data.canvas.length) {
                        callback(ret);
                        settings.data = data;
                        canvasLoad();
                        return false;
                    }
                    settings.data.point = i;
                    canvasLoad();
                    setTimeout(function () {
                        let retr = {};
                        retr["image"] = canvas.toDataURL({ format: "png" });
                        let object = [];
                        $.each(canvas._objects, (i, v) => {
                            object.push(v);
                        });
                        var selection = new fabric.ActiveSelection(object, {
                            canvas: canvas,
                        });
                        canvas.setActiveObject(selection);
                        canvas.getActiveObject().toGroup();
                        canvas.backgroundColor = "rgb(0, 0, 0, 0)";
                        canvas.backgroundImage.opacity = 0;
                        retr["size"] = { width: canvas.getActiveObject().width, height: canvas.getActiveObject().height };
                        let scale = 1;
                        if (canvas.getActiveObject().width >= canvas.getActiveObject().height) {
                            scale = 900 / canvas.getActiveObject().width;
                        } else {
                            scale = 900 / canvas.getActiveObject().height;
                        }
                        canvas.getActiveObject().scaleX = scale;
                        canvas.getActiveObject().scaleY = scale;
                        canvas.centerObject(canvas.getActiveObject());

                        canvas.renderAll();
                        if (data.canvas[i].data.objects.length != 0) {
                            retr["design"] = canvas.toDataURL({ format: "png" });
                        }
                        setTimeout(() => {
                            ret.push(retr);
                            i += 1;
                            capture();
                        }, 2000);
                    }, 4000);
                };
                capture();
            };

            canvas.on("after:render", function () {
                settings.data.canvas[settings.data.point].data = JSON.parse(`${JSON.stringify(canvas)}`);
                $this.find(".cte-save").removeAttr("disabled").html(`<i class="fa fa-floppy-o"></i></button>`);
                settings.onRender(settings.data, canvas);
            });
            canvas.on("object:modified", function () {
                let obj = canvas.getActiveObject();

                let top = obj.top;
                let left = obj.left;
                if (obj.oCoords.tl.x < 0 - (obj.width * obj.scaleX) / 2) {
                    left = 0 - (obj.width * obj.scaleX) / 2;
                }
                if (obj.oCoords.tl.x > 1000 - (obj.width * obj.scaleX) / 2) {
                    left = 1000 - (obj.width * obj.scaleX) / 2;
                }

                if (obj.oCoords.tl.y < 0 - (obj.height * obj.scaleY) / 2) {
                    top = 0 - (obj.height * obj.scaleY) / 2;
                }
                if (obj.oCoords.tl.y > 1000 - (obj.height * obj.scaleY) / 2) {
                    top = 1000 - (obj.height * obj.scaleY) / 2;
                }

                obj.set({ top: top, left: left });

                canvas.renderAll();
                render();
            });
            canvas.on("mouse:down", function () {
                $this.find(".cte-a").addClass("d-none");
                $this.find(".cte-ea").removeClass("active").addClass("d-none");
                $this.find(".cte-e").removeClass("show").removeClass("active");
                obj = canvas.getActiveObject();
                if (obj != undefined && obj != null) {
                    if (obj.shadow == null) {
                        let shadow = {
                            blur: 0,
                            color: "rgb(0,0,0)",
                            offsetX: 0,
                            offsetY: 0,
                        };
                        obj.set({ shadow: shadow });
                    }

                    $this.find(".cte-aedit").removeClass("d-none");
                    switch (obj.type) {
                        case "text":
                            $this.find(".cte-eatext").removeClass("d-none");
                            renderText(obj);
                            break;
                        case "image":
                            $this.find(".cte-eaimage").removeClass("d-none");
                            renderImage(obj);
                            break;
                        case "path":
                            $this.find(".cte-eashape").removeClass("d-none");
                            break;
                        case "activeSelection":
                            $this.find(".cte-easelection").removeClass("d-none");
                            return false;
                            break;
                        case "group":
                            $this.find(".cte-eagroup").removeClass("d-none");
                            return false;
                            break;
                    }
                    $this.find(".cte-eaglobal").removeClass("d-none");

                    //canvas.bringToFront(obj);
                    render();
                    renderGlobal(obj);
                } else {
                    $this.find(".cte-amain").removeClass("d-none");
                }
            });
            $this
                .find(".cte-color")
                .on("click", function () {
                    Coloris({
                        format: "rgb",
                        closeButton: true,
                        closeLabel: "OK",
                        swatches: ["#264653", "#2a9d8f", "#e9c46a", "rgb(244,162,97)", "#e76f51", "#d62828", "navy", "#07b", "#0096c7", "#00b4d880", "rgba(0,119,182,0.8)"],
                        onChange: (color, input) => {
                            $.each(settings.data.canvas, (i, v) => {
                                settings.data.canvas[i].data.background = color;
                            });
                            canvas.setBackgroundColor(color);
                            canvas.renderAll();
                        },
                    });
                })
                .on("change", () => {
                    render();
                });
            $this.find(".cte-importfile").on("change", function () {
                let fr = new FileReader();
                fr.onload = function () {
                    try {
                        settings.data = JSON.parse(fr.result);
                        canvasLoad();
                        render();
                    } catch (e) {
                        alert(e);
                    }
                };
                fr.readAsText(this.files[0]);
                this.value = null;
            });
            $this.find(".cte-importbutton").on("click", () => {
                $this.find(".cte-importfile").click();
            });
            $(document).on("click", ".cte-point", function () {
                settings.data.point = Number(this.value);
                canvasLoad();
                render();
            });
            $this.find(".cte-undo").on("click", () => {
                unredo.point -= 1;
                settings.data = JSON.parse(`${JSON.stringify(unredo.data[unredo.point])}`);
                canvasLoad();
                render(false);
            });
            $this.find(".cte-redo").on("click", () => {
                unredo.point += 1;
                settings.data = JSON.parse(`${JSON.stringify(unredo.data[unredo.point])}`);
                canvasLoad();
                render(false);
            });
            $this.find(".cte-save").on("click", () => {
                settings.onSave(settings.data, canvas);
            });
            $this
                .find(".cte-addimage")
                .attr({ id: `${$this.attr("id")}-cte-addimage` })
                .imagepicker({
                    onPick: (imgurl) => {
                        $this.find(".cte-save").attr("disabled", true).html(`<span class="spinner-grow spinner-grow-sm m-0 p-0" aria-hidden="true"></span>`);
                        fabric.Image.fromURL(
                            imgurl,
                            function (obj) {
                                let shadow = {
                                    blur: 0,
                                    color: "rgb(0,0,0)",
                                    offsetX: 0,
                                    offsetY: 0,
                                };
                                let size = obj.width >= obj.height ? obj.width : obj.height;
                                obj.scale(400 / size).set({ stroke: "rgb(0,0,0)", strokeWidth: 0, shadow: shadow, flipX: false, flipY: false, skewX: 0, skewY: 0, opacity: 1, top: 200, left: 200 });

                                canvas.add(obj);
                                canvas.renderAll();
                                render();
                            },
                            { crossOrigin: "anonymous" }
                        );
                    },
                });
            $this.find(".cte-addtext").on("click", () => {
                let shadow = {
                    blur: 0,
                    color: "rgb(0,0,0)",
                    offsetX: 0,
                    offsetY: 0,
                };
                var text = new fabric.Text("YourText", { flipX: false, flipY: false, skewX: 0, skewY: 0, fontFamily: "Roboto", fontSize: 100, left: 200, top: 200, stroke: "rgb(0,0,0)", strokeWidth: 0, shadow: shadow });
                canvas.add(text);
                canvas.renderAll();
                render();
            });
            $this.find(".cte-addshape").svgpicker({
                onPick: (svgurl) => {
                    $this.find(".cte-save").attr("disabled", true).html(`<span class="spinner-grow spinner-grow-sm m-0 p-0" aria-hidden="true"></span>`);
                    fabric.loadSVGFromURL(svgurl, function (oImg) {
                        let shadow = {
                            blur: 0,
                            color: "rgb(0,0,0)",
                            offsetX: 0,
                            offsetY: 0,
                        };
                        obj = fabric.util.groupSVGElements(oImg, { left: 300, top: 300 });

                        let size = obj.width >= obj.height ? obj.width : obj.height;
                        obj.scale(300 / size).set({ stroke: "rgb(0,0,0)", strokeWidth: 0, shadow: shadow, flipX: false, flipY: false, skewX: 0, skewY: 0, opacity: 1, top: 200, left: 200, fill: "rgb(0,0,0)" });
                        canvas.add(obj);
                        canvas.renderAll();
                        render();
                    });
                },
            });

            // edit action text
            $this.find(`.cte-efontfamily`).googlefontpicker({
                onPick: (fontName) => {
                    obj = canvas.getActiveObject();
                    obj.set({ fontFamily: fontName });
                    canvas.renderAll();
                    render();
                    renderText(obj);
                },
            });
            $this.find(`.cte-efontweight`).on("click", () => {
                obj = canvas.getActiveObject();
                obj.fontWeight == "normal" ? obj.set({ fontWeight: "bold" }) : obj.set({ fontWeight: "normal" });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this.find(`.cte-efontstyle`).on("click", () => {
                obj = canvas.getActiveObject();
                obj.fontStyle == "normal" ? obj.set({ fontStyle: "italic" }) : obj.set({ fontStyle: "normal" });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this.find(`.cte-eunderline`).on("click", () => {
                obj = canvas.getActiveObject();
                obj.underline ? obj.set({ underline: false }) : obj.set({ underline: true });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this
                .find(`.cte-etext`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ text: this.value });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderText(obj);
                });
            $this.find(`.cte-etextalign`).on("input", function () {
                obj = canvas.getActiveObject();
                obj.set({ textAlign: this.value });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this.find(`.cte-eoverline`).on("click", () => {
                obj = canvas.getActiveObject();
                obj.overline ? obj.set({ overline: false }) : obj.set({ overline: true });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this.find(`.cte-elinethrough`).on("click", () => {
                obj = canvas.getActiveObject();
                obj.linethrough ? obj.set({ linethrough: false }) : obj.set({ linethrough: true });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this
                .find(`.cte-efontsize`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ fontSize: Number(this.value) });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderText(obj);
                });
            $this
                .find(`.cte-echarspacing`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ charSpacing: Number(this.value) });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderText(obj);
                });
            $this
                .find(`.cte-elineheight`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ lineHeight: Number(this.value) });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderText(obj);
                });
            $this.find(`.cte-epath`).on("click", () => {
                let path = null;
                obj = canvas.getActiveObject();
                if (obj.path == null) {
                    path = new fabric.Path(`M0 0 C0 0 ${obj.width} 0 ${obj.width} 0`, { fill: "transparent" });
                }
                obj.set({ path: path, pathAlign: "center", pathSide: "left", pathStartOffset: 0 });
                canvas.renderAll();
                render();
                renderText(obj);
            });
            $this
                .find(`.cte-earcx`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let path = new fabric.Path(`M0 0 C0 ${Number(this.value)} ${obj.path.path[1][3]} ${obj.path.path[1][4]} ${obj.path.path[1][5]} 0`, { fill: "transparent" });
                    obj.set({ path: path });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderText(obj);
                });
            $this
                .find(`.cte-earcy`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let path = new fabric.Path(`M0 0 C0 ${obj.path.path[1][2]} ${obj.path.path[1][3]} ${Number(this.value)} ${obj.path.path[1][5]} 0`, { fill: "transparent" });
                    obj.set({ path: path });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderText(obj);
                });

            $this.find(`.cte-efilltype`).on("change", function () {
                obj = canvas.getActiveObject();

                switch (this.value) {
                    case "normal":
                        obj.set({ fill: "rgb(0,0,0)" });
                        break;
                    case "linear":
                        let linear = new fabric.Gradient({
                            type: "linear",
                            gradientUnits: "pixels", // or 'percentage'
                            coords: { x1: 0, y1: 0, x2: obj.width, y2: obj.height },
                            colorStops: [{ offset: 1, color: "rgb(0,0,0)" }],
                        });
                        obj.set({ fill: linear });
                        break;
                    case "radial":
                        let radial = new fabric.Gradient({
                            type: "radial",
                            coords: {
                                x1: obj.width / 2,
                                y1: obj.height / 2,
                                x2: obj.width / 2,
                                y2: obj.height / 2,
                                r1: obj.width / 9, // inner circle radius
                                r2: obj.width / 2, // outer circle radius
                            },
                            colorStops: [
                                { offset: 1, color: "rgb(0,0,0)" }, // first color stop
                            ],
                        });
                        obj.set({ fill: radial });
                        break;
                    case "pattern":
                        fabric.util.loadImage(``, function (img) {
                            obj.set(
                                "fill",
                                new fabric.Pattern({
                                    source: img,
                                    repeat: "repeat",
                                    patternTransform: [1, 0, 0, 1, 0, 0],
                                })
                            );
                            canvas.renderAll();
                            render();
                            renderGlobal(obj);
                        });
                        break;
                }
                canvas.renderAll();
                render();
                renderGlobal(obj);
            });

            $this
                .find(".cte-ecnormal")
                .on("click", function () {
                    obj = canvas.getActiveObject();
                    Coloris({
                        format: "rgb",
                        closeButton: true,
                        closeLabel: "OK",
                        onChange: (color, input) => {
                            obj.set({ fill: color });
                            canvas.renderAll();
                        },
                    });
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(".cte-ecbgcolor")
                .on("click", function () {
                    obj = canvas.getActiveObject();
                    Coloris({
                        format: "rgb",
                        closeButton: true,
                        closeLabel: "OK",
                        onChange: (color, input) => {
                            obj.set({ textBackgroundColor: color });
                            canvas.renderAll();
                        },
                    });
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $(`.cte-ecoloradd`).on("click", () => {
                obj.fill.colorStops.push({ offset: 1, color: "rgb(0, 0, 0)" });
                $.each(obj.fill.colorStops, (i, v) => {
                    obj.fill.colorStops[i].offset = i / (obj.fill.colorStops.length - 1);
                });
                let gradient = new fabric.Gradient(obj.fill);
                obj.set({ fill: gradient });
                canvas.renderAll();
                render();
                $this.find(".cte-ecgradientitem").val(null);
                renderGlobal(obj);
            });
            $this.find(".cte-ecgradientitem").on("change", function () {
                obj = canvas.getActiveObject();
                $this
                    .find(".cte-ecgradientoffset")
                    .attr({ min: obj.fill.colorStops[Number(this.value) - 1].offset + 0.001, max: obj.fill.colorStops[Number(this.value) + 1].offset - 0.001, value: obj.fill.colorStops[Number(this.value) + 1].offset, step: 0.001 });

                render();
                renderGlobal(obj);
            });

            $this
                .find(`.cte-ecgradientoffset`)
                .on("input", function () {
                    obj = canvas.getActiveObject();

                    obj.fill.colorStops[Number($this.find(".cte-ecgradientitem").val())].offset = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });

                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(".cte-ecgradientcolor")
                .on("click", function () {
                    obj = canvas.getActiveObject();

                    Coloris({
                        format: "rgb",
                        closeButton: true,
                        closeLabel: "OK",
                        onChange: (color, input) => {
                            obj.fill.colorStops[Number($this.find(".cte-ecgradientitem").val())].color = color;
                            let radial = new fabric.Gradient(obj.fill);
                            obj.set({ fill: radial });
                            canvas.renderAll();
                        },
                    });
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecgx1`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.coords.x1 = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(`.cte-ecgx2`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.coords.x2 = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecgy1`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.coords.y1 = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecgy2`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.coords.y2 = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecgr1`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.coords.r1 = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecgr2`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.coords.r2 = Number(this.value);
                    let gradient = new fabric.Gradient(obj.fill);
                    obj.set({ fill: gradient });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(".cte-ecpimage")
                .attr({ id: `${$this.attr("id")}-cte-ecpimage` })
                .imagepicker({
                    onPick: (imgurl) => {
                        fabric.util.loadImage(imgurl, function (img) {
                            obj.set(
                                "fill",
                                new fabric.Pattern({
                                    source: img,
                                    repeat: "repeat",
                                    patternTransform: [1, 0, 0, 1, 0, 0],
                                })
                            );
                            canvas.renderAll();
                            render();
                            renderGlobal(obj);
                        });
                    },
                });
            $this.find(".cte-ecprepeat").on("change", function () {
                obj = canvas.getActiveObject();
                obj.fill.repeat = this.value;
                let pattern = new fabric.Pattern(obj.fill);

                obj.set({ fill: pattern });
                canvas.renderAll();
                render();
                renderGlobal(obj);
            });
            $this
                .find(`.cte-ecpskew`)
                .attr({ min: -2, max: 2, value: 1, step: 0.01 })
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.patternTransform[2] = Number(this.value);

                    let pattern = new fabric.Pattern(obj.fill);

                    obj.set({ fill: pattern });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecpwidth`)
                .attr({ min: 0, max: 2, value: 1, step: 0.01 })
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.patternTransform[0] = Number(this.value);

                    let pattern = new fabric.Pattern(obj.fill);

                    obj.set({ fill: pattern });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(`.cte-ecpheight`)
                .attr({ min: 0, max: 2, value: 1, step: 0.01 })
                .on("input", function () {
                    obj = canvas.getActiveObject();

                    obj.fill.patternTransform[3] = Number(this.value);
                    let pattern = new fabric.Pattern(obj.fill);
                    obj.set({ fill: pattern });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-ecpoffsetx`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.patternTransform[4] = Number(this.value);
                    let pattern = new fabric.Pattern(obj.fill);
                    obj.set({ fill: pattern });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(`.cte-ecpoffsety`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.fill.patternTransform[5] = Number(this.value);
                    let pattern = new fabric.Pattern(obj.fill);
                    obj.set({ fill: pattern });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(".cte-estroke")
                .on("click", function () {
                    obj = canvas.getActiveObject();
                    Coloris({
                        format: "rgb",
                        closeButton: true,
                        closeLabel: "OK",
                        onChange: (color, input) => {
                            obj.set({ stroke: color });
                            canvas.renderAll();
                        },
                    });
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(`.cte-estrokewidth`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ strokeWidth: Number(this.value) });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this
                .find(".cte-eshadowcolor")
                .on("click", function () {
                    obj = canvas.getActiveObject();
                    Coloris({
                        format: "rgb",
                        closeButton: true,
                        closeLabel: "OK",
                        onChange: (color, input) => {
                            obj.shadow.color = color;
                            obj.set({ shadow: obj.shadow });
                            canvas.renderAll();
                        },
                    });
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(`.cte-eshadowblur`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.shadow.blur = Number(this.value);
                    obj.set({ shadow: obj.shadow });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(`.cte-eshadowoffsetx`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.shadow.offsetX = Number(this.value);
                    obj.set({ shadow: obj.shadow });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });
            $this
                .find(`.cte-eshadowoffsety`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.shadow.offsetY = Number(this.value);
                    obj.set({ shadow: obj.shadow });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this.find(`.cte-eflipx`).on("click", () => {
                obj = canvas.getActiveObject();
                !obj.flipX ? obj.set({ flipX: true }) : obj.set({ flipX: false });
                canvas.renderAll();
                render();
                renderGlobal(obj);
            });
            $this.find(`.cte-eflipy`).on("click", () => {
                obj = canvas.getActiveObject();
                !obj.flipY ? obj.set({ flipY: true }) : obj.set({ flipY: false });
                canvas.renderAll();
                render();
                renderGlobal(obj);
            });

            $this
                .find(`.cte-eskewx`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ skewX: Number(this.value) });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderGlobal(obj);
                });

            $this.find(`.cte-efgrayscale`).on("click", () => {
                obj = canvas.getActiveObject();

                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Grayscale")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Grayscale()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });

            $this.find(`.cte-efinvert`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Invert")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Invert()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efsepia`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Sepia")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Sepia()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efblackwhite`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("BlackWhite")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.BlackWhite()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efbrownie`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Brownie")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Brownie()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efvintage`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Vintage")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Vintage()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efkodachrome`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Kodachrome")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Kodachrome()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-eftechnicolor`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Technicolor")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Technicolor()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efpolaroid`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Polaroid")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Polaroid()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this.find(`.cte-efbrightness`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Brightness")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Brightness()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this
                .find(`.cte-efvbrightness`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let isFilter = -1;
                    $.each(obj.filters, (i, v) => {
                        if (v.type.includes("Brightness")) {
                            isFilter = i;
                        }
                    });
                    obj.filters[isFilter]["brightness"] = Number(this.value);
                    obj.applyFilters();
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderImage(obj);
                });
            $this.find(`.cte-efcontrast`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Contrast")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Contrast()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this
                .find(`.cte-efvcontrast`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let isFilter = -1;
                    $.each(obj.filters, (i, v) => {
                        if (v.type.includes("Contrast")) {
                            isFilter = i;
                        }
                    });
                    obj.filters[isFilter]["contrast"] = Number(this.value);
                    obj.applyFilters();
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderImage(obj);
                });
            $this.find(`.cte-efsaturation`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Saturation")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Saturation()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this
                .find(`.cte-efvsaturation`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let isFilter = -1;
                    $.each(obj.filters, (i, v) => {
                        if (v.type.includes("Saturation")) {
                            isFilter = i;
                        }
                    });
                    obj.filters[isFilter]["saturation"] = Number(this.value);
                    obj.applyFilters();
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderImage(obj);
                });
            $this.find(`.cte-efhue`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("HueRotation")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.HueRotation(0)) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this
                .find(`.cte-efvhue`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let isFilter = -1;
                    $.each(obj.filters, (i, v) => {
                        if (v.type.includes("HueRotation")) {
                            isFilter = i;
                        }
                    });
                    obj.filters[isFilter]["rotation"] = Number(this.value);
                    obj.applyFilters();
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderImage(obj);
                });

            $this.find(`.cte-efblur`).on("click", () => {
                obj = canvas.getActiveObject();
                let isFilter = -1;
                $.each(obj.filters, (i, v) => {
                    if (v.type.includes("Blur")) {
                        isFilter = i;
                    }
                });
                isFilter == -1 ? obj.filters.push(new fabric.Image.filters.Blur()) : obj.filters.splice(isFilter, 1);
                obj.applyFilters();
                canvas.renderAll();
                render();
                renderImage(obj);
            });
            $this
                .find(`.cte-efvblur`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    let isFilter = -1;
                    $.each(obj.filters, (i, v) => {
                        if (v.type.includes("Blur")) {
                            isFilter = i;
                        }
                    });
                    obj.filters[isFilter]["blur"] = Number(this.value);
                    obj.applyFilters();
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderImage(obj);
                });
            $this
                .find(`.cte-eopacity`)
                .on("input", function () {
                    obj = canvas.getActiveObject();
                    obj.set({ opacity: Number(this.value) });
                    canvas.renderAll();
                })
                .on("change", () => {
                    obj = canvas.getActiveObject();
                    render();
                    renderImage(obj);
                });
            $this.find(`.cte-ecopy`).on("click", function () {
                obj = canvas.getActiveObject();
                obj.left = obj.left + 50;
                obj.top = obj.top - 50;
                settings.data.canvas[settings.data.point].data.objects.push(JSON.parse(`${JSON.stringify(obj)}`));
                canvasLoad();
                render();
            });
            $this.find(`.cte-edelete`).on("click", function () {
                obj = canvas.getActiveObject();
                canvas.remove(obj);
                render();
                $this.find(".cte-aedit").addClass("d-none");
                $this.find(".cte-amain").removeClass("d-none");
            });
            $this.find(`.cte-egroup`).on("click", function () {
                canvas.getActiveObject().toGroup();
                render();
                $this.find(".cte-aedit").addClass("d-none");
                $this.find(".cte-amain").removeClass("d-none");
            });
            $this.find(`.cte-eselection`).on("click", function () {
                canvas.getActiveObject().toActiveSelection();
                render();
                $this.find(".cte-aedit").addClass("d-none");
                $this.find(".cte-amain").removeClass("d-none");
            });
            let tempcolor = "";

            $this.find(`.cte-view`).on("click", function () {
                if ($(this).children().hasClass("fa-eye")) {
                    tempcolor = canvas.backgroundColor;
                    canvas.backgroundColor = "rgb(0, 0, 0, 0)";
                    canvas.backgroundImage.opacity = 0;
                    $(this).children().removeClass("fa-eye").addClass("fa-eye-slash");
                } else {
                    canvas.backgroundColor = tempcolor;
                    canvas.backgroundImage.opacity = 1;
                    $(this).children().removeClass("fa-eye-slash").addClass("fa-eye");
                }
                canvas.renderAll();
            });

            $(".cte-adddesign").designpicker({
                onPick: (design) => {
                    let objects = settings.data.canvas[settings.data.point].data.objects.concat(JSON.parse(`${JSON.stringify(design)}`));
                    settings.data.canvas[settings.data.point].data.objects = JSON.parse(`${JSON.stringify(objects)}`);
                    canvasLoad();
                    render();
                },
            });
            $this.find(".cte-importdesignfile").on("change", function () {
                let fr = new FileReader();
                fr.onload = function () {
                    try {
                        let objects = settings.data.canvas[settings.data.point].data.objects.concat(JSON.parse(fr.result));
                        settings.data.canvas[settings.data.point].data.objects = JSON.parse(`${JSON.stringify(objects)}`);
                        canvasLoad();
                        render();
                    } catch (e) {
                        alert(e);
                    }
                };
                fr.readAsText(this.files[0]);
                this.value = null;
            });
            $this.find(".cte-importdesignbutton").on("click", () => {
                $this.find(".cte-importdesignfile").click();
            });
            $this.find(".cte-eup").on("click", () => {
                obj = canvas.getActiveObject();
                canvas.bringForward(obj);
                canvas.renderAll();
                render();

                renderGlobal(obj);
            });
            $this.find(".cte-edown").on("click", () => {
                obj = canvas.getActiveObject();
                canvas.sendBackwards(obj);
                canvas.renderAll();
                render();

                renderGlobal(obj);
            });
        };

        (() => {
            $this.html(element());
            canvas = new fabric.Canvas(`${$this.attr("id")}-canvas`, { preserveObjectStacking: true });
            canvasLoad();

            if (settings.editor) {
                event();
                render();
            }
            settings.onReady(settings.data, canvas);
        })();
        return this;
    };
})(jQuery);
