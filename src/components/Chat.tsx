"use client";
import React, { useEffect, useState, useRef } from 'react';
import Ably from 'ably';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

// Les icônes comme dans votre exemple
function ArrowUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

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
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsClient(true);

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
    if (isClient) {
      const storedChannels = localStorage.getItem('channels');
      setChannels(storedChannels ? JSON.parse(storedChannels) : []);

      const storedMessages = localStorage.getItem('messages');
      setMessages(storedMessages ? JSON.parse(storedMessages) : {});
    }
  }, [isClient]);

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
    if (isClient) {
      localStorage.setItem('channels', JSON.stringify(channels));
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages, channels, isClient]);

  useEffect(() => {
    const currentChannelMessages = messages[currentChannelId];
    scrollToBottom();
  }, [messages, currentChannelId]);

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
    setMessages(prevMessages => ({
      ...prevMessages,
      [channelId]: prevMessages[channelId] || [],
    }));
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting a channel
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ablyClient || !currentChannelId || input.trim() === '') return;

    const messagesChannel = ablyClient.channels.get(`channel:${currentChannelId}`);
    messagesChannel.publish('message_added', { content: input, sender: name });
    setInput('');
  };

  const handleCreateChannel = () => {
    if (!ablyClient) return;

    const newChannelName = prompt("Entrez le nom du channel :");
    if (!newChannelName || newChannelName.trim() === '') return;

    const channelsChannel = ablyClient.channels.get('channels');
    const newChannel: Channel = {
      id: newChannelName.toLowerCase().replace(/\s+/g, '-'),
      name: newChannelName,
    };
    channelsChannel.publish('channel_added', newChannel);
    setCurrentChannelId(newChannel.id); // Automatically switch to the new channel
  };

  if (!isClient) {
    return null; // Rend un contenu vide tant que le composant n'est pas monté côté client
  }

  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-screen w-full">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:flex-col gap-2 text-foreground bg-background border-r-[1px]">
        <div className="sticky top-0 p-2 bg-background">
          <Button
            variant="ghost"
            className="justify-start w-full gap-2 px-2 text-left"
            onClick={handleCreateChannel}
          >
            Nouveau chat
            <PenIcon />
          </Button>
          <div className="flex-1 overflow-hidden">
          <div className="grid gap-1 p-2 text-foreground mt-2">
            <div className="px-2 text-xs font-medium text-muted-foreground">Conversations</div>
            <div className="h-[calc(100vh-150px)] overflow-y-auto">  {/* Ajout de la hauteur fixe et du défilement vertical */}
              {channels.map((channel) => (
                <Link
                  key={channel.id}
                  href="#"
                  className={`flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap ${currentChannelId === channel.id ? 'bg-dark-blue text-white' : 'hover:bg-light-blue hover:text-white'}`}
                  prefetch={false}
                  onClick={() => handleChannelChange(channel.id)}
                >
                  {channel.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className={`md:hidden fixed inset-0 z-10 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-background`}>
        <div className="p-2">
          <Button
            variant="ghost"
            className="justify-start w-full gap-2 px-2 text-left"
            onClick={handleCreateChannel}
          >
            Nouveau chat
            <PenIcon />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-1 p-2 text-foreground">
            <div className="px-2 text-xs font-medium text-muted-foreground">Conversations</div>
            {channels.map((channel) => (
              <Link
                key={channel.id}
                href="#"
                className={`flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap ${currentChannelId === channel.id ? 'bg-dark-blue text-white' : 'hover:bg-light-blue hover:text-white'}`}
                prefetch={false}
                onClick={() => handleChannelChange(channel.id)}
              >
                {channel.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-2">
          <Button variant="ghost" className="w-full" onClick={() => setIsSidebarOpen(false)}>Fermer</Button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col md:ml-0">
        <div className="sticky top-0 p-2 md:hidden">
          <Button variant="ghost" className="w-full" onClick={() => setIsSidebarOpen(true)}>Ouvrir menu</Button>
        </div>
        <div className="flex flex-col items-start flex-1 max-w-2xl gap-8 px-4 mt-5">
          {(messages[currentChannelId] || []).map((message, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-bold">{message.sender}</div>
                <div className="prose text-muted-foreground">
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="max-w-2xl w-full sticky bottom-0 py-2 flex flex-col gap-1.5 px-4 bg-background">
          <div className="relative">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                placeholder="Envoyer un message ..."
                name="message"
                id="message"
                rows={1}
                className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Empêche le retour à la ligne
                    handleSubmit(e);
                  }
                }}
              />
              <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
                <ArrowUpIcon />
                <span className="sr-only">Envoyer</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
