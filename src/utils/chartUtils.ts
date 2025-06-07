import { ChartData } from "chart.js";

export const createUptimeChartData = (
  checks: { isUp: boolean; checkedAt: string }[]
): ChartData<"line"> => {
  return {
    labels: checks.map((check) =>
      new Date(check.checkedAt).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Status",
        data: checks.map((check) => (check.isUp ? 1 : 0)),
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        tension: 0.1,
      },
    ],
  };
};
