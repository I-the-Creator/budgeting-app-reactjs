import React, { useContext, useState } from 'react';

// ID library
import { v4 as uuidV4 } from 'uuid';

// create CONTEXT
const BudgetsContext = React.createContext();

// Wrap entire application in CONTEXT - BudgetsProvider

export function useBudgets() {
    return useContext(BudgetsContext);
}

// bow budget and expenses look like
/*  BUDGET
{
    id:
    name:
    max:
}   
    EXPENSES withing BUDGET
{
    id:
    budgetId:
    amount:
    description:
} */


// define all constants and function to use as a CONTEXT
export const BudgetsProvider = ({ children}) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    // get the expenses by filtering all expenses based on budgetId
    function getBudgetExpenses(budgetId) { 
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    // add new EXPENSE, spread the current EXPENSES array and add brand new one
    function addExpense({ description, amount, budgetId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId} ]
        })
    }

    // add new BUDGET, spread the current BUDGETS array and add brand new one
    function addBudget({ name, max }) { 
        setBudgets(prevBudgets => {
            // check if new budget has the same name as one of currently existing - if so? just return current budgets array w/o changing
            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max } ]
        })
    }
    function deleteBudget() {

    }
    function deleteExpense() {

    }

    // passing the 'value' - the object with variables, pass them down and all the children inside the CONTEXT has access to 'value' object
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{children}</BudgetsContext.Provider>
    )
}