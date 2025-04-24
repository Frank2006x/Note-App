import { Button, Row, Col, Stack, Form, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

import { useMemo, useState } from "react";
import { Note, Tag } from "../App";
import styles from "../NodeList.module.css";

type NodeListProp = {
  availableTags: Tag[];
  notes: Note[];
};
function NoteList({ availableTags, notes }: NodeListProp) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((someTag) => someTag.id == tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={4}>
            <Link to="/new">
              <Button>create</Button>
            </Link>
            <Button variant="outline-secondary">Edit tag</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={selectedTags.map((tag) => {
                  //converting to the format react-select
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xm={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
        {/* /*number of colums for different screen size*/}
      </Row>
    </>
  );
}

export default NoteList;

type NodeCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};

function NoteCard({ id, title, tags }: NodeCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack className="align-items-center h-100 ">
            <span>{title}</span>
            <Stack direction="horizontal" className="justify-content-center flex-wrap" gap={1} >
                {tags.length>0 && tags.map((tag)=>{
                    return <Badge key={tag.id}>
                        {tag.label}
                    </Badge>
                })}

            </Stack>
            
        </Stack>
      </Card.Body>
    </Card>
  );
}
