"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChart = ({
  labels,
  datasets,
}: {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}) => {
  const total = datasets[0].data.reduce((sum, value) => sum + value, 0);

  const chartData: ChartData<"pie", number[], string> = {
    labels: labels,
    datasets: datasets,
  };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    cutout: "70%", // Espacio en el centro
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: any) => {
      const { width, height, ctx } = chart;

      ctx.restore();
      const fontSize = 2;
      ctx.font = `${fontSize}em sans-serif`;
      ctx.fillStyle = "#FFFFFF";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const text = `${total} kcal`;
      const textX = width / 2;
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  return (
    <div style={{ width: "200px", height: "200px" }}>
      <Pie
        data={chartData}
        options={chartOptions}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default PieChart;
