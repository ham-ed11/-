// 선수 데이터
const players = [
    {
        name: "헤리 케인",
        birthdate: "1993-07-28",
        yearsPlayed: 10,
        goalsScored: 170,
        weightChange: "+5 kg",
        teamCareer: "토트넘 - 바이에르 뮌헨",
        imageURL: "해리케인.jpg",
    },
    {
        name: "손흥민",
        birthdate: "1992-07-08",
        yearsPlayed: 7,
        goalsScored: 120,
        weightChange: "-3 kg",
        teamCareer: "함부르크 - 레버쿠젠 - 토트넘",
        imageURL: "손흥민.jpg",
    },
    // 다른 선수 데이터도 추가할 수 있습니다.
];

// HTML 요소 참조
const playerInfoContainer = document.getElementById("player-info");
const addPlayerForm = document.getElementById("add-player-form");
const addPlayerButton = document.getElementById("addPlayerButton");
const searchPlayerInput = document.getElementById("searchPlayer");

// "추가" 버튼 클릭 시 이벤트 핸들러
addPlayerButton.addEventListener("click", () => {
    // 선수 추가 기능
    addPlayer();
});

// 선수 추가 기능
function addPlayer() {
    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;
    const yearsPlayed = parseInt(document.getElementById("yearsPlayed").value);
    const goalsScored = parseInt(document.getElementById("goalsScored").value);
    const weightChange = document.getElementById("weightChange").value;
    const teamCareer = document.getElementById("teamCareer").value;
    const imageURL = document.getElementById("imageURL").value;

    if (name && birthdate && yearsPlayed && goalsScored && weightChange && teamCareer && imageURL) {
        const newPlayer = {
            name,
            birthdate,
            yearsPlayed,
            goalsScored,
            weightChange,
            teamCareer,
            imageURL,
        };

        players.push(newPlayer);
        renderPlayers();
        // 입력 필드 초기화
        document.getElementById("name").value = "";
        document.getElementById("birthdate").value = "";
        document.getElementById("yearsPlayed").value = "";
        document.getElementById("goalsScored").value = "";
        document.getElementById("weightChange").value = "";
        document.getElementById("teamCareer").value = "";
        document.getElementById("imageURL").value = "";
    }
}

// 선수 검색 기능
searchPlayerInput.addEventListener("input", () => {
    const searchTerm = searchPlayerInput.value.toLowerCase();
    const playerInfoContainer = document.getElementById("player-info");
    playerInfoContainer.innerHTML = ""; // 기존 선수 정보를 모두 지우고 검색 결과만 표시

    players.forEach((player, index) => {
        if (
            player.name.toLowerCase().includes(searchTerm) ||
            player.birthdate.includes(searchTerm) ||
            player.yearsPlayed.toString().includes(searchTerm) ||
            player.goalsScored.toString().includes(searchTerm) ||
            player.weightChange.toLowerCase().includes(searchTerm) ||
            player.teamCareer.toLowerCase().includes(searchTerm)
        ) {
            // 검색어를 포함하는 선수만 표시
            const playerDiv = createPlayerDiv(player, index);
            playerInfoContainer.appendChild(playerDiv);
        }
    });
});

// 나머지 함수들은 그대로 두고, 맨 아래에 아래 코드 추가
renderPlayers();

// 선수 삭제 기능
function deletePlayer(index) {
    if (index >= 0 && index < players.length) {
        players.splice(index, 1);
        renderPlayers();
    }
}

// ... (기존 코드 유지)

// 초기 선수 정보 표시
function renderPlayers() {
    const playerInfoContainer = document.getElementById("player-info");
    playerInfoContainer.innerHTML = "";

    players.forEach((player, index) => {
        const playerDiv = createPlayerDiv(player, index);
        playerInfoContainer.appendChild(playerDiv);
    });
}

// 나머지 함수들은 그대로 두고, 맨 아래에 아래 코드 추가
renderPlayers();


// "수정" 버튼 클릭 시 이벤트 핸들러
function editPlayer(index) {
    const name = prompt("이름을 수정하세요:", players[index].name);
    const birthdate = prompt("생년월일을 수정하세요:", players[index].birthdate);
    const yearsPlayed = parseInt(prompt("뛰었던 기간을 수정하세요:", players[index].yearsPlayed));
    const goalsScored = parseInt(prompt("득점 현황을 수정하세요:", players[index].goalsScored));
    const weightChange = prompt("몸무게 변화량을 수정하세요:", players[index].weightChange);
    const teamCareer = prompt("팀 경력을 수정하세요:", players[index].teamCareer);
    const imageURL = prompt("사진 URL을 수정하세요:", players[index].imageURL);

    if (name && birthdate && yearsPlayed && goalsScored && weightChange && teamCareer && imageURL) {
        players[index] = {
            name,
            birthdate,
            yearsPlayed,
            goalsScored,
            weightChange,
            teamCareer,
            imageURL,
        };

        renderPlayers();
    }
}

function createPlayerDiv(player, index) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player-card";
    playerDiv.innerHTML = `
        <h2>${player.name}</h2>
        <img src="${player.imageURL}" alt="${player.name}" class="player-image">
        <p>생년월일: ${player.birthdate}</p>
        <p>뛰었던 기간: ${player.yearsPlayed} 년</p>
        <p>득점 현황: ${player.goalsScored} 골</p>
        <p>몸무게 변화량: ${player.weightChange}</p>
        <p>팀 경력: ${player.teamCareer}</p>
    ` ;

    if (index !== undefined) {
        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.className = "edit-button";
        editButton.addEventListener("click", () => {
            editPlayer(index);
        });
        playerDiv.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            deletePlayer(index);
        });
        playerDiv.appendChild(deleteButton);
    }

    return playerDiv;
}

// "선수 사기" 버튼 클릭 시 이벤트 핸들러
const buyPlayerButton = document.getElementById("buyPlayerButton");
buyPlayerButton.addEventListener("click", () => {
    // 선수 사기 기능
    buyPlayer();
});

// "선수 팔기" 버튼 클릭 시 이벤트 핸들러
const sellPlayerButton = document.getElementById("sellPlayerButton");
sellPlayerButton.addEventListener("click", () => {
    // 선수 팔기 기능
    sellPlayer();
});

// 선수 사기 기능
function buyPlayer() {
    const playerIndex = Math.floor(Math.random() * players.length);
    const selectedPlayer = players[playerIndex];

    // 선수 비용 랜덤 생성 (예: 10만 달러 ~ 100만 달러)
    const playerCost = Math.floor(Math.random() * 900000) + 100000;

    alert(`${selectedPlayer.name}을(를) ${playerCost}달러에 사게 되었습니다!`);
}

// 선수 팔기 기능
function sellPlayer() {
    const playerIndex = Math.floor(Math.random() * players.length);
    const selectedPlayer = players[playerIndex];

    // 선수 비용 랜덤 생성 (예: 10만 달러 ~ 100만 달러)
    const playerCost = Math.floor(Math.random() * 900000) + 100000;

    alert(`${selectedPlayer.name}을(를) ${playerCost}달러에 팔게 되었습니다!`);

    // 판 선수 삭제
    players.splice(playerIndex, 1);
    renderPlayers();
}

// 나머지 함수들은 그대로 두고, 맨 아래에 아래 코드 추가
renderPlayers();
