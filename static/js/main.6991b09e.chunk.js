(this.webpackJsonpgpa=this.webpackJsonpgpa||[]).push([[0],{23:function(e,n,t){e.exports=t(35)},32:function(e,n,t){},35:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(18),i=t.n(o),c=t(8),u=t(9),l=t(11),d=t(5),s=t(41),p=t(12),x=t.n(p),f=t(38),g=t(39),m=t(40),h=t(13),b=t.n(h),v=t(6);t(32);function w(){var e=Object(d.a)(["\n  margin-top: .4rem;\n    .form-control:focus {\n        border-color: grey;\n        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 0px grey;\n    }\n    input[type=text] {\n        background-color: white;\n        color: #0D2451;\n        font-size: 25x;\n        \n        border: 1px solid grey;\n        border-radius: 4px;\n    }\n    @media (max-width: 656px) {\n      input[type=text] {\n        color: #0D2451;\n        font-size: 11px;\n      }\n    }\n"]);return w=function(){return e},e}function E(){var e=Object(d.a)(["\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);\n  color:#ededed;\n  padding: 15px;\n  margin: 10px;\n  border-radius: 15px;\n  display: inline-block;\n  width: 40%;\n  border: none;\n  background-color: #ff6680;\n  padding: 14px 28px;\n  font-size: 32px;\n  cursor: pointer;\n  text-align: center;\n  height: 75px;\n  transition: transform .3s;\n\n  @media (max-width: 656px) {\n    width: 90%;\n    transform: scale(1);\n    }\n    &:hover {\n        transform: scale(1.05);\n    },\n"]);return E=function(){return e},e}function y(){var e=Object(d.a)(["\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);\n  padding: 15px;\n  margin: 10px;\n  border-radius: 15px;\n  display: inline-block;\n  width: 40%;\n  border: none;\n  color:#ededed;\n  background-color:#66ccff;\n  padding: 14px 28px;\n  font-size: 32px;\n  cursor: pointer;\n  text-align: center;\n  height: 75px;\n  transition: transform .2s;\n  \n  @media (max-width: 656px) {\n    height: 90px;\n    width: 90%;\n    transform: scale(1);\n    }\n    &:hover {\n        transform: scale(1.05);\n    },\n"]);return y=function(){return e},e}function O(){var e=Object(d.a)(["\n  margin-top: 2rem;\n  white-space: pre-line; \n  background: #fafafa;\n  box-shadow: 0 15px 25px rgba(0,0,0,.6);\n  padding: 15px;\n  border-radius: 15px;\n"]);return O=function(){return e},e}function j(){var e=Object(d.a)(["\n  color: #fafafa;\n  text-transform: uppercase;\n  font-size: 3.5em;\n  padding-bottom: 2rem;\n  padding-top: 2rem;\n  text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);\n  font-family: 'Raleway', sans-serif;\n  letter-spacing: 3px;\n  text-align: center;\n  @media (max-width: 656px) {\n    font-size: 2.5em;\n    }\n"]);return j=function(){return e},e}function k(){var e=Object(d.a)(["\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n  @media (max-width: 656px) {\n    height: 100%;\n    }\n"]);return k=function(){return e},e}var C=v.a.div(k()),B=v.a.h1(j()),A=v.a.div(O()),F=v.a.button(y()),z=v.a.button(E()),G=v.a.div(w());var I=function(){var e=Object(r.useState)({grade1:"",credit1:"",grade2:"",credit2:"",grade3:"",credit3:"",grade4:"",credit4:"",grade5:"",credit5:"",grade6:"",credit6:""}),n=Object(l.a)(e,2),t=n[0],o=n[1],i=Object(r.useState)(t),d=Object(l.a)(i,1)[0],p=function(){return b.a.fire({title:"Error!",text:"One or more of the inputs is formatted incorrectly, make sure the grade is letter A through F and credits is a number",icon:"error",cancelButtonText:"Retry",showCancelButton:!0,showConfirmButton:!1})},h=function(e){return(e=e.toFixed(2))>=3?["Impressive! \nYour GPA is","Congrats you're doing great!","success"]:e>2.5&&e<3?["Not bad! \nYour GPA is","Keep studying and bump it up!","warning"]:e<=2.5?["Keep working hard!\n Your GPA is","Your GPA is quite low but keep trying!","error"]:void 0},v=function(e,n){switch(e=e.toLowerCase()){case"a":return 4*n;case"b":return 3*n;case"c":return 2*n;case"d":return 1*n;case"f":return 0*n}},w=function(e,n){return a.a.createElement(f.a,null,a.a.createElement(g.a,null,a.a.createElement(G,null,a.a.createElement(s.a,{name:e,placeholder:"Letter Grade(A-F)",value:t[e],onChange:function(n){return function(e,n){o(Object(u.a)(Object(u.a)({},t),{},Object(c.a)({},e,n.target.value)))}(e,n)}}))),a.a.createElement(g.a,null,a.a.createElement(G,null,a.a.createElement(s.a,{name:n,placeholder:"Credits",value:t[n],onChange:function(e){return function(e,n){o(Object(u.a)(Object(u.a)({},t),{},Object(c.a)({},e,n.target.value)))}(n,e)}}))))};return a.a.createElement("div",null,a.a.createElement(C,null,a.a.createElement(B,null,"Gpa Calculator"),a.a.createElement(m.a,null,a.a.createElement(x.a,{bottom:!0},a.a.createElement(A,null,a.a.createElement("h4",null,"INSTRUCTIONS"),a.a.createElement("p",null,"1. For the letter grade column, put in your letter grade(A through F)\n2. For the credits column put how many credits its worth\n3. Leave the rest of the rows blank once you've put all your classes in\n4. Press Calculate when done"))),a.a.createElement(x.a,{bottom:!0},a.a.createElement(A,null,a.a.createElement("div",null,w("grade1","credit1"),w("grade2","credit2"),w("grade3","credit3"),w("grade4","credit4"),w("grade5","credit5"),w("grade6","credit6"),a.a.createElement("br",null)))),a.a.createElement("br",null),a.a.createElement("center",null,a.a.createElement(F,{onClick:function(){var e=[],n=[],r=null;Object.entries(t).map((function(t){var r=Object(l.a)(t,2),a=r[0],o=r[1];a.includes("grade")&&e.push(o),a.includes("credit")&&n.push(o)})),e=function(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];if(r.match(/[a-f]/i)&&1==r.length)n.push(r);else if(0!=r.length)return void p()}return n}(e),n=function(e){for(var n=[],t=0;t<e.length;t++){var r=parseInt(e[t],10);if(1==Number.isInteger(r)&&0!=e[t].length)n.push(r);else if(0!=e[t].length)return void p()}return n}(n),void 0!==e&&void 0!==n&&(r=function(e,n){for(var t=[],r=0;r<e.length;r++)t.push(v(e[r],n[r]));return t.reduce((function(e,n){return e+n}),0)/n.reduce((function(e,n){return e+n}),0)}(e,n),isNaN(r)||function(e){var n=h(e);b.a.fire({title:n[0],footer:n[1],text:e.toFixed(2),icon:n[2],cancelButtonText:"Back",showCancelButton:!0,showConfirmButton:!1})}(r))}},"Calculate"),a.a.createElement(z,{onClick:function(){o(d)}},"Reset")))))};i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(I,null)),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.6991b09e.chunk.js.map