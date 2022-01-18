import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetsContext";

const AddBudgetModal = ({ show, handleClose }) => {
  // create references for control inputs of form
  const nameRef = useRef();
  const maxRef = useRef();
  // to get addBudget - call useBudgets hook
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value) // as maxRef.current.value is a string and we want to convert it to a float
    });
    handleClose();  // whenever we submit  - close the modal
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
