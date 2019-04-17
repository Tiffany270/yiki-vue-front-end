<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  name: "app"
};
</script>

<style>
html {overflow-y:scroll;} 
body {margin:0; padding:29px00; font:12px"\5B8B\4F53",sans-serif;background:#ffffff;} 
div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p{padding:0; margin:0;} 
table,td,tr,th{font-size:12px;} 
li{list-style-type:none;} 
img{vertical-align:top;border:0;} 
ol,ul {list-style:none;} 
address,cite,code,em,th {font-weight:normal; font-style:normal;}
</style>