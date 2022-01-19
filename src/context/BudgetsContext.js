import React, { useContext, useState } from 'react';

// ID library import 
import { v4 as uuidV4 } from 'uuid';
// LS hook import 
import useLocalStorage from '../hooks/useLocalStorage';

// create CONTEXT
const BudgetsContext = React.createContext();

// uncategorized budget for ExpenseModal 
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

// HOOK to use the BudgetsContext.js as REACT CONTEXT and use it's function wherever we want 
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


// Wrap entire application in CONTEXT - BudgetsProvider container in index.js
// define all constants and function to use as a CONTEXT
export const BudgetsProvider = ({ children}) => {
    // use custom hook to get the data from LS if they are in
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    // get the expenses by filtering all expenses based on budgetId - return new array with expenses
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
    // get the name and max parameters from AddBudgetModal inputs
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            // check if new budget has the same name as one of currently existing - if so, just return current budgets array w/o changing
            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max } ]
        })
    }

    // delete the budget from current budgets array based on budget.id, if it's equal to id - filter it out of array
    // return new filtered array
    function deleteBudget({ id }) {
        //TODO: Deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)  
        })
    }

    // delete the expense from current expenses array based on expense.id, if it's equal to id - filter it out of array
    // return new filtered array
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
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