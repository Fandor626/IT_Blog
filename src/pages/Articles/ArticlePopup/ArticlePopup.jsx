import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Textarea } from "@mantine/core";
import { DateTimePicker } from '@mantine/dates';
// import { RichTextEditor, Link } from '@mantine/tiptap';
import { Select } from '@mantine/core';

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

  return (
    <Modal opened={isOpened} size='xl' onClose={() => setIsOpenedPopup(false)}>
      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        Article popup
        <Input
          style={{ margin: '10px' }}
          name="name"
          value={articleData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        {/* <RichTextEditor/> */}
        <Textarea
          style={{ margin: '10px' }}
          minRows='7'
          name="description"
          value={articleData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <Input
          name="header"
          style={{ margin: '10px' }}
          value={articleData.header}
          onChange={handleChange}
          placeholder="Type"
          required
        />

        <DateTimePicker
          name="date"
          style={{ margin: '10px' }}  
          value={articleData.date ? new Date(articleData.date) : ''}
          onChange={handleDateChange}
          placeholder="Date"
          required
        />

        <Button type="submit" style={{width:'200px', margin:'10px'}} variant="filled">
          {createEditButtonText}
        </Button>

        {<Button onClick={() => setIsOpenedPopup(false)} type="button" style={{width:'200px', margin:'10px'}} variant="filled">Cancel</Button>}
        {note.name && <Button type="button" variant="filled" style={{width:'200px', margin:'10px'}} onClick={() => { deleteNote(note); setIsOpenedPopup(false) }}>Delete</Button>}
      </form>
    </Modal>
  );
};


export default ArticlePopup