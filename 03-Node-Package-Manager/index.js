const _=require('underscore');

//require function resolve according to below tree
//1.core module
//2.File  ('./underscore')=>underscore.js in the same folder
//3.folder ('./underscore')=> underscore is a folder and in that folder it look for index.js
//4. node_modules 

var result=_.contains([1,2,3],3);
console.log(result);