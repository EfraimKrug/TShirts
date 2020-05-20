var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.checkEs6ConformanceViaProxy=function(){try{var a={},c=Object.create(new $jscomp.global.Proxy(a,{get:function(b,d,e){return b==a&&"q"==d&&e==c}}));return!0===c.q}catch(b){return!1}};$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS=!1;$jscomp.ES6_CONFORMANCE=$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS&&$jscomp.checkEs6ConformanceViaProxy();$jscomp.arrayIteratorImpl=function(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};
$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};$jscomp.polyfill=function(a,c,b,d){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,d):$jscomp.polyfillUnisolated(a,c,b,d))};
$jscomp.polyfillUnisolated=function(a,c,b,d){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in b||(b[e]={});b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,b,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var g=0;g<e.length-1;g++){var f=e[g];f in d||(d[f]={});d=d[f]}e=e[e.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?d[e]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:c}):c!==b&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=$jscomp.propertyToPolyfillSymbol[e],
$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:c})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var c=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};c.prototype.toString=function(){return this.$jscomp$symbol$id_};var b=0,d=function(a){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(a||"")+"_"+b++,a)};return d},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var c="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),b=0;b<c.length;b++){var d=$jscomp.global[c[b]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};$jscomp.owns=function(a,c){return Object.prototype.hasOwnProperty.call(a,c)};
$jscomp.polyfill("WeakMap",function(a){function c(){if(!a||!Object.seal)return!1;try{var b=Object.seal({}),c=Object.seal({}),d=new a([[b,2],[c,3]]);if(2!=d.get(b)||3!=d.get(c))return!1;d.delete(b);d.set(c,4);return!d.has(b)&&4==d.get(c)}catch(l){return!1}}function b(){}function d(a){var b=typeof a;return"object"===b&&null!==a||"function"===b}function e(a){if(!$jscomp.owns(a,f)){var c=new b;$jscomp.defineProperty(a,f,{value:c})}}function g(a){var c=Object[a];c&&(Object[a]=function(a){if(a instanceof
b)return a;e(a);return c(a)})}if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(a&&$jscomp.ES6_CONFORMANCE)return a}else if(c())return a;var f="$jscomp_hidden_"+Math.random();g("freeze");g("preventExtensions");g("seal");var h=0,k=function(a){this.id_=(h+=Math.random()+1).toString();if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)b=b.value,this.set(b[0],b[1])}};k.prototype.set=function(a,b){if(!d(a))throw Error("Invalid WeakMap key");e(a);if(!$jscomp.owns(a,f))throw Error("WeakMap key fail: "+
a);a[f][this.id_]=b;return this};k.prototype.get=function(a){return d(a)&&$jscomp.owns(a,f)?a[f][this.id_]:void 0};k.prototype.has=function(a){return d(a)&&$jscomp.owns(a,f)&&$jscomp.owns(a[f],this.id_)};k.prototype.delete=function(a){return d(a)&&$jscomp.owns(a,f)&&$jscomp.owns(a[f],this.id_)?delete a[f][this.id_]:!1};return k},"es6","es3");$jscomp.MapEntry=function(){};
$jscomp.polyfill("Map",function(a){function c(){if($jscomp.ASSUME_NO_NATIVE_MAP||!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([[b,"s"]]));if("s"!=c.get(b)||1!=c.size||c.get({x:4})||c.set({x:4},"t")!=c||2!=c.size)return!1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||"s"!=e.value[1])return!1;e=d.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!d.next().done?!1:!0}catch(l){return!1}}
if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(a&&$jscomp.ES6_CONFORMANCE)return a}else if(c())return a;var b=new WeakMap,d=function(a){this.data_={};this.head_=f();this.size=0;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)b=b.value,this.set(b[0],b[1])}};d.prototype.set=function(a,b){a=0===a?0:a;var c=e(this,a);c.list||(c.list=this.data_[c.id]=[]);c.entry?c.entry.value=b:(c.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:a,value:b},c.list.push(c.entry),
this.head_.previous.next=c.entry,this.head_.previous=c.entry,this.size++);return this};d.prototype.delete=function(a){a=e(this,a);return a.entry&&a.list?(a.list.splice(a.index,1),a.list.length||delete this.data_[a.id],a.entry.previous.next=a.entry.next,a.entry.next.previous=a.entry.previous,a.entry.head=null,this.size--,!0):!1};d.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=f();this.size=0};d.prototype.has=function(a){return!!e(this,a).entry};d.prototype.get=function(a){return(a=
e(this,a).entry)&&a.value};d.prototype.entries=function(){return g(this,function(a){return[a.key,a.value]})};d.prototype.keys=function(){return g(this,function(a){return a.key})};d.prototype.values=function(){return g(this,function(a){return a.value})};d.prototype.forEach=function(a,b){for(var c=this.entries(),d;!(d=c.next()).done;)d=d.value,a.call(b,d[1],d[0],this)};d.prototype[Symbol.iterator]=d.prototype.entries;var e=function(a,c){var d=c&&typeof c;"object"==d||"function"==d?b.has(c)?d=b.get(c):
(d=""+ ++h,b.set(c,d)):d="p_"+c;var e=a.data_[d];if(e&&$jscomp.owns(a.data_,d))for(a=0;a<e.length;a++){var f=e[a];if(c!==c&&f.key!==f.key||c===f.key)return{id:d,list:e,index:a,entry:f}}return{id:d,list:e,index:-1,entry:void 0}},g=function(a,b){var c=a.head_;return $jscomp.iteratorPrototype(function(){if(c){for(;c.head!=a.head_;)c=c.previous;for(;c.next!=c.head;)return c=c.next,{done:!1,value:b(c)};c=null}return{done:!0,value:void 0}})},f=function(){var a={};return a.previous=a.next=a.head=a},h=0;
return d},"es6","es3");
$jscomp.polyfill("Set",function(a){function c(){if($jscomp.ASSUME_NO_NATIVE_SET||!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([b]));if(!c.has(b)||1!=c.size||c.add(b)!=c||1!=c.size||c.add({x:4})!=c||2!=c.size)return!1;var g=c.entries(),f=g.next();if(f.done||f.value[0]!=b||f.value[1]!=b)return!1;f=g.next();return f.done||f.value[0]==b||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:g.next().done}catch(h){return!1}}
if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(a&&$jscomp.ES6_CONFORMANCE)return a}else if(c())return a;var b=function(a){this.map_=new Map;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)this.add(b.value)}this.size=this.map_.size};b.prototype.add=function(a){a=0===a?0:a;this.map_.set(a,a);this.size=this.map_.size;return this};b.prototype.delete=function(a){a=this.map_.delete(a);this.size=this.map_.size;return a};b.prototype.clear=function(){this.map_.clear();this.size=0};b.prototype.has=
function(a){return this.map_.has(a)};b.prototype.entries=function(){return this.map_.entries()};b.prototype.values=function(){return this.map_.values()};b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(a,b){var c=this;this.map_.forEach(function(d){return a.call(b,d,d,c)})};return b},"es6","es3");
$jscomp.polyfill("Array.from",function(a){return a?a:function(a,b,d){b=null!=b?b:function(a){return a};var c=[],g="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if("function"==typeof g){a=g.call(a);for(var f=0;!(g=a.next()).done;)c.push(b.call(d,g.value,f++))}else for(g=a.length,f=0;f<g;f++)c.push(b.call(d,a[f],f));return c}},"es6","es3");
function touchUp(a){if(color=document.getElementById("Color-00"+a))fileNameD=color.getAttribute("default"+a),fileNameF=color.getAttribute("preview"+a),fileNameB=color.getAttribute("back"+a),Fimg=document.getElementById("frontImg"+a),Bimg=document.getElementById("backImg"+a),Fimg.src=fileNameF?fileNameF:fileNameD,Bimg.src=fileNameB?fileNameB:fileNameD}function keepProdID(a,c,b){return b=b.replace(/~prodNum~/g,c)}function addTitle(a,c,b){return b=b.replace(/~name~/,c)}
function addColors(a,c,b){var d="",e=0;colorCollection=[];for(var g=0,f=0;f<a.length;f++){sw=!1;co=a[f].name.substring(a[f].name.lastIndexOf("-")+1,a[f].name.lastIndexOf("/")).trim();for(var h=0;h<colorCollection.length;h++)colorCollection[h]==co&&(sw=!0);sw||(colorCollection.push(co),fileList=getFilesForColor(co.replace(/\s/g,"^"),a),colorHold=colorTemplate,fileList["default"]&&(colorHold=colorHold.replace(/~defaultFile~/,fileList["default"][0])),fileList.back&&(colorHold=colorHold.replace(/~backFile~/,
fileList.back[0])),fileList.preview&&(colorHold=colorHold.replace(/~previewFile~/,fileList.preview[0])),d+=colorHold.replace(/~sfx~/g,c).replace(/~color~/,co.replace(/\s/g,"^")).replace(/~iter~/g,getTwoDigits(g)).replace(/~rgb~/g,getRGB(co)).replace(/~hex~/g,getHex(co)).replace(/~col~/g,getSuffix(e)).replace(/~defaultFile~/,"").replace(/~backFile~/,"").replace(/~previewFile~/,""),g++,e++)}sizeListArray=getSizesForColor(co.replace(/\s/g,"^"),a);sizeList=sizeListArray[0];variantIDList=sizeListArray[1];
d=d.replace(/~allSizes~/g,sizeList);d=d.replace(/~allVariantSizes~/g,variantIDList);return b=b.replace(/~color~array~/,d)}
function getColorsForSize(a,c){colorCollection=[];for(var b=0;b<c.length;b++)color=c[b].name.substring(c[b].name.lastIndexOf("-")+1,c[b].name.lastIndexOf("/")).trim(),size=c[b].name.substring(c[b].name.lastIndexOf("/")+1).trim(),size==a&&colorCollection.push(color);b=new Set(colorCollection);a=Array.from(b);c="";for(b=0;b<a.length;b++)c+="'"+a[b].replace(/ /g,"^")+"',";return a=c.trim().replace(/.$/,"")}
function getPriceForSize(a,c){price="33.00";for(var b=0;b<c.length&&(price=c[b].retail_price,size=c[b].name.substring(c[b].name.lastIndexOf("/")+1).trim(),size!=a);b++);return price}
function addSizes(a,c,b){sizeButtons="";sizeCollection=[];for(var d=0;d<a.length;d++){sw=!1;sz=a[d].name.substring(a[d].name.lastIndexOf("/")+1).trim();for(var e=0;e<sizeCollection.length;e++)sizeCollection[e]==sz&&(sw=!0);sw||sizeCollection.push(sz)}sizeCollectionSorted=sortSizes(sizeCollection);for(d=0;d<sizeCollectionSorted.length;d++)colorList=getColorsForSize(sizeCollectionSorted[d],a),price=getPriceForSize(sizeCollectionSorted[d],a),sizeButtons+=sizeTemplate.replace(/~size~/g,sizeCollectionSorted[d]).replace(/~sfx~/g,
c).replace(/~price~/g,addDecimal(price)).replace(/~allColors~/g,colorList);return b=b.replace("~size~array~",sizeButtons)}
function getSizesForColor(a,c){sizeCollection=[];for(var b=0;b<c.length;b++)color=c[b].name.substring(c[b].name.lastIndexOf("-")+1,c[b].name.lastIndexOf("/")).trim(),size=c[b].name.substring(c[b].name.lastIndexOf("/")+1).trim(),variantID=c[b].id,color==a.replace("^"," ")&&sizeCollection.push([size,variantID]);b=new Set(sizeCollection);a=Array.from(b);var d=c="";for(b=0;b<a.length;b++)c&&(c+=","),c+="'"+a[b][0]+"'",d&&(d+=","),d+="['"+a[b][0].trim()+"','"+a[b][1]+"']";return[c,'"['+d+']"']}
function getFilesForColor(a,c){fileCollection={};for(var b=0;b<c.length;b++){color=c[b].name.substring(c[b].name.lastIndexOf("-")+1,c[b].name.lastIndexOf("/")).trim();for(var d=0;d<c[b].files.length;d++)fileCollection[c[b].files[d].type]=[c[b].files[d].preview_url,c[b].files[d].thumbnail_url];a||(a="White");if(color==a.replace(/\^/g," "))break}return fileCollection}
function changeImages(a,c,b){defaultFile=c["default"][0]?c["default"][0]:"";var d="~front~"+a,e="~back~"+a;a="~default~"+a;b=c.preview?b.replace(d,c.preview[0]):b.replace(d,defaultFile);b=c.back?b.replace(e,c.back[0]):b.replace(e,defaultFile);return b=c["default"]?b.replace(a,c["default"][0]):b.replace(a,defaultFile)}
function createNewProduct(a,c,b,d){var e=productSkel.replace(/~sfx~/g,a),g=document.getElementById("product"+a);c?(g.classList.remove("product"),g.classList.add("product2")):(g.classList.remove("product2"),g.classList.add("product"));e=addSizes(d,a,e);e=addColors(d,a,e);e=addTitle(a,b.name,e);e=keepProdID(a,b.id,e);e=changeImages(a,getFilesForColor("",d),e);g.innerHTML=e;work=document.getElementById("product-list");work.appendChild(g)}
function getVariantData(a,c){for(var b=0;b<a.Products.length;b++)if(a.Products[b].sync_product.id==c)return a.Products[b].sync_variants}var PAGE_MAX=9;
function buildPage(a){dropList=[169150005,170108821];count=0;continueSw=leftSide=!1;console.log(a);for(var c=0;c<a.ProductList.length;c++){for(var b=0;b<dropList.length;b++)dropList[b]==a.ProductList[c].id&&(continueSw=!0);if(continueSw)continueSw=!1;else if(sfx=getSuffix(count),count++,getVariantData(a,a.ProductList[c].id),createNewProduct(sfx,leftSide,a.ProductList[c],getVariantData(a,a.ProductList[c].id)),leftSide=flipSide(leftSide),count>PAGE_MAX)break}countryList=document.getElementById("countryList");
apiCall(moveCountryData,"countries")};