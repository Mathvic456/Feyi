import { Line } from 'react-chartjs-2';
import { 
  Chart, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MoodChart({ data }) {
  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded border text-center">
        <p className="text-gray-500 py-6">No mood data recorded yet</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map(entry => 
      new Date(entry.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    ),
    datasets: [{
      label: 'Mood Level',
      data: data.map(entry => entry.score),
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(79, 70, 229)',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: value => ['😢', '😞', '😐', '😊', '🤩'][value-1]
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const moods = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];
            return `Mood: ${moods[context.raw-1]} (${['😢', '😞', '😐', '😊', '🤩'][context.raw-1]})`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="font-bold mb-3 text-gray-700">Mood Trend</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      <div className="flex justify-center gap-4 mt-3 text-xs">
        {[1, 2, 3, 4, 5].map(score => (
          <div key={score} className="flex items-center gap-1">
            <span className="text-lg">{['😢', '😞', '😐', '😊', '🤩'][score-1]}</span>
            <span className="text-gray-500">= {score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}