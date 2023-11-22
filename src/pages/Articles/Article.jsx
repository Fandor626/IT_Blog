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
import { Modal } from "@mantine/core"
import { listNotes } from "../../graphql/queries";
import {
  createNote as createNoteMutation,
  updateNote as updateNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../graphql/mutations";
import ArticlePopup from "./ArticlePopup/ArticlePopup";
import FullArticle from "./FullArticle/FullArticle.tsx";

// type Note = {
//   id: string;
//   name: string;
//   description: string;
//   image: any;
//   header: string;
//   date: string;
// };

const Article = ({home}) => {
  console.log(home)
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [isOpenedFullArticle, setIsOpenedFullArticle] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

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
    setNotes(notesFromAPI.sort((a, b) => new Date(b.date) - new Date(a.date)).map(note => { return { ...note, date: new Date(note.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) } }));
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
    const newNotes = notes?.filter((note) => note.id !== id);
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
      variables: {
        input: { id: currentNote?.id, name, description, header, date },
      },
    });
    fetchNotes();
  }

  const onClickEditButton = (note) => {
    setIsOpenedPopup(true);
    setCurrentNote(note);
  };

  const onClickDeleteButton = (note) => {
    setIsDeleteClicked(true)
    setCurrentNote(note)
  }

  return (
    <View className="App">
      <Heading level={1}>{home ? 'Home' : 'Articles'}</Heading>
      <View margin="3rem 0">
        {notes?.map((note) => (
          <div style={{ display: "flex" }}>
            <div
              key={note.id || note.name}
              className="Flex"
              onClick={() => { setIsOpenedFullArticle(true); setCurrentNote(note) }}
            >
              <Flex
                direction="column"
                alignItems="center"
                className="ArticleDetails"
              >
                <Text as="strong" fontWeight={700}>
                  {note.name}
                </Text>
                <Text as="span" style={{ textAlign: 'start' }}>{note.description.slice(0, 100)}</Text>
              </Flex>
              {note.image && (
                <Image
                  src={note.image}
                  alt={`visual aid for ${note.name}`}
                  className="Image"
                />
              )}
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="ArticleDetails"
              >
                <Text as="span">{note.header}</Text>
                <Text as="span">{new Date(note.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
              </Flex>
            </div>
            {!home && <div className="buttons">
              <Button onClick={() => onClickEditButton(note)}>Edit</Button>
              <Button style={{ color: "red" }} onClick={() => onClickDeleteButton(note)}>Delete</Button>
            </div>}
          </div>
        ))}
      </View>
      {isOpenedPopup && (
        <div className="PopupOverlay">
          <div className="PopupContent">
            <span
              className="CloseButton"
              onClick={() => setIsOpenedPopup(false)}
            >
              &times;
            </span>
            {/* Pass necessary props to ArticlePopup */}
            <ArticlePopup
              note={currentNote}
              createNote={createNote}
              setIsDeleteClicked={setIsDeleteClicked}
              updateNote={updateNote}
              setIsOpenedPopup={setIsOpenedPopup}
              isOpened={isOpenedPopup}
            />
          </div>
        </div>
      )}
      {isOpenedFullArticle && (
        <FullArticle
          isOpened={isOpenedFullArticle}
          onClose={() => setIsOpenedFullArticle(false)}
          date={currentNote.date}
          header={currentNote.name}
          text={currentNote.description}
          type={currentNote.header}
        />
      )}
      {isDeleteClicked && (<Modal opened={isDeleteClicked} onClose={() => setIsDeleteClicked(false)}>
        <Heading level={5} style={{ textAlign: 'center' }}> Delete Article</Heading>
        <Text style={{ margin: '20px 0', textAlign: 'center' }}>Are you sure you want to delete Article?</Text>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button style={{ color: 'red' }} onClick={() => deleteNote(currentNote).then(() => setIsDeleteClicked(false))}>Delete</Button>
          <Button style={{ color: 'green' }} onClick={() => setIsDeleteClicked(false)}>Cancel</Button>
        </div>
      </Modal>)}
      {!home && <Button onClick={() => onClickEditButton({})}>Create </Button>}
    </View>
  );
};

export default Article;
