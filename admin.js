document.addEventListener('DOMContentLoaded', function() {
    const usersTable = document.getElementById('usersTable').querySelector('tbody');
    const exportButton = document.getElementById('exportButton');

    function loadRegisteredUsers() {
        const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
        usersTable.innerHTML = '';

        visitors.forEach(visitor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${visitor.name}</td>
                <td>${visitor.phone}</td>
                <td>${visitor.id}</td>
                <td>${visitor.prizeDraw ? 'Yes' : 'No'}</td>
            `;
            usersTable.appendChild(row);
        });
    }

    function exportToExcel() {
        const table = document.getElementById('usersTable');
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
            const cols = Array.from(row.querySelectorAll('th, td'));
            return cols.map(col => col.textContent).join(',');
        }).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'registered_users.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    loadRegisteredUsers();
    exportButton.addEventListener('click', exportToExcel);
});


// Array to store staff members (in real application, this could be fetched from the server)
let staffMembers = JSON.parse(localStorage.getItem('staffMembers')) || [];

// Function to render staff in the table
function renderStaff() {
    const staffTable = document.getElementById('staffTable').getElementsByTagName('tbody')[0];
    staffTable.innerHTML = '';
    staffMembers.forEach((staff, index) => {
        let row = staffTable.insertRow();
        row.innerHTML = `
            <td>${staff}</td>
            <td>
                <button onclick="deleteStaff(${index})">Delete</button>
            </td>
        `;
    });
}

// Add new staff
document.getElementById('addStaffForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newStaff = document.getElementById('newStaff').value;
    if (newStaff) {
        staffMembers.push(newStaff);
        localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
        renderStaff();
        document.getElementById('newStaff').value = '';
    }
});

// Delete staff
function deleteStaff(index) {
    staffMembers.splice(index, 1);
    localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
    renderStaff();
}

// Initial render
renderStaff();
