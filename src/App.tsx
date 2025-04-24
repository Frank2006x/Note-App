import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import useLocalStorage from "./CustomHook/useLocalStorage";
import NewNote from "./components/NewNote";
import { v4 as uuidV4 } from "uuid";

import { Route, Routes, Navigate } from "react-router-dom";
import { useMemo } from "react";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onAddTag(tag:Tag){
    setTags((prev)=>[...prev,tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>hiiiii</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={tags}/>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>ediit</h1>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
