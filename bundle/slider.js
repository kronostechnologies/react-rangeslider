!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react-dom"),require("react")):"function"==typeof define&&define.amd?define("ReactRangeslider",["ReactDOM","react"],t):"object"==typeof exports?exports.ReactRangeslider=t(require("react-dom"),require("react")):e.ReactRangeslider=t(e.ReactDOM,e.React)}(this,function(e,t){return function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var i={};return t.m=e,t.c=i,t.p="/bundle/",t(0)}([function(e,t,i){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e){return e.charAt(0).toUpperCase()+e.substr(1)}function r(e,t,i){return e<t?t:e>i?i:e}var s=i(1),a=i(2).findDOMNode,l=i(3),d=i(3).PropTypes,p={orientation:{horizontal:{dimension:"width",direction:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",coordinate:"y"}}},u=l.createClass({displayName:"Slider",fill_anchor_range:20,getInitialState:function(){return{limit:0,grab:0}},componentDidMount:function(){window.addEventListener("resize",this.handleUpdate),this.handleUpdate(),this.fill_anchor_range=.017*this.props.max},componentWillUnmount:function(){window.removeEventListener("resize",this.handleUpdate)},showTooltip:function(){},handleUpdate:function(){var e=this.props.orientation,t=o(p.orientation[e].dimension),i=a(this.slider)["offset"+t],n=a(this.handle)["offset"+t];this.setState({limit:i-n,grab:n/2})},handleStart:function(){document.addEventListener("mousemove",this.handleDrag),document.addEventListener("mouseup",this.handleEnd)},handleDrag:function(e){this.handleNoop(e);var t=void 0,i=this.props.onChange;i||console.warn("No onChange was specified for selected slider."),t=this.position(e),this.props.fill&&t<this.props.fill+this.fill_anchor_range&&t>this.props.fill-this.fill_anchor_range&&(t=this.props.fill),i&&i(t)},handleEnd:function(e){this.props.onHandleRelease&&this.props.onHandleRelease(),document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("mouseup",this.handleEnd)},handleNoop:function(e){e.stopPropagation(),e.preventDefault()},getPositionFromValue:function(e){var t=void 0,i=void 0,n=this.state.limit,o=this.props,r=o.min,s=o.max;return t=(e-r)/(s-r),i=Math.round(t*n)},getValueFromPosition:function(e){var t=void 0,i=void 0,n=this.state.limit,o=this.props,s=o.orientation,a=o.min,l=o.max,d=o.step;return t=r(e,0,n)/(n||1),i="horizontal"===s?d*Math.round(t*(l-a)/d)+a:l-(d*Math.round(t*(l-a)/d)+a)},position:function(e){var t=void 0,i=void 0,n=this.state.grab,r=this.props.orientation,s=a(this.slider),l=p.orientation[r].coordinate,d=p.orientation[r].direction,u=e.touches?e.touches[0]["client"+o(l)]:e["client"+o(l)],h=s.getBoundingClientRect()[d];return t=u-h-n,i=this.getValueFromPosition(t)},coordinates:function(e){var t=void 0,i=void 0,n=void 0,o=this.state,r=o.limit,s=o.grab,a=this.props.orientation;t=this.getValueFromPosition(e),n=this.getPositionFromValue(t),i="horizontal"===a?n+s:r-n+s;var l=0;return this.props.fill>0&&this.props.fill<this.props.max?l=this.getPositionFromValue(this.props.fill)+s:this.props.fill>=this.props.max&&(l=this.getPositionFromValue(this.props.max)+2*s),{fill:this.props.fill>=0?l:i,handle:n}},render:function(){var e=this,t=void 0,i=void 0,o=void 0,r=void 0,a=void 0,d=void 0,u=this.props,h=u.value,c=u.orientation,f=u.className;return t=p.orientation[c].dimension,i=p.orientation[c].direction,o=this.getPositionFromValue(h),r=this.coordinates(o),a=n({},t,r.fill+"px"),d=n({},i,r.handle+"px"),l.createElement("div",{ref:function(t){return e.slider=t},className:s("rangeslider ","rangeslider-"+c,f),onMouseDown:this.props.disabled?function(){}:this.handleDrag,onClick:this.props.disabled?function(){}:this.props.onClick,disabled:this.props.disabled},l.createElement("div",{ref:function(t){return e.fill=t},className:"rangeslider__fill",style:a,onMouseOver:this.showTooltip}),l.createElement("div",{ref:function(t){return e.handle=t},className:"rangeslider__handle",onMouseDown:this.props.disabled?function(){}:this.handleStart,onTouchMove:this.props.disabled?function(){}:this.handleDrag,onClick:this.props.disabled?function(){}:this.handleNoop,style:d}))}});u.propTypes={min:d.number,max:d.number,step:d.number,value:d.number,orientation:d.string,className:d.string,disabled:d.bool,onHandleRelease:d.func,onChange:d.func},u.defaultProps={min:0,max:100,step:1,value:0,orientation:"horizontal",disabled:!1},e.exports=u},function(e,t,i){var n,o;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n))e.push(i.apply(null,n));else if("object"===o)for(var s in n)r.call(n,s)&&n[s]&&e.push(s)}}return e.join(" ")}var r={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=i:(n=[],o=function(){return i}.apply(t,n),!(void 0!==o&&(e.exports=o)))}()},function(t,i){t.exports=e},function(e,i){e.exports=t}])});