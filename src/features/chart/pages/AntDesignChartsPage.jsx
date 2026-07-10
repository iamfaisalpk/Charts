import React from "react";
import { Link } from "react-router-dom";
import { Column, Funnel, Line, Pie } from "@ant-design/charts";

const CHART_SECTIONS = [
  {
    id: "funnel",
    title: "Funnel Chart",
    description:
      "Ant Design Charts provides a dedicated Funnel chart component, making it suitable for conversion, onboarding, and pipeline-style business dashboards without needing extra plugins.",
  },
  {
    id: "pie",
    title: "Pie Chart",
    description:
      "Pie / donut charts are straightforward to configure in Ant Design Charts and fit well for distribution-style dashboard use cases.",
  },
  {
    id: "bar",
    title: "Bar Chart",
    description:
      "Bar charts are well supported and easy to configure, with clean defaults for category comparison dashboards and internal business reporting screens.",
  },
  {
    id: "line",
    title: "Line Chart",
    description:
      "Line charts are reliable for trend and time-series style visualizations, with a simple configuration model and good built-in tooltip and axis behavior.",
  },
];

const FUNNEL_DATA = [
  { stage: "Visited Landing Page", value: 1800 },
  { stage: "Started Signup", value: 1320 },
  { stage: "Verified Email", value: 910 },
  { stage: "Activated Workspace", value: 540 },
  { stage: "Subscribed", value: 260 },
];

const PIE_DATA = [
  { type: "Organic", value: 42 },
  { type: "Paid", value: 26 },
  { type: "Referral", value: 18 },
  { type: "Direct", value: 14 },
];

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

const FUNNEL_COLORS = ["#0F172A", "#1D4ED8", "#2563EB", "#60A5FA", "#BFDBFE"];

const FUNNEL_CONFIG = {
  data: FUNNEL_DATA,
  xField: "stage",
  yField: "value",
  legend: false,
  label: {
    position: "right",
    formatter: (datum) => datum.value.toLocaleString(),
    style: {
      fill: "#475569",
      fontSize: 12,
    },
  },
  tooltip: {
    formatter: (datum) => ({
      name: datum.stage,
      value: datum.value.toLocaleString(),
    }),
  },
  style: {
    fill: (datum) => {
      const index = FUNNEL_DATA.findIndex((item) => item.stage === datum.stage);
      return FUNNEL_COLORS[index] ?? FUNNEL_COLORS[FUNNEL_COLORS.length - 1];
    },
  },
};

const PIE_CONFIG = {
  data: PIE_DATA,
  angleField: "value",
  colorField: "type",
  innerRadius: 0.64,
  legend: {
    position: "bottom",
    itemLabelFontSize: 12,
  },
  label: {
    text: "type",
    position: "outside",
    style: {
      fill: "#475569",
      fontSize: 12,
    },
  },
  tooltip: {
    formatter: (datum) => ({
      name: datum.type,
      value: `${datum.value}%`,
    }),
  },
  scale: {
    color: {
      range: ["#2563EB", "#0F172A", "#F59E0B", "#10B981"],
    },
  },
};

const BAR_CONFIG = {
  data: BAR_DATA,
  xField: "month",
  yField: "revenue",
  legend: false,
  axis: {
    x: {
      labelFontSize: 12,
      labelFill: "#64748B",
      line: false,
      tick: false,
    },
    y: {
      labelFontSize: 12,
      labelFill: "#64748B",
      gridLineStroke: "#E2E8F0",
      line: false,
    },
  },
  style: {
    radiusTopLeft: 8,
    radiusTopRight: 8,
    fill: "#2563EB",
    maxWidth: 42,
  },
  tooltip: {
    formatter: (datum) => ({
      name: "Revenue",
      value: `$${datum.revenue.toLocaleString()}`,
    }),
  },
};

const LINE_CONFIG = {
  data: LINE_DATA,
  xField: "week",
  yField: "users",
  legend: false,
  point: {
    shapeField: "circle",
    sizeField: 4,
    style: {
      fill: "#0F172A",
    },
  },
  style: {
    stroke: "#0F172A",
    lineWidth: 3,
  },
  axis: {
    x: {
      labelFontSize: 12,
      labelFill: "#64748B",
      line: false,
      tick: false,
    },
    y: {
      labelFontSize: 12,
      labelFill: "#64748B",
      gridLineStroke: "#E2E8F0",
      line: false,
    },
  },
  tooltip: {
    formatter: (datum) => ({
      name: "Active Users",
      value: datum.users,
    }),
  },
};

export default function AntDesignChartsPage() {
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
              <Funnel {...FUNNEL_CONFIG} />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[1].title}
            description={CHART_SECTIONS[1].description}
          >
            <ChartCard>
              <Pie {...PIE_CONFIG} />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[2].title}
            description={CHART_SECTIONS[2].description}
          >
            <ChartCard>
              <Column {...BAR_CONFIG} />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[3].title}
            description={CHART_SECTIONS[3].description}
          >
            <ChartCard>
              <Line {...LINE_CONFIG} />
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
              Ant Design Charts Demo
            </h1>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <MetaRow label="Package" value="@ant-design/charts" />
            <MetaRow
              label="Best for"
              value="Business dashboards, analytics screens, Ant Design based admin panels"
            />
            <MetaRow
              label="Trade-off"
              value="Config-driven API is powerful, but less React-composable than Recharts"
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
Ant Design Charts (@ant-design/charts) 


