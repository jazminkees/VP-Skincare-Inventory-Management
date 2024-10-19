document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const addPerfumeBtn = document.getElementById('add-perfume-btn');

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
    });

    addPerfumeBtn.addEventListener('click', function () {
        // Logic to add a new perfume
        alert('Add new perfume functionality goes here!');
    });

    // Example function to add rows dynamically (this could be connected to backend data)
    function addPerfumeRow(nombre, precio, distribuidor, ml, stock) {
        const tableBody = document.querySelector('.perfume-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${distribuidor}</td>
            <td>${ml}</td>
            <td>${stock}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for edit and delete buttons
        row.querySelector('.edit-btn').addEventListener('click', () => editPerfume(row));
        row.querySelector('.delete-btn').addEventListener('click', () => deletePerfume(row));
    }

    function editPerfume(row) {
        // Logic for editing the perfume
        alert('Edit perfume functionality goes here!');
    }

    function deletePerfume(row) {
        // Logic for deleting the perfume
        row.remove();
        alert('Perfume deleted!');
    }

    // Example data (this should come from your backend)
    addPerfumeRow('Perfume A', '$50', 'Distribuidor 1', '50ml', 20);
    addPerfumeRow('Perfume B', '$70', 'Distribuidor 2', '100ml', 10);
});
