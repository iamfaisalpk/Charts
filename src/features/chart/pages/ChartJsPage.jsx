import React from "react";
import { Link } from "react-router-dom";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Chart, Doughnut, Line } from "react-chartjs-2";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  FunnelController,
  TrapezoidElement,
);

const CHART_SECTIONS = [
  {
    id: "funnel",
    title: "Funnel Chart",
    description:
      "This Funnel chart is implemented using the chartjs-chart-funnel plugin on top of Chart.js. Funnel is not part of Chart.js core, so this setup extends the base library with plugin support.",
  },
  {
    id: "pie",
    title: "Pie Chart",
    description:
      "Pie / doughnut charts are well supported in Chart.js and are straightforward to configure for category distribution use cases.",
  },
  {
    id: "bar",
    title: "Bar Chart",
    description:
      "Bar charts are one of Chart.js's strongest chart types, with good defaults and flexible axis, tooltip, and dataset configuration.",
  },
  {
    id: "line",
    title: "Line Chart",
    description:
      "Line charts are reliable and highly customizable in Chart.js, making them a good fit for trend and time-series style dashboards.",
  },
];

const FUNNEL_DATA = {
  labels: [
    "Visited Landing Page",
    "Started Signup",
    "Verified Email",
    "Activated Workspace",
    "Subscribed",
  ],
  datasets: [
    {
      label: "Conversion Funnel",
      data: [1800, 1320, 910, 540, 260],
      backgroundColor: ["#0F172A", "#1D4ED8", "#2563EB", "#60A5FA", "#BFDBFE"],
      borderWidth: 0,
    },
  ],
};

const PIE_DATA = {
  labels: ["Organic", "Paid", "Referral", "Direct"],
  datasets: [
    {
      label: "Traffic Sources",
      data: [42, 26, 18, 14],
      backgroundColor: ["#2563EB", "#0F172A", "#F59E0B", "#10B981"],
      borderColor: "#FFFFFF",
      borderWidth: 2,
      hoverOffset: 6,
    },
  ],
};

const BAR_DATA = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [18000, 24500, 21200, 28750, 33100, 29800],
      backgroundColor: "#2563EB",
      borderRadius: 8,
      maxBarThickness: 42,
    },
  ],
};

const LINE_DATA = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
  datasets: [
    {
      label: "Active Users",
      data: [320, 410, 390, 520, 610, 680],
      borderColor: "#0F172A",
      backgroundColor: "rgba(15, 23, 42, 0.08)",
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 5,
      pointBackgroundColor: "#0F172A",
    },
  ],
};

const FUNNEL_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0F172A",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      padding: 12,
      callbacks: {
        label(context) {
          return `Users: ${context.raw.toLocaleString()}`;
        },
      },
    },
  },
};

const PIE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        padding: 16,
        color: "#334155",
        font: { size: 12, weight: 500 },
      },
    },
    tooltip: {
      backgroundColor: "#0F172A",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      padding: 12,
    },
  },
};

const BAR_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0F172A",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      padding: 12,
      callbacks: {
        label(context) {
          return `Revenue: $${context.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748B", font: { size: 12 } },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#64748B",
        font: { size: 12 },
        callback(value) {
          return `$${Number(value).toLocaleString()}`;
        },
      },
      grid: { color: "#E2E8F0" },
      border: { display: false },
    },
  },
};

const LINE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0F172A",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      padding: 12,
      callbacks: {
        label(context) {
          return `Active Users: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748B", font: { size: 12 } },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#64748B", font: { size: 12 } },
      grid: { color: "#E2E8F0" },
      border: { display: false },
    },
  },
};

