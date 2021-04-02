'use strict';

const crypto = require('crypto');
const path = require('path');

module.exports = {

  website_address:'',
  baseUrl: '/public/excels/',
  basePath: path.join(__dirname, '../public/excels/'),
  exportBasePath: path.join(__dirname, '../public/export_excels/'),

  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  parseFloat(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseFloat(string) || 0;
  },

  cryptoPwd:(password)=>{
    const prefix = '1663er%^h#$61';
    var sha1 = crypto.createHash('sha1');
    sha1.update(prefix + password);
    var pwd = sha1.digest('hex');
    return pwd;
  },

  randomString: (len)=> {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTVUWXYZLIabcdefhijkmnpgqvurstwxyz123456789';
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  },

  randomNumber:(num)=>{
    var str = '';
    for(var i = 0; i < num; i += 1){
      str += Math.floor(Math.random() * 10);
    }
    return str;
  },

  timer:function(timeout){
    let i = 0;
    let t;
    t = setInterval(time, 1000);
    function time() {
        i++;
        if(i >= timeout) clearInterval(t);
    }
  }

};
