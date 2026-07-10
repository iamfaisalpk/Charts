import React from "react";
import { Link } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveFunnel } from "@nivo/funnel";

const CHART_SECTIONS = [
  {
    id: "funnel",
    title: "Funnel Chart",
    description:
      "Nivo provides native Funnel support through its dedicated funnel package, making it a good fit for product conversion, onboarding, and sales pipeline visualizations in React applications.",
  },
  {
    id: "pie",
    title: "Pie Chart",
    description:
      "Pie charts in Nivo are visually polished out of the box and offer good control over legends, labels, colors, and interactivity for dashboard use cases.",
  },
  {
    id: "bar",
    title: "Bar Chart",
    description:
      "Bar charts are one of Nivo’s strongest chart types for internal dashboards. The library provides a strong balance between attractive defaults and configurable presentation.",
  },
  {
    id: "line",
    title: "Line Chart",
    description:
      "Line charts in Nivo are flexible and expressive, with good support for smooth curves, point styling, grid control, legends, and tooltip interactions.",
  },
];

const FUNNEL_DATA = [
  { id: "Visited Landing Page", value: 1800, label: "Visited Landing Page" },
  { id: "Started Signup", value: 1320, label: "Started Signup" },
  { id: "Verified Email", value: 910, label: "Verified Email" },
  { id: "Activated Workspace", value: 540, label: "Activated Workspace" },
  { id: "Subscribed", value: 260, label: "Subscribed" },
];

const PIE_DATA = [
  { id: "Organic", label: "Organic", value: 42 },
  { id: "Paid", label: "Paid", value: 26 },
  { id: "Referral", label: "Referral", value: 18 },
  { id: "Direct", label: "Direct", value: 14 },
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
  {
    id: "Active Users",
    data: [
      { x: "Week 1", y: 320 },
      { x: "Week 2", y: 410 },
      { x: "Week 3", y: 390 },
      { x: "Week 4", y: 520 },
      { x: "Week 5", y: 610 },
      { x: "Week 6", y: 680 },
    ],
  },
];

const CHART_THEME = {
  axis: {
    domain: {
      line: {
        stroke: "#CBD5E1",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "#CBD5E1",
        strokeWidth: 1,
      },
      text: {
        fill: "#64748B",
        fontSize: 12,
      },
    },
    legend: {
      text: {
        fill: "#475569",
        fontSize: 12,
        fontWeight: 600,
      },
    },
  },
  grid: {
    line: {
      stroke: "#E2E8F0",
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fill: "#475569",
      fontSize: 12,
    },
  },
  labels: {
    text: {
      fill: "#0F172A",
      fontSize: 12,
      fontWeight: 600,
    },
  },
  tooltip: {
    container: {
      background: "#FFFFFF",
      color: "#0F172A",
      fontSize: 12,
      borderRadius: 12,
      border: "1px solid #E2E8F0",
      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
      padding: "10px 12px",
    },
  },
};

const COLOR_PALETTE = ["#0F172A", "#1D4ED8", "#2563EB", "#60A5FA", "#BFDBFE"];
const PIE_COLORS = ["#2563EB", "#0F172A", "#F59E0B", "#10B981"];

