(() => {
  function n(n, e, r, t, i, o, u) {
    try {
      var a = n[o](u),
        c = a.value;
    } catch (n) {
      return void r(n);
    }
    a.done ? e(c) : Promise.resolve(c).then(t, i);
  }
  !(function () {
    var e,
      r =
        ((e = regeneratorRuntime.mark(function n() {
          return regeneratorRuntime.wrap(function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  return alert("hi! its working"), (n.next = 3), fetch("");
                case 3:
                  n.sent;
                case 4:
                case "end":
                  return n.stop();
              }
          }, n);
        })),
        function () {
          var r = this,
            t = arguments;
          return new Promise(function (i, o) {
            var u = e.apply(r, t);
            function a(e) {
              n(u, i, o, a, c, "next", e);
            }
            function c(e) {
              n(u, i, o, a, c, "throw", e);
            }
            a(void 0);
          });
        });
    return function () {
      return r.apply(this, arguments);
    };
  })()();
})();