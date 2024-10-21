document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
    });

    const addSaleBtn = document.getElementById('add-sale-btn');

    addSaleBtn.addEventListener('click', function () {
        // Open a modal or prompt for adding a new sale
        const date = prompt("Enter sale date (YYYY-MM-DD):");
        const clientName = prompt("Enter client name:");
        const clientContact = prompt("Enter client contact:");
        const perfumeNames = prompt("Enter perfume names (comma-separated):");
        const discount = prompt("Enter discount (if any):");
        const total = prompt("Enter total amount:");

        if (date && clientName && clientContact && perfumeNames && total) {
            const newSale = { date, client_name: clientName, client_contact: clientContact, perfume_names: perfumeNames, discount, total };
            addSale(newSale); // Call the function to add the sale
        } else {
            alert("Please provide valid input!");
        }
    });

    function addSaleRow(sale) {
        const tableBody = document.querySelector('.sales-table tbody');
        const row = document.createElement('tr');
        row.dataset.id = sale.id; // Store the ID for reference
        row.innerHTML = `
            <td>${sale.date}</td>
            <td>${sale.client_name}</td>
            <td>${sale.client_contact}</td>
            <td>${sale.perfume_names}</td>
            <td>${sale.discount || 'None'}</td>
            <td>${sale.total}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="print-receipt-btn">Print Receipt</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Add event listeners for edit, delete, and print buttons
        row.querySelector('.edit-btn').addEventListener('click', () => editSale(sale.id, row));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteSale(sale.id, row));
        row.querySelector('.print-receipt-btn').addEventListener('click', () => printReceipt(sale));
    }

    function addSale(newSale) {
        axios.post('http://127.0.0.1:3000/ventas', newSale)
            .then(response => {
                console.log('New sale added:', response.data);
                addSaleRow(response.data);
            })
            .catch(error => {
                console.error('Error adding sale:', error);
                alert('Failed to add sale. Please check the console for details.');
            });
    }
    

    function fetchSales() {
        axios.get('http://127.0.0.1:3000/ventas')
            .then(response => {
                console.log('Fetched sales:', response.data);
                response.data.forEach(sale => {
                    addSaleRow(sale);
                });
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error fetching sales:', error.response.data);
                    alert(`Failed to fetch sales: ${error.response.status} ${error.response.statusText}`);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('No response from server. Check if the backend is running.');
                } else {
                    console.error('Error setting up request:', error.message);
                    alert(`Error: ${error.message}`);
                }
            });
    }

    function addSaleRow(sale) {
        const tableBody = document.querySelector('.venta-table tbody'); // Updated class name
        if (!tableBody) {
            console.error('Table body is null. Ensure the table is present in the DOM.');
            return;
        }
        const row = document.createElement('tr');
        row.dataset.id = sale.id; // Store the ID for reference
        row.innerHTML = `
            <td>${sale.date}</td>
            <td>${sale.client_name}</td>
            <td>${sale.client_contact}</td>
            <td>${sale.perfume_names}</td>
            <td>${sale.discount || 'None'}</td>
            <td>${sale.total}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="print-receipt-btn">Print Receipt</button>
            </td>
        `;
        tableBody.appendChild(row);
    
        row.querySelector('.edit-btn').addEventListener('click', () => editSale(sale.id, row));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteSale(sale.id, row));
        row.querySelector('.print-receipt-btn').addEventListener('click', () => printReceipt(sale));
    }
    

    function editSale(id, row) {
        // Prompt for new values and show current values as defaults
        const date = prompt("Edit sale date (YYYY-MM-DD):", row.cells[0].innerText);
        const clientName = prompt("Edit client name:", row.cells[1].innerText);
        const clientContact = prompt("Edit client contact:", row.cells[2].innerText);
        const perfumeNames = prompt("Edit perfume names (comma-separated):", row.cells[3].innerText);
        const discount = prompt("Edit discount (if any):", row.cells[4].innerText);
        const total = prompt("Edit total amount:", row.cells[5].innerText);

        if (date && clientName && clientContact && perfumeNames && total) {
            const updatedSale = { date, client_name: clientName, client_contact: clientContact, perfume_names: perfumeNames, discount, total };
            updateSale(id, updatedSale, row);
        } else {
            alert("Please provide valid input!");
        }
    }

    function updateSale(id, updatedSale, row) {
        axios.put(`http://127.0.0.1:3000/ventas/${id}`, updatedSale)
            .then(response => {
                console.log('Sale updated:', response.data);
                row.cells[0].innerText = updatedSale.date;
                row.cells[1].innerText = updatedSale.client_name;
                row.cells[2].innerText = updatedSale.client_contact;
                row.cells[3].innerText = updatedSale.perfume_names;
                row.cells[4].innerText = updatedSale.discount || 'None';
                row.cells[5].innerText = updatedSale.total;
            })
            .catch(error => console.error('Error updating sale:', error));
    }

    function deleteSale(id, row) {
        if (confirm("Are you sure you want to delete this sale?")) {
            axios.delete(`http://127.0.0.1:3000/ventas/${id}`)
                .then(response => {
                    console.log('Sale deleted:', response.data);
                    row.remove();
                })
                .catch(error => console.error('Error deleting sale:', error));
        }
    }

    function printReceipt(sale) {
        const discount = sale.discount ? parseFloat(sale.discount) : 0;
        const total = parseFloat(sale.total);
        const finalTotal = total - (total * discount / 100);
    
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        doc.setFontSize(16);
        doc.text('Recibo de Venta', 105, 20, { align: 'center' });
    
        doc.setFontSize(12);
        doc.text('----------------------------------------', 10, 30);
    
        doc.text(`ID de Venta: ${sale.id}`, 10, 40);
        doc.text(`Fecha: ${sale.date}`, 10, 50);
        doc.text(`Nombre del Cliente: ${sale.client_name}`, 10, 60);
        doc.text(`Contacto del Cliente: ${sale.client_contact}`, 10, 70);
        doc.text(`Nombres de Perfume: ${sale.perfume_names}`, 10, 80);
        doc.text(`Descuento: ${sale.discount || '0'}%`, 10, 90);
        doc.text(`Total Antes del Descuento: $${total.toFixed(2)}`, 10, 100);

        doc.setFont("Helvetica", "bold");
        doc.text(`Total Después del Descuento: $${finalTotal.toFixed(2)}`, 10, 110);
    
        doc.text('----------------------------------------', 10, 120);
        doc.text('¡Gracias por su compra!', 105, 130, { align: 'center' });
    
        doc.save(`recibo_venta_${sale.id}.pdf`);
    }
    

    fetchSales();
});
