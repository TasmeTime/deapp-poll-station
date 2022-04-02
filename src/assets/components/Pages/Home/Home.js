import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GlobalContext from "../../../../contexts/GlobalContext";

import Page from "../../commong/Page";
import PollCard from "./PollCard";

const PollList = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function Home() {
  const [Polls, setPolls] = useState([]);
  const { PollAccess, setIsLoading } = useContext(GlobalContext);
  useEffect(() => {
    getAllPolls();
    return () => {};
  }, [setPolls]);

  const getAllPolls = async () => {
    setIsLoading(true);
    const res = await PollAccess.getAllPolls();
    if (res.length > 0) setPolls(res);
    setIsLoading(false);
  };

  return (
    <Page
      title="Polls List"
      subTitle="Go ahead, explore the Polls, and Vote if you wish or create your own Poll!"
    >
      <PollList>
        {Polls.map((p, i) => {
          return <PollCard poll={p} key={i} />;
        })}
      </PollList>
    </Page>
  );
}
