import { Box, Button, Group, Loader, NumberInput, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { details } from "../contracts";
import { Address, useBalance, useContractWrite, usePrepareContractWrite, useSigner } from "wagmi";
import InlineError from "./InlineError";
import { useForm } from "@mantine/form";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Deposit: NextPage = () => {
  const form = useForm({
    initialValues: {
      amount: 0,
    },
  });

  const { data: signer, error: signerError, isLoading: isSignerLoading } = useSigner();
  const [signerAddress, setSignerAddress] = useState<Address | undefined>();
  useEffect(() => {
    if (!signer) return;
    (async () => {
      setSignerAddress(await signer.getAddress() as Address);
    })();
  }, [signer]);

  const { data, error: balanceError, isLoading: isBalanceLoading } = useBalance({
    address: signerAddress,
  });

  const { config } = usePrepareContractWrite({
    ...details,
    functionName: "deposit",
    overrides: {
      value: ethers.utils.parseEther(`${form.values.amount}`),
    },
  });
  const { isLoading, isSuccess, error, write } = useContractWrite(config);

  return (
    <>
      <Title order={2}>Deposit</Title>
      {(isSignerLoading || isBalanceLoading || isLoading) && <Loader />}
      <InlineError error={signerError || balanceError || error} />

      <form onSubmit={form.onSubmit(() => write?.())}>
        <Group>
          <NumberInput
            rightSection={<Box mr="md" style={{ backgroundColor: "white" }}><Text>{data?.symbol}</Text></Box>}
            precision={data?.decimals}
            label="Amount to deposit"
            {...form.getInputProps("amount")}
          />
          <Button type="submit">Deposit</Button>
        </Group>
      </form>

      {isSuccess ? <Text>Success</Text> : <></>}
    </>
  );
};

export default Deposit;
