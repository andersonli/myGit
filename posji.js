//TODO: 请补完下面的函数以完成需求.
function printInventory(inputs) {
   var dateDigitToString = function (num) {
            return num < 10 ? '0' + num : num;
        };
     var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    
    
     var list="***<没钱赚商店>购物清单***\n" + '打印时间:' + formattedDateString + '\n' + '----------------------';
    var xiaoji=0;
    var zongji=0;
    var item=loadAllItems();
    var discount=loadPromotions()[0].barcodes;
    var dazhe=0;
    for(var i=0;i<item.length;i++){
    	item[i].count=0;
        for(var j=0;j<inputs.length;j++){
            if(inputs[j].indexOf("-")!=-1){
                if(inputs[j][9]==item[i].barcode[9]){
                	item[i].count=parseInt(inputs[j][inputs[j].length-1]);
                }
            }
            else if (item[i].barcode==inputs[j]){
            	item[i].count++;
            }
        }
    }
    for(i=0;i<item.length;i++){
    	item[i].fut=0;
        for(j=0;j<discount.length;j++){
            if(item[i].barcode==discount[j]){
            	dazhe=Math.floor(item[i].count/3);
                if(dazhe>=1){
                	item[i].fut=dazhe;
                }
            }
        }
        if(item[i].count!=0){
            list=list+"\n"+"名称:"+item[i].name+","+"数量:"+item[i].count+item[i].unit+","+"单价:"+item[i].price.toFixed(2)+"(元),小计:"+(item[i].price*(item[i].count-item[i].fut)).toFixed(2)+"(元)";
        	zongji+=item[i].price*item[i].count;
        }
    }  
    list=list+"\n"+"----------------------"+"\n"+"挥泪赠送商品:"+"\n";
    for(i=0;i<item.length;i++){
        if(item[i].fut!=0){
            list=list+"名称:"+item[i].name+",数量:"+item[i].fut+item[i].unit+"\n";
            xiaoji+=item[i].price*item[i].fut;
        }
    }
    zongji=zongji-xiaoji;
   	list=list+"----------------------"+"\n";
    list=list+"总计:"+zongji.toFixed(2)+"(元)"+"\n";
    list=list+"节省:"+xiaoji.toFixed(2)+"(元)"+"\n";
    list=list+"**********************";
    console.log(list);

}

