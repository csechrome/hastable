var hw = document.getElementById('hw');
hw.addEventListener('click', function(){
    var n = search(0) + 1;
    alert(n);
    setSub("mon2", "asdf");
})

function setSub(block_id, block_html) {
    obj = document.getElementById(block_id);
    if (obj == null) {
        alert(block_id + ' Error');
        return;
    }
    obj.innerHTML = block_html;
}

/** USE PARSING TOOL **/
var sheetNum = [9, 11, 9, 8, 9, 9, 3, 5, 7, 2, 4, 4, 4];
var arr =
[["공연실습","화학","AP물리학C:전자기학","미적분학","심화수학","심화영어독해","화법과작문","AP화학","수학"],
["중국언어와문화","물리학","AP통계학","AP세계사","AP거시경제","미적분학","심화수학","심화미분적분학","화법과작문","AP생물학","심화수학"],
["지구과학","영미문학","AP세계사","AP물리학C:전자기학","수학","수학","심화영어독해","AP화학","고전읽기"],
["선형대수학","생명과학","국제정치","AP물리학C:전자기학","화법과작문","AP화학","AP거시경제","미적분학"],
["영어독해와작문","고전읽기","AP생물학","AP거시경제","수학","심화미분적분학","심화영어독해","AP화학","AP물리학C:전자기학"],
["심화영어회화","영미문학","AP통계학","국제정치","미적분학","심화수학","심화미분적분학","심화영어독해","화법과작문"],
["일본어독해와작문","국제정치","심화수학"],
["영어독해와작문","생명과학","국제정치","미적분학","화법과작문"],
["중국어회화","퍼블릭스피킹과프리젠테이션","생활과윤리","AP컴퓨터과학A","운동과건강","경제","문학개론"],
["일본어회화","운동과건강"],
["음악감상과비평","입체조형","경제","문학개론"],
["AP컴퓨터과학A","생활과윤리","운동과건강","경제"],
["퍼블릭스피킹과프리젠테이션","입체조형","운동과건강","문학개론"]];

var n = 0;
var subchk = Array(9).fill(false);
var timechk = Array(13).fill(false);
var tempTable = Array.from(Array(7), () => Array());
var sorted = Array.from(Array(13), () => Array());
var allTable = Array(1000); // [7][5]
var sub = Array(9);

function search(idx) {		// DFS Search
    console.log(idx);

    if (idx == 9) {
        tempTable[6][2] = "창체"; // WED7 Always NULL

        for (var i = 0; i < 13; i++) {
            if (!timechk[i]) { // Which Block is NULL?
                set(i, "공강"); // NULL to "공강"
            }
        }

        for (var i = 0; i < n; i++) {
            if (JSON.stringify(tempTable) === JSON.stringify(allTable[i])) {
                return 0;
            }
        }

        allTable[n] = Array.from(Array(7), () => Array());
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 5; j++) {
                allTable[n][i][j] = tempTable[i][j];
            }
        }
        
        n++;
        return 0;
    }
    
    for (var i = idx; i < 13; i++) { // Block
        for (var j = 0; j < sheetNum[i]; j++) { // Subjects
            for (var k = 0; k < 9; k++) { // My Subject
                if (sorted[i][j]==(sub[k]) && !subchk[k] && !timechk[i]) {

                    /** Check Subject & Block **/
                    subchk[k] = true;
                    timechk[i] = true;
                    if (i == 7) {
                        timechk[9] = timechk[12] = true;
                    } else if (i == 6) {
                        timechk[10] = timechk[11] = true;
                    } else if (i == 9 || i == 12) {
                        timechk[7] = true;
                    } else if (i == 10 || i == 11) {
                        timechk[6] = true;
                    }

                    set(i, sub[k]); // PUSH
                    search(idx + 1); // DFS(index + 1);

                    /** Undo Check **/
                    subchk[k] = false;
                    timechk[i] = false;
                    if (i == 7) {
                        timechk[9] = timechk[12] = false;
                    } else if (i == 6) {
                        timechk[10] = timechk[11] = false;
                    } else if (!timechk[9] && !timechk[12]) {
                        timechk[7] = false;
                    } else if (!timechk[10] && !timechk[11]) {
                        timechk[6] = false;
                    }

                    set(i, null); // POP
                    break;
                }
            }
        }
    }

    return n;
}

function set(time, subName) {

    switch (time) {

    /** 4A ~ 4H **/
    case 0:
        tempTable[0][0] = subName;
        tempTable[1][0] = subName;
        tempTable[4][2] = subName;
        tempTable[5][2] = subName;
        break;
    case 1:
        tempTable[4][0] = subName;
        tempTable[5][0] = subName;
        tempTable[2][2] = subName;
        tempTable[3][2] = subName;
        break;
    case 2:
        tempTable[6][0] = subName;
        tempTable[4][1] = subName;
        tempTable[4][3] = subName;
        tempTable[5][3] = subName;
        break;
    case 3:
        tempTable[5][1] = subName;
        tempTable[6][1] = subName;
        tempTable[0][4] = subName;
        tempTable[1][4] = subName;
        break;
    case 4:
        tempTable[0][2] = subName;
        tempTable[1][2] = subName;
        tempTable[6][3] = subName;
        tempTable[4][4] = subName;
        break;
    case 5:
        tempTable[0][3] = subName;
        tempTable[1][3] = subName;
        tempTable[5][4] = subName;
        tempTable[6][4] = subName;
        break;
    case 6:
        tempTable[2][1] = subName;
        tempTable[3][1] = subName;
        tempTable[2][3] = subName;
        tempTable[3][3] = subName;
        break;
    case 7:
        tempTable[0][1] = subName;
        tempTable[1][1] = subName;
        tempTable[2][4] = subName;
        tempTable[3][4] = subName;
        break;

    /** 2A ~ 2E **/
    case 8:
        tempTable[2][0] = subName;
        tempTable[3][0] = subName;
        break;
    case 9:
        tempTable[0][1] = subName;
        tempTable[1][1] = subName;
        break;
    case 10:
        tempTable[2][1] = subName;
        tempTable[3][1] = subName;
        break;
    case 11:
        tempTable[2][3] = subName;
        tempTable[3][3] = subName;
        break;
    case 12:
        tempTable[2][4] = subName;
        tempTable[3][4] = subName;
        break;
    }
}