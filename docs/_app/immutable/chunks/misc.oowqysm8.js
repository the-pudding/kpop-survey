import{t as $,a as C}from"./index.CJ5pUW9h.js";import{w as R,x as F}from"./scheduler.IdCzA-zq.js";import{r as z,w as g}from"./paths.B1cbBfQ1.js";function he(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function ye(e,t){e.d(1),t.delete(e.key)}function we(e,t){$(e,1,1,()=>{t.delete(e.key)})}function pe(e,t,s,m,y,w,f,o,l,p,S,b){let a=e.length,d=w.length,u=a;const T={};for(;u--;)T[e[u].key]=u;const v=[],h=new Map,I=new Map,_=[];for(u=d;u--;){const n=b(y,w,u),i=s(n);let c=f.get(i);c?m&&_.push(()=>c.p(n,t)):(c=p(i,n),c.c()),h.set(i,v[u]=c),i in T&&I.set(i,Math.abs(u-T[i]))}const E=new Set,j=new Set;function r(n){C(n,1),n.m(o,S),f.set(n.key,n),S=n.first,d--}for(;a&&d;){const n=v[d-1],i=e[a-1],c=n.key,x=i.key;n===i?(S=n.first,a--,d--):h.has(x)?!f.has(c)||E.has(c)?r(n):j.has(x)?a--:I.get(c)>I.get(x)?(j.add(c),r(n)):(E.add(x),a--):(l(i,f),a--)}for(;a--;){const n=e[a];h.has(n.key)||l(n,f)}for(;d;)r(v[d-1]);return R(_),v}let O;const N=()=>{if(O!==void 0)return O;try{const e=window.localStorage,t="__storage_test__";e.setItem(t,t),e.removeItem(t),O=!0}catch{O=!1}finally{return O}},B=e=>{if(N())try{localStorage.removeItem(e)}catch(t){console.log(t)}},H=(e,t)=>{if(N())try{localStorage.setItem(e,JSON.stringify(t))}catch(s){console.log(s)}},P=e=>{if(N())try{return JSON.parse(localStorage.getItem(e))}catch(t){console.log(t);return}},be={set:H,get:P,remove:B};var k=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function D(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var G="Expected a function",A=NaN,J="[object Symbol]",V=/^\s+|\s+$/g,U=/^[-+]0x[0-9a-f]+$/i,X=/^0b[01]+$/i,q=/^0o[0-7]+$/i,K=parseInt,Q=typeof k=="object"&&k&&k.Object===Object&&k,Y=typeof self=="object"&&self&&self.Object===Object&&self,Z=Q||Y||Function("return this")(),ee=Object.prototype,te=ee.toString,ne=Math.max,re=Math.min,M=function(){return Z.Date.now()};function ie(e,t,s){var m,y,w,f,o,l,p=0,S=!1,b=!1,a=!0;if(typeof e!="function")throw new TypeError(G);t=W(t)||0,L(s)&&(S=!!s.leading,b="maxWait"in s,w=b?ne(W(s.maxWait)||0,t):w,a="trailing"in s?!!s.trailing:a);function d(r){var n=m,i=y;return m=y=void 0,p=r,f=e.apply(i,n),f}function u(r){return p=r,o=setTimeout(h,t),S?d(r):f}function T(r){var n=r-l,i=r-p,c=t-n;return b?re(c,w-i):c}function v(r){var n=r-l,i=r-p;return l===void 0||n>=t||n<0||b&&i>=w}function h(){var r=M();if(v(r))return I(r);o=setTimeout(h,T(r))}function I(r){return o=void 0,a&&m?d(r):(m=y=void 0,f)}function _(){o!==void 0&&clearTimeout(o),p=0,m=l=y=o=void 0}function E(){return o===void 0?f:I(M())}function j(){var r=M(),n=v(r);if(m=arguments,y=this,l=r,n){if(o===void 0)return u(l);if(b)return o=setTimeout(h,t),d(l)}return o===void 0&&(o=setTimeout(h,t)),f}return j.cancel=_,j.flush=E,j}function L(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function se(e){return!!e&&typeof e=="object"}function oe(e){return typeof e=="symbol"||se(e)&&te.call(e)==J}function W(e){if(typeof e=="number")return e;if(oe(e))return A;if(L(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=L(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(V,"");var s=X.test(e);return s||q.test(e)?K(e.slice(2),s?2:8):U.test(e)?A:+e}var ae=ie;const ce=D(ae),fe=()=>{var e;return((e=window==null?void 0:window.visualViewport)==null?void 0:e.width)||document.documentElement.clientWidth},de=()=>{var e;return((e=window==null?void 0:window.visualViewport)==null?void 0:e.height)||document.documentElement.clientHeight},le=z({width:0,height:0},e=>{const t=()=>e({width:fe(),height:de()});return t(),window.addEventListener("resize",ce(t,250)),()=>{window.removeEventListener("resize",t)}});g(F(le).width<=500);const ve=g("intro"),Se=g(),Ie=g(0),je=g(),Te=g(!1),Oe=g(),_e=g([]),Ee=g(!1);export{_e as a,Oe as b,Ie as c,pe as d,he as e,ye as f,D as g,je as h,Te as i,be as l,we as o,ve as s,Ee as t,Se as u,le as v};
