import {
  _ as v,
  d as m,
  a as _,
  o as b,
  v as A,
  Y as l,
  a0 as S,
} from "./_plugin-vue_export-helper.BbpXUnNN.js";
import { s as w, d as y, e as R } from "./scrollToSection.BAzhjQJ2.js";
import { ax as $ } from "./siteModulesConstants.CSVLpOrc.js";
const E = /\s|&nbsp;/g,
  M = (t) => {
    try {
      return t.replaceAll(E, "").toLowerCase();
    } catch {
      return t;
    }
  },
  f = (t, e) => {
    t.dataset.qa = M(e.value);
  },
  k = "qa",
  x = { beforeMount: (t, e) => f(t, e), updated: (t, e) => f(t, e) },
  O = m({ props: { to: { type: Object, default: () => ({}) } } }),
  B = ["href"];
function I(t, e, o, s, i, c) {
  return b(), _("a", { href: t.to.path }, [A(t.$slots, "default")], 8, B);
}
const L = v(O, [["render", I]]),
  T = () => {
    const t = navigator.userAgent;
    let e,
      o =
        t.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    return /trident/i.test(o[1])
      ? ((e = /\brv[ :]+(\d+)/g.exec(t) || []),
        { name: "IE", version: e[1] || "" })
      : o[1] === "Chrome" && ((e = t.match(/\bOPR|Edge\/(\d+)/)), e != null)
      ? { name: "Opera", version: e[1] }
      : ((o = o[2]
          ? [o[1], o[2]]
          : [navigator.appName, navigator.appVersion, "-?"]),
        (e = t.match(/version\/(\d+)/i)) != null && o.splice(1, 1, e[1]),
        { name: o[0], version: o[1] });
  };
function j(t) {
  const o = T().name === $;
  if (typeof t == "object") {
    const { query: s, path: i, hash: c } = t,
      a = s ? `?${new URLSearchParams(s)}` : "";
    i
      ? window.location.assign(`${i}${a}`)
      : window.history.pushState(null, null, a),
      c && w({ linkToSection: c, isInstant: o });
  } else window.location.assign(t);
}
const g = (t) => {
    t.component("RouterLink", L),
      (t.config.globalProperties.$router = { push: (e) => j(e) }),
      t.directive(k, x);
  },
  H = Object.freeze(
    Object.defineProperty({ __proto__: null, default: g }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  N = async (t) => {
    "default" in H && (await g(t));
  },
  P = m({
    props: {
      value: String,
      name: String,
      hydrate: { type: Boolean, default: !0 },
    },
    setup({ name: t, value: e, hydrate: o }) {
      if (!e) return () => null;
      let s = o ? "astro-slot" : "astro-static-slot";
      return () => l(s, { name: t, innerHTML: e });
    },
  });
var Q = P;
let d = new WeakMap();
var V =
  (t) =>
  async (e, o, s, { client: i }) => {
    if (!t.hasAttribute("ssr")) return;
    const c = e.name ? `${e.name} Host` : void 0,
      a = {};
    for (const [n, u] of Object.entries(s))
      a[n] = () => l(Q, { value: u, name: n === "default" ? void 0 : n });
    const p = i !== "only",
      h = p ? y : R;
    let r = d.get(t);
    if (r) (r.props = o), (r.slots = a), r.component.$forceUpdate();
    else {
      r = { props: o, slots: a };
      const n = h({
        name: c,
        render() {
          let u = l(e, r.props, r.slots);
          return (r.component = this), q(e.setup) && (u = l(S, null, u)), u;
        },
      });
      (n.config.idPrefix = t.getAttribute("prefix") ?? void 0),
        await N(n),
        n.mount(t, p),
        d.set(t, r),
        t.addEventListener("astro:unmount", () => n.unmount(), { once: !0 });
    }
  };
function q(t) {
  const e = t?.constructor;
  return e && e.name === "AsyncFunction";
}
export { V as default };
