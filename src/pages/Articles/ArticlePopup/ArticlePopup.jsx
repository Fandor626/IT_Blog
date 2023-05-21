import { Button, Flex, TextField, View } from "@aws-amplify/ui-react";
import React from "react";

const ArticlePopup = ({ note, createNote, deleteNote, setIsOpenedPopup }) => {
  return (
    <View as="form" margin="3rem 0" onSubmit={createNote}>
      <Flex direction="row" justifyContent="center">
        <TextField
          name="name"
          placeholder="Note Name"
          label="Note Name"
          labelHidden
          variation="quiet"
          defaultValue={note.name || ''}
          required
        />
        <TextField
          name="description"
          placeholder="Note Description"
          label="Note Description"
          labelHidden
          variation="quiet"
          defaultValue={note.description || ''}
          required
        />
        <Button type="submit" variation="primary">
          Create Note
        </Button>
      </Flex>
      <Button variation="link" onClick={() => deleteNote(note)}>
        Delete note
      </Button>
      <Button onClick={() => setIsOpenedPopup(false)}>Cancel </Button>
    </View>
  );
};

export default ArticlePopup