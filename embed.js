(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/",
    "workerjs": "/worker.js",
    "tdworkerjs": "/tdworker.js",
    "pxtVersion": "0.0.0",
    "pxtRelId": "",
    "pxtCdnUrl": "/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetCdnUrl": "/",
    "simUrl": "/simulator.html",
    "runUrl": "/run.html",
    "isStatic": true
};

    var appCdnRoot = "/";
    var simCdnRoot = "/";
    var simUrl = "/simulator.html";

    var scripts = [
        "bluebird.min.js",
        "typescript.js",
        "lzma/lzma_worker-min.js",
        "blockly/blockly_compressed.js",
        "blockly/blocks_compressed.js",
        "blockly/msg/js/en.js",
        "pxtlib.js",
        "pxtblocks.js",
        "pxtsim.js",
        "pxtrunner.js"
    ].map(function(s) { return appCdnRoot + s; })

    if (typeof jQuery == "undefined")
        scripts.unshift(appCdnRoot + "jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
