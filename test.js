var nowtable = 0;
window.onload = function() {
    var str = decodeURIComponent(location.search.substr(1, location.search.length));
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
var sheetNum = [10, 10, 9, 9, 10, 8, 3, 4, 4, 3, 4, 6, 7];
var sorted =
[["합창","세포생물학","현대 물리학I","고급 물리학","고급 생명과학","시사영어","언어와 매체","미적분학II","비교 문화","확률과 통계"],
["중국 언어와 문화","고급 지구과학","생명과학 실험","AP 세계사","고급 화학","융합과학 탐구","언어와 매체","사회 문화","확률과 통계","심화 영어I"],
["AP 미적분학","일본어 회화II","AP 세계사","시사영어","고급 화학","융합과학 탐구","언어와 매체","확률과 통계","심화 영어I"],
["국제 경제","비평적 읽기와 쓰기","고급 생명과학","심화 국어","언어와 매체","융합과학 탐구","미적분학II","비교 문화","심화 영어I"],
["중국어 독해와 작문II","일본 언어와 문화","화학 실험","현대 물리학I","심화 국어","고급 화학","언어와 매체","미적분학II","사회 문화","심화 영어I"],
["독서","고급 물리학","국제 경제","언어와 매체","미적분학II","비교 문화","확률과 통계","심화 영어I"],
["언어와 매체","심화 영어I","사회 문화"],
["매체 미술","비평적 읽기와 쓰기","고급 화학","미적분학II"],
["심화 영어 작문I","운동과 건강","수학적 사고와 통계","교육학"],
["운동과 건강","수학적 사고와 통계","교육학"],
["고전문학 감상","운동과 건강","수학적 사고와 통계","고급 수학I"],
["고전문학 감상","수학 과제연구","운동과 건강","수학적 사고와 통계","교육학","고급 수학I"],
["심화 영어 작문I","음악사","미술사","수학적 사고와 통계","교육학","고급 수학I", "정보과학"]];
    
var n = 0;
var subchk = Array(9).fill(false);
var timechk = Array(13).fill(false);
var tempTable = Array.from(Array(7), () => Array());
var allTable = Array(500);
var sub = ["사회 문화", "비교 문화", "심화 국어", "교육학", "운동과 건강", "언어와 매체", "심화 영어I", "확률과 통계", "고전문학 감상"];

function search(idx) {		// DFS Search

    if (idx == 9) {
        tempTable[6][2] = "창체"; // WED7 Always NULL

        for (var i = 0; i < 13; i++) {
            if (!timechk[i]) { // Which Block is NULL?
                set(i, "공강"); // NULL to "공강"
            }
        }

        for(var i=0; i<n; i++){

            nextLoop:
            for(var j=0; j<7; j++){
                for(var k=0; k<5; k++){
                    if(allTable[i][j][k] != tempTable[j][k]){
                        break nextLoop;
                    }
                }

                if(j == 6){
                    return 0;
                }
            }
        }

        if(tempTable[0][0] == "공강" && tempTable[0][2] == "운동과 건강" && tempTable[6][3] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "  1");
        }
        if(tempTable[0][0] == "공강" && tempTable[0][2] == "운동과 건강" && tempTable[0][2] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "  2");
        }
        if(tempTable[0][0] == "운동과 건강" && tempTable[0][2] == "공강" && tempTable[6][3] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "   3");
        }
        if(tempTable[0][0] == "운동과 건강" && tempTable[0][2] == "공강" && tempTable[0][2] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "  4");
        }
        if(tempTable[0][0] == "공강" && tempTable[0][2] == "운동과 건강" && tempTable[3][0] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "  5");
        }
        if(tempTable[0][0] == "공강" && tempTable[6][3] == "운동과 건강" && tempTable[3][0] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "   6");
        }
        if(tempTable[2][0] == "공강" && tempTable[1][0] == "운동과 건강" && tempTable[6][0] == "공강" && tempTable[5][1] == "심화 영어I") {
            console.log(n + "  7");
        }
        if(tempTable[2][4] == "공강" && tempTable[0][0] == "운동과 건강" && tempTable[4][1] == "공강" && tempTable[3][1] == "심화 영어I") {
            console.log(n + "  7");
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
                    if (i == 6) {
                        timechk[9] = timechk[12] = true;
                    } else if (i == 7) {
                        timechk[8] = timechk[10] = true;
                    } else if (i == 9 || i == 12) {
                        timechk[6] = true;
                    } else if (i == 8 || i == 10) {
                        timechk[7] = true;
                    }

                    set(i, sub[k]); // PUSH
                    search(idx + 1); // DFS(index + 1);

                    /** Undo Check **/
                    subchk[k] = false;
                    timechk[i] = false;
                    if (i == 6) {
                        timechk[9] = timechk[12] = false;
                    } else if (i == 7) {
                        timechk[8] = timechk[10] = false;
                    } else if (!timechk[9] && !timechk[12]) {
                        timechk[6] = false;
                    } else if (!timechk[8] && !timechk[10]) {
                        timechk[7] = false;
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
        tempTable[4][0] = subName;
        tempTable[5][0] = subName;
        tempTable[2][2] = subName;
        tempTable[3][2] = subName;
        break;
    case 1:
        tempTable[6][0] = subName;
        tempTable[2][1] = subName;
        tempTable[3][1] = subName;
        tempTable[4][3] = subName;
        break;
    case 2:
        tempTable[6][1] = subName;
        tempTable[0][3] = subName;
        tempTable[1][3] = subName;
        tempTable[4][4] = subName;
        break;
    case 3:
        tempTable[4][2] = subName;
        tempTable[5][2] = subName;
        tempTable[0][4] = subName;
        tempTable[1][4] = subName;
        break;
    case 4:
        tempTable[4][1] = subName;
        tempTable[5][1] = subName;
        tempTable[2][4] = subName;
        tempTable[3][4] = subName;
        break;
    case 5:
        tempTable[0][1] = subName;
        tempTable[1][1] = subName;
        tempTable[5][4] = subName;
        tempTable[6][4] = subName;
        break;
    case 6:
        tempTable[0][0] = subName;
        tempTable[1][0] = subName;
        tempTable[2][3] = subName;
        tempTable[3][3] = subName;
        break;
    case 7:
        tempTable[2][0] = subName;
        tempTable[3][0] = subName;
        tempTable[0][2] = subName;
        tempTable[1][2] = subName;
        break;

    /** 2A ~ 2E **/
    case 8:
        tempTable[2][0] = subName;
        tempTable[3][0] = subName;
        break;
    case 9:
        tempTable[0][0] = subName;
        tempTable[1][0] = subName;
        break;
    case 10:
        tempTable[0][2] = subName;
        tempTable[1][2] = subName;
        break;
    case 11:
        tempTable[5][3] = subName;
        tempTable[6][3] = subName;
        break;
    case 12:
        tempTable[3][3] = subName;
        tempTable[2][3] = subName;
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