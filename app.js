let progressChart;

// Log Activity Form Submission
document.getElementById('logForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const activity = document.getElementById('activity').value;
  const duration = document.getElementById('duration').value;
  const calories = document.getElementById('calories').value;
  const logDate = document.getElementById('logDate').value;  // Get the selected date

  if (activity && duration && calories && logDate) {
    logActivity(activity, duration, calories, logDate);
  } else {
    alert("Please fill out all fields!");
  }
});

// Log activity and save to localStorage with the selected date
function logActivity(activity, duration, calories, logDate) {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];
  const newActivity = { 
    activity, 
    duration: parseInt(duration),  // Steps simulated by duration
    calories: parseInt(calories), 
    date: logDate  // Use selected date
  };

  activities.push(newActivity);
  localStorage.setItem('activities', JSON.stringify(activities));

  alert('Activity logged successfully!');
  updateProgressChart();  // Update the chart immediately after logging
  updateSummary();
}

// Immediately show progress when data is logged without waiting for a date selection
function updateProgressChart() {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];

  if (activities.length === 0) {
    clearProgress();
    return;
  }

  const dates = activities.map(activity => activity.date);
  const durations = activities.map(activity => activity.duration);  // Simulated steps
  const calories = activities.map(activity => activity.calories);

  // If chart already exists, destroy it before creating a new one
  if (progressChart) {
    progressChart.destroy();
  }

  // Create a new chart
  const ctx = document.getElementById('progressChart').getContext('2d');
  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Steps (Duration in minutes)',
          data: durations,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Calories Burned',
          data: calories,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Update progress summary with total data
function updateSummary() {
  const activities = JSON.parse(localStorage.getItem('activities')) || [];

  if (activities.length === 0) {
    document.getElementById('progressSummary').innerHTML = '<p>No activity data to display.</p>';
    return;
  }

  const totalSteps = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);
  const averageSteps = (totalSteps / activities.length).toFixed(2);
  const averageCalories = (totalCalories / activities.length).toFixed(2);

  document.getElementById('progressSummary').innerHTML = `
    <p><strong>Total Steps:</strong> ${totalSteps} steps</p>
    <p><strong>Total Calories Burned:</strong> ${totalCalories} kcal</p>
    <p><strong>Average Daily Steps:</strong> ${averageSteps} steps</p>
    <p><strong>Average Daily Calories Burned:</strong> ${averageCalories} kcal</p>
  `;
}

// Clear the progress chart and summary
function clearProgress() {
  if (progressChart) {
    progressChart.destroy();
  }
  document.getElementById('progressSummary').innerHTML = '<p>No data available. Please log an activity.</p>';
}

// Initialize the page with empty progress
window.onload = function() {
  clearProgress();  // Show a blank graph and summary initially
};

// Function to display fitness model selection (Cardio, Strength, Yoga)
function showModel(model) {
  alert(`You have selected the ${model} fitness model.`);
}
