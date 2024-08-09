document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const tableBody = document.getElementById('contacts-table-body');
    const newRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = nome;
    newRow.appendChild(nameCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = telefone;
    newRow.appendChild(phoneCell);

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Apagar';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        tableBody.removeChild(newRow);
    });
    actionCell.appendChild(deleteButton);
    newRow.appendChild(actionCell);

    tableBody.appendChild(newRow);

    document.getElementById('contact-form').reset();
});