export default function ChartJsPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] p-8 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <PageHeader />

        <div className="mt-6 grid gap-6">
          <ChartSection
            title={CHART_SECTIONS[0].title}
            description={CHART_SECTIONS[0].description}
          >
            <ChartCard>
              <Chart
                type="funnel"
                data={FUNNEL_DATA}
                options={FUNNEL_OPTIONS}
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[1].title}
            description={CHART_SECTIONS[1].description}
          >
            <ChartCard>
              <Doughnut data={PIE_DATA} options={PIE_OPTIONS} />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[2].title}
            description={CHART_SECTIONS[2].description}
          >
            <ChartCard>
              <Bar data={BAR_DATA} options={BAR_OPTIONS} />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[3].title}
            description={CHART_SECTIONS[3].description}
          >
            <ChartCard>
              <Line data={LINE_DATA} options={LINE_OPTIONS} />
            </ChartCard>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <header>
      <Link
        to="/charts"
        className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-700"
      >
        ← Back to chart library comparison
      </Link>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-xl font-semibold text-slate-900">
              Chart.js Demo
            </h1>
            
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <MetaRow
              label="Package"
              value="chart.js + react-chartjs-2 + chartjs-chart-funnel"
            />
            <MetaRow label="Best for" value="Bar, line, pie dashboards" />
            <MetaRow label="Trade-off" value="Funnel requires plugin support" />
          </div>
        </div>
      </div>
    </header>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-slate-700">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function ChartSection({ title, description, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function ChartCard({ children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="h-[360px]">{children}</div>
    </div>
  );
}


{/*  implementation plan this file  */}

/*
Chart.js (via react-chartjs-2) 


1. ChartJS.register()
Chart.js oru modular library aanu — use cheyyunna elements/scales/plugins manually register cheyyanam.
Ithu illenkil "arc is not a registered element" pole errors varum.

example :-   ChartJS.register(
    ArcElement, BarElement, CategoryScale, LinearScale,
    PointElement, LineElement, Filler, Tooltip, Legend,
    FunnelController, TrapezoidElement,
    );
    ArcElement/BarElement/LineElement — respective chart-inte shapes draw cheyyunna elements
    CategoryScale/LinearScale — x-axis labels, y-axis numbers handle cheyyunnu
    FunnelController + TrapezoidElement — chartjs-chart-funnel plugin-inte funnel shape support


2. react-chartjs-2 components (<Bar>, <Line>, <Doughnut>, <Chart>)
Chart.js-inte canvas-based API-ne React components aayi wrap cheyyunna thin wrapper library aanu ithu.
Oroo chart type-inum corresponding component undu, data + options props aayi pass cheyyum.

    example :-   <Bar data={BAR_DATA} options={BAR_OPTIONS} />
    data → labels + datasets (actual numbers, colors)
    options → behavior config (responsive, tooltip format, axis styling)
    Funnel pole custom types-inu generic <Chart type="funnel" /> use cheyyanam


3. options.plugins.tooltip.callbacks
Tooltip-inte default text override cheyyaan use cheyyunna function.

example :-   callbacks: {
    label(context) {
        return `Revenue: $${context.raw.toLocaleString()}`;
    },
    },
    context.raw → aa data point-inte actual value
    Ith vechu "$24,500" pole custom formatted text kaanikkam, default "24500"

*/


 {/*  In This file Use cheythath  */}

/*
    Nammude ChartJsPage.jsx file chart.js + react-chartjs-2 + chartjs-chart-funnel use cheythu undakkiyathanu.
    Ithu canvas-based, config-driven charting library aanu. Ee file-il 4 chart types render cheyyunnu —
    Funnel Chart — <Chart type="funnel"> — conversion steps (Visit → Signup → Verify → Activate → Subscribe)
    Pie Chart — <Doughnut> — traffic source distribution (Organic/Paid/Referral/Direct)
    Bar Chart — <Bar> — monthly revenue trend
    Line Chart — <Line> — weekly active users trend, area-filled

    Oroo chart-inum separate DATA object (labels + datasets) and OPTIONS object (responsive behavior,
    tooltip formatting, axis styling) undu. maintainAspectRatio: false koduthathu kondu ChartCard-inte
    fixed h-[360px] container respect cheyyum, allenkil chart auto-height edukkum.


    /* packge  */      {/* size */}

    // chart.js                   ~60kb
    // react-chartjs-2             ~5kb
    // chartjs-chart-funnel        ~4kb

    { /* customization */ }

    /*
    Customization medium level aanu. Colors, tooltip, legend, axis ticks, grid lines ellam
    options object vechu control cheyyam — standard chart types-inu (bar, line, pie) ith
    kuduthal enough aanu. Pakshe deeply custom animations or complex interactions venenkil
    limitations varum. CSS directly canvas-il apply cheyyaan pattilla — options API vechu
    mathrame style cheyyam. Funnel pole non-core chart types-inu oru external plugin
    (chartjs-chart-funnel) venam, athu library-inte "batteries included alla" nature kaanikkum.
    */