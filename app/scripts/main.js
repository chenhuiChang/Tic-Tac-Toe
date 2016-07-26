var itemArr = ['<i class="fa fa-circle-o fa-5x centerlize" aria-hidden="true"></i>', '<i class="fa fa-times-circle fa-5x centerlize" aria-hidden="true"></i>'],
    item = 0,
    count = 0,
    blockArr = new Array(10),
    i;
restart();
function end() {
    var row = new Array(3),
        col = new Array(3),
        cross = new Array(3);
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
    }
}
function next() {
    item ^= 1;
    count += 1;
    end();
}
function init() {
    $('#b1').css({'height':$('#b1').width()+'px'}).css({'border-top':'none'}).css({'border-left':'none'});
    $('#b2').css({'height':$('#b2').width()+'px'}).css({'border-top':'none'});
    $('#b3').css({'height':$('#b3').width()+'px'}).css({'border-top':'none'}).css({'border-right':'none'});
    $('#b4').css({'height':$('#b4').width()+'px'}).css({'border-left':'none'});
    $('#b5').css({'height':$('#b5').width()+'px'});
    $('#b6').css({'height':$('#b6').width()+'px'}).css({'border-right':'none'});
    $('#b7').css({'height':$('#b7').width()+'px'}).css({'border-bottom':'none'}).css({'border-left':'none'});
    $('#b8').css({'height':$('#b8').width()+'px'}).css({'border-bottom':'none'});
    $('#b9').css({'height':$('#b9').width()+'px'}).css({'border-bottom':'none'}).css({'border-right':'none'});
    
    $('#b1').click(function () { if (blockArr[1] === 5) { $('#b1').append(itemArr[item]); blockArr[1] = item; next(); } });
    $('#b2').click(function () { if (blockArr[2] === 5) { $('#b2').append(itemArr[item]); blockArr[2] = item; next(); } });
    $('#b3').click(function () { if (blockArr[3] === 5) { $('#b3').append(itemArr[item]); blockArr[3] = item; next(); } });
    $('#b4').click(function () { if (blockArr[4] === 5) { $('#b4').append(itemArr[item]); blockArr[4] = item; next(); } });
    $('#b5').click(function () { if (blockArr[5] === 5) { $('#b5').append(itemArr[item]); blockArr[5] = item; next(); } });
    $('#b6').click(function () { if (blockArr[6] === 5) { $('#b6').append(itemArr[item]); blockArr[6] = item; next(); } });
    $('#b7').click(function () { if (blockArr[7] === 5) { $('#b7').append(itemArr[item]); blockArr[7] = item; next(); } });
    $('#b8').click(function () { if (blockArr[8] === 5) { $('#b8').append(itemArr[item]); blockArr[8] = item; next(); } });
    $('#b9').click(function () { if (blockArr[9] === 5) { $('#b9').append(itemArr[item]); blockArr[9] = item; next(); } });
    $('#newGame').click(restart);
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