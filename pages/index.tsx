import { Container, Stack, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <Container style={{ paddingTop: 40 }}>
      <Stack>
        <Title>Yield Meta</Title>
        <ConnectButton />
      </Stack>
    </Container>
  );
}
