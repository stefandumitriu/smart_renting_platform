import "../../styles/chat/main.scss";
import {
  Avatar,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  Sidebar,
} from "@chatscope/chat-ui-kit-react";
import Layout from "../Layout";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Grid, useTheme } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { UserProfile } from "@packages/api/models/users/userProfile";
import {
  GetConversationRequest,
  GetLinkedUsersRequests,
  PostMessageRequest,
} from "../../requests/MessagesRequests";
import { GetUserProfileRequest } from "../../requests/UserSignupRequest";
import { useLocation } from "react-router-dom";
import { DbMessage } from "@packages/db";

const ChatPage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const location = useLocation();
  const initialConversationUserId = useMemo(() => {
    if (location.state) {
      return location.state.initialConversationUserId;
    }
    return undefined;
  }, [location]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [linkedUsers, setLinkedUsers] = useState<UserProfile[]>([]);
  const [activeConversationUser, setActiveConversationUser] = useState<
    UserProfile | undefined
  >(undefined);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  useEffect(() => {
    if (activeConversationUser && currentUser) {
      GetConversationRequest(currentUser.id, activeConversationUser.id).then(
        (m) => setMessages(m)
      );
    }
  }, [activeConversationUser, currentUser]);
  const changeActiveConversationUser = useCallback(
    (id: string) => {
      const user = linkedUsers.find((u) => u.id === id);
      if (user) {
        setActiveConversationUser(user);
      }
    },
    [setActiveConversationUser, linkedUsers]
  );
  useEffect(() => {
    if (initialConversationUserId) {
      GetUserProfileRequest(initialConversationUserId).then((user) =>
        setActiveConversationUser(user)
      );
    }
  }, [initialConversationUserId]);
  useEffect(() => {
    if (currentUser) {
      GetLinkedUsersRequests(currentUser.id).then((users) =>
        setLinkedUsers(users)
      );
    }
  }, [currentUser]);
  const sendMessageCallback = useCallback(() => {
    if (messageInputValue && activeConversationUser && currentUser) {
      PostMessageRequest(
        currentUser.id,
        activeConversationUser.id,
        messageInputValue
      ).then((res) => {
        setMessages([...messages, res]);
        setMessageInputValue("");
      });
    }
  }, [activeConversationUser, currentUser, messageInputValue, messages]);
  return (
    <Layout pageTitle="Mesajele Mele">
      <Grid item container xs={12}>
        <div
          style={{
            height: "90vh",
            width: "100%",
            position: "relative",
          }}
        >
          <MainContainer responsive style={{ height: "100%" }}>
            <Sidebar position="left">
              <ConversationList>
                {linkedUsers.map((user) => (
                  <Conversation
                    name={user.firstName + " " + user.lastName}
                    onClick={() => changeActiveConversationUser(user.id)}
                  >
                    <Avatar src={user.profilePhotoUrl} />
                  </Conversation>
                ))}
              </ConversationList>
            </Sidebar>

            <ChatContainer>
              {activeConversationUser && (
                <ConversationHeader>
                  <ConversationHeader.Back />
                  <Avatar
                    name={
                      activeConversationUser.firstName +
                      " " +
                      activeConversationUser.lastName
                    }
                    src={activeConversationUser.profilePhotoUrl}
                  />
                  <ConversationHeader.Content
                    userName={
                      activeConversationUser.firstName +
                      " " +
                      activeConversationUser.lastName
                    }
                  />
                </ConversationHeader>
              )}
              {activeConversationUser && currentUser && (
                <MessageList>
                  {messages.map((message) => (
                    <Message
                      model={{
                        message: message.text,
                        sentTime: message.created_at as unknown as string,
                        sender: (
                          [...linkedUsers, currentUser].find(
                            (u) => u.id === message.senderId
                          ) as UserProfile
                        ).firstName,
                        direction:
                          currentUser.id === message.senderId
                            ? "outgoing"
                            : "incoming",
                        position: "single",
                      }}
                    />
                  ))}
                </MessageList>
              )}
              {activeConversationUser && currentUser && (
                <MessageInput
                  placeholder="Type message here"
                  value={messageInputValue}
                  onChange={(val) => setMessageInputValue(val)}
                  onSend={() => sendMessageCallback()}
                  attachButton={false}
                />
              )}
            </ChatContainer>
          </MainContainer>
        </div>
      </Grid>
    </Layout>
  );
};

export default ChatPage;
