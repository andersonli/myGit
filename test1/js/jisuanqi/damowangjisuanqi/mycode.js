
window.onload=function(){
        var result=0,temp=0;//当前结果和临时数
        var op='';//将要进行的操作
        //将对象obj中成员依次插入f
        var obj={h6:'计算器',span:result,ul:''};
        f=document.getElementById('f');
        for(var i in obj)
        {
            var nelm=document.createElement(i);
            f.appendChild(nelm);
            nelm.innerHTML=obj[i];
        }
 
        //将数组arr成员依次插入ul
        var arr=[1,2,3,4,5,6,7,8,9,'+','-','*','/','%','=','C'];
        u=document.getElementsByTagName('ul')[0];
        for(var i in arr)
        {
            var nelm=document.createElement('button');
            u.appendChild(nelm);
            nelm.innerHTML=arr[i];
            nelm.onclick=function(){
                ftest(this);    
            }
        }
 
        function ftest(btn){
            switch(btn.innerHTML)
            {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    temp*=10;
                    temp+=parseInt(btn.innerHTML);
                    document.getElementsByTagName('span')[0].innerHTML=temp;//显示新结果
                    break;
                case '=':
                    result=cal(result,temp,op);
                    document.getElementsByTagName('span')[0].innerHTML=result;//显示新结果
                    temp=0;//临时数清零
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    result=cal(result,temp,op);
                    op=btn.innerHTML;//操作符重新设置
                    document.getElementsByTagName('span')[0].innerHTML=result;//显示新结果
                    temp=0;//临时数清零
                    break;
                case 'C':
                    result=0;
                    document.getElementsByTagName('span')[0].innerHTML=result;//显示新结果
                    temp=0;//临时数清零
                    op='';
                    break
            }
        }
        function cal(x,y,op)
        {
            switch(op)
            {
                case '+':
                    x+=y;
                    break;
                case '-':
                    x-=y;
                    break;
                case '*':
                    x*=y;
                    break;
                case '/':
                    x/=y;
                    break;
                case '%':
                    x%=y;
                    break;
                case '':
                    x=y;
                    break;
            }
            return x;
        }
}