1. Chart components (<Bar>, <Line>, <Pie>, <Funnel>)
Antendesign-yude visualization ecosystem-inte mukalil undakkiya React-friendly components aanu ithu.
Oroo component-inum config object spread cheythu ({...CONFIG}) pass cheyyunnu — full chart
behavior (data, axis, style, tooltip) aa single object-il aanu.

  example :-   <Bar {...BAR_CONFIG} />
  BAR_CONFIG oru separate object aayi mukalil define cheythittund
  Spread operator vechu ella properties-um props aayi pass cheyyunnu


2. CONFIG object (xField / yField / colorField / angleField)
Chart type anusarich, data-yude eathu field um eathu axis/dimension-il map cheyyanam ennu specify
cheyyunna keys aanu ithu — data object-inte field names directly reference cheyyum.

  example :-   const BAR_CONFIG = {
    data: BAR_DATA,
    xField: "month",
    yField: "revenue",
    style: { radiusTopLeft: 8, fill: "#2563EB" },
  };
  xField/yField → Bar/Line charts-inu (category vs numeric value)
  angleField/colorField → Pie chart-inu (slice size vs slice color grouping)


3. tooltip.formatter
Tooltip-il kaanikkuna content custom aakkan use cheyyunna function — oru object return cheyyanam,
{ name, value } shape-il.

  example :-   tooltip: {
    formatter: (datum) => ({
      name: "Revenue",
      value: `$${datum.revenue.toLocaleString()}`,
    }),
  },
  datum → hover cheytha data point (BAR_DATA-yile oru single object)
  return cheyyunna { name, value } → tooltip-il "Revenue: $24,500" pole kaanikkum


4. axis config (axis.x, axis.y)
Axis-inte tick, line, label style ella onnum x/y ayi split cheythu define cheyyanam.

  example :-   axis: {
    x: { line: false, tick: false, labelFill: "#64748B" },
    y: { gridLineStroke: "#E2E8F0", line: false },
  },
  line: false / tick: false → axis-inte border line and tick marks hide cheyyunnu (clean look)
  gridLineStroke → y-axis-il horizontal grid line color

*/


 {/*  In This file Use cheythath  */}

/*
  Nammude AntDesignChartsPage.jsx file @ant-design/charts use cheythu undakkiyathanu.
  Ithu AntV ecosystem-inte mukalil undakkiya config-first API aanu — Chart.js/ECharts pole
  "oru object vechu ella describe cheyyuka" ennathanu pattern, pakshe component-um config-um
  spread cheythu combine cheyyunnu (`<Bar {...BAR_CONFIG} />`), full JSX prop-drilling alla.
  Ee file-il 4 chart types render cheyyunnu —
  Funnel Chart — <Funnel> — label.position: "right" vechu ella stage-inum peru valathu bhagath
        kaanikkunnu, style.fill function vechu oroo stage-inum vere color assign cheyyunnu
  Pie Chart — <Pie> — innerRadius: 0.64 vechu doughnut style, label.position: "outside" vechu
        labels slice-inu purath kaanikkunnu
  Bar Chart — <Bar> — style.radiusTopLeft/radiusTopRight vechu top rounded, maxWidth vechu
        bar width cap cheyyunnu
  Line Chart — <Line> — point.shapeField/sizeField vechu data points circle aayi kaanikkunnu,
               style.stroke/lineWidth vechu line color and thickness

  Oroo chart-inum CONFIG object (FUNNEL_CONFIG, PIE_CONFIG, BAR_CONFIG, LINE_CONFIG) separate
  aayi mukalil define cheythittund, component-il spread cheythu use cheyyunnu — ith Recharts-inte
  JSX-nested style-um Chart.js/ECharts-inte pure-object-style-um thammil oru middle-ground aanu.


    {/* packge  */              {/* size */}

    // @ant-design/charts          ~120kb 

    { /* customization */ }

    /*
    Customization business-dashboard use cases-inu well-suited aanu — clean defaults, Ant Design
    ecosystem-umayi visually consistent (Ant Design admin panels-il use cheyyumbol nannayi match
    aavum). Config object oru "flat-ish" shape-il aanu (xField/yField/style/axis/tooltip), so
    Chart.js/ECharts-ne apeksha kurach simple aayi thonnum aadyam. Trade-off — full JSX composition
    Recharts pole illa (children aayi <XAxis>, <Tooltip> vekkan pattilla, ella config object-il
    thanne venam), so highly custom/unusual chart layouts venenkil flexibility kuranju varum.
    Bundle size-um moderate aanu, Ant Design-yude G2 rendering engine internally bundle cheyyunnathu kondu.
    */