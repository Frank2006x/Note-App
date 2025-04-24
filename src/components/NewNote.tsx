import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm"


export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags:Tag[];
};

const NewNote = ({onSubmit,onAddTag,availableTags}:NoteFormProps) => {
  return (
    <>
        <h1 className="b-5">New Note</h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}  />
    </>
  )
}

export default NewNote