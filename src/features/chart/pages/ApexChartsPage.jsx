import React from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";

const CHART_SECTIONS = [
  {
    id: "funnel",
    title: "Funnel Chart",
    description:
      "ApexCharts supports funnel-style visualizations through its bar chart capabilities, which makes it practical for conversion and pipeline dashboards without requiring a separate plugin.",
  },
  {
    id: "pie",
    title: "Pie Chart",
    description:
      "Pie / donut charts are straightforward to build in ApexCharts and work well for traffic, source, and category distribution visualizations.",
  },
  {
    id: "bar",
    title: "Bar Chart",
    description:
      "Bar charts are one of ApexCharts’ strongest areas, with solid defaults, clean tooltips, and easy axis customization for dashboard reporting use cases.",
  },
  {
    id: "line",
    title: "Line Chart",
    description:
      "Line charts are reliable and polished in ApexCharts, especially for trend and KPI-style dashboard visualizations.",
  },
];

const FUNNEL_DATA = [
  { stage: "Visited Landing Page", value: 1800 },
  { stage: "Started Signup", value: 1320 },
  { stage: "Verified Email", value: 910 },
  { stage: "Activated Workspace", value: 540 },
  { stage: "Subscribed", value: 260 },
];

const PIE_SERIES = [42, 26, 18, 14];
const PIE_LABELS = ["Organic", "Paid", "Referral", "Direct"];

const BAR_DATA = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 24500 },
  { month: "Mar", revenue: 21200 },
  { month: "Apr", revenue: 28750 },
  { month: "May", revenue: 33100 },
  { month: "Jun", revenue: 29800 },
];

const LINE_DATA = [
  { week: "Week 1", users: 320 },
  { week: "Week 2", users: 410 },
  { week: "Week 3", users: 390 },
  { week: "Week 4", users: 520 },
  { week: "Week 5", users: 610 },
  { week: "Week 6", users: 680 },
];

const FUNNEL_CHART_CONFIG = {
  series: [
    {
      name: "Users",
      data: [...FUNNEL_DATA]
        .sort((a, b) => b.value - a.value)
        .map((item) => item.value),
    },
  ],
  options: {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "72%",
        isFunnel: true,
      },
    },
    colors: ["#0F172A", "#1D4ED8", "#2563EB", "#60A5FA", "#BFDBFE"],
    dataLabels: {
      enabled: true,
      formatter(value) {
        return value.toLocaleString();
      },
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#FFFFFF"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [...FUNNEL_DATA]
        .sort((a, b) => b.value - a.value)
        .map((item) => item.stage),
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#334155",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      y: {
        formatter(value) {
          return value.toLocaleString();
        },
      },
    },
    legend: {
      show: false,
    },
  },
};

const PIE_CHART_CONFIG = {
  series: PIE_SERIES,
  options: {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: PIE_LABELS,
    colors: ["#2563EB", "#0F172A", "#F59E0B", "#10B981"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      labels: {
        colors: "#475569",
      },
      itemMargin: {
        horizontal: 12,
        vertical: 6,
      },
    },
    stroke: {
      colors: ["#FFFFFF"],
      width: 2,
    },
    dataLabels: {
      enabled: true,
      formatter(value) {
        return `${value.toFixed(0)}%`;
      },
    },
    tooltip: {
      y: {
        formatter(value) {
          return `${value}%`;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "62%",
        },
      },
    },
  },
};

const BAR_CHART_CONFIG = {
  series: [
    {
      name: "Revenue",
      data: BAR_DATA.map((item) => item.revenue),
    },
  ],
  options: {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#2563EB"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "48%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: BAR_DATA.map((item) => item.month),
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
        formatter(value) {
          return `$${Number(value).toLocaleString()}`;
        },
      },
    },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter(value) {
          return `$${value.toLocaleString()}`;
        },
      },
    },
    legend: {
      show: false,
    },
  },
};

const LINE_CHART_CONFIG = {
  series: [
    {
      name: "Active Users",
      data: LINE_DATA.map((item) => item.users),
    },
  ],
  options: {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#0F172A"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      colors: ["#0F172A"],
      hover: {
        size: 5,
      },
    },
    xaxis: {
      categories: LINE_DATA.map((item) => item.week),
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter(value) {
          return value.toLocaleString();
        },
      },
    },
    legend: {
      show: false,
    },
  },
};

export default function ApexChartsPage() {
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
                type="bar"
                series={FUNNEL_CHART_CONFIG.series}
                options={FUNNEL_CHART_CONFIG.options}
                height="100%"
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[1].title}
            description={CHART_SECTIONS[1].description}
          >
            <ChartCard>
              <Chart
                type="donut"
                series={PIE_CHART_CONFIG.series}
                options={PIE_CHART_CONFIG.options}
                height="100%"
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[2].title}
            description={CHART_SECTIONS[2].description}
          >
            <ChartCard>
              <Chart
                type="bar"
                series={BAR_CHART_CONFIG.series}
                options={BAR_CHART_CONFIG.options}
                height="100%"
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[3].title}
            description={CHART_SECTIONS[3].description}
          >
            <ChartCard>
              <Chart
                type="line"
                series={LINE_CHART_CONFIG.series}
                options={LINE_CHART_CONFIG.options}
                height="100%"
              />
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
              ApexCharts Demo
            </h1>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <MetaRow label="Package" value="apexcharts + react-apexcharts" />
            <MetaRow
              label="Best for"
              value="Dashboard charts, KPI panels, analytics UIs"
            />
            <MetaRow
              label="Trade-off"
              value="Config-heavy API compared with more component-driven libraries"
            />
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
ApexCharts (via react-apexcharts) —


