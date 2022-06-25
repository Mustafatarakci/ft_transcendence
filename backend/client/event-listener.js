const socket = io('http://localhost:3000');

nickname = null;

socket.on('connect', () => {
    trylogin('닉네임을 입력해주세요.');
});

socket.on('successLogin', () => {
    sendNotice();
})

socket.on('existUser', () => {
    trylogin('이미 있는 닉네임이니 다시 입력해주세요.');
})

socket.on('reloadUserList', (userList) => {
    reloadList('userList', userList);
})

socket.on('reloadChatList', (chatList) => {
    reloadList('chatList', chatList);
})

// 채팅 등록
socket.on('addChat', (message) => {
    appendText('chatList', message);
});

socket.on('addNotice', (message) => {
    appendText('chatList', message);
})

const trylogin = (message) => {
    while (!(nickname = prompt(message))){}
    socket.emit('login', nickname);
}

const reloadList = (what, list) => {
    const srcTag = document.getElementById(what);
    srcTag.innerHTML = '';
    for (item of list)
        appendText(what, item);
}

const appendText = (tagId, message) => {
    const parentTag = document.getElementById(tagId);
    const textTag = document.createElement('p');
    textTag.textContent = message.content;
    if (message.isNotice)
        textTag.style.color = 'blue';
    parentTag.appendChild(textTag);
}

const sendChat = () => {
    const chatInput = document.getElementById('chatInput');
    emitSendChat('sendChat', `${nickname}: ${chatInput.value}`);
    chatInput.value = '';
}

const sendNotice = () => {
    emitSendChat('sendNotice', `${nickname}: 님이 입장하셨습니다.`);
}

const emitSendChat = (event, content) => {
    socket.emit(event, content);
};

