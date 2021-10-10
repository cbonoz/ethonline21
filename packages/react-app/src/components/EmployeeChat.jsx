// import "./App.css";
import { Waku, WakuMessage } from "js-waku";
import React, { useState, useEffect } from "react";
import protons from "protons";
import { Input, Button } from "antd";

const ContentTopic = `/min-react-js-chat/1/chat/proto`;

const proto = protons(`
message SimpleChatMessage {
  uint64 timestamp = 1;
  string text = 2;
}
`);

// https://raw.githubusercontent.com/status-im/js-waku/main/examples/min-react-js-chat/src/App.js
function EmployeeChat({ address }) {
  const [waku, setWaku] = React.useState(undefined);
  const [wakuStatus, setWakuStatus] = React.useState("None");
  const [sendCounter, setSendCounter] = React.useState(0);
  const [messages, setMessages] = React.useState([]);
  const [msg, setMsg] = useState();

  useEffect(() => {
    if (!!waku) return;
    if (wakuStatus !== "None") return;

    setWakuStatus("Starting");

    Waku.create({ bootstrap: true }).then(waku => {
      setWaku(waku);
      setWakuStatus("Connecting");
      waku.waitForConnectedPeer().then(() => {
        setWakuStatus("Ready");
      });
    });
  }, [waku, wakuStatus]);

  // Need to keep the same reference around to add and delete from relay observer
  const processIncomingMessage = React.useCallback(wakuMessage => {
    console.log("new message");
    if (!wakuMessage.payload) return;

    const { text, timestamp } = proto.SimpleChatMessage.decode(wakuMessage.payload);

    const time = new Date();
    time.setTime(timestamp);
    const message = { text, timestamp: time };

    setMessages([message, ...currMessages]);
  }, []);

  useEffect(() => {
    if (!waku) return;

    waku.relay.addObserver(processIncomingMessage, [ContentTopic]);

    return function cleanUp() {
      waku.relay.deleteObserver(processIncomingMessage, [ContentTopic]);
    };
  }, [waku, wakuStatus, processIncomingMessage]);

  const sendMessageOnClick = () => {
    if (wakuStatus !== "Ready") return;

    sendMessage(`Here is message #${sendCounter}`, new Date(), waku).then(() => console.log("Message sent"));
    const time = new Date();
    const message = { text: msg, timestamp: time };
    setMessages([message, ...messages]);
    setMsg(undefined);

    setSendCounter(sendCounter + 1);
  };

  return (
    <div>
      <header className="App-header">
        <p>Use this page to share private messages with the employee or other admins.</p>
        <p>{wakuStatus}</p>
        <br />
        <Input value={msg} onChange={e => setMsg(e.target.value)} />
        <Button
          className="action-button"
          type={"primary"}
          onClick={sendMessageOnClick}
          disabled={wakuStatus !== "Ready"}
        >
          Send Message
        </Button>
        <ul>
          {messages.map(msg => {
            return (
              <li>
                <p>
                  {msg.timestamp.toString()}: {msg.text}
                </p>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default EmployeeChat;

function sendMessage(message, timestamp, waku) {
  const time = timestamp.getTime();

  const payload = proto.SimpleChatMessage.encode({
    timestamp: time,
    text: message,
  });

  return WakuMessage.fromBytes(payload, ContentTopic).then(wakuMessage => waku.relay.send(wakuMessage));
}
