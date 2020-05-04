// function formatDate(date, fmt) 
// {
//   if (/(y+)/.test(fmt)) 
//   {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   var o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   };
//   for (var k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       var str = o[k] + '';
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//   return fmt;
// };

// function padLeftZero (str) {
//   return ('00' + str).substr(str.length);
// };

// module.exports={
//   formatDate:formatDate
// }


var formatTime = function(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

var formatNumber = function(n){
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

export function debounce(fnc,delay=1000)
{
  let timer=null
  return function(...args)
  {
    if(timer)clearTimeout(timer)
    timer=setTimeout(()=>{
      fnc.apply(this,args)
    },delay)
  }
}