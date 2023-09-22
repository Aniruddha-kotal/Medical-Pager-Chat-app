import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
// import '@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'ppjd2q8dw99n';
const authToken = cookies.get("token");

const cleint = StreamChat.getInstance(apiKey);

if(authToken){
  cleint.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState('');
  const [isEditing, setIsEditing] = useState('');

  if(!authToken) return <Auth />
  
  return (
    <div className='app__wrapper'>
        <Chat client={cleint} theme="team ligth">
            <ChannelListContainer 
              isCreating = {isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
            <ChannelContainer 
              isCreating = {isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
            />
        </Chat>
    </div>
  );
}

export default App
