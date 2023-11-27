let players = [
    {
        name: "헤리 케인",
        birthdate: "1993-07-28",
        yearsPlayed: 10,
        goalsScored: 170,
        weightChange: "+5 kg",
        teamCareer: "토트넘 - 바이에르 뮌헨",
        imageURL: "해리케인.jpg",
        cost: 10000000, // 초기 가격 설정
    },
    {
        name: "손흥민",
        birthdate: "1992-07-08",
        yearsPlayed: 7,
        goalsScored: 120,
        weightChange: "-3 kg",
        teamCareer: "함부르크 - 레버쿠젠 - 토트넘",
        imageURL: "손흥민.jpg",
        cost: 100000000, // 초기 가격 설정
    }, 
    // 다른 선수 데이터도 추가 가능
];

// 현재 자산
let currentMoney = 150000000; // 예시로 1500만원으로 설정

// 이적시장 관련 변수
const transferModal = document.getElementById("transferModal");
const buyPlayerButton = document.getElementById("buyPlayerButton");
const sellPlayerButton = document.getElementById("sellPlayerButton");
const playerListContainer = document.getElementById("playerList");
const assetDisplay = document.getElementById("assetDisplay");

// 이적시장 버튼 클릭 시 이벤트 핸들러 등록
buyPlayerButton.addEventListener("click", () => {
    buyRandomPlayer();
});

sellPlayerButton.addEventListener("click", () => {
    transferPlayers("sell");
});

// 선수 랜덤 사기 기능
function buyRandomPlayer() {
    // 랜덤 가격 생성
    const randomPrice = Math.floor(Math.random() * (10000000 - 5000000 + 1) + 5000000);

    // 가격이 현재 돈보다 작거나 같을 때만 구매 가능
    if (randomPrice <= currentMoney) {
        // 돈 차감
        currentMoney -= randomPrice;

        // 새로운 선수 생성 (랜덤 이름, 랜덤 생년월일)
        const newPlayer = generateRandomPlayer(randomPrice);

        // 선수 목록에 추가
        players.push(newPlayer);

        // 선수 목록 갱신
        renderPlayers();
        // 자산 표시 갱신
        updateAssetDisplay();
    } else {
        alert("돈이 부족합니다.");
    }
}

// 선수 팔기 기능
function sellPlayer(index, price) {
    // 돈 추가
    currentMoney += price;

    // 선수 목록에서 제거
    players.splice(index, 1);

    // 선수 목록 갱신
    renderPlayers();
    // 자산 표시 갱신
    updateAssetDisplay();
}

// 선수 목록 갱신
function renderPlayers() {
    const playerInfoContainer = document.getElementById("player-info");
    playerInfoContainer.innerHTML = "";
    players.forEach((player, index) => {
        const playerDiv = createPlayerDiv(player, index);
        playerInfoContainer.appendChild(playerDiv);
    });
}

// 선수 목록 생성 함수 (이전에 사용하던 함수 그대로 사용)
function createPlayerDiv(player, index) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player-card";
    playerDiv.innerHTML = `
        <h2>${player.name}</h2>
        <img src="${player.imageURL}" alt="${player.name}" class="player-image" style="width: 100px; height: auto;">
        <p>생년월일: ${player.birthdate}</p>
        <p>뛰었던 기간: ${player.yearsPlayed} 년</p>
        <p>득점 현황: ${player.goalsScored} 골</p>
        <p>몸무게 변화량: ${player.weightChange}</p>
        <p>팀 경력: ${player.teamCareer}</p>
        <p>가격: ${player.cost}원</p>
        <button onclick="sellPlayer(${index}, ${player.cost})">팔기</button>
    `;

    return playerDiv;
}

// 초기 선수 목록 표시
renderPlayers();
// 초기 자산 표시
updateAssetDisplay();

// 이적시장 모달 닫기
const closeTransferModal = document.getElementsByClassName("close")[0];
closeTransferModal.addEventListener("click", () => {
    transferModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === transferModal) {
        transferModal.style.display = "none";
    }
});

const playerImages = {
    "헤리 케인": "해리케인.jpg",
    "손흥민": "손흥민.jpg",
    "이강인": "이강인.jpg",
    "박지성": "박지성.jpg",
    // 다른 선수들에 대한 이미지도 추가 가능
};

// 랜덤 선수 생성 함수
function generateRandomPlayer(price) {
    const randomName = generateRandomName();
    const playerImages = {
        "헤리 케인": "해리케인.jpg",
        "손흥민": "손흥민.jpg",
        "박지성": "박지성.jpg",
        "이강인": "이강인.jpg",
        "송종국": "송종국.jpg",
        "이영표": "이영표.jpg",
        "호날두": "호날두.jpg",
        "지동원": "지동원.jpg",
        "김민재": "김민재.jpg",

        // 다른 선수들에 대한 이미지도 추가 가능
    };
    const randomImage = playerImages[randomName] || "기본이미지.jpg";

    return {
        name: randomName,
        birthdate: generateRandomBirthdate(),
        yearsPlayed: Math.floor(Math.random() * 10) + 1,
        goalsScored: Math.floor(Math.random() * 100),
        weightChange: `${Math.floor(Math.random() * 10)} kg`,
        teamCareer: "유소년",
        imageURL: randomImage,
        cost: price,
    };
}


// 자산 표시 갱신 함수
function updateAssetDisplay() {
    assetDisplay.innerHTML = `현재 자산: ${currentMoney}원`;
}

// 랜덤 이름 생성 함수
function generateRandomName() {
    const names = ["이강인", "김민재", "박지성", "이영표","호날두", "송종국", "지동원"];
    return names[Math.floor(Math.random() * names.length)];
}

// 랜덤 생년월일 생성 함수
function generateRandomBirthdate() {
    const year = Math.floor(Math.random() * (2003 - 1980 + 1)) + 1980;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // 간단하게 28일로 가정

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
