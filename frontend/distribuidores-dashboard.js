document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
    });

    const addDistributorBtn = document.getElementById('add-distributor-btn');

    addDistributorBtn.addEventListener('click', function () {
        // Open a modal or prompt for adding a new distributor
        const name = prompt("Enter distributor name:");
        const phone = prompt("Enter distributor phone:");
        const email = prompt("Enter distributor email:");
        const address = prompt("Enter distributor address:");

        if (name && phone && email && address) {
            const newDistributor = { name, phone, email, address };
            addDistributor(newDistributor); // Call the function to add distributor
        } else {
            alert("Please provide valid input!");
        }
    });

    function addDistributorRow(distributor) {
        const tableBody = document.querySelector('.distributor-table tbody');
        const row = document.createElement('tr');
        row.dataset.id = distributor.id; // Store the ID for reference
        row.innerHTML = `
            <td>${distributor.name}</td>
            <td>${distributor.phone}</td>
            <td>${distributor.email}</td>
            <td>${distributor.address}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for edit and delete buttons
        row.querySelector('.edit-btn').addEventListener('click', () => editDistributor(distributor.id, row));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteDistributor(distributor.id, row));
    }

    function fetchDistributors() {
        axios.get('http://127.0.0.1:3000/distribuidores')
            .then(response => {
                console.log('Fetched distributors:', response.data);
                response.data.forEach(distributor => {
                    addDistributorRow(distributor);
                });
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error fetching distributors:', error.response.data);
                    alert(`Failed to fetch distributors: ${error.response.status} ${error.response.statusText}`);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('No response from server. Check if the backend is running.');
                } else {
                    console.error('Error setting up request:', error.message);
                    alert(`Error: ${error.message}`);
                }
            });
    }

    function addDistributor(distributor) {
        axios.post('http://127.0.0.1:3000/distribuidores', distributor)
            .then(response => {
                console.log('Distributor added:', response.data); // Log the added distributor data
                addDistributorRow(response.data); // Add the new row to the table
            })
            .catch(error => console.error('Error adding distributor:', error));
    }

    function editDistributor(id, row) {
        // Prompt for new values and show current values as defaults
        const name = prompt("Edit distributor name:", row.cells[0].innerText);
        const phone = prompt("Edit distributor phone:", row.cells[1].innerText);
        const email = prompt("Edit distributor email:", row.cells[2].innerText);
        const address = prompt("Edit distributor address:", row.cells[3].innerText);

        if (name && contact && address) {
            const updatedDistributor = { name, contact, address };
            updateDistributor(id, updatedDistributor, row); // Call the function to update distributor
        } else {
            alert("Please provide valid input!");
        }
    }

    function updateDistributor(id, updatedDistributor, row) {
        // Make an API call to update the distributor
        axios.put(`http://127.0.0.1:3000/distribuidores/${id}`, updatedDistributor)
            .then(response => {
                console.log('Distributor updated:', response.data);
                row.cells[0].innerText = updatedDistributor.name;
                row.cells[1].innerText = updatedDistributor.phone;
                row.cells[2].innerText = updatedDistributor.email;
                row.cells[3].innerText = updatedDistributor.address;
            })
            .catch(error => console.error('Error updating distributor:', error));
    }

    function deleteDistributor(id, row) {
        if (confirm("Are you sure you want to delete this distributor?")) {
            axios.delete(`http://127.0.0.1:3000/distribuidores/${id}`)
                .then(response => {
                    console.log('Distributor deleted:', response.data);
                    row.remove(); // Remove the row from the table
                })
                .catch(error => console.error('Error deleting distributor:', error));
        }
    }

    fetchDistributors();
});
