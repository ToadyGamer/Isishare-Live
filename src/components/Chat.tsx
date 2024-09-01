"use client";
import React, { useEffect, useState } from 'react';
import Ably from 'ably';

interface Message {
  id: string;
  content: string;
  sender: string;
}

interface Channel {
  id: string;
  name: string;
}

const Chat: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannelId, setCurrentChannelId] = useState<string>('');
  const [messages, setMessages] = useState<{ [channelId: string]: Message[] }>({});
  const [input, setInput] = useState<string>('');
  const [newChannelName, setNewChannelName] = useState<string>('');

  useEffect(() => {
    // Fetch user data
    fetch(`${localStorage.getItem("api")}users/id/${localStorage.getItem("idActualUser")}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setName(data[0].name);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Initialize Ably client
    const client = new Ably.Realtime({ key: 'ElzakQ.Woi1lw:jTZkEKo0QrxsC65hfSEkqHUCveUa7Gzo1J2TqoMytx8' });
    setAblyClient(client);

    return () => {
      client.close();
    };
  }, []);

  useEffect(() => {
    // Subscribe to channel_added events
    if (!ablyClient) return;

    const channelsChannel = ablyClient.channels.get('channels');
    channelsChannel.attach();
    channelsChannel.subscribe('channel_added', (message: Ably.Message) => {
      const channel = message.data as Channel;
      setChannels(prevChannels => [...prevChannels, channel]);
    });

    return () => {
      channelsChannel.detach();
    };
  }, [ablyClient]);

  useEffect(() => {
    // Subscribe to message_added events for the current channel
    if (!ablyClient || !currentChannelId) return;
  
    const messagesChannel = ablyClient.channels.get(`channel:${currentChannelId}`);
    messagesChannel.attach();
    const messageHandler = (message: Ably.Message) => {
      const newMessage = message.data as Message;
      setMessages(prevMessages => ({
        ...prevMessages,
        [currentChannelId]: [...(prevMessages[currentChannelId] || []), newMessage],
      }));
    };
    messagesChannel.subscribe('message_added', messageHandler);
  
    return () => {
      messagesChannel.unsubscribe('message_added', messageHandler);
    };
  }, [ablyClient, currentChannelId]);

  const handleChannelChange = (channelId: string) => {
    setCurrentChannelId(channelId);
    // Load messages for the selected channel
    setMessages(prevMessages => ({
      ...prevMessages,
      [channelId]: prevMessages[channelId] || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ablyClient || !currentChannelId || input.trim() === '') return;

    const messagesChannel = ablyClient.channels.get(`channel:${currentChannelId}`);
    messagesChannel.publish('message_added', { content: input, sender: name });
    setInput('');
  };

  const handleCreateChannel = () => {
    if (!ablyClient || newChannelName.trim() === '') return;

    const channelsChannel = ablyClient.channels.get('channels');
    const newChannel: Channel = {
      id: newChannelName.toLowerCase().replace(/\s+/g, '-'),
      name: newChannelName,
    };
    channelsChannel.publish('channel_added', newChannel);
    setNewChannelName('');
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4 text-black">Channels</h2>
          <ul className="space-y-2">
            {channels.map(channel => (
              <li
                key={channel.id}
                className={`p-2 rounded cursor-pointer ${currentChannelId === channel.id ? 'bg-[#609cf3]' : 'bg-gray-600 hover:bg-gray-700'}`}
                onClick={() => handleChannelChange(channel.id)}
              >
                {channel.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="New channel name"
          />
          <button
            onClick={handleCreateChannel}
            className="w-full p-2 rounded"
            style={{ backgroundColor: '#2a429e', color: 'white' }}
          >
            Create Channel
          </button>
        </div>
      </div>
      <div className="w-3/4 bg-gray-100 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-300 rounded bg-white">
          {(messages[currentChannelId] || []).map((message, index) => (
            <div key={index} className="mb-2">
              <strong>{message.sender}: </strong>{message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="p-2 rounded"
            style={{ backgroundColor: '#2a429e', color: 'white' }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
