import React, { useState, useEffect } from "react";
import "./article.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { listNotes } from "../../graphql/queries";
import {
  createNote as createNoteMutation,
  updateNote as updateNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../graphql/mutations";
import ArticlePopup from "./ArticlePopup/ArticlePopup";

const Article = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    // if (!!eve.image) await Storage.put(data.name);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: event },
    });
    fetchNotes();
    // event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  async function updateNote(event) {
    const { name, description, header, date } = event;
    await API.graphql({
      query: updateNoteMutation,
      variables: { input: { id: currentNote.id, name, description, header, date } }
    })
    fetchNotes();
  }

  const onClickEditButton = (note) => {
    setIsOpenedPopup(true)
    setCurrentNote(note)
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <>
            <Flex
              onClick={() => onClickEditButton(note)}
              style={{cursor: 'pointer'}}
              key={note.id || note.name}
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Text as="strong" fontWeight={700}>
                {note.name}
              </Text>
              <Text as="span">{note.description}</Text>
              {note.image && (
                <Image
                  src={note.image}
                  alt={`visual aid for ${notes.name}`}
                  style={{ width: 400 }}
                />
              )}
              {/* <Button onClick={() => onClickEditButton(note)}> Edit Article </Button> */}
            </Flex>
            <Flex direction="row"
              justifyContent="center"
              alignItems="center">
              <Text as="span">{note.header}</Text>
              <Text as="span">{note.date}</Text>
            </Flex>
          </>
        ))}
      </View>
      {/* <View name="image" as="input" type="file" style={{ alignSelf: "end" }} /> */}
      {isOpenedPopup &&
        <ArticlePopup note={currentNote} createNote={createNote} deleteNote={deleteNote} updateNote={updateNote} setIsOpenedPopup={setIsOpenedPopup} isOpened={isOpenedPopup} />
      }
      <Button onClick={() => onClickEditButton({})}>Create </Button>

    </View>
  );
};

export default Article;
