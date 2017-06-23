<template>
  <div>
    <section id="ranking"> <span id="ranking_title">开户排行榜</span>
      <section id="ranking_list">
        <section v-for="(item,index) in list" class="box">
          <section class="col_1" :title="index+1">{{index+1}}</section>
          <section class="col_2"><img src="../assets/logo.svg"></section>
          <section class="col_3">{{item.name}}-{{item.major}}</section>
          <section class="col_4">{{item.current}}</section>
        </section>

      </section>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  created () {
    this.getNamelist()
  },
  data () {
    return {
      list: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getNamelist () {
      axios.get('/getNamelist').then((response) => {
        this.list = response.data.list
      }).catch((response) => {
        this.$message.error('失败!')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
  }
  *:focus, *:active {
    outline: none;
    -moz-outline: none;
    outline-style: none;
    -moz-outline-style: none;
    -webkit-outline: none;
    -webkit-outline-style: none;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    width: 100%;
    font-size: 12px;
    line-height: 1;
    font-family: "Microsoft YaHei", \u5FAE\u8F6F\u96C5\u9ED1, "MicrosoftJhengHei", \u534E\u6587\u7EC6\u9ED1, STHeiti, MingLiu;
    background: #ededed;
    color: #333333;
  }
  img {
    border: 0;
    max-width: 100%;
  }
  .clear {
    clear: both;
    height: 0;
    display: block;
  }
  a {
    outline: none;
    text-decoration: none;
    color: #333333;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  #ranking {
    display: block;
    width: 90%;
    height: 70%;
    position: absolute;
    left: 5%;
    top: 10%;
    border: 2px #007DE7 solid;
    background-color: #fff;
    border-radius: 20px;
    padding: 30px 15px;
  }
  #ranking_list {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y:auto;
  }

  #ranking_list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
  }
  #ranking_list::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
  }
  #ranking_list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: -webkit-gradient(linear,  left bottom,  left top,  color-stop(0.44, rgb(122,153,217)),  color-stop(0.72, rgb(73,125,189)),  color-stop(0.86, rgb(28,58,148)));
  }

  #ranking_title, #play_game, #return_back {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    border-radius: 20px;
    position: absolute;
  }
  #ranking_title {
    width: 50%;
    left: 25%;
    top: -21px;
    background-color: #007DE7;
  }
  #play_game {
    width: 50%;
    left: 25%;
    bottom: -21px;
    background-color: #91cad6;
  }
  #return_back {
    width: 45%;
    left: 27.5%;
    bottom: 5%;
    letter-spacing:5px;
    background-color: #f9820d;
  }
  .box {
    width: 100%;
    background-color: #fffaef;
    height: 50px;
    line-height: 50px;
    display: -webkit-box;
    display: -moz-box;
    display: box;
    border-radius: 10px;
    margin:5px auto 5px;
  }
  .cur{background-color: #91cad6;}
  .col_1 {
    width: 50px;
    text-align: center;
    font-size:20px;
    color:#f9820d;
    background-repeat:no-repeat; background-position:center center; background-size:40px 40px;
  }

  .col_1[title="1"]{ color:#fff; background-image:url(../assets/images/r1.png); line-height:38px;}
  .col_1[title="2"]{ color:#fff; background-image:url(../assets/images/r2.png); line-height:38px;}
  .col_1[title="3"]{ color:#fff;  background-image:url(../assets/images/r3.png);line-height:38px;}
  .col_2 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    box-flex: 1;
    padding: 5px 0;
    text-align:center;
  }
  .col_2 img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .col_3 {
    width:35%;
    color:#f9820d;
    font-size:14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align:left;
  }
  .col_4 {
    width:25%;
    text-align:center;
    color:#f9500d;
    font-size:14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .cur section{color: #fff;}

  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary {
    display: block
  }

  audio,canvas,progress,video {
    display: inline-block;
    vertical-align: baseline
  }

  audio:not([controls]) {
    display: none;
    height: 0
  }

  [hidden],template {
    display: none
  }

  a {
    background-color: transparent
  }

  a:active,a:hover {
    outline: 0
  }

  abbr[title] {
    border-bottom: 1px dotted
  }

  b,strong {
    font-weight: bold
  }

  dfn {
    font-style: italic
  }

  h1 {
    font-size: 2em;
    margin: .67em 0
  }

  mark {
    background: #ff0;
    color: #000
  }

  small {
    font-size: 80%
  }

  sub,sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
  }

  sup {
    top: -0.5em
  }

  sub {
    bottom: -0.25em
  }

  img {
    border: 0
  }

  svg:not(:root) {
    overflow: hidden
  }

  figure {
    margin: 1em 40px
  }

  hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0
  }

  pre {
    overflow: auto
  }

  code,kbd,pre,samp {
    font-family: monospace,monospace;
    font-size: 1em
  }

  button,input,optgroup,select,textarea {
    color: inherit;
    font: inherit;
    margin: 0
  }

  button {
    overflow: visible
  }

  button,select {
    text-transform: none
  }

  button,html input[type="button"],input[type="reset"],input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer
  }

  button[disabled],html input[disabled] {
    cursor: default
  }

  button::-moz-focus-inner,input::-moz-focus-inner {
    border: 0;
    padding: 0
  }

  input {
    line-height: normal
  }

  input[type="checkbox"],input[type="radio"] {
    box-sizing: border-box;
    padding: 0
  }

  input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {
    height: auto
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box
  }

  input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
  }

  fieldset {
    border: 1px solid silver;
    margin: 0 2px;
    padding: .35em .625em .75em
  }

  legend {
    border: 0;
    padding: 0
  }

  textarea {
    overflow: auto
  }

  optgroup {
    font-weight: bold
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }

  td,th {
    padding: 0
  }

</style>
