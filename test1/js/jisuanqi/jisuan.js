'use strict';
var num=0,result=0,numshow="0";
//判断输入状态
var operate=0;
//判断计算状态
var calcul=0;
//防止重复按键
var quit=0;

   function command(num){     // 数值
      // 获取当前显示的数据
      var str = String(document.ator.num1.value);
      //如果当前值不是"0",且状态为0,则返回当前值,否则返回空值.
      str = (str!="0")?((operate==0)?str:""):"";
      str = str+String(num);
      document.ator.num1.value=str;
      //刷新显示
      operate=0; //重置输入状态
      quit=0;    //重置防止重复按键.
    }

    function dzero(){   //  00
       //  获值
       var str = String(document.ator.num1.value);
       // 如果当前值不是"0",且状态为0,则返回str+"00",否则返回"0".
       str = (str!="0")?((operate==0)?str+"00":"0"):"0";
       document.ator.num1.value=str;
       // 刷新显示
       operate=0;
     }

     function dot(){    // 小数点
        var str = String(document.ator.num1.value);
        // 如果当前值不是"0",且状态为0,则返回当前值,否则返回"0"
        str=(str!="0")?((operate==0)? str:"0"):"0";
        // 判断是否有点
        for (var i = 0; i < str.length; i++) {
          　//substr(截取开始位置,截取长度);
           // 如果有，就不在插入
          if (str.substr(i,1)=="."){
              　 return false;
            }
        }

        str = str + ".";
        document.ator.num1.value=str;
        // 刷新显示
        operate=0;
    }

    function clearscreen(){   // 清空

         document.ator.num1.value="0";
    }

    function del(){    //　删除

          var str = String(document.ator.num1.value);
          str =(str!="0")? str : "";
          // substr() 从字符串中提取一些字符.
          //substr(截取开始位置,截取长度);
          //substr(字段,a,b)
          // a代表第几个位置
          // b代表长度
          // 0和1的效果一样
          // 用负数则从右边开始数第几个位置
          str = str.substr(0,str.length-1);
          document.ator.num1.value=str;
    }

    // 计算
     function calculate(){
      
         var numshow=Number(document.ator.num1.value);
         //判断前一个运算数是否为零以及防重复按键的状态
         if(num!=0 && quit!=1){
              switch(calcul){
                  case 1:
                    result=num+numshow;
                    break;
                  case 2:
                    result=num-numshow;
                    break;
                  case 3:
                    result=num*numshow;
                    break;
                  case 4:
                    if(numshow!=0){
                        result=num/numshow;
                     }else{
                       alert("你是傻逼");
                     }
                    break;
                  case 5:
                     if (numshow!=0) {
                        result=num%numshow;
                     }
                    break;
              }
               quit=1;   //  避免重复按键

         }else{

              result = numshow;
         }

         numshow=String(result);
         document.ator.num1.value=numshow;
         num=result;   //  存储当前值.
     }

     function plus(){

       calculate();  //  调用计算机函数
       operate=1;    //  输入状态.
       calcul=1;     //  更改计算状态为加
     }

     function minus(){
       calculate();  //  调用计算机函数
       operate=1;    //  输入状态.
       calcul=2;     //  更改计算状态为减
     }

     function times(){
       calculate();  //  调用计算机函数
       operate=1;    //  输入状态.
       calcul=3;     //  更改计算状态为乘
     }

     function divide(){
       calculate();  //  调用计算机函数
       operate=1;    //  输入状态.
       calcul=4;     //  更改计算状态为除
     }

     function percent(){
       calculate();  //  调用计算机函数
       operate=1;    //  输入状态.
       calcul=5;     //  更改计算状态为求模.
     }

     function equal() {  //等于
         calculate();
         operate=1;
        //  num=0;
        //  result=0;
        //  numshow="0";
     } 
