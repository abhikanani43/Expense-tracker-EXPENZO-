// src/components/ExpenseTracker.js
import { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([{ amount: 0, description: '', date: '', currency: 'USD' }]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState('USD');

  const addExpense = () => {
    if (amount && description && date) {
      const newExpense = { amount: parseFloat(amount), description, date, currency };
      setExpenses([...expenses, newExpense]);
      setAmount('');
      setDescription('');
      setDate('');
      setCurrency('USD');
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addExpense} className="mt-4">
              Add Expense
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500">No expenses added yet.</p>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                  <div>
                    <p className="font-bold">${expense.amount.toFixed(2)} {expense.currency}</p>
                    <p className="text-sm text-gray-500">{expense.description}</p>
                    <p className="text-xs text-gray-500">{expense.date}</p>
                  </div>
                  <Button variant="destructive" onClick={() => deleteExpense(index)} size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
