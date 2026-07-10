import React from "react";
import { Link } from "react-router-dom";
import ReactECharts from "echarts-for-react";

const CHART_SECTIONS = [
  {
    id: "funnel",
    title: "Funnel Chart",
    description:
      "ECharts provides native Funnel chart support with strong control over label placement, sorting, tooltip formatting, and visual styling. It is a very capable option for conversion and pipeline visualizations.",
  },
  {
    id: "pie",
    title: "Pie Chart",
    description:
      "Pie charts in ECharts are highly configurable and work well for distribution views where the team may later need richer legend, label, or interaction behavior.",
  },
  {
    id: "bar",
    title: "Bar Chart",
    description:
      "Bar charts are one of ECharts’ core strengths. The API supports a wide range of dashboard and reporting use cases, from simple comparisons to more advanced business visualizations.",
  },
  {
    id: "line",
    title: "Line Chart",
    description:
      "Line charts in ECharts are flexible and production-friendly, especially when the team wants stronger control over area fills, tooltip behavior, and chart presentation.",
  },
];

const FUNNEL_DATA = [
  { value: 1800, name: "Visited Landing Page" },
  { value: 1320, name: "Started Signup" },
  { value: 910, name: "Verified Email" },
  { value: 540, name: "Activated Workspace" },
  { value: 260, name: "Subscribed" },
];

const PIE_DATA = [
  { value: 42, name: "Organic" },
  { value: 26, name: "Paid" },
  { value: 18, name: "Referral" },
  { value: 14, name: "Direct" },
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

const ECHART_COLORS = ["#0F172A", "#1D4ED8", "#2563EB", "#60A5FA", "#BFDBFE"];

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  borderColor: "#E2E8F0",
  borderWidth: 1,
  textStyle: {
    color: "#0F172A",
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
  },
};

const AXIS_NAME_TEXT_STYLE = {
  color: "#64748B",
  fontSize: 12,
  fontWeight: 500,
};

const AXIS_LABEL_STYLE = {
  color: "#64748B",
  fontSize: 12,
};

function getFunnelOption() {
  return {
    color: ECHART_COLORS,
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: "item",
      formatter: ({ name, value }) =>
        `${name}<br/>Users: ${value.toLocaleString()}`,
    },
    series: [
      {
        name: "Conversion Funnel",
        type: "funnel",
        left: "10%",
        top: 20,
        bottom: 20,
        width: "80%",
        min: 0,
        max: 1800,
        minSize: "30%",
        maxSize: "100%",
        sort: "descending",
        gap: 4,
        label: {
          show: true,
          position: "inside",
          color: "#FFFFFF",
          fontSize: 12,
          fontWeight: 600,
          formatter: "{b}",
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderRadius: 4,
          borderColor: "#FFFFFF",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            fontSize: 12,
          },
        },
        data: FUNNEL_DATA,
      },
    ],
  };
}

function getPieOption() {
  return {
    color: ["#2563EB", "#0F172A", "#F59E0B", "#10B981"],
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: "item",
      formatter: ({ name, value, percent }) =>
        `${name}<br/>Share: ${value}% (${percent}%)`,
    },
    legend: {
      bottom: 0,
      icon: "circle",
      textStyle: {
        color: "#475569",
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Traffic Sources",
        type: "pie",
        radius: ["45%", "72%"],
        center: ["50%", "46%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: "#FFFFFF",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          scale: true,
          scaleSize: 6,
        },
        data: PIE_DATA,
      },
    ],
  };
}

function getBarOption() {
  return {
    color: ["#2563EB"],
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter(params) {
        const item = params[0];
        return `${item.axisValue}<br/>Revenue: $${item.value.toLocaleString()}`;
      },
    },
    grid: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: BAR_DATA.map((item) => item.month),
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: AXIS_LABEL_STYLE,
      nameTextStyle: AXIS_NAME_TEXT_STYLE,
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        ...AXIS_LABEL_STYLE,
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
      splitLine: {
        lineStyle: {
          color: "#E2E8F0",
        },
      },
      nameTextStyle: AXIS_NAME_TEXT_STYLE,
    },
    series: [
      {
        name: "Revenue",
        type: "bar",
        barWidth: 42,
        data: BAR_DATA.map((item) => item.revenue),
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
        },
      },
    ],
  };
}

function getLineOption() {
  return {
    color: ["#0F172A"],
    tooltip: {
      ...TOOLTIP_STYLE,
      trigger: "axis",
      formatter(params) {
        const item = params[0];
        return `${item.axisValue}<br/>Active Users: ${item.value}`;
      },
    },
    grid: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: LINE_DATA.map((item) => item.week),
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: AXIS_LABEL_STYLE,
      nameTextStyle: AXIS_NAME_TEXT_STYLE,
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: AXIS_LABEL_STYLE,
      splitLine: {
        lineStyle: {
          color: "#E2E8F0",
        },
      },
      nameTextStyle: AXIS_NAME_TEXT_STYLE,
    },
    series: [
      {
        name: "Active Users",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: "rgba(15, 23, 42, 0.08)",
        },
        data: LINE_DATA.map((item) => item.users),
      },
    ],
  };
}

