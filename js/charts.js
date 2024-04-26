document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndGenerateCharts();
});

async function fetchDataAndGenerateCharts() {
    const response = await fetch('https://data.wa.gov/resource/f6w7-q2d2.json');
    const data = await response.json();

    // Process data for charts
    const typeData = {};
    const brandData = {};
    const yearlyData = {};

    data.forEach(vehicle => {
        // For Pie Chart - Types of vehicles
        const type = vehicle.ev_type;
        typeData[type] = (typeData[type] || 0) + 1;

        // For Bar Chart - Brand distribution
        const brand = vehicle.make;
        brandData[brand] = (brandData[brand] || 0) + 1;

        // For Line Chart - Registrations over years
        const year = vehicle.model_year;
        yearlyData[year] = (yearlyData[year] || 0) + 1;
    });

    // Sort and extract top 10 brands for bar chart
    const topBrands = Object.entries(brandData).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Generate charts
    generatePieChart(typeData);
    generateBarChart(topBrands);
    generateLineChart(yearlyData);
}

function generatePieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });
}

function generateBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item[0]),
            datasets: [{
                label: 'No. of Registrations',
                data: data.map(item => item[1]),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generateLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data).sort(),
            datasets: [{
                label: 'Yearly Registrations',
                data: Object.keys(data).sort().map(year => data[year]),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
