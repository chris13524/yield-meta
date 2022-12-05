import { Alert } from "@mantine/core";
import { NextPage } from "next";
import { IconAlertCircle } from "@tabler/icons";

const InlineError: NextPage<{ error: Error | null | undefined }> = ({ error }) => {
  return (
    error ?
      <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red">
        {error.message}
      </Alert>
      : <></>
  );
};

export default InlineError;
