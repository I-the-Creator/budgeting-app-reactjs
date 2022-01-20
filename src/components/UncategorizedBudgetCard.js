import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props) {

    // get getBudgetExpenses form useBudgets
    const { getBudgetExpenses } = useBudgets();

    /* getting total 'expenses' for specified 'budget' - by accumulating (in reduce accumulator - 'total') 
    through array get as a result of getBudgetExpenses()  all the expenses
     0 - default value for 'total' */
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    );

    // don't show that card if amount equal to 0
    if (amount === 0) return null;

    return (
        <BudgetCard amount={amount} name="Uncategorized" gray {...props}/>
    )
}
