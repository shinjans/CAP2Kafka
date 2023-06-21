'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('../db/data/orders.json');
let orders = JSON.parse(rawdata);

var kafkaData = [];
orders.value.forEach((order) => {
    kafkaData.push({
        key: order.SALES_ORDER,
        value: JSON.stringify(order)
    })
});
console.log(kafkaData);