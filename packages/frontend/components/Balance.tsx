import { Loader, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { details } from "../contracts";
import { useContractRead } from "wagmi";
import InlineError from "./InlineError";
import { BigNumberish, ethers } from "ethers";

const Balance: NextPage = () => {
  const { data, error, isLoading } = useContractRead({
    ...details,
    functionName: "getBalance",
    // watch: true,
  });

  return (
    <>
      <Title order={2}>Balance</Title>
      {isLoading && <Loader />}
      <InlineError error={error} />
      {data ? <>
        <Text>Bank balance: {ethers.utils.formatEther(data as BigNumberish)}</Text>
      </> : <></>}
    </>
  );
};

export default Balance;