export default function NivoPage() {
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
              <ResponsiveFunnel
                data={FUNNEL_DATA}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                valueFormat=">-.0f"
                colors={COLOR_PALETTE}
                borderWidth={0}
                beforeSeparatorLength={80}
                beforeSeparatorOffset={16}
                afterSeparatorLength={80}
                afterSeparatorOffset={16}
                currentPartSizeExtension={10}
                currentBorderWidth={0}
                motionConfig="gentle"
                shapeBlending={0.75}
                theme={CHART_THEME}
                labelColor="#FFFFFF"
                tooltip={({ part }) => (
                  <CustomTooltip
                    label={part.data.label}
                    value={`Users: ${Number(part.data.value).toLocaleString()}`}
                  />
                )}
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[1].title}
            description={CHART_SECTIONS[1].description}
          >
            <ChartCard>
              <ResponsivePie
                data={PIE_DATA}
                margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                innerRadius={0.62}
                padAngle={2}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                colors={PIE_COLORS}
                borderWidth={2}
                borderColor="#FFFFFF"
                enableArcLabels={false}
                theme={CHART_THEME}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateY: 48,
                    itemsSpacing: 12,
                    itemWidth: 90,
                    itemHeight: 18,
                    itemTextColor: "#475569",
                    itemDirection: "left-to-right",
                    symbolSize: 12,
                    symbolShape: "circle",
                  },
                ]}
                tooltip={({ datum }) => (
                  <CustomTooltip
                    label={datum.label}
                    value={`Share: ${datum.value}%`}
                  />
                )}
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[2].title}
            description={CHART_SECTIONS[2].description}
          >
            <ChartCard>
              <ResponsiveBar
                data={BAR_DATA}
                keys={["revenue"]}
                indexBy="month"
                margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
                padding={0.35}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors="#2563EB"
                borderRadius={8}
                theme={CHART_THEME}
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 12,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 12,
                  tickRotation: 0,
                  format: (value) => `$${Math.round(value / 1000)}k`,
                }}
                gridYValues={5}
                tooltip={({ id, value, indexValue }) => (
                  <CustomTooltip
                    label={`${indexValue}`}
                    value={`${id === "revenue" ? "Revenue" : id}: $${Number(
                      value,
                    ).toLocaleString()}`}
                  />
                )}
                role="application"
                ariaLabel="Revenue bar chart"
              />
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[3].title}
            description={CHART_SECTIONS[3].description}
          >
            <ChartCard>
              <ResponsiveLine
                data={LINE_DATA}
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: 0,
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                curve="monotoneX"
                enableGridX={false}
                colors={["#0F172A"]}
                lineWidth={3}
                pointSize={8}
                pointColor="#0F172A"
                pointBorderWidth={0}
                enableArea
                areaOpacity={0.08}
                useMesh
                theme={CHART_THEME}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 12,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 12,
                  tickRotation: 0,
                }}
                tooltip={({ point }) => (
                  <CustomTooltip
                    label={point.data.xFormatted}
                    value={`Active Users: ${point.data.yFormatted}`}
                  />
                )}
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
            <h1 className="text-xl font-semibold text-slate-900">Nivo Demo</h1>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <MetaRow
              label="Package"
              value="@nivo/bar + @nivo/pie + @nivo/line + @nivo/funnel"
            />
            <MetaRow
              label="Best for"
              value="React dashboards, polished visual defaults, business analytics UI"
            />
            <MetaRow
              label="Trade-off"
              value="Multiple packages and a larger API surface than Recharts"
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

function CustomTooltip({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-xs text-slate-600">{value}</p>
    </div>
  );
}


{/*  implementation plan this file  */}

