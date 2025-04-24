import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import NewNote from "./NewNote";

import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>hiiiii</h1>} />
        <Route path="/new" element={<NewNote/>} />
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
