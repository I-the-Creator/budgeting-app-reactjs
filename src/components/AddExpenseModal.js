import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext";

// add defaultBudgetId to change the expense category(budget) 
const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  // create references to control inputs of form
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  // to get addBudget - call useBudgets hook
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value), // as amountRef.current.value is a string and we want to convert it to a float
      budgetId: budgetIdRef.current.value
    });
    handleClose();  // whenever we submit  - close the modal
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}  // setter for <option> 'value' attribute  
              ref={budgetIdRef}>
                {/* default select option when adding outside budget - defaultBudgetId is an Event Object in that case and won't be shown */}
                <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                {/* specify options for select */}
                {budgets.map(budget => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
            </Form.Select>
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

export default AddExpenseModal;
