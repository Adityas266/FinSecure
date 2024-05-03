import { Alert } from 'react-native';
import db from './openDB';
import axios from 'axios';

// Table Name
const tableName = 'transactions';

// Delete Table
// export const deleteTable = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'DROP TABLE IF EXISTS ' + tableName,
//             [],
//             () => {
//                 console.log('deleted');
//             },
//             error => {
//                 console.log(error);
//             }
//         );
//     });
// }

// Create Transactions Table
export const createTransactionsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(50) NOT NULL, icon VARCHAR(30) NOT NULL, transaction_date TEXT NOT NULL, amount FLOAT NOT NULL, type VARCHAR(20) NOT NULL);',
            [],
            () => {
                console.log('created');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Transactions
export const getTransactions = async (setTransactions, email) => {
    try {
        const response = await axios.get(`${backendUrl}/transactions/${email}`);
        if (response.status===200) {
            const data = response.data;
            setTransactions(data);
        }
    } catch (error) {
        console.log(error);
    }
}

export const backendUrl = 'https://finsecure.onrender.com' 
// Get Incomes
export const getIncomes = async (setIncomes, email) => {
    try {
        const response = await axios.get(`${backendUrl}/transactions/${email}`);
        if (response.status===200) {
            const data = response.data;
            setIncomes(data.filter(t => t.transaction_type==='Income'));
        }
    } catch (error) {
        console.log(error);
    }
}

// Get Expenses
export const getExpenses = async (setExpenses, email) => {
    const options = {
        method: 'GET',
        url: `${backendUrl}/transactions/${email}`,
    }

    try {
        const response = await axios.request(options);
        if (response.status===200) {
            const data = response.data;
            setExpenses(data.filter(t => t.transaction_type==='Expense'));
        }
    } catch (error) {
        console.log(error);
    }
}

// GetTotal Incomes
export const getTotalIncomes = async (setTotalIncomes, email) => {
    try {
        const response = await axios.get(`${backendUrl}/transactions/${email}`);
        if (response.status===200) {
            const data = response.data;
            let amount = 0;
            for (let i=0; i <data.length; i++) {
                if (data[i].transaction_type==='Income')
                    amount += data[i].amount;
            }
            setTotalIncomes(amount);
        }
    } catch (error) {
        console.log(error);
    }
}

// GetTotal Expenses
export const getTotalExpenses = async (setTotalExpenses, email) => {
    try {
        const response = await axios.get(`${backendUrl}/transactions/${email}`);
        if (response.status===200) {
            const data = response.data;
            let amount = 0;
            for (let i=0; i <data.length; i++) {
                if (data[i].transaction_type==='Expense')
                    amount += data[i].amount;
            }
            setTotalExpenses(amount);
        }
    } catch (error) {
        console.log(error);
    }
}

// Insert Transactions
export const insertTransaction = async (item) => {
    if (item.amount == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        try {
            const response = await axios.post(`${backendUrl}/transactions/`, {
                ...item
            });
        } catch (error) {
            console.log(error);
        }
    }
}

// Update Transactions
export const updateTransaction = async (item) => {
    if (item.amount == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        try {
            const response = await axios.put(`${backendUrl}/transactions/${item.id}`, {
                ...item
            });
        } catch (error) {
            console.log(error);
        }
    }
}

// Delete Transaction
export const deleteTransaction = async (id) => {
  
        try {
            const response = await axios.delete(`${backendUrl}/transactions/${id}`);
        } catch (error) {
            console.log(error);
        }
}

// Drop Table
export const deleteTransactionsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `drop table ${tableName}`,
            [],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}