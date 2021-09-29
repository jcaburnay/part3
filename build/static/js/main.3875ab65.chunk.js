(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{18:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);n(18);var r=n(2),a=n(17),c=n.n(a),u=n(3),s=n.n(u),i=n(5),o=n(8),l=n(4),b=n(6),d=n.n(b),j="/api/persons",f={getAll:function(){var e=Object(i.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.a.get(j),e.next=3,t;case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),addPerson:function(){var e=Object(i.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.a.post(j,t),e.next=3,n;case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),updateNumber:function(){var e=Object(i.a)(s.a.mark((function e(t,n){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=d.a.put("".concat(j,"/").concat(t),n),e.next=3,r;case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),deletePerson:function(){var e=Object(i.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.delete("".concat(j,"/").concat(t));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},p=n(0),m=function(e){var t=e.searchName,n=e.onSearch;return Object(p.jsx)("div",{children:Object(p.jsxs)("span",{children:["search contact:"," ",Object(p.jsx)("input",{type:"text",value:t,onChange:n})]})})},h=function(e){var t=e.submit,n=e.newName,r=e.handleNameChange,a=e.newNumber,c=e.handleNumberChange;return Object(p.jsxs)("form",{onSubmit:t,children:[Object(p.jsxs)("div",{children:["name:"," ",Object(p.jsx)("input",{type:"text",value:n,onChange:r,required:!0})]}),Object(p.jsxs)("div",{children:["number:"," ",Object(p.jsx)("input",{type:"text",value:a,onChange:c})]}),Object(p.jsx)("div",{children:Object(p.jsx)("button",{type:"submit",children:"add"})})]})},O=function(e){var t=e.persons,n=e.onDelete;return Object(p.jsx)("ul",{children:t.map((function(e){return Object(p.jsxs)("li",{children:[e.name," ",e.number," ",Object(p.jsx)("button",{onClick:function(){return n(e.id)},children:"delete"})]},e.name)}))})},v=function(e){var t=e.notifType,n=e.message;return null===n?null:Object(p.jsx)("div",{className:t,children:n})},x=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),u=Object(l.a)(c,2),b=u[0],d=u[1],j=Object(r.useState)(""),x=Object(l.a)(j,2),w=x[0],g=x[1],y=Object(r.useState)(""),N=Object(l.a)(y,2),k=N[0],S=N[1],C=Object(r.useState)(null),T=Object(l.a)(C,2),A=T[0],P=T[1],D=Object(r.useState)(null),E=Object(l.a)(D,2),I=E[0],J=E[1],L=Object(r.useState)(null),q=Object(l.a)(L,2),B=q[0],z=q[1],F=Object(r.useState)(null),G=Object(l.a)(F,2),H=G[0],K=G[1];Object(r.useEffect)((function(){f.getAll().then((function(e){a(e)}))}),[]);var M=function(){var e=Object(i.a)(s.a.mark((function e(t){var r,c,u;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.find((function(e){return e.id===t})),!window.confirm("Delete ".concat(r.name,"?"))){e.next=10;break}return e.next=5,f.deletePerson(t);case 5:return c=f.getAll(),e.next=8,c;case 8:u=e.sent,a(u);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=n.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())}));return Object(p.jsxs)("div",{children:[Object(p.jsx)("h2",{children:"Phonebook"}),Object(p.jsx)(v,{message:A,notifType:"success"}),Object(p.jsx)(v,{message:I,notifType:"error"}),Object(p.jsx)(v,{message:B,notifType:"error"}),Object(p.jsx)(v,{message:H,notifType:"error"}),Object(p.jsx)(m,{searchName:k,onSearch:function(e){S(e.target.value)}}),Object(p.jsx)("h3",{children:"Add a new contact"}),Object(p.jsx)(h,{submit:function(e){if(e.preventDefault(),n.map((function(e){return e.name})).includes(b)){var t=n.find((function(e){return e.name===b})),r=Object(o.a)(Object(o.a)({},t),{},{number:w});window.confirm("".concat(b," is already in the phonebook, update number instead?"))&&(f.updateNumber(t.id,r).then((function(e){a(n.map((function(n){return n.id!==t.id?n:e}))),P("".concat(e.name,"'s number was updated")),setTimeout((function(){P(null)}),5e3)})).catch((function(e){J("Information of ".concat(t.name," has already been removed from server")),setTimeout((function(){J(null)}),5e3),a(n.filter((function(e){return e.id!==t.id})))})),d(""),g(""))}else{var c={name:b,number:w};f.addPerson(c).then((function(e){P("Added ".concat(e.name)),a(n.concat(e)),d(""),g(""),setTimeout((function(){P(null)}),5e3)})).catch((function(e){var t=e.response.data.error.split(","),n=t[0].split(":")[2],r=t[1];if(z(n),void 0===r)K(null);else{var a=r.split(":")[1];K(a)}setTimeout((function(){z(null),K(null)}),5e3)}))}},newName:b,handleNameChange:function(e){d(e.target.value)},newNumber:w,handleNumberChange:function(e){g(e.target.value)}}),Object(p.jsx)("h3",{children:"Numbers"}),Object(p.jsx)(O,{persons:Q,onDelete:M})]})};c.a.render(Object(p.jsx)(x,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.3875ab65.chunk.js.map