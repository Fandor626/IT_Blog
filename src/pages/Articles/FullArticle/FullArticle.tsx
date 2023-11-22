import { Heading } from "@aws-amplify/ui-react";
import { Button, Header, Modal } from "@mantine/core";
import React from "react";

const FullArticle = ({
  isOpened,
  onClose,
  text,
  header,
  date,
  type,
}: {
  isOpened: boolean;
  onClose: () => void;
  text: string;
  header: string;
  date: string;
  type: string;
}) => {
  return (
    <Modal fullScreen={true} opened={isOpened} onClose={onClose}>
      <Heading level={5} height={"100px"}>
        {header}
      </Heading>
      <p>Type: {type}</p>
      <p>Date: {date}</p>
      <p>{text}</p>
      <p>Author: Anonym</p>

      <Button onClick={onClose}>Close</Button>
    </Modal>
  );
};

export default FullArticle;
