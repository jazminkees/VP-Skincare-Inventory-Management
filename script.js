document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
    });
});

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://127.0.0.1:8000/perfumes';

    function fetchPerfumes() {
        axios.get(baseUrl)
            .then(response => {
                console.log(response.data);
                // Populate the dashboard with the data
                response.data.forEach(perfume => {
                    addPerfumeRow(perfume); // Add each perfume to the table
                });
            })
            .catch(error => console.error('Error fetching perfumes:', error));
    }

    function addPerfume(perfume) {
        axios.post(baseUrl, perfume)
            .then(response => {
                console.log('Perfume added:', response.data);
                addPerfumeRow(response.data); // Add the new row to the table
            })
            .catch(error => console.error('Error adding perfume:', error));
    }

    function updatePerfume(id, perfume) {
        axios.put(`${baseUrl}/${id}`, perfume)
            .then(response => {
                console.log('Perfume updated:', response.data);
                fetchPerfumes(); // Refresh the list
            })
            .catch(error => console.error('Error updating perfume:', error));
    }

    fetchPerfumes(); // Fetch and display the perfumes on load
});
