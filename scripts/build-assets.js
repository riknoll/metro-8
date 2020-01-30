var fs = require("fs");
var path = require("path");
var child_process = require("child_process");

var assetdir = path.resolve("./assets");
var files = fs.readdirSync(assetdir);

var sources = files.filter(f => path.extname(f) === ".aseprite").map(f => path.join(assetdir, f));

sources.forEach(exportFile);
child_process.execSync(`pxt buildsprites ${assetdir}`)

function exportFile(filepath) {
    console.log("exporting " + filepath + " to " + withExtension(filepath, ".png"))

    var isVertical = filepath.indexOf("vertical") !== -1;
    var sheetType = isVertical ? "rows" : "columns"

    var data = child_process.execSync(`aseprite -b --sheet-type ${sheetType} --sheet ${withExtension(filepath, ".png")} ${filepath}`, { encoding: "utf8" })
    var meta = JSON.parse(data);
    var numberFrames = Object.keys(meta.frames).length;
    var spriteWidth = meta.meta.size.w;
    var spriteHeight = meta.meta.size.h;
    var name = path.basename(filepath, path.extname(filepath));

    var frames = [];

    if (numberFrames === 1) {
        frames = undefined
    }
    else {
        for (var i = 0; i < numberFrames; i++) {
            frames.push(i + "")
        }
    }

    if (name.indexOf("tile") === -1) {
        var pxtMeta = JSON.stringify({
            width: isVertical ? spriteWidth : spriteWidth / numberFrames,
            height: isVertical ? spriteHeight / numberFrames : spriteHeight,
            frames
        }, null, 4);
    
        fs.writeFileSync(withExtension(filepath, ".json"), pxtMeta, { encoding: "utf8" })
    }

}

function withExtension(p, ext) {
    return path.join(path.dirname(p), path.basename(p, path.extname(p)) + ext);
}