import React, { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const totalIncome = expenses.reduce((total, curr) => curr.amount > 0 ? total + curr.amount : total, 0);
  const totalExpense = expenses.reduce((total, curr) => curr.amount < 0 ? total - curr.amount : total, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="app">
      <div className="section">
        <ExpenseForm onAdd={handleAddExpense} />
      </div>
      <div className="section">
        <ExpenseList expenses={expenses} />
      </div>
      <div className="section">
        <h2>Imponibile: <strong>{balance.toFixed(2)}€</strong></h2>
        <h3>Entrate: <strong>{totalIncome.toFixed(2)}€</strong></h3>
        <h3>Uscite: <strong>{totalExpense.toFixed(2)}€</strong></h3>
      </div>
    </div>
  );
}

function ExpenseForm({ onAdd }) {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({ label, amount: parseFloat(amount), date });
    setLabel('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label><b>Aggiungi</b></label>
      <label>
        Etichetta:
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} required />
      </label>
      <label>
        Importo:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </label>
      <label>
        Data:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <button type="submit">+</button>
    </form>
  );
}

function ExpenseList({ expenses }) {
  return (
    <div>
      <h2>Movimenti</h2>
      <ul>
        {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map((expense, index) => (
          <li key={index} className="expense-item">
            {expense.label}: <strong>{(expense.amount > 0 ? '+' : '') + expense.amount.toFixed(2)}€</strong> 
            <span className="date">{new Date(expense.date).toLocaleDateString('it-IT')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;