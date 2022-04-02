import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../../../contexts/GlobalContext";

import Button from "../../commong/Button";
import Page from "../../commong/Page";
import CreatePollOption from "./CreatePollOption";

const OptionsList = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function CreatePoll() {
  const nav = useNavigate();
  const [Title, setTitle] = useState("");
  const [PollOptions, setPollOptions] = useState([]);
  const { PollAccess, setIsLoading } = useContext(GlobalContext);

  const titleChanged = (title) => {
    if (title && title !== Title) setTitle(title);
  };

  const addOption = () => {
    if (Title && !PollOptions.find((o) => o === Title))
      setPollOptions((PollOptions) => {
        return [...PollOptions, Title];
      });
  };

  const removeOption = (option) => {
    if (option)
      setPollOptions((PollOptions) => {
        return PollOptions.filter((o) => o !== option);
      });
  };

  const createNewPoll = async () => {
    setIsLoading(true, "Creating the Poll");
    const { pollId } = await PollAccess.newPoll({
      title: Title,
      options: PollOptions,
    });
    if (pollId && pollId >= 0) nav("/poll/" + pollId);
    setIsLoading(false);
  };

  return (
    <Page
      title="change me please!"
      subTitle="wait no more! create your own Poll!"
      editableTitle={{ event: titleChanged, onEnter: addOption }}
    >
      <OptionsList>
        {PollOptions.map((pollOption, i) => {
          return (
            <CreatePollOption
              key={i}
              option={{ id: i, text: pollOption }}
              removeOption={removeOption}
            />
          );
        })}
      </OptionsList>
      {PollOptions.length >= 3 && PollOptions.length <= 32 ? (
        <Button
          onClick={() => {
            createNewPoll();
          }}
        >
          Submit Poll
        </Button>
      ) : (
        ""
      )}
    </Page>
  );
}
