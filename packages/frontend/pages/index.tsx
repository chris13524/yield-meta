import { Container, Stack, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Deposit from "../components/Deposit";

export default function Home() {
  // Fix Next.js hydration errors
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <Container style={{ paddingTop: 40 }}>
      <Stack>
        <Title>Yield Meta</Title>
        <ConnectButton />
        <Balance />
        <Deposit />
      </Stack>
    </Container>
  );
}
