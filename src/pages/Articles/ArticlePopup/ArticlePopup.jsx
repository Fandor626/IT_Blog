import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Textarea } from "@mantine/core";
import { DateTimePicker } from '@mantine/dates';

const ArticlePopup = ({ note, createNote, deleteNote, setIsOpenedPopup, isOpened, updateNote }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [articleData, setArticleData] = useState({
    name: note.name || "",
    description: note.description || "",
    header: note.header || "",
    date: note.date || ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value, date: selectedDate }));
  };

  const handleDateChange = (value) => {
    setSelectedDate(value || '');
    setArticleData((prevData) => ({ ...prevData, date: value }));
  };

  const createEditButtonText = !note.name ? 'Create Article' : 'Edit Article'

  const isDataWasChanged = 
    note.name !== articleData.name || 
    note.header !== articleData.header || 
    note.description !== articleData.description ||
    note.date !== articleData.date;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createEditButtonText === 'Create Article') createNote(articleData);
    else isDataWasChanged && updateNote(articleData)
    setIsOpenedPopup(false)
  };

  console.log(selectedDate, note.date)
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

        <DateTimePicker
          name="date"
          value={articleData.date ? new Date(articleData.date) : ''}
          onChange={handleDateChange}
          placeholder="Date"
          required
        />

        <Button type="submit" variant="filled">
          {createEditButtonText}
        </Button>

        {<Button onClick={() => setIsOpenedPopup(false)} type="button" variant="filled">Cancel</Button>}
        {note.name && <Button type="button" variant="filled" onClick={() => { deleteNote(note); setIsOpenedPopup(false) }}>Delete</Button>}
      </form>
    </Modal>
  );
};


export default ArticlePopup