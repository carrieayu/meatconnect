import React from "react";
import { Footer, Navbar } from "../components";
import "../assets/css/chat.css";
import axios from "axios";

const ChatPage = () => {
  const user_id = localStorage.getItem("id");
  const [sender, setSender] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [chatMessage, setChatMessage] = React.useState("");
  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);
  const [data, setData] = React.useState([]);

  const onSentMessage = () => {
    setChatMessage("");
    const data = {
      receiver_id: selectedChat,
      sender_id: user_id,
      message_chat: chatMessage,
      created_at: new Date(),
    };

    setData((prevData) => prevData.concat(data));
    axios
      .post(`http://localhost:8080/chat/insert`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSelectChat = (id) => {
    setData([]);
    setSelectedChat(id);
    axios
      .get(`http://localhost:8080/chat/retrieveMessage/${user_id}/${id}`)
      .then((response) => {
        setFrom(response.data);
        setData((prevData) => prevData.concat(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:8080/chat/retrieveMessage/${id}/${user_id}`)
      .then((response) => {
        setTo(response.data);
        setData((prevData) => prevData.concat(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sortedChat = data.sort((a, b) => {
    const dateA = new Date(a.created_at);
    dateA.setHours(dateA.getHours() + 12); // Add 12 hours to the date
    const dateB = new Date(b.created_at);
    dateB.setHours(dateB.getHours() + 12); // Add 12 hours to the date
    return dateA - dateB;
  });

  const renderChatContent = () => {
    // Check if any chat is selected
    if (selectedChat) {
      return (
        <div class="mesgs">
          <div class="msg_history">
            {(function () {
              let rowList = [];

              sortedChat &&
                sortedChat?.map((data) => {
                  if (data.receiver_id != user_id) {
                    rowList.push(
                      <div class="outgoing_msg">
                        <div class="sent_msg">
                          <p>{data.message_chat}</p>
                          <span class="time_date">
                            {new Date(data.created_at).toLocaleString()}
                          </span>{" "}
                        </div>
                      </div>
                    );
                  } else {
                    rowList.push(
                      <div class="incoming_msg">
                        <div class="incoming_msg_img">
                          {" "}
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="sunil"
                          />{" "}
                        </div>
                        <div class="received_msg">
                          <div class="received_withd_msg">
                            <p>{data.message_chat}</p>
                            <span class="time_date">
                              {new Date(data.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                });

              return rowList;
            })()}
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input
                type="text"
                class="write_msg"
                placeholder="Type a message"
                value={chatMessage}
                onChange={(event) => setChatMessage(event.target.value)}
              />
              <button
                class="msg_send_btn"
                type="button"
                onClick={onSentMessage}
              >
                <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <div class="mesgs">Please select a chat</div>;
    }
  };

  const fetchAllUser = () => {
    axios
      .get(`http://localhost:8080/user/retrieve`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchMessage = () => {
    axios
      .get(`http://localhost:8080/user/retrieve/${user_id}`)
      .then((response) => {
        setSender(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchMessage();
    fetchAllUser();
  }, []);

  return (
    <>
      <Navbar />
      <div class="messaging">
        <div class="inbox_msg">
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>Recent</h4>
              </div>
              <div class="srch_bar">
                <div class="stylish-input-group">
                  <input type="text" class="search-bar" placeholder="Search" />
                  <span class="input-group-addon">
                    <button type="button">
                      {" "}
                      <i class="fa fa-search" aria-hidden="true"></i>{" "}
                    </button>
                  </span>{" "}
                </div>
              </div>
            </div>
            <div class="inbox_chat">
              {user &&
                user?.map((data) => {
                  const isActive = selectedChat === data.user_id;
                  const isCurrentUser =
                    data.user_id == localStorage.getItem("id");
                  if (!isCurrentUser) {
                    return (
                      <div
                        className={`chat_list ${isActive ? "active_chat" : ""}`}
                        onClick={() => onSelectChat(data.user_id)}
                      >
                        <div class="chat_people">
                          <div class="chat_img">
                            {" "}
                            <img
                              src="https://ptetutorials.com/images/user-profile.png"
                              alt="sunil"
                            />{" "}
                          </div>
                          <div class="chat_ib">
                            <h5>
                              {data.first_name} {data.last_name}{" "}
                              <span class="chat_date">Dec 25</span>
                            </h5>
                            <p>
                              {data.user_contacts} {data.user_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          {renderChatContent()}
        </div>

        <p class="text-center top_spac">
          {" "}
          Design by{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/"
          >
            Sunil Rajput
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ChatPage;
