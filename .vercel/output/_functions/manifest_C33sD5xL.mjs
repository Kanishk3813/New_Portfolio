import 'kleur/colors';
import { d as decodeKey } from './chunks/astro/server_C6QhqB1r.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D0F8LxM2.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/","cacheDir":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/node_modules/.astro/","outDir":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/dist/","srcDir":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/","publicDir":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/public/","buildClientDir":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/dist/client/","buildServerDir":"file:///C:/Users/kanis/Desktop/my_portfolio/Portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.0ayvgjd8.css"},{"type":"inline","content":".card-spotlight{position:relative;border-radius:1.5rem;border:1px solid #222;background-color:#111;padding:2rem;overflow:hidden;--mouse-x: 50%;--mouse-y: 50%;--spotlight-color: rgba(255, 255, 255, .05)}.card-spotlight:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at var(--mouse-x) var(--mouse-y),var(--spotlight-color),transparent 80%);opacity:0;transition:opacity .5s ease;pointer-events:none}.card-spotlight:hover:before,.card-spotlight:focus-within:before{opacity:.6}\n.focus-container{position:relative;display:flex;gap:1em;justify-content:center;align-items:center;flex-wrap:wrap}.focus-word{position:relative;font-size:3rem;font-weight:900;cursor:pointer;transition:filter .3s ease,color .3s ease}.focus-word.active{filter:blur(0)}.focus-frame{position:absolute;top:0;left:0;pointer-events:none;box-sizing:content-box;border:none}.corner{position:absolute;width:1rem;height:1rem;border:3px solid var(--border-color, #fff);filter:drop-shadow(0px 0px 4px var(--border-color, #fff));border-radius:3px;transition:none}.top-left{top:-10px;left:-10px;border-right:none;border-bottom:none}.top-right{top:-10px;right:-10px;border-left:none;border-bottom:none}.bottom-left{bottom:-10px;left:-10px;border-right:none;border-top:none}.bottom-right{bottom:-10px;right:-10px;border-left:none;border-top:none}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/kanis/Desktop/my_portfolio/Portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CyfoQ0sY.mjs","\u0000@astrojs-manifest":"manifest_C33sD5xL.mjs","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/Squares":"_astro/Squares.C9LPjgqx.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/ClickSparkWrapper":"_astro/ClickSparkWrapper.DJe211kQ.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/ResumeModal":"_astro/ResumeModal.8yQS87F8.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/SkillsList.tsx":"_astro/SkillsList.uzBq2Yx_.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/LetterGlitch.tsx":"_astro/LetterGlitch.CMDCk-9y.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/TrueFocus":"_astro/TrueFocus.Bzl5N9oU.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/FuzzyText":"_astro/FuzzyText.B3LmvTVN.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/ProjectCard":"_astro/ProjectCard.DqBrn679.js","@astrojs/react/client.js":"_astro/client.DieopR4X.js","C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/nav.astro?astro&type=script&index=0&lang.ts":"_astro/nav.astro_astro_type_script_index_0_lang.DivhmoFp.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/nav.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"main-nav\"),g=1e3;let a=null;function h(){if(window.scrollY>0){s?.classList.add(\"scrolling\");const i=Math.min(window.scrollY/g,1),o=1-Math.pow(1-i,4),e=528,t=window.innerWidth*.8,n=t-(t-e)*o;window.innerWidth>=768&&s?.style.setProperty(\"width\",`${n}px`)}else s?.classList.remove(\"scrolling\"),s?.style.setProperty(\"width\",\"80%\");a=null}window.addEventListener(\"scroll\",()=>{a||(a=requestAnimationFrame(h))},{passive:!0});function d(){const i=document.querySelectorAll(\"section[id]\"),o=document.querySelectorAll(\"nav a[href^='#']\"),e=window.scrollY+window.innerHeight/2;i.forEach(t=>{const n=t.getBoundingClientRect().top+window.scrollY,r=t.getBoundingClientRect().height,l=t.getAttribute(\"id\");if(e>=n&&e<n+r){o.forEach(u=>u.classList.remove(\"active\"));const c=document.querySelector(`nav a[href=\"#${l}\"]`);c&&c.classList.add(\"active\")}})}window.addEventListener(\"scroll\",d,{passive:!0});document.querySelectorAll('a[href^=\"#\"]').forEach(i=>{i.addEventListener(\"click\",function(o){o.preventDefault();const e=o.currentTarget,t=e.getAttribute(\"href\")?.substring(1)||\"\",n=document.getElementById(t);if(n){const r=s?.offsetHeight||0,l=n.getBoundingClientRect().top+window.pageYOffset-r;window.scrollTo({top:l,behavior:\"smooth\"}),document.querySelectorAll(\"nav a\").forEach(c=>c.classList.remove(\"active\")),e.classList.add(\"active\")}})});document.addEventListener(\"DOMContentLoaded\",d);"]],"assets":["/_astro/nptel.hkNn9QQk.png","/_astro/parseflow.B5yYsC0y.png","/_astro/intel.DEna_HIX.png","/_astro/intel1.PuN_DjC3.png","/_astro/taskx.IUe2kDuy.png","/_astro/index.0ayvgjd8.css","/intel.png","/intel1.png","/nptel.png","/parseflow.png","/ResumeDoc.pdf","/taskx.png","/svg/astro.svg","/svg/aws.svg","/svg/bash.svg","/svg/bootstrap.svg","/svg/capacitor.svg","/svg/CSS3.svg","/svg/firebase.svg","/svg/flask.svg","/svg/git.svg","/svg/HTML5.svg","/svg/javaScript.svg","/svg/mysql.svg","/svg/next.svg","/svg/nodejs.svg","/svg/postgresql.svg","/svg/python.svg","/svg/pytorch.svg","/svg/react.svg","/svg/supabase.svg","/svg/tailwindcss.svg","/svg/tensorflow.svg","/svg/typeScript.svg","/svg/vercel.svg","/svg/vue.svg","/_astro/ClickSparkWrapper.DJe211kQ.js","/_astro/client.DieopR4X.js","/_astro/FuzzyText.B3LmvTVN.js","/_astro/index.Bv2DO4vj.js","/_astro/index.BVOCwoKb.js","/_astro/index.C4Ye4We-.css","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/LetterGlitch.CMDCk-9y.js","/_astro/ProjectCard.DqBrn679.js","/_astro/ResumeModal.8yQS87F8.js","/_astro/SkillsList.uzBq2Yx_.js","/_astro/Squares.C9LPjgqx.js","/_astro/TrueFocus.Bzl5N9oU.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"4MPbaPbL7WD/v/r5q1DHPEsWPMuILDLGpTOwiMIDsM0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