export default function EChartsPage() {
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
              <ReactECharts
                option={getFunnelOption()}
                style={{ height: "100%", width: "100%" }}
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[1].title}
            description={CHART_SECTIONS[1].description}
          >
            <ChartCard>
              <ReactECharts
                option={getPieOption()}
                style={{ height: "100%", width: "100%" }}
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[2].title}
            description={CHART_SECTIONS[2].description}
          >
            <ChartCard>
              <ReactECharts
                option={getBarOption()}
                style={{ height: "100%", width: "100%" }}
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[3].title}
            description={CHART_SECTIONS[3].description}
          >
            <ChartCard>
              <ReactECharts
                option={getLineOption()}
                style={{ height: "100%", width: "100%" }}
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
              ECharts Demo
            </h1>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <MetaRow label="Package" value="echarts + echarts-for-react" />
            <MetaRow
              label="Best for"
              value="Advanced dashboards, rich customization, broad chart support"
            />
            <MetaRow
              label="Trade-off"
              value="Configuration is more verbose than Recharts"
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
ECharts (via echarts-for-react) —


1. ReactECharts component
echarts-for-react ithinte main export aanu — Apache ECharts (canvas/SVG based, framework-agnostic
library) ne React component aayi wrap cheyyunnu. option prop-il full chart config pass cheyyum.

  example :-   <ReactECharts
    option={getBarOption()}
    style={{ height: "100%", width: "100%" }}
  />
  option → single large config object, chart-inte type, data, styling, tooltip ellam ithil aanu
  style → container size explicit aayi kodukkanam, illenkil chart render aavilla


2. option object structure (getBarOption(), getLineOption() etc.)
ECharts-il chart config-inu vendi ella settings-um oru single nested object aayi return cheyyunnu.
Ee file-il oroo chart-inum separate function undu (getFunnelOption, getPieOption, getBarOption,
getLineOption), athu call cheythu option prop-il pass cheyyunnu.

  example :-   function getBarOption() {
    return {
      color: ["#2563EB"],
      tooltip: { ... },
      xAxis: { ... },
      yAxis: { ... },
      series: [{ type: "bar", data: [...] }],
    };
  }
  color → chart-inte default color palette
  series → actual chart data + chart type ("bar", "line", "pie", "funnel") define cheyyunnath
  xAxis / yAxis → axis config, bar/line charts-inu mathram venam (pie/funnel-inu venda)


3. series.tooltip.formatter
Tooltip-il kaanikkuna content custom aayi build cheyyaan use cheyyunna function — HTML string
return cheyyam, so bold/line-break ellam directly control cheyyam.

example :-   formatter(params) {
    const item = params[0];
    return `${item.axisValue}<br/>Revenue: $${item.value.toLocaleString()}`;
    },
    params → hover cheyyumbol aa point-inte data (axisValue, value, name etc.)
    <br/> → HTML string aayathu kondu direct line break support cheyyunnu


4. axis / grid config (xAxis, yAxis, grid)
Chart-inte layout, spacing, tick styling ellam explicit aayi define cheyyanam — Chart.js/Recharts-ne
apeksha kooduthal verbose aanu, pakshe kooduthal fine-grained control kittum.

example :-   grid: {
    left: 20, right: 20, top: 20, bottom: 20,
    containLabel: true,
    },
    containLabel: true → axis labels grid-inte outside pokathe, container-inte ullil thanne fit aavum
    splitLine → y-axis-il horizontal grid lines kaanikkano ennu, color ellam control cheyyam

*/


 {/*  In This file Use cheythath  */}

/*
    Nammude EChartsPage.jsx file echarts + echarts-for-react use cheythu undakkiyathanu.
    Ithu ECharts-inte config-object-based API aanu — Chart.js pole tanne "oru valiya JSON object
    vechu ella behavior-um describe cheyyuka" ennathanu pattern, pakshe Chart.js-ne kaal kooduthal
    granular options undu (label formatting, animation, emphasis states, per-series styling).
    Ee file-il 4 chart types render cheyyunnu —
    Funnel Chart — getFunnelOption() — sort: "descending" vechu top-to-bottom size decrease aavunnu,
        label position: "inside" vechu ella segment-inum peru ullil thanne kaanikkunnu
    Pie Chart — getPieOption() — radius: ["45%", "72%"] koduthu doughnut style, emphasis.scale
        vechu hover cheyyumbol slice valuthu kaanikkunnu
    Bar Chart — getBarOption() — barWidth: 42, itemStyle.borderRadius: [8,8,0,0] vechu top rounded
    Line Chart — getLineOption() — smooth: true vechu curved line, areaStyle vechu below area fill

    TOOLTIP_STYLE, AXIS_LABEL_STYLE, AXIS_NAME_TEXT_STYLE pole shared style objects mukalil define
    cheythu, oroo option function-inum spread (...TOOLTIP_STYLE) vechu reuse cheyyunnu — 4 charts-ilum
    design consistency maintain cheyyaan.


    /* packge  */       {/* size */}

    // echarts                     ~450kb
    // echarts-for-react            ~3kb

    { /* customization */ }

    /*
    Customization-il ellaathilum kooduthal deep aanu — animation timing, emphasis/hover states,
    label formatting, gradient fills, complex tooltips, 20+ chart types (map, radar, sankey,
    heatmap etc.) ellam native support undu. Enterprise-grade dashboards-inu ith strongest
    option aanu. Trade-off — config verbose aanu (oru single bar chart-inu polum 50+ lines
    venam), bundle size valuthanu (450kb+, though tree-shaking vechu need illaatha parts
    ozhivakkam), and API Chart.js/Recharts-ne apeksha steeper learning curve aanu, since
    ella chart-inum properties-inte peru vere aayirikkum (e.g. barWidth vs maxBarThickness).
    */