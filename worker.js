importScripts("/pxt-sample/typescript.js", "/pxt-sample/pxtlib.js");
var pm = postMessage;
onmessage = function (ev) {
    var res = ts.pxt.service.performOperation(ev.data.op, ev.data.arg);
    pm({
        op: ev.data.op,
        id: ev.data.id,
        result: res
    });
};
pm({
    id: "ready"
});
//# sourceMappingURL=worker.js.map