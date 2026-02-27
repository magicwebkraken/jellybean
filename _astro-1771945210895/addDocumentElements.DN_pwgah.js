import { av as s, aw as p } from "./siteModulesConstants.CSVLpOrc.js";
const v = (e) => {
    const t = `${e}=`,
      o = decodeURIComponent(document.cookie).split(";");
    for (let r = 0; r < o.length; r += 1) {
      let a = o[r];
      for (; a.charAt(0) === " "; ) a = a.substring(1);
      if (a.indexOf(t) === 0) return a.substring(t.length, a.length);
    }
    return "";
  },
  j = (e, t, n, { cdomain: o = null } = {}) => {
    const r = new Date();
    r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
    const a = n ? `expires=${r.toUTCString()};` : "",
      c = o ? `domain=${o};` : "";
    document.cookie = `${e}=${t};${a}path=/;${c}`;
  },
  I = (e) => {
    document.cookie = `${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
  m = (e) => e.startsWith("www."),
  A = (e) => (m(e) ? e.substring(4) : e),
  N = () => window.self !== window.top,
  i = ({ type: e, tagName: t, properties: n = {}, children: o = [] }) => {
    if (e !== "element")
      return console.error(
        "Failed to injected HTML element - missing node type"
      );
    const r = document.createElement(t);
    if (
      (Object.entries(n).forEach(([a, c]) => {
        r.setAttribute(a, c);
      }),
      o.length)
    ) {
      const a = o.find((c) => c.type === "text").value;
      a && (r.innerHTML = a);
    }
    return r;
  },
  g = (e) => {
    const t = `[${s}="${e}"]`;
    return document.querySelector(t);
  },
  u = (e, t = !0) => {
    const n = i(e),
      o = g(n.getAttribute(s));
    return n.outerHTML === o?.outerHTML
      ? o
      : (t && o?.remove(), document.head.append(n), n);
  },
  f = (e) => {
    const t = i(e),
      n = g(t.getAttribute(s));
    return t.outerHTML === n?.outerHTML
      ? n
      : (n?.remove(), document.body.append(t), t);
  },
  h = (e) => `!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '${e}');
	fbq('track', 'PageView');`,
  y = (e) =>
    `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${e}&ev=PageView&noscript=1"/>`,
  w = ({
    containerId: e,
    gtmQuery: t = "",
  } = {}) => `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl${t};f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','${e}');`,
  E = ({
    containerId: e,
    gtmQuery: t = "",
  } = {}) => `<iframe src="https://www.googletagmanager.com/ns.html?id=${e}${t}"
		height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  b = ({ containerId: e, googleAdsIds: t }) => {
    const n = t.length
      ? t.map((r) => `gtag('config', '${r}');`).join(`
		`)
      : "";
    return `window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		${e ? `gtag('config', '${e}');` : ""}
		${n}`;
  },
  T = (e) => `https://www.googletagmanager.com/gtag/js?id=${e}`,
  x = (e) => `(function(d) {
	var script = d.createElement('script');
	script.src = 'https://t.contentsquare.net/uxa/${e}.js';
	script.async = true;
	d.head.appendChild(script);
})(document);`,
  l = ({ siteMeta: e, areCookiesAllowed: t }) => {
    const n = {};
    return (
      t &&
        e.facebookPixel &&
        (n["noscript-fb-pixel"] = {
          tagName: "noscript",
          children: [{ type: "text", value: y(e.facebookPixel) }],
        }),
      t &&
        e.googleTagManager &&
        (n["noscript-gtm"] = {
          tagName: "noscript",
          children: [{ type: "text", value: E(e.googleTagManager) }],
        }),
      t &&
        e.facebookPixel &&
        (n["script-fb-pixel"] = {
          tagName: "script",
          children: [{ type: "text", value: h(e.facebookPixel) }],
        }),
      t &&
        (e.googleTagManager || e.googleAdsIds?.length) &&
        (n["script-gtm"] = {
          tagName: "script",
          children: [
            {
              type: "text",
              value: w({
                containerId: e.googleTagManager
                  ? e.googleTagManager
                  : e.googleAdsIds[0],
              }),
            },
          ],
        }),
      t &&
        (e.googleAnalytics || e.googleAdsIds?.length) &&
        ((n["script-google-analytics"] = {
          tagName: "script",
          children: [
            {
              type: "text",
              value: b({
                containerId: e.googleAnalytics,
                googleAdsIds: e.googleAdsIds || [],
              }),
            },
          ],
        }),
        e.googleAnalytics &&
          (n["script-google-analytics-async"] = {
            tagName: "script",
            properties: { src: T(e.googleAnalytics) },
          })),
      t &&
        e.hotjar &&
        (n["script-hotjar"] = {
          tagName: "script",
          children: [{ type: "text", value: x(e.hotjar) }],
        }),
      Object.entries(n).map(
        ([o, { tagName: r, properties: a = {}, children: c = [] }]) => ({
          type: "element",
          tagName: r,
          properties: { ...a, [s]: o },
          children: c,
        })
      )
    );
  },
  d = (e) => {
    e.forEach((t) => (p.includes(t.properties[s]) ? f(t) : u(t)));
  },
  L = ({ siteMeta: e, areCookiesAllowed: t }) => {
    const n = l({ siteMeta: e, areCookiesAllowed: t });
    d(n);
  },
  k = ({ siteMeta: e, areCookiesAllowed: t }) => {
    const n = l({ siteMeta: e, areCookiesAllowed: t });
    d(n);
  };
export { A as a, L as b, N as c, I as d, k as e, u as f, v as g, j as s };
