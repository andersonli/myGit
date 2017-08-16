var shuzu;//定义字符串，接收读取到的数据
var inputs = 'global';//定义输入数组，全局变量
//var biaozhun=biaozhunhua(inputs);
//var string=shuchu(biaozhun);
var fs = require('fs');
var data = fs.readFileSync('inputs.txt', 'utf-8');//同步读取文件内容

//console.log(data);
shuzu = data;//取data的值
console.log(shuzu);
inputs = shuzu.split(" ");//按空格分成字符串数组
//shuzu.indexOf('\n');
inputs.pop();//删除数组的最后一个元素
var n = inputs[0].length;//返回数组首元素的字符串长度
inputs.push(shuzu.substring(shuzu.length-(n+1),shuzu.length-1));//截取字符串的指定部分加入数组。
console.log(inputs);

var biaozhun=biaozhunhua(inputs);
var string=shuchu(biaozhun);

function writefs(){//写入文件
    var fs = require('fs');
    var  data = string;//取string的值
    //console.log(string);
    //console.log(data);
    fs.writeFile('item.txt', data, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('ok');
        }
    });
}

writefs();//调用
//var biaozhun=biaozhunhua(inputs);
//var string=shuchu(biaozhun);
console.log(string);//控制台输出

    function printTime()
    {//打印现在时刻的函数
           var dateDigitToString = function (num){
              return num < 10 ? '0' + num : num;
           };//第十位置加0凑成两位数，
           var Rightnow=new Date(); //创建时间对象；
           var year=dateDigitToString(Rightnow.getFullYear());   //获取系统的年；
           var Month=dateDigitToString(Rightnow.getMonth()+1);   //获取系统月份，由于月份是从0开始计算，所以要加1
           var day=dateDigitToString(Rightnow.getDate()); // 获取系统日，
           var hours=dateDigitToString(Rightnow.getHours()); //获取系统时，
           var minutes=dateDigitToString(Rightnow.getMinutes()); //分
           var seconds=dateDigitToString(Rightnow.getSeconds()); //秒a
           var string=year.toString()+'年'+Month+'月'+day.toString()+'日 '+hours.toString()+':'+minutes.toString()+':'+seconds.toString()+'\n----------------------\n';
           return string;
    }
      //将inputs转换成每个对象元素具有count，discount属性的标准对象
      function biaozhunhua(inputs)//把输入数据标准化的函数
    {
         var item=loadAllItems();//仓库商品单
         var discountList=[];//打折商品
         var discount=0;//打折数
         var arr=[];//存放分割后的barcodes数组
         //得到折扣的列表
         for(var i=0,length=loadPromotions().length;i<length;++i)
         {
            if(loadPromotions()[i].type=='BUY_TWO_GET_ONE_FREE')
            {
                discountList=loadPromotions()[i].barcodes;
            }
         }
          
         //给所有商品增加count属性
         for(i=0;i<item.length;i++)
         {//循环遍历清单
            item[i].count=0;//数量的初始值
            for(var j=0;j<inputs.length;j++)
            {//循环遍历输入数据
                if(inputs[j].indexOf('-')!=-1)
                {//如果有 -
                    arr=inputs[j].split('-');//从 - 分隔成两个数组
                    if(arr[0]==item[i].barcode)
                    {//判断此barcodes是否存在
                       item[i].count=parseInt(arr[1]);//存在则数量为 - 后的数据
                     }
                }
                
                else if(item[i].barcode==inputs[j])
                {//是正常数据
                    item[i].count++;//则增加一个
                }
            }
         }
         for(i=0;i<item.length;i++)
         {//循环遍历清单
            item[i].discount=0;//初值为0
            for(j=0;j<discountList.length;j++)
            {
                if(item[i].barcode==discountList[j])
                {
                    discount=Math.floor(item[i].count/3);//打折数量
                    if(discount>=1)
                    {
                    item[i].discount=discount;
                    }
                }
            }
         }
         return item;
      }
      function shuchu(array)
      {//输出函数
          var string=printTime();
          var sum=0;
          var save=0;
          for(var i=0;i<array.length;i++)
          {//循环输出string
              if(array[i].count!=0)
              {
                       string+='名称:'+array[i].name+',数量:'+array[i].count+array[i].unit+',单价:'+array[i].price.toFixed(2)+'(元),小计:'+(array[i].price*(array[i].count-array[i].discount)).toFixed(2)+'(元)\n';
                       sum+=array[i].price*array[i].count;
              }
          }
          
          string+='----------------------\n挥泪赠送商品:\n';
          for(i=0;i<array.length;i++)
          {
              if(array[i].discount!=0)
              {
                     string+='名称:'+array[i].name+',数量:'+array[i].discount+array[i].unit+'\n'
                     save+=array[i].price*array[i].discount;
              }
          }
          
          sum=sum-save;
          string+='----------------------\n总计:'+sum.toFixed(2)+'(元)\n节省:'+save.toFixed(2)+'(元)\n**********************';
          return string;
          
      }
      /*function writefs(string){
        var fs = require('fs');
        var  data = string;
        fs.writeFile('item.txt', data, function(err){
            if(err){
                console.log(err);
            }else{
                console.log('ok');
            }
        });
      }*/

  function loadAllItems() {
      return [
          {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00
          },
          {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
          },
          {
              barcode: 'ITEM000002',
              name: '苹果',
              unit: '斤',
              price: 5.50
          },
          {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
          },
          {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00
          },
          {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
          }
      ];
  }

  function loadPromotions() {
      return [
          {
              type: 'BUY_TWO_GET_ONE_FREE',
              barcodes: [
                  'ITEM000000',
                  'ITEM000001',
                  'ITEM000005'
              ]
          }
      ];
}