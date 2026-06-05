// ============ FRIENDS MODULE ============

function addFriend() {
    const friendInput = document.getElementById('friendIdInput');
    const searchTerm = friendInput.value.trim();

    if (!searchTerm) {
        showAlert('friendAlert', 'Please enter a username');
        return;
    }

    const friend = globalStore.users.find(u => 
        u.username.toLowerCase() === searchTerm.toLowerCase() &&
        u.id !== currentUser.id
    );

    if (!friend) {
        showAlert('friendAlert', 'User not found');
        return;
    }

    if (globalStore.friends[currentUser.id].includes(friend.id)) {
        showAlert('friendAlert', 'Already friends with this user');
        return;
    }

    globalStore.friends[currentUser.id].push(friend.id);
    if (!globalStore.friends[friend.id]) {
        globalStore.friends[friend.id] = [];
    }
    globalStore.friends[friend.id].push(currentUser.id);
    
    saveStore();
    friendInput.value = '';
    showAlert('friendAlert', `Added ${friend.username} as a friend!`, true);
    displayFriends();
}

function displayFriends() {
    const friendsList = document.getElementById('friendsList');
    const friendIds = globalStore.friends[currentUser.id] || [];

    if (friendIds.length === 0) {
        friendsList.innerHTML = '<p style="font-size: 12px; color: #95a5a6;">No friends added yet</p>';
        return;
    }

    const friendsHTML = friendIds.map(friendId => {
        const friend = globalStore.users.find(u => u.id === friendId);
        if (!friend) return '';

        const isChatActive = currentChat === `friend_${friendId}`;
        return `
            <div class="chat-item ${isChatActive ? 'active' : ''}" 
                 data-chat-id="friend_${friendId}"
                 onclick="selectChat('friend_${friendId}')">
                👤 ${escapeHtml(friend.username)}
            </div>
        `;
    }).filter(html => html !== '').join('');

    friendsList.innerHTML = friendsHTML || '<p style="font-size: 12px; color: #95a5a6;">No friends added yet</p>';
}

function removeFriend(friendId) {
    const friendIdx = globalStore.friends[currentUser.id].indexOf(friendId);
    if (friendIdx > -1) {
        globalStore.friends[currentUser.id].splice(friendIdx, 1);
    }

    const userIdx = globalStore.friends[friendId].indexOf(currentUser.id);
    if (userIdx > -1) {
        globalStore.friends[friendId].splice(userIdx, 1);
    }

    saveStore();
    displayFriends();
    showAlert('friendAlert', 'Friend removed', true);
    
    if (currentChat.startsWith('friend_')) {
        selectChat('global');
    }
}