1. <Chart /> component (series + options + type)
react-apexcharts-inte single universal component aanu ithu — ella chart type-inum (bar, donut,
line etc.) same component use cheyyum, type prop vechu ethu chart ennu decide cheyyunnu.

  example :-   <Chart
    type="bar"
    series={BAR_CHART_CONFIG.series}
    options={BAR_CHART_CONFIG.options}
    height="100%"
  />
  series → actual numeric data (array of numbers, allenkil { name, data } objects)
  options → chart-inte ella behavior/styling (axis, tooltip, colors, plotOptions)
  type → "bar" | "donut" | "line" etc. — same <Chart> component reuse cheyyunnu


2. CONFIG object ({ series, options })
Oroo chart-inum series-um options-um separate aayi oru single object-il group cheythu mukalil
define cheythittund, athu component-inu spread cheyyathe direct property access vechu pass cheyyunnu.

  example :-   const BAR_CHART_CONFIG = {
    series: [{ name: "Revenue", data: BAR_DATA.map((item) => item.revenue) }],
    options: { chart: { type: "bar" }, colors: ["#2563EB"], ... },
  };
  series → [{ name, data }] shape-il, data numbers-inte plain array
  options.chart.type → ApexCharts-inte internal chart type (top-level type prop-um match aavanam)


3. Funnel trick — plotOptions.bar.isFunnel
ApexCharts-il native Funnel chart type illa, pakshe horizontal bar chart-ne funnel pole
kaanikkaan oru special flag undu.

  example :-   plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      isFunnel: true,
    },
  },
  horizontal: true → bars left-to-right aayi kaanikkunnu
  distributed: true → oroo bar-inum vere vere color (colors array-il ninnu)
  isFunnel: true → bars-inte edges funnel shape pole taper aavunnu (top wide, bottom narrow)
  Ithinu vendi data value descending order-il sort cheyyanam (FUNNEL_DATA-il .sort() cheythittundu)


4. options.tooltip.y.formatter / dataLabels.formatter
Tooltip-um on-chart data labels-um custom format cheyyaan use cheyyunna functions.

  example :-   tooltip: {
    y: {
      formatter(value) {
        return `$${value.toLocaleString()}`;
      },
    },
  },
  y.formatter → hover cheyyumbol tooltip-il value engane kaanikkanam ennu decide cheyyunnu
  dataLabels.formatter → chart-inte mukalil thanne (bar/funnel-il) permanent aayi kaanikkuna text

*/


 {/*  In This file Use cheythath  */}

/*
  Nammude ApexChartsPage.jsx file apexcharts + react-apexcharts use cheythu undakkiyathanu.
  Ithu config-object-based library aanu (Chart.js/ECharts pole), pakshe series and options
  randum vere aayi separate cheythu kodukkanam ennathanu difference. Ee file-il 4 chart types
  render cheyyunnu —
  Funnel Chart — <Chart type="bar"> + isFunnel: true — native funnel type illathathu kondu
        horizontal bar chart-ne "funnel trick" vechu funnel pole kaanikkunnu
  Pie Chart — <Chart type="donut"> — plotOptions.pie.donut.size: "62%" vechu center hole size
  Bar Chart — <Chart type="bar"> — plotOptions.bar.borderRadius: 8, columnWidth: "48%"
  Line Chart — <Chart type="line"> — stroke.curve: "smooth", markers vechu data points circle aayi

  Oroo chart-inum CONFIG object (FUNNEL_CHART_CONFIG, PIE_CHART_CONFIG, BAR_CHART_CONFIG,
  LINE_CHART_CONFIG) mukalil define cheythu, component-il series/options aayi split cheythu pass
  cheyyunnu. grid.strokeDashArray: 4 ella chart-ilum common aayi dashed grid lines kaanikkunnu.


    /* packge  */                 {/* size */}

    // apexcharts                  ~140kb
    // react-apexcharts             ~5kb

    { /* customization */ }

    /*
    Customization dashboard/KPI-style charts-inu well-suited aanu — animations, gradients,
    zoom/pan (line/area charts-il), export toolbar (default-il off aakkiyittundu ee file-il)
    ellam built-in aanu. Config verbose aanu (Chart.js pole), pakshe well-organized (chart/
    plotOptions/xaxis/yaxis/tooltip/legend ayi neat aayi split aavum). Trade-off — native
    Funnel chart type illa, so bar chart hack venam (isFunnel flag), ith Recharts/ECharts/Nivo
    pole "true funnel" alla, just visual trick aanu. Bundle size-um moderate-large aanu (~140kb),
    Chart.js-ne apeksha valuthanu.
    */