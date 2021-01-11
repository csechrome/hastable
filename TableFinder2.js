var nowtable = 0;
window.onload = function() {
    var str = decodeURIComponent(location.search.substr(1, location.search.length));
    sub = str.split(',');
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

function leftClick() {
    if(nowtable != 0) {
        displayTable(--nowtable);
        this.setSub("nownum", nowtable+1);
    }
}

function rightClick() {
    if(nowtable != n - 1) {
        displayTable(++nowtable);
        this.setSub("nownum", nowtable+1);
    }
}

/** USE PARSING TOOL **/
var sorted =
[["AP 세계사","생명과학II","AP 물리학","화법과 작문","수학II","언어와 매체","심화 영어 독해II"],
["선형대수학","수학II","심화 영어 독해II","화법과 작문","지구과학I","언어와 매체","국제 정치","AP 화학II"],
["화학II","물리학II","현대사회와 철학","AP 거시경제","수학II","심화 미분적분학I","지구과학I","미적분학I"],
["영어 독해와 작문","중국 언어와 문화","생명과학II","AP 통계학","AP 거시경제","AP 생물학II","미적분학I","심화 미분적분학I","언어와 매체","AP 물리학","AP 화학II","심화 영어 독해II","수학II"],
["심화 영어 회화II","AP 통계학","현대사회와 철학","국제 정치","미적분학I","수학II","심화 미분적분학I","AP 물리학","AP 화학II"],
["공연 실습","영미문학II","미적분학I","수학II","심화 미분적분학I","AP 화학II","화법과 작문"],
["물리학II","AP 생물학II","영미문학II","국제 정치","미적분학I","수학II","심화 미분적분학I"],
["지구과학I","화법과 작문","미적분학I","수학II","심화 영어 독해II"],
["일본어 회화I","고전문학 감상","생활과 윤리","과학 과제연구(수학통계)","심리학","경제","운동과 건강","과학 과제연구(생명과학)","과학 과제연구(화학)","사회 과제연구"],
["퍼블릭 스피킹","고전문학 감상","심리학","경제","운동과 건강","과학 과제연구(물리학)","사회 과제연구"],
["과학 과제연구(정보과학)","심리학","과학 과제연구(화학)","사회 과제연구"],
["심화 국어","입체 조형","생활과 윤리","경제","운동과 건강","과학 과제연구(생명과학)","사회 과제연구"],
["AP 컴퓨터과학 A","경제","운동과 건강","과학 과제연구(물리학)","과학 과제연구(생명과학)"]];
/** USE PARSING TOOL **/

var n = 0;
var subchk = Array(10).fill(false);
var timechk = Array(13).fill(false);
var tempTable = Array.from(Array(7), () => Array());
var allTable = Array(500);
var sub = Array(10);

function search(idx) {
    if (idx == 10) {
        tempTable[6][2] = "창체"; // WED7 Always NULL

        for (var i = 0; i < 13; i++) {
            if (!timechk[i]) {
                set(i, "공강"); // NULL --> "공강"
            }
        }

        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 5; j++) {
                if(tempTable[i][j].includes("과제연구")){
                    tempTable[i][j] = "과제연구";
                }
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
                    return 0;   // Do not save
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
    
    for (var i = idx; i < 13; i++) { // Block
        for (var j = 0; j < sorted[i].length; j++) { // Subjects
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
        tempTable[2][1] = subName;
        tempTable[3][1] = subName;
        tempTable[4][3] = subName;
        tempTable[6][4] = subName;
        break;
    case 1:
        tempTable[6][0] = subName;
        tempTable[6][1] = subName;
        tempTable[0][3] = subName;
        tempTable[1][3] = subName;
        break;
    case 2:
        tempTable[0][2] = subName;
        tempTable[1][2] = subName;
        tempTable[4][4] = subName;
        tempTable[5][4] = subName;
        break;
    case 3:
        tempTable[0][0] = subName;
        tempTable[1][0] = subName;
        tempTable[2][2] = subName;
        tempTable[3][2] = subName;
        break;
    case 4:
        tempTable[4][1] = subName;
        tempTable[5][1] = subName;
        tempTable[5][3] = subName;
        tempTable[6][3] = subName;
        break;
    case 5:
        tempTable[4][2] = subName;
        tempTable[5][2] = subName;
        tempTable[0][4] = subName;
        tempTable[1][4] = subName;
        break;
    case 6:
        tempTable[4][0] = subName;
        tempTable[5][0] = subName;
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
        tempTable[4][0] = subName;
        tempTable[5][0] = subName;
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