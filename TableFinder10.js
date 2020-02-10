var nowtable = 0;
window.onload = function() {
    var str = decodeURI(location.search.substr(1, location.search.length));
    //sub = str.split(',');
    history.replaceState({}, null, location.pathname);
    var n = search(0);
    setSub("loading", "");
    setSub("tablenum", n);
    displayTable(nowtable);
}

function setSub(block_id, block_html) {
    obj = document.getElementById(block_id);
    if (obj == null) {
        alert(block_id + ' Error');
        return;
    }
    obj.innerHTML = block_html;
}

window.onkeydown = function() {
    if (event.keyCode == '37' || event.keyCode == '40') {
        if(nowtable != 0) {
            displayTable(--nowtable);
            this.setSub("nownum", nowtable+1);
        }
    }
    else if (event.keyCode == '39' || event.keyCode == '38') {
        if(nowtable != n - 1) {
            displayTable(++nowtable);
            this.setSub("nownum", nowtable+1);
        }
    }
}

/** USE PARSING TOOL **/
var sheetNum = [9, 10, 9, 10, 9, 10, 4, 3, 11, 7, 7, 9, 9];
var sorted =
[["드로잉","물리학I","화학I","AP 화학 I","정치와 법","심화 영어 독해I","심화 수학I","심화 수학Ⅱ","문학"],
["중국어 문법","AP 통계학","물리학I","화학I","고급 수학I","정치와 법","심화 수학I","심화 수학Ⅱ","문학","세계사"],
["독서","세계사","영미문학I","AP 물리학 C: 역학","AP 미시경제","수학I","심화 영어 독해I","심화 수학Ⅱ","지구과학I"],
["선형대수학","일본어문법","AP 생물학I","지구과학I","AP 물리학 C: 역학","AP 미시경제","AP 화학 I","생명과학I","수학I","문학"],
["AP 생물학","영어I","AP 화학 I","고급 수학I","생명과학I","정치와 법","수학I","심화 영어 독해I","문학"],
["AP 통계학","영미문학I","영어I","AP 물리학 C: 역학","AP 미시경제","고급 수학I","심화 영어 독해I","심화 수학I","심화 수학Ⅱ","문학"],
["수학I","심화 수학I","심화 수학Ⅱ","문학"],
["생명과학I","심화 수학I","문학"],
["문학과 매체","생활과 윤리","퍼블릭스피킹과 프리젠테이션","경제","과제연구(경제경영)","과제연구(물리)","과제연구(사회)","과제연구(생명과학)","과제연구(수학/통계학)","과제연구(화학)","체육"],
["중국어 회화I","과제연구(인문)","과제연구(물리)","과제연구(사회)","과제연구(수학/통계학)","과제연구(화학)","체육"],
["일본어 회화I","경제","과제연구(경제경영)","과제연구(물리)","과제연구(사회)","과제연구(생명과학)","과제연구(수학/통계학)"],
["AP 컴퓨터과학 A","생활과 윤리","경제","과제연구(경제경영)","과제연구(물리)","과제연구(생명과학)","과제연구(수학/통계학)","과제연구(화학)","체육"],
["미술사","AP 컴퓨터과학 A","과제연구(인문)","문학과 매체","퍼블릭스피킹과 프리젠테이션","과제연구(사회)","과제연구(수학/통계학)","과제연구(화학)","체육"]];

var n = 0;
var subchk = Array(9).fill(false);
var timechk = Array(13).fill(false);
var tempTable = Array.from(Array(7), () => Array());
var allTable = Array(500);
//var sub = Array(9);
var sub = ["중국어 문법", "AP 물리학 C: 역학", "심화 영어 독해I", "체육", "과제연구(수학/통계학)", "심화 수학Ⅱ", "심화 수학I", "문학", "생활과 윤리", "AP 컴퓨터과학 A"];

function search(idx) {		// DFS Search

    if (idx == 10) {
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
                if(tempTable[i][j].includes("과제연구")){
                    tempTable[i][j] = "과제연구";
                }
                allTable[n][i][j] = tempTable[i][j];
            }
        }
        
        n++;
        return 0;
    }
    
    for (var i = idx; i < 13; i++) { // Block
        for (var j = 0; j < sheetNum[i]; j++) { // Subjects
            for (var k = 0; k < 10; k++) { // My Subject
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

function displayTable(idx) {
    var day = ["mon", "tue", "wed", "thu", "fri"];
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 5; j++) {
            setSub(day[j]+String(i+1), allTable[idx][i][j]);
        }
    }
}