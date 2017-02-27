/**
 * 创建者：饶道坤
 * 创建日期：2016/3/24.
 * 描述：
 */
App.service('customerService', function(){


    //加载客户详情
    this.setCustomer_detal = function(items){
        //console.log('客户详情',items);
        this.customerItems = items;
    }


});