/*
Nivo (@nivo/bar, @nivo/pie, @nivo/line, @nivo/funnel) —


1. Responsive* components (ResponsiveBar, ResponsivePie, ResponsiveLine, ResponsiveFunnel)
Nivo-il oroo chart type-inum separate npm package aanu, oroo package-inum "Responsive" prefix
ulla component undu — ith parent container-inte size auto-detect cheythu chart-ne fit cheyyum.
Recharts-inte ResponsiveContainer pole thanne, pakshe wrapper vere venda, component tanne responsive aanu.

  example :-   <ResponsiveBar
    data={BAR_DATA}
    keys={["revenue"]}
    indexBy="month"
    margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
  />
  data → array of objects
  keys → data object-il ninnu ethu field(s) bar aayi plot cheyyanam
  indexBy → x-axis-il ethu field label aayi kaanikkanam
  margin → chart-inu chuttum space, axis labels cut aavathirikkan importent aanu


2. theme prop (CHART_THEME)
Nivo-il colors/fonts ella chart-inum onnayi apply cheyyan oru centralized theme object undakkam,
athu ella Responsive component-inum theme prop aayi pass cheyyum — Chart.js/ECharts-il pole
oroo option-um separate aayi repeat cheyyenda avashyam illa.

  example :-   <ResponsiveBar theme={CHART_THEME} ... />
  <ResponsiveLine theme={CHART_THEME} ... />
  CHART_THEME.axis/grid/legends/tooltip → oru single object-il ella chart-inteyum
  visual consistency (colors, font size, border) define cheyyunnu


3. tooltip prop (custom render function)
Nivo-il tooltip default HTML string alla — nammal thanne oru React component render cheyyunna
function pass cheyyum, so full custom JSX (icons, multiple lines, custom styling) use cheyyam.

  example :-   tooltip={({ point }) => (
    <CustomTooltip
      label={point.data.xFormatted}
      value={`Active Users: ${point.data.yFormatted}`}
    />
  )}
  point/datum/part → chart type anusarich hover cheytha item-inte data (naming vyathyasam undu
  oronnilum — Line-il point, Pie-il datum, Funnel-il part, Bar-il { id, value, indexValue })
  CustomTooltip → ee file-inte bottom-il define cheythu reusable component, ellaa chart-ilum reuse cheyyunnu


4. Scale / axis config (xScale, yScale, axisBottom, axisLeft)
Line/Bar charts-il data ethu scale type-il plot cheyyanam ennu explicit aayi specify cheyyanam,
axis-inte tick style separate aayi define cheyyanam.

  example :-   xScale={{ type: "point" }}
  yScale={{ type: "linear", min: 0, max: "auto" }}
  axisLeft={{ tickSize: 0, tickPadding: 12, format: (value) => `$${value/1000}k` }}
  tickSize: 0 → tick mark-inte chെrukka line hide cheyyunnu (clean look-inu)
  format → axis label custom text-il format cheyyunnu

*/


 {/*  In This file Use cheythath  */}

/*
  Nammude NivoPage.jsx file @nivo/bar, @nivo/pie, @nivo/line, @nivo/funnel use cheythu undakkiyathanu.
  Recharts pole component-driven aanu, pakshe oroo chart type-um oru vere npm package aayittanu
  varunnath — bundle-il need ulla chart matram add cheyyam ennathanu idea (tree-shaking friendly).
  Ee file-il 4 chart types render cheyyunnu —
  Funnel Chart — <ResponsiveFunnel> — beforeSeparatorLength/afterSeparatorLength vechu segments
        thammil oru cheriya gap/separator kaanikkunnu, currentPartSizeExtension vechu
        hover cheyyumbol aa segment slightly valuthu kaanikkunnu
  Pie Chart — <ResponsivePie> — innerRadius={0.62} vechu doughnut style, padAngle vechu slices
              thammil chെriya gap, cornerRadius vechu edges rounded aakkunnu
  Bar Chart — <ResponsiveBar> — borderRadius={8} vechu bars top rounded, enableLabel={false}
              vechu bar-inte mukalil number kaanikkathe clean aakkunnu
  Line Chart — <ResponsiveLine> — curve="monotoneX" vechu smooth curve, enableArea + areaOpacity
        vechu below area fill, useMesh vechu hover detection accurate aakkunnu (invisible
        mesh layer vechu closest point detect cheyyunnu)

  CustomTooltip ennoru cheriya reusable component define cheythittund (file-inte bottom-il),
  ella 4 charts-ilum tooltip prop-il ith call cheythu consistent tooltip design maintain cheyyunnu.


    /* packge  */      {/* size */}

    // @nivo/bar                   ~35kb
    // @nivo/pie                   ~30kb
    // @nivo/line                  ~40kb
    // @nivo/funnel                ~15kb

    { /* customization */ }

    /*
    Customization visual polish-il strong aanu — out-of-the-box aesthetics Chart.js/Recharts-ne
    apeksha kooduthal "designed" aayi tonnum (motionConfig animations, corner radius, shape
    blending pole details). tooltip full custom React component aayathu kondu JSX-il full
    control kittum, plain string-alla. Trade-off — oroo chart type-inum vere package venam
    (4 chart-inu 4 imports), so multiple chart types use cheyyumbol bundle size add aavum.
    Also API-il naming consistency kuranjundu — Bar-il tooltip callback { id, value, indexValue }
    aanu, Line-il { point }, Pie-il { datum}, Funnel-il { part } aanu.
    */