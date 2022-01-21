import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick
}) {
  // setting Card component background depending on 'amount', set the gray - if amount > 0
  const setCardClassNames = () => {
    const classNames = [];
    if (amount > max) {
      classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
      classNames.push("bg-light");
    }
    return classNames;
  };

  return (
    <Card className={setCardClassNames().join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {/* if we have max - display that section, if not as in 'Uncategorized' - then not display */}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

// to set up the ProgressBar color
function getProgressBarVariant(amount, max) {
  const ration = amount / max;
  if (ration < 0.5) return "primary";
  if (ration < 0.75) return "warning";
  return "danger";
}
