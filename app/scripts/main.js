var itemArr = ['<i class="fa fa-circle-o centerlize" style="font-size:7vw" aria-hidden="true"></i>',
    '<i class="fa fa-times-circle fa-5x centerlize" style="font-size:7vw" aria-hidden="true"></i>'],
    initialItem = 0,
    item = 0,
    count = 0,
    blockArr = new Array(10),
    i,
    computer = {};
restart();
computer.init = function () {
    this.mode = 'master';// mode: chlid, normal, master
    this.term = false;
    this.winList = new Array(8);
    this.winList[0] = [1, 2, 3];
    this.winList[1] = [4, 5, 6];
    this.winList[2] = [7, 8, 9];
    this.winList[3] = [1, 4, 7];
    this.winList[4] = [2, 5, 8];
    this.winList[5] = [3, 6, 9];
    this.winList[6] = [1, 5, 9];
    this.winList[7] = [3, 5, 7];
};
computer.init();
computer.findChance = function (friend) {
    var i = 0,
        friArr = [],
        match,
        winPoint = 0,
        chance = [];
    for (i = 1; i < blockArr.length; i++){
        if (blockArr[i] == friend) {
            friArr.push(i);
        }
    }
    for (i = 0; i < this.winList.length; i++) {
        match = 0;
        winPoint = 0;
        this.winList[i].forEach(function(element){
            if (friArr.indexOf(element) !== -1){
                match++;
            } 
            else winPoint = element;
        });
        if (match === 2) {

            if (winPoint !== 0) chance.push(winPoint);
        }
    }
    if (chance.length === 0) {
        // console.log("No Chance");
        return -1;
    } else {
        // console.log("Find Chance");
        for (i = 0; i < chance.length; i++) {
            if (blockArr[chance[i]] === 5) {
                return chance[i];
            }
        }
        return -1;
    }
}
computer.findDanger = function (enemy) {
    var indexes = [],
        i = -1,
        match, 
        danger = [],
        live = 0;
    do {
        i = blockArr.indexOf(enemy, i + 1);
        if (i != -1) indexes.push(i);
    } while (i != -1);
    //find 2 in 3
    var dangerList = this.winList; 
    for (i = 0; i < dangerList.length; i++) {
        match = 0;
        live = 0;
        dangerList[i].forEach(function (element) {
            if (indexes.indexOf(element) != -1) match++;
            else live = element;
        });
        if (match === 2) {
            if (live !== 0) danger.push([i,live]);
        }
    }  
    if (danger.length === 0) {
        // console.log("No danger");
        return -1;
    }
    else {
        // console.log("Find danger");
        for (i = 0; i < danger.length; i++) {
            if (blockArr[danger[i][1]] === 5) {
                return danger[i][1];
            }
        }
        return -1;
    }
}
computer.run = function () {
    computer.term = false;
    var friend = item,
        enemy = item ^ 1,
        danger = this.findDanger(enemy),
        chance = this.findChance(friend);
    if (blockArr[5] === 5) {
        chooseB(5);
    } else if (this.mode === 'chlid') {
        chooseB(findRandom());
    } else if (this.mode === 'normal') {
        if (danger != -1) {
            chooseB(danger);
        } else {
            chooseB(findRandom());
        }
    } else if (this.mode === 'master') {
        if (chance != -1) {
            chooseB(chance);
        } else if (danger != -1) {
            chooseB(danger);
        } else {
            chooseB(findRandom());
        }
    }
}

function findRandom() {
    var i = 1,
        place = [];
    for (i =1;i<blockArr.length;i++) {
        if (blockArr[i]===5) {
            place.push(i);
        }
    }
    var ret = place[~~(Math.random()*(place.length-1)+1)]
    // console.log("random choose:" + ret);
    return ret;
}

function next() {
    var row = new Array(3),
        col = new Array(3),
        cross = new Array(3);
    item ^= 1;
    count += 1;
    row[0] = blockArr[1] + blockArr[2] + blockArr[3];
    row[1] = blockArr[4] + blockArr[5] + blockArr[6];
    row[2] = blockArr[7] + blockArr[8] + blockArr[9];
    col[0] = blockArr[1] + blockArr[4] + blockArr[7];
    col[1] = blockArr[2] + blockArr[5] + blockArr[8];
    col[2] = blockArr[3] + blockArr[6] + blockArr[9];
    cross[0] = blockArr[1] + blockArr[5] + blockArr[9];
    cross[1] = blockArr[3] + blockArr[5] + blockArr[7];
    function check(arr) {
        var i = 0;
        for (; i < arr.length; i++) {
            if (arr[i] === 0) {
                alert('O win!');
                return true;
            } else if (arr[i] === 3) {
                alert('X win!');
                return true;
            }
        }
        return false;
    }
    if(check(row)) {
        restart();
    } else if (check(col)) {
        restart();
    } else if(check(cross)){
        restart();
    } else if (count === 9) {
        alert('Tie');
        restart();
    } else if (computer.term) {
        computer.run();
    }
}
function init() {
    $('#b1').css({ 'border-top': 'none' }).css({ 'border-left': 'none' });
    $('#b2').css({ 'border-top': 'none' });
    $('#b3').css({ 'border-top': 'none' }).css({ 'border-right': 'none' });
    $('#b4').css({ 'border-left': 'none' });
    $('#b6').css({ 'border-right': 'none' });
    $('#b7').css({ 'border-bottom': 'none' }).css({ 'border-left': 'none' });
    $('#b8').css({ 'border-bottom': 'none' });
    $('#b9').css({ 'border-bottom': 'none' }).css({ 'border-right': 'none' });

    $('#b1').click(function () { computer.term = true; chooseB(1); });
    $('#b2').click(function () { computer.term = true; chooseB(2); });
    $('#b3').click(function () { computer.term = true; chooseB(3); });
    $('#b4').click(function () { computer.term = true; chooseB(4); });
    $('#b5').click(function () { computer.term = true; chooseB(5); });
    $('#b6').click(function () { computer.term = true; chooseB(6); });
    $('#b7').click(function () { computer.term = true; chooseB(7); });
    $('#b8').click(function () { computer.term = true; chooseB(8); });
    $('#b9').click(function () { computer.term = true; chooseB(9); });
    $('#newGame').click(restart);
    $('#setO').click(function () { initialItem = 0; item = 0; });
    $('#setX').click(function () { initialItem = 1; item = 1; });
    $('#myModal').modal('show');
}
function chooseB(n) {
    var str = '#b' + n;
    if (blockArr[n] === 5) {
        $(str).append(itemArr[item]);
        blockArr[n] = item;
        next();
    }
}
function restart() {
    $('#b1').html('');
    $('#b2').html('');
    $('#b3').html('');
    $('#b4').html('');
    $('#b5').html('');
    $('#b6').html('');
    $('#b7').html('');
    $('#b8').html('');
    $('#b9').html('');
    i = blockArr.length;
    while (i--) {
        blockArr[i] = 5;
    }
    count = 0;
    item = initialItem;
}