var itemArr = ['<i class="fa fa-circle-o fa-5x centerlize" aria-hidden="true"></i>', '<i class="fa fa-times-circle fa-5x centerlize" aria-hidden="true"></i>'],
    item = 0,
    count = 0,
    blockArr = new Array(10),
    i,
    computer = {};
restart();
computer.term = false;
// mode: chlid, normal, master
computer.mode = "normal";
computer.findDanger = function (enemy) {
    var indexes = [], i = -1;
    while (i = blockArr.indexOf(enemy, i + 1) != -1) {
        indexes.push(i);
    }
    //find 2 in 3
    var dangerList = new Array(8); 
    dangerList[0] = [1,2,3];
    dangerList[1] = [4,5,6];
    dangerList[2] = [7,8,9];
    dangerList[3] = [1,4,7];
    dangerList[4] = [2,5,8];
    dangerList[5] = [3,6,9];
    dangerList[6] = [1,5,9];
    dangerList[7] = [3,5,7];
    
    var match, danger = [], live = 0;
    for (i = 0; i < dangerList; i++) {
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
    if (danger.length === 1) {
        return danger[0][1];
    }
    else {
        for(i=1;i<blockArr.length;i++){
            if (blockArr[i] === 5) {
                return i;
            }
        }
    }
}
computer.run = function () {
    computer.term = false;
    if (blockArr[5] === 5) {
        chooseB(5);
    } else if (this.mode === "chlid") {
        for(i=1;i<blockArr.length;i++){
            if (blockArr[i] === 5) {
                chooseB(i);
                break;
            }
        }
    } else if (this.mode === "normal") {
        var friend = item,
            enemy = item ^ 1;
        chooseB(this.findDanger(enemy));
    }
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
    $('#b1').css({ 'height': $('#b1').width() + 'px' }).css({ 'border-top': 'none' }).css({ 'border-left': 'none' });
    $('#b2').css({ 'height': $('#b2').width() + 'px' }).css({ 'border-top': 'none' });
    $('#b3').css({ 'height': $('#b3').width() + 'px' }).css({ 'border-top': 'none' }).css({ 'border-right': 'none' });
    $('#b4').css({ 'height': $('#b4').width() + 'px' }).css({ 'border-left': 'none' });
    $('#b5').css({ 'height': $('#b5').width() + 'px' });
    $('#b6').css({ 'height': $('#b6').width() + 'px' }).css({ 'border-right': 'none' });
    $('#b7').css({ 'height': $('#b7').width() + 'px' }).css({ 'border-bottom': 'none' }).css({ 'border-left': 'none' });
    $('#b8').css({ 'height': $('#b8').width() + 'px' }).css({ 'border-bottom': 'none' });
    $('#b9').css({ 'height': $('#b9').width() + 'px' }).css({ 'border-bottom': 'none' }).css({ 'border-right': 'none' });

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
}
function chooseB(n) {
    var str = "#b" + n;
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
}