import excelExport from './excelExport';

const headers = {
  id: "ID",
  category: 'Category',
  transactionDate: 'Transaction Date',
  transactionType: 'Transaction Type',
  transactionService: 'Transaction Service',
  amount: 'Amount',
  description: 'Description',
  job: 'Job',
  client: 'Client',
};

const clientName = ({ client: { firstName, lastName } }) =>
  `${firstName} ${lastName}`;

const getValue = (key, transaction) => {
  if (key === 'job' && transaction[key]) return transaction[key].title;
  if (key === 'client' && transaction['job'])
    return clientName(transaction['job']);
  return transaction[key];
};

const exportTransactions = (transactions) => {
  const keys = [...Object.keys(transactions[0]), 'client'];
  const values = Array.from(transactions, () => Array.from(keys, () => []));
  for (let row in transactions) {
    for (let col in keys) {
      values[row][col] = getValue(keys[col], transactions[row]);
    }
  }
  values.unshift(keys.map((key) => headers[key]));
  return excelExport(values);
};

export default exportTransactions;
