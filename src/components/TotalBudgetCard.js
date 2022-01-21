import { useBudgets } from "../context/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {

    // get getBudgetExpenses form useBudgets
    const { expenses, budgets } = useBudgets();

    /* calculating all expenses and budgets as "total amount" and "total max" */
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const max = budgets.reduce(
        (total, budget) => total + budget.max,
        0
    );

    // don't show that card if max equal to 0
    if (max === 0) return null;

    return (
        
        <BudgetCard amount={amount} name="Total" gray max={max} hideButtons/>
    )
}
