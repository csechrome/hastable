var nowtable = 0;
window.onload = function() {
    var str = decodeURIComponent(location.search.substr(1, location.search.length));
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

var sheetNum = [9, 9, 9, 9, 10, 9, 5, 3, 7, 7, 6, 11, 6];
var sorted =
[["영어I","윤리와 사상","생활과 과학","문학","수학I","생명과학I","AP 물리학 C: 역학","심화 미분적분학I","물리학I"],
["AP 미시경제","AP 통계학","화학I","영미문학I","문학","수학I","생명과학I","심화 미분적분학I","기하"],
["세계사","선형대수학","물리학I","심화 영어 독해I","문학","수학I","AP 화학I","AP 물리학 C: 역학","심화 미분적분학I"],
["심화 영어 회화I","정치와 법","생활과 과학","영미문학I","문학","수학I","AP 화학I","심화 미분적분학I","기하"],
["AP 미시경제","AP 생물학I","AP 통계학","물리학I","심화 영어 독해I","문학","수학I","AP 물리학 C: 역학","심화 미분적분학I","기하"],
["정치와 법","화학I","영미문학I","심화 영어 독해I","문학","수학I","생명과학I","기하","물리학I"],
["합창","드로잉","수학I","AP 화학I","기하"],
["AP 생물학I","문학","수학I"],
["퍼블릭 스피킹","생활과 윤리","문학과 매체","경제","사회과제 연구(사회)","과학과제 연구(생명과학)","과학과제 연구(물리학)"],
["사회과제 연구(인문)","문학과 매체","과학과제 연구(수학통계)","경제","운동과 건강","사회과제 연구(사회)","과학과제 연구(물리학)"],
["일본어 회화I","사회과제 연구(경제경영)","운동과 건강","경제","과학과제 연구(생명과학)","과학과제 연구(화학)"],
["미술사","음악사","과학과제 연구(정보과학)","생활과 윤리","과학과제 연구(수학통계)","운동과 건강","경제","사회과제 연구(사회)","과학과제 연구(생명과학)","과학과제 연구(물리학)","과학과제 연구(화학)"],
["AP 컴퓨터과학 A","심화 국어","운동과 건강","과학과제 연구(생명과학)","사회과제 연구(사회)","과학과제 연구(화학)"]];

var n = 0;
var subchk = Array(9).fill(false);
var timechk = Array(13).fill(false);
var tempTable = Array.from(Array(7), () => Array());
var allTable = Array(500);
var sub = ["생활과 윤리", "생명과학I", "AP 물리학 C: 역학", "심화 미분적분학I", "운동과 건강", "심화 영어 독해I", "기하", "문학과 매체", "AP 컴퓨터과학 A", "과학과제 연구(정보과학)"];

function search(idx) { 

    if (idx == 9) {
        tempTable[6][2] = "창체"; 

        for (var i = 0; i < 13; i++) {
            if (!timechk[i]) {
                set(i, "공강");
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
        
        allTable[n] = Array.from(Array(7), () => Array());
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 5; j++) {
                allTable[n][i][j] = tempTable[i][j];
            }
        }
        n++;

        return 0;
    }

    for (var i = idx; i < 13; i++) { 
        tempLoop:
        for (var j = 0; j < sheetNum[i]; j++) { 
            for (var k = 0; k < 9; k++) { 
                if (sorted[i][j]==(sub[k]) && !subchk[k] && !timechk[i]) {

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

                    set(i, sub[k]);
                    search(idx + 1);

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

                    set(i, null);
                    break tempLoop;
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