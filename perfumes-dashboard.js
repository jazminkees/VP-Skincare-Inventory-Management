document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const addPerfumeBtn = document.getElementById('add-perfume-btn');

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
    });

    addPerfumeBtn.addEventListener('click', function () {
        // Open a modal or prompt for adding a new perfume
        const name = prompt("Enter perfume name:");
        const price = parseFloat(prompt("Enter perfume price:"));
        const brand = prompt("Enter perfume brand:");
        const distributor = prompt("Enter distributor:");
        const ml = parseInt(prompt("Enter size in ml:"));
        const stock = parseInt(prompt("Enter stock quantity:"));

        if (name && !isNaN(price) && distributor && !isNaN(ml) && !isNaN(stock)) {
            const newPerfume = { name, price, brand, distributor, ml, stock };
            addPerfume(newPerfume); // Call the function to add perfume
        } else {
            alert("Please provide valid input!");
        }
    });

    function addPerfumeRow(perfume) {
        const tableBody = document.querySelector('.perfume-table tbody');
        const row = document.createElement('tr');
        row.dataset.id = perfume.id; // Store the ID for reference
        row.innerHTML = `
            <td>${perfume.name}</td>
            <td>$${perfume.price.toFixed(2)}</td>
            <td>${perfume.brand}</td>
            <td>${perfume.distributor}</td>
            <td>${perfume.ml}ml</td>
            <td>${perfume.stock}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for edit and delete buttons
        row.querySelector('.edit-btn').addEventListener('click', () => editPerfume(perfume.id, row));
        row.querySelector('.delete-btn').addEventListener('click', () => deletePerfume(perfume.id, row));
    }

    function fetchPerfumes() {
        axios.get('http://127.0.0.1:3000/perfumes')
            .then(response => {
                console.log('Fetched perfumes:', response.data);
                response.data.forEach(perfume => {
                    addPerfumeRow(perfume);
                });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Error fetching perfumes:', error.response.data);
                    alert(`Failed to fetch perfumes: ${error.response.status} ${error.response.statusText}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    alert('No response from server. Check if the backend is running.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up request:', error.message);
                    alert(`Error: ${error.message}`);
                }
            });
    }
    

    function addPerfume(perfume) {
        axios.post('http://127.0.0.1:3000/perfumes', perfume)
            .then(response => {
                console.log('Perfume added:', response.data); // Log the added perfume data
                addPerfumeRow(response.data); // Add the new row to the table
            })
            .catch(error => console.error('Error adding perfume:', error));
    }

    function editPerfume(id, row) {
        // Prompt for new values and show current values as defaults
        const name = prompt("Edit perfume name:", row.cells[0].innerText);
        const price = parseFloat(prompt("Edit perfume price:", row.cells[1].innerText.replace('$', '')));
        const brand = prompt("Edit brand name:", row.cells[2].innerText);
        const distributor = prompt("Edit distributor:", row.cells[3].innerText);
        const ml = parseInt(prompt("Edit size in ml:", row.cells[4].innerText.replace('ml', '')));
        const stock = parseInt(prompt("Edit stock quantity:", row.cells[5].innerText));

        if (name && !isNaN(price) && brand && distributor && !isNaN(ml) && !isNaN(stock)) {
            const updatedPerfume = { name, price, brand, distributor, ml, stock };
            updatePerfume(id, updatedPerfume, row); // Call the function to update perfume
        } else {
            alert("Please provide valid input!");
        }
    }

    function updatePerfume(id, updatedPerfume, row) {
        // Make an API call to update the perfume
        axios.put(`http://127.0.0.1:3000/perfumes/${id}`, updatedPerfume)
            .then(response => {
                console.log('Perfume updated:', response.data);
                // Update the table row with new values
                row.cells[0].innerText = updatedPerfume.name;
                row.cells[1].innerText = `$${updatedPerfume.price.toFixed(2)}`;
                row.cells[2].innerText = updatedPerfume.brand;
                row.cells[3].innerText = updatedPerfume.distributor;
                row.cells[4].innerText = `${updatedPerfume.ml}ml`;
                row.cells[5].innerText = updatedPerfume.stock;
            })
            .catch(error => console.error('Error updating perfume:', error));
    }


    function deletePerfume(id, row) {
        if (confirm("Are you sure you want to delete this perfume?")) {
            axios.delete(`http://127.0.0.1:3000/perfumes/${id}`)
                .then(response => {
                    console.log('Perfume deleted:', response.data);
                    row.remove(); // Remove the row from the table
                })
                .catch(error => console.error('Error deleting perfume:', error));
        }
    }

    fetchPerfumes();

    
});
