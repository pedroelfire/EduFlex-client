import{b as P}from"./chunk-RIPRJRBO.js";import{H as Q,I as m,a as E,e as R,qa as L}from"./chunk-2W3LPREW.js";import{$a as o,Ka as a,La as v,O as d,P as f,T as u,Va as C,Y as h,Ya as p,Z as y,Zb as j,ac as N,db as _,fb as s,gb as c,hb as G,ib as I,jb as T,nb as l,ob as b,pb as H,qc as M,rb as O,sc as U,tb as A,tc as w,ub as S,uc as k,wb as D,wc as F,xb as x}from"./chunk-2GPZ5EYJ.js";var $=class t{constructor(e,n){this.http=e;this.localStorage=n}apiUrl=P.apiUrl+"/groups";getHttpOptions(){let e=this.localStorage.getData("token");return{headers:new E({"Content-Type":"application/json",Authorization:`Bearer ${e}`})}}getGroups(){return this.http.get(this.apiUrl,this.getHttpOptions())}insertGroup(e){return this.http.post(this.apiUrl,e,this.getHttpOptions())}alumnsInGroup(e){return this.http.get(this.apiUrl+"/alumnsInGroup/"+e,this.getHttpOptions())}alumnsInGroupAndNotInGroup(e){return this.http.get(this.apiUrl+"/alumnsInGroupAndNotInGroup/"+e,this.getHttpOptions())}getGroupDetails(e){return this.http.get(this.apiUrl+"/getGroupDetails/"+e,this.getHttpOptions())}updateGroupDetails(e){return this.http.put(this.apiUrl+"/updateStudentCriteria",e,this.getHttpOptions())}deleteAlumnFromGroup(e,n){return this.http.delete(this.apiUrl+"/"+n+"/alumn/"+e,this.getHttpOptions())}downloadAlumnsGrades(e){return this.http.get(this.apiUrl+"/downloadGroupGrades/"+e,{responseType:"arraybuffer",headers:this.getHttpOptions().headers})}static \u0275fac=function(n){return new(n||t)(u(R),u(L))};static \u0275prov=d({token:t,factory:t.\u0275fac,providedIn:"root"})};var B=["*"];function V(t,e){if(t&1&&G(0,"span",5),t&2){let n=l(2);o("ngClass",n.icon)}}function J(t,e){if(t&1&&(I(0),p(1,V,1,1,"span",4),T()),t&2){let n=l();a(),o("ngIf",n.icon)}}function K(t,e){}function W(t,e){t&1&&p(0,K,0,0,"ng-template")}function X(t,e){if(t&1&&(s(0,"span",6),p(1,W,1,0,null,7),c()),t&2){let n=l();a(),o("ngTemplateOutlet",n.iconTemplate)}}var ft=(()=>{class t{cd;get style(){return this._style}set style(n){this._style=n,this.cd.markForCheck()}styleClass;severity;value;icon;rounded;templates;iconTemplate;_style;ngAfterContentInit(){this.templates?.forEach(n=>{switch(n.getType()){case"icon":this.iconTemplate=n.template;break}})}constructor(n){this.cd=n}containerClass(){return{"p-tag p-component":!0,[`p-tag-${this.severity}`]:this.severity,"p-tag-rounded":this.rounded}}static \u0275fac=function(i){return new(i||t)(v(j))};static \u0275cmp=h({type:t,selectors:[["p-tag"]],contentQueries:function(i,r,q){if(i&1&&O(q,Q,4),i&2){let g;A(g=S())&&(r.templates=g)}},hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",N]},features:[C],ngContentSelectors:B,decls:6,vars:7,consts:[[3,"ngClass","ngStyle"],[4,"ngIf"],["class","p-tag-icon",4,"ngIf"],[1,"p-tag-value"],["class","p-tag-icon",3,"ngClass",4,"ngIf"],[1,"p-tag-icon",3,"ngClass"],[1,"p-tag-icon"],[4,"ngTemplateOutlet"]],template:function(i,r){i&1&&(b(),s(0,"span",0),H(1),p(2,J,2,1,"ng-container",1)(3,X,2,1,"span",2),s(4,"span",3),D(5),c()()),i&2&&(_(r.styleClass),o("ngClass",r.containerClass())("ngStyle",r.style),a(2),o("ngIf",!r.iconTemplate),a(),o("ngIf",r.iconTemplate),a(2),x(r.value))},dependencies:[M,U,k,w],styles:[`@layer primeng{.p-tag{display:inline-flex;align-items:center;justify-content:center}.p-tag-icon,.p-tag-value,.p-tag-icon.pi{line-height:1.5}.p-tag.p-tag-rounded{border-radius:10rem}}
`],encapsulation:2,changeDetection:0})}return t})(),ht=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=y({type:t});static \u0275inj=f({imports:[F,m,m]})}return t})();export{$ as a,ft as b,ht as c};
