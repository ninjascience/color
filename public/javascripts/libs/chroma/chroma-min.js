/**
    chroma.js - a neat JS lib for color conversions
    Copyright (C) 2011  Gregor Aisch

	The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.  
    
    @source: https://github.com/gka/chroma.js
    
**/
(function(){var a,b,c,d,e,f,g,h,i,j,k,l=Object.prototype.hasOwnProperty,m=function(a,b){function d(){this.constructor=a}for(var c in b)l.call(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};h=typeof exports!="undefined"&&exports!==null?exports:this,g=(j=h.chroma)!=null?j:h.chroma={},typeof module!="undefined"&&module!==null&&(module.exports=g),g.version="0.2.5",c=function(){function a(b,c,d,e){var f,g;f=this,b==null&&c==null&&d==null&&e==null&&(b=[255,0,255]),i(b)==="array"&&b.length===3&&(e==null&&(e=c),g=b,b=g[0],c=g[1],d=g[2]),i(b)==="string"?e="hex":e==null&&(e="rgb"),e==="rgb"?f.rgb=[b,c,d]:e==="hsl"?f.rgb=a.hsl2rgb(b,c,d):e==="hsv"?f.rgb=a.hsv2rgb(b,c,d):e==="hex"?f.rgb=a.hex2rgb(b):e==="lab"?f.rgb=a.lab2rgb(b,c,d):e==="csl"?f.rgb=a.csl2rgb(b,c,d):e==="hsi"&&(f.rgb=a.hsi2rgb(b,c,d))}return a.prototype.hex=function(){return a.rgb2hex(this.rgb)},a.prototype.toString=function(){return this.hex()},a.prototype.hsl=function(){return a.rgb2hsl(this.rgb)},a.prototype.hsv=function(){return a.rgb2hsv(this.rgb)},a.prototype.lab=function(){return a.rgb2lab(this.rgb)},a.prototype.csl=function(){return a.rgb2csl(this.rgb)},a.prototype.hsi=function(){return a.rgb2hsi(this.rgb)},a.prototype.interpolate=function(b,c,d){var e,f,g,h,j,k,l,m,n,o,p,q,r;m=this,d==null&&(d="rgb"),i(c)==="string"&&(c=new a(c));if(d==="hsl"||d==="hsv"||d==="csl"||d==="hsi"){d==="hsl"?(q=m.hsl(),r=c.hsl()):d==="hsv"?(q=m.hsv(),r=c.hsv()):d==="csl"?(q=m.csl(),r=c.csl()):d==="hsi"&&(q=m.hsi(),r=c.hsi()),g=q[0],o=q[1],k=q[2],h=r[0],p=r[1],l=r[2];if(!isNaN(g)&&!isNaN(h))h>g&&h-g>180?e=h-(g+360):h<g&&g-h>180?e=h+360-g:e=h-g,f=g+b*e;else if(!isNaN(g)){f=g;if(l===1||l===0)n=o}else if(!isNaN(h)){f=h;if(k===1||k===0)n=p}else f=void 0;return n==null&&(n=o+b*(p-o)),j=k+b*(l-k),new a(f,n,j,d)}if(d==="rgb")return q=m.rgb,r=c.rgb,new a(q[0]+b*(r[0]-q[0]),q[1]+b*(r[1]-q[1]),q[2]+b*(r[2]-q[2]),d);if(d==="lab")return q=m.lab(),r=c.lab(),new a(q[0]+b*(r[0]-q[0]),q[1]+b*(r[1]-q[1]),q[2]+b*(r[2]-q[2]),d);throw"color mode "+d+" is not supported"},a}(),c.hex2rgb=function(a){var b,c,d,e;if(!a.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))if(g.colors!=null&&g.colors[a])a=g.colors[a];else throw"unknown color format: "+a;if(a.length===4||a.length===7)a=a.substr(1);return a.length===3&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),e=parseInt(a,16),d=e>>16,c=e>>8&255,b=e&255,[d,c,b]},c.rgb2hex=function(a,b,c){var d,e,f;return a!==void 0&&a.length===3&&(f=a,a=f[0],b=f[1],c=f[2]),e=a<<16|b<<8|c,d="000000"+e.toString(16).toUpperCase(),"#"+d.substr(d.length-6)},c.hsv2rgb=function(a,b,c){var d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t;i(a)==="array"&&a.length===3&&(n=a,a=n[0],b=n[1],h=n[2]),c*=255;if(b===0&&isNaN(a))l=f=d=c;else{a===360&&(a=0),a>360&&(a-=360),a<0&&(a+=360),a/=60,g=Math.floor(a),e=a-g,j=c*(1-b),k=c*(1-b*e),m=c*(1-b*(1-e));switch(g){case 0:o=[c,m,j],l=o[0],f=o[1],d=o[2];break;case 1:p=[k,c,j],l=p[0],f=p[1],d=p[2];break;case 2:q=[j,c,m],l=q[0],f=q[1],d=q[2];break;case 3:r=[j,k,c],l=r[0],f=r[1],d=r[2];break;case 4:s=[m,j,c],l=s[0],f=s[1],d=s[2];break;case 5:t=[c,j,k],l=t[0],f=t[1],d=t[2]}}return l=Math.round(l),f=Math.round(f),d=Math.round(d),[l,f,d]},c.rgb2hsv=function(a,b,c){var d,e,f,g,h,i,j;return a!==void 0&&a.length===3&&(j=a,a=j[0],b=j[1],c=j[2]),g=Math.min(a,b,c),f=Math.max(a,b,c),d=f-g,i=f/255,h=d/f,h===0?(e=void 0,h=0):(a===f&&(e=(b-c)/d),b===f&&(e=2+(c-a)/d),c===f&&(e=4+(a-b)/d),e*=60,e<0&&(e+=360)),[e,h,i]},c.hsl2rgb=function(a,b,c){var d,e,f,g,h,i,j,k,l,m;a!==void 0&&a.length===3&&(l=a,a=l[0],b=l[1],c=l[2]);if(b===0)h=f=d=c*255;else{k=[0,0,0],e=[0,0,0],j=c<.5?c*(1+b):c+b-c*b,i=2*c-j,a/=360,k[0]=a+1/3,k[1]=a,k[2]=a-1/3;for(g=0;g<=2;g++)k[g]<0&&(k[g]+=1),k[g]>1&&(k[g]-=1),6*k[g]<1?e[g]=i+(j-i)*6*k[g]:2*k[g]<1?e[g]=j:3*k[g]<2?e[g]=i+(j-i)*(2/3-k[g])*6:e[g]=i;m=[Math.round(e[0]*255),Math.round(e[1]*255),Math.round(e[2]*255)],h=m[0],f=m[1],d=m[2]}return[h,f,d]},c.rgb2hsl=function(a,b,c){var d,e,f,g,h,i;return a!==void 0&&a.length===3&&(i=a,a=i[0],b=i[1],c=i[2]),a/=255,b/=255,c/=255,g=Math.min(a,b,c),f=Math.max(a,b,c),e=(f+g)/2,f===g?(h=0,d=void 0):h=e<.5?(f-g)/(f+g):(f-g)/(2-f-g),a===f?d=(b-c)/(f-g):b===f?d=2+(c-a)/(f-g):c===f&&(d=4+(a-b)/(f-g)),d*=60,d<0&&(d+=360),[d,h,e]},c.lab2xyz=function(a,b,c){var d,e,f,g,h,j,k;return i(a)==="array"&&a.length===3&&(k=a,a=k[0],b=k[1],c=k[2]),d=function(a){return a>6/29?a*a*a:3*(6/29)*(6/29)*(a-4/29)},f=(a+.16)/1.16,e=[.96421,1,.82519],h=e[1]*d(f),g=e[0]*d(f+b/5),j=e[2]*d(f-c/2),[g,h,j]},c.xyz2rgb=function(a,b,c){var d,e,f,g,h,j,k,l,m,n;return i(a)==="array"&&a.length===3&&(m=a,a=m[0],b=m[1],c=m[2]),l=3.2406*a-1.5372*b-.4986*c,j=-0.9689*a+1.8758*b+.0415*c,e=.0557*a-.204*b+1.057*c,f=Math.min(l,j,e)<-0.001||Math.max(l,j,e)>1.001,f&&(l=l<0?0:l>1?1:l,j=j<0?0:j>1?1:j,e=e<0?0:e>1?1:e),f&&(n=[void 0,void 0,void 0],l=n[0],j=n[1],e=n[2]),g=function(a){var b;return b=.055,a<=.0031308?12.92*a:(1+b)*Math.pow(a,1/2.4)-b},k=Math.round(255*g(l)),h=Math.round(255*g(j)),d=Math.round(255*g(e)),[k,h,d]},c.lab2rgb=function(a,b,d){var e,f,g,h,i,j;return a!==void 0&&a.length===3&&(h=a,a=h[0],b=h[1],d=h[2]),a!==void 0&&a.length===3&&(i=a,a=i[0],b=i[1],d=i[2]),j=c.lab2xyz(a,b,d),e=j[0],f=j[1],g=j[2],c.xyz2rgb(e,f,g)},c.csl2lab=function(a,b,c){var d,e,f,g,h,j,k;return i(a)==="array"&&a.length===3&&(k=a,a=k[0],b=k[1],c=k[2]),a/=360,e=6.283185307179586,d=c*.61+.09,g=e/6-a*e,j=(c*.311+.125)*b,f=Math.sin(g)*j,h=Math.cos(g)*j,[d,f,h]},c.csl2rgb=function(a,b,d){var e,f,g,h;return h=c.csl2lab(a,b,d),e=h[0],f=h[1],g=h[2],c.lab2rgb(e,f,g)},c.rgb2xyz=function(a,b,c){var d,e,f,g,h,i,j,k;return a!==void 0&&a.length===3&&(k=a,a=k[0],b=k[1],c=k[2]),e=function(a){var b;return b=.055,a<=.04045?a/12.92:Math.pow((a+b)/(1+b),2.4)},g=e(a/255),f=e(b/255),d=e(c/255),h=.4124*g+.3576*f+.1805*d,i=.2126*g+.7152*f+.0722*d,j=.0193*g+.1192*f+.9505*d,[h,i,j]},c.xyz2lab=function(a,b,c){var d,e,f,g,h,i;return a!==void 0&&a.length===3&&(i=a,a=i[0],b=i[1],c=i[2]),g=[.96421,1,.82519],f=function(a){return a>Math.pow(6/29,3)?Math.pow(a,1/3):7.787037037037035*a+4/29},h=1.16*f(b/g[1])-.16,d=5*(f(a/g[0])-f(b/g[1])),e=2*(f(b/g[1])-f(c/g[2])),[h,d,e]},c.rgb2lab=function(a,b,d){var e,f,g,h,i;return a!==void 0&&a.length===3&&(h=a,a=h[0],b=h[1],d=h[2]),i=c.rgb2xyz(a,b,d),e=i[0],f=i[1],g=i[2],c.xyz2lab(e,f,g)},c.lab2csl=function(a,b,c){var d,e,f,g,h,j,k;return i(a)==="array"&&a.length===3&&(k=a,a=k[0],b=k[1],c=k[2]),d=a,a=(a-.09)/.61,h=Math.sqrt(b*b+c*c),j=h/(a*.311+.125),e=6.283185307179586,f=Math.atan2(b,c),g=(e/6-f)/e,g*=360,g<0&&(g+=360),[g,j,a]},c.rgb2csl=function(a,b,d){var e,f,g,h;return i(a)==="array"&&a.length===3&&(g=a,a=g[0],b=g[1],d=g[2]),h=c.rgb2lab(a,b,d),f=h[0],e=h[1],d=h[2],c.lab2csl(f,e,d)},c.rgb2hsi=function(a,b,c){var d,e,f,g,h,j;return i(a)==="array"&&a.length===3&&(j=a,a=j[0],b=j[1],c=j[2]),d=Math.PI*2,a/=255,b/=255,c/=255,g=Math.min(a,b,c),f=(a+b+c)/3,h=1-g/f,h===0?e=0:(e=(a-b+(a-c))/2,e/=Math.sqrt((a-b)*(a-b)+(a-c)*(b-c)),e=Math.acos(e),c>b&&(e=d-e),e/=d),[e*360,h,f]},c.hsi2rgb=function(a,b,c){var d,e,f,g,h,j,k;return i(a)==="array"&&a.length===3&&(k=a,a=k[0],b=k[1],c=k[2]),e=Math.PI*2,d=Math.PI/3,g=Math.cos,a<0&&(a+=360),a>360&&(a-=360),a/=360,a<1/3?(f=(1-b)/3,j=(1+b*g(e*a)/g(d-e*a))/3,h=1-(f+j)):a<2/3?(a-=1/3,j=(1-b)/3,h=(1+b*g(e*a)/g(d-e*a))/3,f=1-(j+h)):(a-=2/3,h=(1-b)/3,f=(1+b*g(e*a)/g(d-e*a))/3,j=1-(h+f)),j=c*j*3,h=c*h*3,f=c*f*3,[j*255,h*255,f*255]},g.Color=c,g.hsl=function(a,b,d){return new c(a,b,d,"hsl")},g.hsv=function(a,b,d){return new c(a,b,d,"hsv")},g.rgb=function(a,b,d){return new c(a,b,d,"rgb")},g.hex=function(a){return new c(a)},g.lab=function(a,b,d){return new c(a,b,d,"lab")},g.csl=function(a,b,d){return new c(a,b,d,"csl")},g.hsi=function(a,b,d){return new c(a,b,d,"hsi")},g.interpolate=function(a,b,d,e){return i(a)==="string"&&(a=new c(a)),i(b)==="string"&&(b=new c(b)),a.interpolate(d,b,e)},d=function(){function a(a){var b,d,e,f,g,h,j,k,l,m;f=this,f.colors=e=(g=a.colors)!=null?g:["#ddd","#222"];for(b=0,h=e.length-1;0<=h?b<=h:b>=h;0<=h?b++:b--)d=e[b],i(d)==="string"&&(e[b]=new c(d));if(a.positions!=null)f.pos=a.positions;else{f.pos=[];for(b=0,j=e.length-1;0<=j?b<=j:b>=j;0<=j?b++:b--)f.pos.push(b/(e.length-1))}f.mode=(k=a.mode)!=null?k:"hsv",f.nacol=(l=a.nacol)!=null?l:"#ccc",f.setClasses((m=a.limits)!=null?m:[0,1]),f}return a.prototype.getColor=function(a){var b,c,d,e;return e=this,isNaN(a)?e.nacol:(e.classLimits.length>2?(b=e.getClass(a),c=b/(e.numClasses-1)):(c=d=(a-e.min)/(e.max-e.min),c=Math.min(1,Math.max(0,c))),e.fColor(c))},a.prototype.fColor=function(a){var b,c,d,e,f,h;e=this,c=e.colors;for(d=0,h=e.pos.length-1;0<=h?d<=h:d>=h;0<=h?d++:d--){f=e.pos[d];if(a<=f){b=c[d];break}if(a>=f&&d===e.pos.length-1){b=c[d];break}if(a>f&&a<e.pos[d+1]){a=(a-f)/(e.pos[d+1]-f),b=g.interpolate(c[d],c[d+1],a,e.mode);break}}return b},a.prototype.classifyValue=function(a){var b,c,d,e,f,g;return g=this,c=g.classLimits,c.length>2&&(f=c.length-1,b=g.getClass(a),a=c[b]+(c[b+1]-c[b])*.5,e=c[0],d=c[f-1],a=g.min+(a-e)/(d-e)*(g.max-g.min)),a},a.prototype.setClasses=function(a){var b;return a==null&&(a=[]),b=this,b.classLimits=a,b.min=a[0],b.max=a[a.length-1],a.length===2?b.numClasses=0:b.numClasses=a.length-1},a.prototype.getClass=function(a){var b,c,d,e;e=this,c=e.classLimits;if(c!=null){d=c.length-1,b=0;while(b<d&&a>=c[b])b++;return b-1}},a.prototype.validValue=function(a){return!isNaN(a)},a}(),g.ColorScale=d,f=function(){function a(b,c,d){b==null&&(b="#fe0000"),c==null&&(c="#feeeee"),d==null&&(d="hsl"),a.__super__.constructor.call(this,[b,c],[0,1],d)}return m(a,d),a}(),g.Ramp=f,e=function(){function a(b,c,d,e,f){var g;b==null&&(b="#d73027"),c==null&&(c="#ffffbf"),d==null&&(d="#1E6189"),e==null&&(e="mean"),f==null&&(f="hsl"),g=this,g.mode=f,g.center=e,a.__super__.constructor.call(this,[b,c,d],[0,.5,1],f)}return m(a,d),a.prototype.parseData=function(b,c){var d,e;return a.__super__.parseData.call(this,b,c),e=this,d=e.center,d==="median"?d=e.median:d==="mean"&&(d=e.mean),e.pos[1]=(d-e.min)/(e.max-e.min)},a}(),g.Diverging=e,b=function(){function a(a){var b;b=this,b.colors=a}return m(a,d),a.prototype.parseData=function(a,b){},a.prototype.getColor=function(a){var b;return b=this,b.colors.hasOwnProperty(a)?b.colors[a]:"#cccccc"},a.prototype.validValue=function(a){return this.colors.hasOwnProperty(a)},a}(),g.Categories=b,a=function(){function a(a){var b;b=this,b.name=a,b.setClasses(7),b}return m(a,d),a.prototype.getColor=function(a){var b,c;return c=this,b=c.getClass(a),c.name+" l"+c.numClasses+" c"+b},a}(),g.CSSColors=a,(k=g.scales)==null&&(g.scales={}),g.scales.cool=function(){return new f(g.hsl(180,1,.9),g.hsl(250,.7,.4))},g.scales.hot=function(){return new d({colors:["#000000","#ff0000","#ffff00","#ffffff"],positions:[0,.25,.75,1],mode:"rgb"})},g.scales.BlWhOr=function(){return new e(g.hsl(30,1,.55),"#ffffff",new c(220,1,.55))},g.scales.GrWhPu=function(){return new e(g.hsl(120,.8,.4),"#ffffff",new c(280,.8,.4))},g.limits=function(a,b,c,d){var e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W;b==null&&(b="equal"),c==null&&(c=7),d==null&&(d=null),r=Number.MAX_VALUE,q=Number.MAX_VALUE*-1,A=0,E=[];if(i(a)==="array")for(F=0,H=a.length;F<H;F++)C=a[F],isNaN(C)||E.push(C);else if(i(a)==="object")for(n in a)C=a[n],i(C)==="object"&&i(d)==="string"?isNaN(C[d])||E.push(C[d]):i(C)==="number"&&(isNaN(C)||E.push(C));for(G=0,I=E.length;G<I;G++){C=E[G];if(!isNaN(C))C<r&&(r=C),C>q&&(q=C),A+=C;else continue}E=E.sort(),p=[],b.substr(0,1)==="c"&&(p.push(r),p.push(q));if(b.substr(0,1)==="e"){p.push(r);for(l=1,Q=c-1;1<=Q?l<=Q:l>=Q;1<=Q?l++:l--)p.push(r+l/c*(q-r));p.push(q)}else if(b.substr(0,1)==="q"){p.push(r);for(l=1,R=c-1;1<=R?l<=R:l>=R;1<=R?l++:l--)w=E.length*l/c,x=Math.floor(w),x===w?p.push(E[x]):(y=w-x,p.push(E[x]*y+E[x+1]*(1-y)));p.push(q)}else if(b.substr(0,1)==="k"){t=E.length,e=new Array(t),j=new Array(c),z=!0,u=0,g=null,g=[],g.push(r);for(l=1,S=c-1;1<=S?l<=S:l>=S;1<=S?l++:l--)g.push(r+l/c*(q-r));g.push(q);while(z){for(m=0,T=c-1;0<=T?m<=T:m>=T;0<=T?m++:m--)j[m]=0;for(l=0,U=t-1;0<=U?l<=U:l>=U;0<=U?l++:l--){D=E[l],s=Number.MAX_VALUE;for(m=0,V=c-1;0<=V?m<=V:m>=V;0<=V?m++:m--)k=Math.abs(g[m]-D),k<s&&(s=k,f=m);j[f]++,e[l]=f}v=new Array(c);for(m=0,W=c-1;0<=W?m<=W:m>=W;0<=W?m++:m--)v[m]=null;for(l=0,J=t-1;0<=J?l<=J:l>=J;0<=J?l++:l--)h=e[l],v[h]===null?v[h]=E[l]:v[h]+=E[l];for(m=0,K=c-1;0<=K?m<=K:m>=K;0<=K?m++:m--)v[m]*=1/j[m];z=!1;for(m=0,L=c-1;0<=L?m<=L:m>=L;0<=L?m++:m--)if(v[m]!==g[l]){z=!0;break}g=v,u++,u>200&&(z=!1)}o={};for(m=0,M=c-1;0<=M?m<=M:m>=M;0<=M?m++:m--)o[m]=[];for(l=0,N=t-1;0<=N?l<=N:l>=N;0<=N?l++:l--)h=e[l],o[h].push(E[l]);B=[];for(m=0,O=c-1;0<=O?m<=O:m>=O;0<=O?m++:m--)B.push(o[m][0]),B.push(o[m][o[m].length-1]);B=B.sort(function(a,b){return a-b}),p.push(B[0]);for(l=1,P=B.length-1;l<=P;l+=2)isNaN(B[l])||p.push(B[l])}return p},i=function(){var a,b,c,d,e;a={},e="Boolean Number String Function Array Date RegExp Undefined Null".split(" ");for(c=0,d=e.length;c<d;c++)b=e[c],a["[object "+b+"]"]=b.toLowerCase();return function(b){var c;return c=Object.prototype.toString.call(b),a[c]||"object"}}(),h=typeof exports!="undefined"&&exports!==null?exports:this,h.type=i,Array.max=function(a){return Math.max.apply(Math,a)},Array.min=function(a){return Math.min.apply(Math,a)}}).call(this)