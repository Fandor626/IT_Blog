import React, { useState } from "react";
import { Button, Input, Modal, Textarea } from "@mantine/core";

const ArticlePopup = ({ note, createNote, deleteNote, setIsOpenedPopup, isOpened }) => {
  const [articleData, setArticleData] = useState({
    name: note.name || "",
    description: note.description || "",
    header: note.header || "",
    date: note.date || ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNote(articleData);
    setIsOpenedPopup(false)
    // onClose();
  };

  return (
    <Modal opened={isOpened} onClose={() => setIsOpenedPopup(false)} size="sm">
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={articleData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <Textarea
          name="description"
          value={articleData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <Input
          name="header"
          value={articleData.header}
          onChange={handleChange}
          placeholder="Header"
          required
        />

        <Input
          name="date"
          value={articleData.date}
          onChange={handleChange}
          placeholder="Date"
          required
        />

        <Button type="submit" variant="filled">
          {!note.name ? 'Create Article': 'Edit Article'}
        </Button>

        {<Button type="button" variant="filled">Cancel</Button>}
        {note.name && <Button type="button" variant="filled" onClick={()=>{ deleteNote(note); setIsOpenedPopup(false)}}>Delete</Button>}
      </form>
    </Modal>
  );
};


export default ArticlePopup