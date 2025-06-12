const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
let lastSelectedCharacter = null;
let currentSongBtn = null;

document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = document.getElementById('audioPlayer');
  if (audioPlayer) {
    audioPlayer.onended = function() {
      if (currentSongBtn) {
        currentSongBtn.style.backgroundColor = 'white';
        currentSongBtn = null;
      }
    };
  }
});

window.addEventListener('load', () => {
  createHearts(50);
  setInterval(() => createHearts(5), 5000);
});

function openModal(index) {
  modal.style.display = 'flex';
  modalBody.innerHTML = contents[index];
  if(index === 3) initSentenceGame();
}

function closeModal() {
  modal.style.display = 'none';
  const player = document.getElementById('player');
  if(player) {
    player.pause();
    player.currentTime = 0;
  }
}

function playSong(songFile, button, youtubeUrl) {
  const audioPlayer = document.getElementById('audioPlayer');
  const youtubePlayer = document.getElementById('youtubePlayer');
  
  if (currentSongBtn) {
    currentSongBtn.style.backgroundColor = 'white';
  }
  
  button.style.backgroundColor = '#ff9eb5';
  currentSongBtn = button;
  
  audioPlayer.src = songFile;
  audioPlayer.style.display = 'block';
  youtubePlayer.style.display = 'none';
  
  audioPlayer.play().catch(error => {
    console.log('Audio file not found, falling back to YouTube');
    
    audioPlayer.style.display = 'none';
    youtubePlayer.style.display = 'block';
    
    const videoId = youtubeUrl.split('v=')[1];
    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  });
}

document.getElementById('audioPlayer').onended = function() {
  if (currentSongBtn) {
    currentSongBtn.style.backgroundColor = 'white';
    currentSongBtn = null;
  }
};

function selectCharacter(button, text) {
  console.log('selectCharacter called with:', text); 
  
  if (lastSelectedCharacter) {
    lastSelectedCharacter.style.backgroundColor = 'white';
  }
  
  button.style.backgroundColor = '#ff9eb5';
  lastSelectedCharacter = button;
  
  const modalContent = button.closest('.modal-content');
  console.log('modalContent:', modalContent); 
  
  if (modalContent) {
    const funnyText = modalContent.querySelector('#funnyText');
    console.log('funnyText:', funnyText); 
    if (funnyText) {
      funnyText.innerText = text;
    }
  }
}  

function checkPassword() {
  const pw = document.getElementById('password').value;
  const msg = document.getElementById('secretMessage');
  if(pw === '0608') {
    msg.innerText = '🎉 비밀 메시지: 리자쌤 너무 사랑해요! 🎉';
  } else {
    msg.innerText = '❌ 비밀번호가 틀렸어요';
  }
}

function initSentenceGame() {
  const sentence = [
    '사랑하는',
    '선생님께',
    '이',
    '특별한',
    '날에',
    '진심으로',
    '감사드리며',
    '생일을',
    '축하합니다'
  ];
  
  const shuffled = [...sentence].sort(() => Math.random() - 0.5);
  const wordsDiv = document.getElementById('words');
  const result = document.getElementById('result');
  const successMsg = document.getElementById('success-message');
  let selectedWords = [];
  let correctCount = 0;

  wordsDiv.innerHTML = '';
  result.innerText = '';
  successMsg.style.display = 'none';

  shuffled.forEach(word => {
    const btn = document.createElement('button');
    btn.innerText = word;
    btn.className = 'word-btn';
    btn.style.backgroundColor = '#fff';
    btn.onclick = function() {
      const index = selectedWords.indexOf(word);
      
      if (index === -1) {
        selectedWords.push(word);
        btn.style.backgroundColor = '#ff9eb5';
      } else {
        selectedWords.splice(index, 1);
        btn.style.backgroundColor = '#fff';
      }
      result.innerText = selectedWords.join(' ');
      checkCorrectness();
    };
    wordsDiv.appendChild(btn);
  });

  function checkCorrectness() {
    if (selectedWords.length === sentence.length) {
      const isCorrect = selectedWords.every((word, i) => word === sentence[i]);
      if (isCorrect) {
        correctCount++;
        if (correctCount === 1) {
          successMsg.style.display = 'block';
        }
      }
    }
  }
}

function createHearts(count) {
  const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff00ff', '#ff6347'];
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart-confetti';
      heart.innerHTML = '❤';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '-20px';
      heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      const duration = Math.random() * 3 + 2;
      heart.style.animation = `fall ${duration}s linear forwards`;
      
      const xOffset = (Math.random() - 0.5) * 100;
      heart.style.setProperty('--x-offset', `${xOffset}px`);
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, duration * 1000);
    }, i * 100);
  }
}

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fall {
    0% {
      transform: translateY(-20px) translateX(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(calc(100vh + 20px)) translateX(var(--x-offset, 0)) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);