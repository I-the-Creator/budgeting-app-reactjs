import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotlaBudgetCard from "./components/TotalBudgetCard";
import { useState } from "react";
import { useBudgets } from "./context/BudgetsContext";


function App() {
  // state for showing/hiding AddBudgetModal - not showing by default
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  // when 'Add Expense' button clicked
  function openAddExpenseModal(budgetId) {
    console.log(budgetId);
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          {/* to call openAddExpenseModal without budget.id (event will be sent as a parameter) */}
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {/* loop through all budgets from budgetsProvider*/}
          {budgets.map((budget) => {
            /* getting total 'expenses' for specified 'budget' - by accumulating (in reduce accumulator - 'total') 
            through array get as a result of getBudgetExpenses()  all the expenses
            0 - default value for 'total' */
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                // gray  // equal to gray={true}
                amount={amount} // stored in 'expenses' state not in 'budget'
                max={budget.max}
                // prop if 'Add Expense' clicked inside particular budget
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard 
          // to call openAddExpenseModal without budget.id (event will be sent as a parameter)
            onAddExpenseClick={openAddExpenseModal}
          />
          <TotlaBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  );
}

export default App;
