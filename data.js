const contents = [
  `<h2>🎵 생일 노래 플레이리스트 🎵</h2>
    <p>노래를 클릭하면 재생됩니다:</p>
    <div id="songList">
    <button class="song-btn" onclick="playSong('songs/everglow-colourz.mp3', this, 'https://www.youtube.com/watch?v=9CBd3DOab4k')">Everglow - Colourz</button>
    <button class="song-btn" onclick="playSong('songs/kim-kuk-hwan-black-rubber-shoes.mp3', this, 'https://www.youtube.com/watch?v=9SAibx1uz9A')">Kim Kuk Hwan - Black Rubber Shoes (Opening)</button>
    <button class="song-btn" onclick="playSong('songs/taemin-heaven.mp3', this, 'https://www.youtube.com/watch?v=gIpT5vP5hy4')">Taemin - Heaven</button>
    <button class="song-btn" onclick="playSong('songs/t-ara-why-are-you-being-like-this.mp3', this, 'https://www.youtube.com/watch?v=chcXtJkOqYE')">T-ara - 왜 이러니</button>
    <button class="song-btn" onclick="playSong('songs/giriboy-northbutsouth.mp3', this, 'https://www.youtube.com/watch?v=E0NtgbzydjI')">Giriboy - Northbutsouth</button>
    <button class="song-btn" onclick="playSong('songs/agustd-people.mp3', this, 'https://www.youtube.com/watch?v=sHbl6mt6X80')">Agust D - People</button>
    </div>

    <div id="playerContainer">
    <audio id="audioPlayer" controls style="margin-top:20px; width:100%; display:none;"></audio>
    <iframe id="youtubePlayer" width="100%" height="315" style="margin-top:20px; display:none;" frameborder="0" allowfullscreen></iframe>
    </div>`,

  `<h2>📅 선생님의 하루 일정 📅</h2>
  <table border="1" style="margin:auto; font-size:14px;">
  <tr><th></th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th><th>일</th></tr>
  ${['아침','점심','저녁'].map(time => `
  <tr><td>${time}</td>` + 
  Array(6).fill('').map((_,i) => `
    <td onclick="
        if (!this.usedPhrases) {
        this.phrases = [
            '멋진 선생님 되기!',
            '사랑스러운 선생님 되기!',
            '진지한 선생님 되기!',
            '웃긴 선생님 되기!',
            '무서운 선생님 되기!',
            '패셔너블한 선생님 되기!',
            '이해심 많은 선생님 되기!',
            '아름다운 선생님 되기!',
            '친절한 선생님 되기!',
            '영감을 주는 선생님 되기!'
        ];
        this.emojis = [
            '🍧', '🐙', '🎉', '✨', '🌸',
            '🍰', '🎁', '💖', '🌺', '💕'
        ];
        this.usedPhrases = [];
        this.usedEmojis = [];
        this.nextIsPhrase = true;
        }
        
        if (this.nextIsPhrase) {
        if (this.phrases.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.phrases.length);
            this.innerText = this.phrases.splice(randomIndex, 1)[0];
            this.usedPhrases.push(this.innerText);
            this.nextIsPhrase = false;
        } else {
            this.innerText = '🎂 최고예요!';
        }
        } else {
        if (this.emojis.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.emojis.length);
            this.innerText = this.emojis.splice(randomIndex, 1)[0];
            this.usedEmojis.push(this.innerText);
            this.nextIsPhrase = true;
        } else {
            this.innerText = '💝 사랑해요!';
        }
        }
  "> </td>`).join('') + `
  </tr>`).join('')}
  </table>`,

  `<h2>💌 감사 메시지 💌</h2>
   <div style="font-size:16px; line-height:1.8;">
     <p>선생님, 항상 친절하게 설명해 주셔서 감사합니다!</p>
     <p>수업이 정말 재미있어요!</p>
     <p>항상 웃으시는 모습이 너무 좋아요~</p>
     <p>어려운 내용도 쉽게 가르쳐 주셔서 감사합니다!</p>
     <p>선생님 덕분에 공부가 즐거워졌어요!</p>
   </div>`,

  `<h2>🎮 문장 만들기 🎮</h2>
    <p>단어를 클릭하면 추가됩니다.</p>
    <div id="words" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 20px 0;"></div>
    <p id="result" style="font-size: 18px; min-height: 50px;"></p>
    <p id="success-message" style="color: #ff9eb5; font-weight: bold; display: none;">🎉 정답입니다! 축하합니다! 🎉</p>`,

  `<h2>🤖 캐릭터와 대화 🤖</h2>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
    <button class="character-btn" onclick="selectCharacter(this, '공부 안 해도 멋져요!')">🐱 고양이</button>
    <button class="character-btn" onclick="selectCharacter(this, '오늘도 최고예요!')">🐸 개구리</button>
    <button class="character-btn" onclick="selectCharacter(this, '선생님은 정말 대단해요!')">🐶 강아지</button>
    <button class="character-btn" onclick="selectCharacter(this, '잘하고 있어요, 멈추지 마세요!')">🦊 여우</button>
    <button class="character-btn" onclick="selectCharacter(this, '오늘도 수고했어요!')">🐻 곰</button>
    <button class="character-btn" onclick="selectCharacter(this, '이번 주말엔 진짜로 공부할 거예요... (아마도)!')">🐰 토끼</button>
  </div>
  <p id="funnyText" style="font-size: 18px; margin-top: 20px; min-height: 50px;"></p>`,

  `<h2>🔒 비밀 문 🔒</h2>
   <p>비밀번호를 입력하세요 (힌트: 선생님의 생일 월일):</p>
   <input id="password" type="text" style="padding: 10px; font-size: 16px;">
   <button id="password-btn" onclick="checkPassword()">확인</button>
   <p id="secretMessage" style="font-size: 18px; margin-top: 20px;"></p>`
];