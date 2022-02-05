const tableNameSelected = document.getElementById('table-name-select')
const selectedTable = JSON.parse(localStorage.getItem('user'))
tableNameSelected.innerHTML = selectedTable?.username ? selectedTable.username : 'Not joined/ created a table'


