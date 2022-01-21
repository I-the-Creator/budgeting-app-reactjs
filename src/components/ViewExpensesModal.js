import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";
import { currencyFormatter } from "../utils";

const ViewExpensesModal = ({ budgetId, handleClose }) => {

  // to get budgets/expenses info - call useBudgets hook
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

  // pass into 'budget' variable budget object or create new one if it's 'uncategorized'
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);
  console.log(budgetId);
  console.log(expenses);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>{" "}
            {/* if there is no budget name we just ignore it */}
            {/* we can't delete UNCATEGORIZED budget so checking this point*/}
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">
                {expense.description}
              </div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
