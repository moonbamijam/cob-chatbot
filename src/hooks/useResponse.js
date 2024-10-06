import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { verifiedUID } from "../utils/uid";

// contexts

// library
import { depts, deptsAnswer } from "../lib/depts";

// db
import {
  collection,
  Timestamp,
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

// hooks
import useSound from "./useSound";

// utils
import { sleep } from "../utils/sleep";
import { hasSymbol, splitMessage } from "../utils/splitMessage";
import { ChatbotContext } from "../contexts/ChatbotContext";

const uid = verifiedUID();
const usersCollectionRef = collection(db, "users");

const useResponse = () => {
  const { chatbot } = useContext(ChatbotContext);
  const [configuration] = chatbot.configuration;
  const [setError] = chatbot.error;
  const { playMessageNotification } = useSound();
  const [setIsFaqsMenuActive] = useState(false);
  const [botIsTyping, setBotIsTyping] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["botReply"],
    queryFn: async () => {
      const response = await fetch(configuration.url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: import.meta.env.VITE_CHATBOT_API_KEY,
        },
        body: JSON.stringify({
          userQuery: "hi",
        }),
      });

      return await response.json();
    },
  });

  const getReplyFromBot = async (message) => {
    try {
      setBotIsTyping(true);
      let deptMessage = message.toLowerCase();
      // Temporary statements just to display departments
      if (
        deptMessage === "departments" ||
        deptMessage === "department" ||
        deptMessage === "can you give me the list of departments?" ||
        deptMessage === "can you give me the list of departments" ||
        deptMessage === "can you give me the departments?" ||
        deptMessage === "can you give me the departments" ||
        deptMessage === "can you give me list of departments?" ||
        deptMessage === "can you give me list of departments" ||
        deptMessage === "departments list?" ||
        deptMessage === "departments list" ||
        deptMessage === "department list?" ||
        deptMessage === "department list" ||
        deptMessage === "list of departments" ||
        deptMessage === "list of department" ||
        deptMessage === "give me the list of deparments"
      ) {
        await sleep(1);
        setBotIsTyping(false);
        const docUserId = doc(usersCollectionRef, uid);
        const verifiedDocUserId = await getDoc(docUserId);
        if (!verifiedDocUserId.exists()) {
          // creates a user with verified uid in users collection
          // then add this bot message to conversation array
          await setDoc(doc(usersCollectionRef, uid), {
            conversation: [
              {
                messageId: uuid(),
                message: deptsAnswer,
                role: "bot",
                depts: depts,
                timeSent: Timestamp.now(),
              },
            ],
          });
        }
        await updateDoc(doc(usersCollectionRef, uid), {
          conversation: arrayUnion({
            message: deptsAnswer,
            messageId: uuid(),
            role: "bot",
            depts: depts,
            timeSent: Timestamp.now(),
          }),
        });
        playMessageNotification();
        // THE ABOVE CODE BLOCKS ARE FOR HANDLING STATIC DEPARTMENT RESPONSES ONLY
        //
        //
        // STARTING HERE FROM "ELSE" HANDLES THE DYNAMIC RESPONSES FROM BOT
      } else {
        await sleep(1);
        console.log(data);
        const intentRecognizedByBot = data.intent;
        const botAnswer = data.answer;

        let botMessageInfo = {};
        if (intentRecognizedByBot == "None") {
          botMessageInfo = {
            intent: intentRecognizedByBot,
            message: configuration.errorMessage,
            messageId: uuid(),
            role: "bot",
            timeSent: Timestamp.now(),
          };
        } else
          botMessageInfo = {
            intent: intentRecognizedByBot,
            message: botAnswer,
            messageId: uuid(),
            role: "bot",
            timeSent: Timestamp.now(),
          };
        if (hasSymbol(botAnswer)) {
          const botHasMultipleMessage = splitMessage(botAnswer);
          botHasMultipleMessage.forEach(async (response, i) => {
            if (i == 1) {
              await sleep(1);
              setBotIsTyping(true);
              await sleep(1);
            }
            const botSplitMessageInfo = {
              intent: intentRecognizedByBot,
              message: response,
              messageId: uuid(),
              role: "bot",
              timeSent: Timestamp.now(),
            };
            setBotIsTyping(false);
            const docUserId = doc(usersCollectionRef, uid);
            const verifiedDocUserId = await getDoc(docUserId);
            if (!verifiedDocUserId.exists()) {
              // creates a user with verified uid in users collection
              // then add this bot message to conversation array
              await setDoc(doc(usersCollectionRef, uid), {
                conversation: [botSplitMessageInfo],
              });
            }
            await updateDoc(doc(usersCollectionRef, uid), {
              conversation: arrayUnion(botSplitMessageInfo),
            });
            setIsFaqsMenuActive(false);
            playMessageNotification();
          });
          return;
        }
        setBotIsTyping(false);
        const docUserId = doc(usersCollectionRef, uid);
        const verifiedDocUserId = await getDoc(docUserId);
        if (!verifiedDocUserId.exists()) {
          // creates a user with verified uid in users collection
          // then add this bot message to conversation array
          await setDoc(doc(usersCollectionRef, uid), {
            conversation: [botMessageInfo],
          });
        }
        await updateDoc(doc(usersCollectionRef, uid), {
          conversation: arrayUnion(botMessageInfo),
        });
        setIsFaqsMenuActive(false);
        playMessageNotification();
      }
    } catch (error) {
      console.log(error);
      setBotIsTyping(false);
      setError(true);
      if (!error) setError(false);
    }
  };

  return { getReplyFromBot, data, isFetching, botIsTyping };
};

export default useResponse;
