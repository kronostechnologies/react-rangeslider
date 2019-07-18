!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define("ReactRangeslider",["react","ReactDOM"],t):"object"==typeof exports?exports.ReactRangeslider=t(require("react"),require("react-dom")):e.ReactRangeslider=t(e.React,e.ReactDOM)}(window,function(e,t){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/bundle/",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=s(n(1)),i=s(n(2)),a=n(3),u=s(n(4));function s(e){return e&&e.__esModule?e:{default:e}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){return e.charAt(0).toUpperCase()+e.substr(1)}function d(e){e.type.includes("touch")||(e.stopPropagation(),e.preventDefault())}var f={orientation:{horizontal:{dimension:"width",direction:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",coordinate:"y"}}},p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.fill_anchor_range=20,n.state={limit:0,grab:0},n.handleDrag=n.handleDrag.bind(n),n.handleEnd=n.handleEnd.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),o(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",function(t){return e.handleUpdate(t)}),this.handleUpdate(),this.fill_anchor_range=.017*this.props.max}},{key:"componentWillUnmount",value:function(){var e=this;window.removeEventListener("resize",function(t){return e.handleUpdate(t)})}},{key:"showTooltip",value:function(){}},{key:"handleUpdate",value:function(){if(this.slider){var e=this.props.orientation,t=c(f.orientation[e].dimension),n=(0,a.findDOMNode)(this.slider)["offset"+t],o=(0,a.findDOMNode)(this.handle)["offset"+t];this.setState({limit:n-o,grab:o/2})}}},{key:"handleStart",value:function(){document.addEventListener("mousemove",this.handleDrag),document.addEventListener("touchmove",this.handleDrag),document.addEventListener("mouseup",this.handleEnd),document.addEventListener("touchend",this.handleEnd)}},{key:"handleDrag",value:function(e){d(e);var t=this.props,n=t.onChange,o=t.fill,r=void 0;n||console.warn("No onChange was specified for selected slider."),r=this.position(e),o&&r<o+this.fill_anchor_range&&r>o-this.fill_anchor_range&&(r=o),n&&n(r)}},{key:"handleEnd",value:function(e){d(e),this.props.onHandleRelease&&this.props.onHandleRelease(),document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("touchmove",this.handleDrag),document.removeEventListener("mouseup",this.handleEnd),document.removeEventListener("touchend",this.handleEnd)}},{key:"getPositionFromValue",value:function(e){var t=this.state.limit,n=this.props,o=n.min,r=(e-o)/(n.max-o);return Math.round(r*t)}},{key:"getValueFromPosition",value:function(e){var t=this.state.limit,n=this.props,o=n.orientation,r=n.min,i=n.max,a=n.step,u=function(e,t,n){return e<t?t:e>n?n:e}(e,0,t)/(t||1);return"horizontal"===o?a*Math.round(u*(i-r)/a)+r:i-(a*Math.round(u*(i-r)/a)+r)}},{key:"position",value:function(e){var t=this.state.grab,n=this.props.orientation,o=(0,a.findDOMNode)(this.slider),r=f.orientation[n].coordinate,i=f.orientation[n].direction,u=(e.touches?e.touches[0]["client"+c(r)]:e["client"+c(r)])-o.getBoundingClientRect()[i]-t;return this.getValueFromPosition(u)}},{key:"coordinates",value:function(e){var t=this.state,n=t.limit,o=t.grab,r=this.props,i=r.orientation,a=r.fill,u=r.max,s=this.getValueFromPosition(e),l=this.getPositionFromValue(s),c=void 0;c="horizontal"===i?l+o:n-l+o;var d=0;return a>0&&a<u?d=this.getPositionFromValue(a)+o:a>=u&&(d=this.getPositionFromValue(u)+2*o),{fill:a>=0?d:c,handle:l}}},{key:"render",value:function(){var e=this,t=this.props,n=t.value,o=t.orientation,a=t.className,u=f.orientation[o].dimension,s=f.orientation[o].direction,c=this.getPositionFromValue(n),p=this.coordinates(c),h=l({},u,p.fill+"px"),m=l({},s,p.handle+"px");return r.default.createElement("div",{ref:function(t){return e.slider=t},className:(0,i.default)("rangeslider ","rangeslider-"+o,a),onMouseDown:this.props.disabled?function(){}:function(t){return e.handleDrag(t)},onTouchStart:this.props.disabled?function(){}:function(t){return e.handleStart(t)},onClick:this.props.disabled?function(){}:function(t){return e.props.onClick(t)},disabled:this.props.disabled},r.default.createElement("div",{ref:function(t){return e.fill=t},className:"rangeslider__fill",style:h,onMouseOver:function(t){return e.showTooltip(t)}}),r.default.createElement("div",{ref:function(t){return e.handle=t},className:"rangeslider__handle",onMouseDown:this.props.disabled?function(){}:function(t){return e.handleStart(t)},onTouchStart:this.props.disabled?function(){}:function(t){return e.handleStart(t)},onTouchMove:this.props.disabled?function(){}:function(t){return e.handleDrag(t)},onClick:this.props.disabled?function(){}:function(e){return d(e)},style:m}))}}]),t}();p.propTypes={min:u.default.number,max:u.default.number,step:u.default.number,value:u.default.number,orientation:u.default.string,className:u.default.string,disabled:u.default.bool,onHandleRelease:u.default.func,onChange:u.default.func,onClick:u.default.func},p.defaultProps={min:0,max:100,step:1,value:0,orientation:"horizontal",disabled:!1,onClick:function(){return null}},t.default=p},function(t,n){t.exports=e},function(e,t,n){var o;
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var i=typeof o;if("string"===i||"number"===i)e.push(o);else if(Array.isArray(o))e.push(r.apply(null,o));else if("object"===i)for(var a in o)n.call(o,a)&&o[a]&&e.push(a)}}return e.join(" ")}void 0!==e&&e.exports?e.exports=r:void 0===(o=function(){return r}.apply(t,[]))||(e.exports=o)}()},function(e,n){e.exports=t},function(e,t,n){e.exports=n(5)()},function(e,t,n){"use strict";var o=n(6);function r(){}e.exports=function(){function e(e,t,n,r,i,a){if(a!==o){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=r,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}])});