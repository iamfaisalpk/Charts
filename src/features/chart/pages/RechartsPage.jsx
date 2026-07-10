import React from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_SECTIONS = [
  {
    id: "funnel",
    title: "Funnel Chart",
    description:
      "Recharts provides native Funnel chart support, which makes it a strong fit for product conversion, onboarding, and sales pipeline visualizations without relying on extra plugins.",
  },
  {
    id: "pie",
    title: "Pie Chart",
    description:
      "Pie charts are simple to configure in Recharts and work well for category distribution views, especially when you want lightweight customization with a React-first API.",
  },
  {
    id: "bar",
    title: "Bar Chart",
    description:
      "Bar charts are one of Recharts’ most practical chart types for internal dashboards. The API is readable, component-driven, and easy to theme.",
  },
  {
    id: "line",
    title: "Line Chart",
    description:
      "Line charts in Recharts are clean and flexible for trend visualization. The component-based API keeps configuration readable without becoming too verbose.",
  },
];

const FUNNEL_DATA = [
  { name: "Visited Landing Page", value: 1800, fill: "#0F172A" },
  { name: "Started Signup", value: 1320, fill: "#1D4ED8" },
  { name: "Verified Email", value: 910, fill: "#2563EB" },
  { name: "Activated Workspace", value: 540, fill: "#60A5FA" },
  { name: "Subscribed", value: 260, fill: "#BFDBFE" },
];

const PIE_DATA = [
  { name: "Organic", value: 42, color: "#2563EB" },
  { name: "Paid", value: 26, color: "#0F172A" },
  { name: "Referral", value: 18, color: "#F59E0B" },
  { name: "Direct", value: 14, color: "#10B981" },
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

const TOOLTIP_STYLE = {
  contentStyle: {
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    backgroundColor: "#FFFFFF",
  },
  labelStyle: {
    color: "#0F172A",
    fontWeight: 600,
  },
  itemStyle: {
    color: "#334155",
  },
};

export default function RechartsPage() {
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
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    {...TOOLTIP_STYLE}
                    formatter={(value) => [value.toLocaleString(), "Users"]}
                  />
                  <Funnel
                    dataKey="value"
                    data={FUNNEL_DATA}
                    isAnimationActive
                  >
                    {FUNNEL_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Funnel>
                  <Legend />
                </FunnelChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[1].title}
            description={CHART_SECTIONS[1].description}
          >
            <ChartCard>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    {...TOOLTIP_STYLE}
                    formatter={(value) => [`${value}%`, "Share"]}
                  />
                  <Legend />
                  <Pie
                    data={PIE_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={3}
                  >
                    {PIE_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[2].title}
            description={CHART_SECTIONS[2].description}
          >
            <ChartCard>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BAR_DATA} barCategoryGap={24}>
                  <CartesianGrid stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    {...TOOLTIP_STYLE}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#2563EB"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={42}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartSection>

          <ChartSection
            title={CHART_SECTIONS[3].title}
            description={CHART_SECTIONS[3].description}
          >
            <ChartCard>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LINE_DATA}>
                  <CartesianGrid stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip
                    {...TOOLTIP_STYLE}
                    formatter={(value) => [value, "Active Users"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#0F172A"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#0F172A" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
              Recharts Demo
            </h1>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            <MetaRow label="Package" value="recharts" />
            <MetaRow
              label="Best for"
              value="React dashboards, common business charts"
            />
            <MetaRow
              label="Trade-off"
              value="Advanced charting breadth is lower than ECharts"
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
Recharts 


1. ResponsiveContainer
Parent element-inte width/height nokki chart-ne auto-resize cheyyunna wrapper aanu ithu.
Recharts-inte ellaa chart-um ithinte ullil venam, allenkil fixed size illatha container-il chart render aavilla.

  example :-   <ResponsiveContainer width="100%" height="100%">
    <BarChart data={BAR_DATA}>...</BarChart>
  </ResponsiveContainer>
  width="100%" / height="100%" → parent (ChartCard-inte h-[360px]) fill cheyyum
  Window resize aavumbol chart automatic aayi adjust aavum


2. Chart components (<BarChart>, <LineChart>, <PieChart>, <FunnelChart>)
Ith oroo chart type-inteyum root container aanu — data prop ithil pass cheyyum (Pie/Funnel-il child-il pass cheyyum).
Ithinte ullil axis, grid, tooltip, legend, actual chart element (<Bar>, <Line>, <Pie>, <Funnel>) ellam children aayi vekkanam.

  example :-   <BarChart data={BAR_DATA} barCategoryGap={24}>
    <CartesianGrid stroke="#E2E8F0" vertical={false} />
    <XAxis dataKey="month" ... />
    <YAxis ... />
    <Tooltip ... />
    <Bar dataKey="revenue" fill="#2563EB" radius={[8, 8, 0, 0]} />
  </BarChart>
  data → array of objects (recharts-inu ith JSON pole direct aayi manasilaakum)
  dataKey → aa object-il ninnu ee chart element ethu field plot cheyyanam ennu specify cheyyunnu


3. Cell (per-datapoint coloring)
Oru single Pie/Funnel-inu ullil ellaa slice/segment-inum vere vere color kodukkan use cheyyunnu.
Normal aayi oru chart element-inu oru fill color mathrame kodukkaan pattoo, pakshe Cell vechu per-item override cheyyam.

  example :-   <Pie data={PIE_DATA} dataKey="value" nameKey="name">
    {PIE_DATA.map((entry) => (
      <Cell key={entry.name} fill={entry.color} />
    ))}
  </Pie>
  PIE_DATA-yude oroo item-num already oru color field undu (ee file-il data structure-il thanne)
  Cell map cheythu aa color ovvonninum apply cheyyunnu


4. Tooltip formatter
Tooltip-il kaanikkuna value/label custom aayi format cheyyaan use cheyyunna function.

  example :-   <Tooltip
    formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
  />
  Return cheyyunnath oru array aanu — [formatted_value, label]
  Ith vechu "$24,500" pole custom text kaanikkam, "Revenue" ennu label-um kaanikkam

*/


 {/*  In This file Use cheythath  */}

/*
    Nammude RechartsPage.jsx file recharts library use cheythu undakkiyathanu.
    Ithu fully component-driven, JSX-first charting library aanu — Chart.js pole config object
    alla, pakshe React components tanne (<Bar>, <XAxis>, <Tooltip> etc) compose cheythaanu chart undakkunnath.
    Ee file-il 4 chart types render cheyyunnu —
    Funnel Chart — <FunnelChart> + <Funnel> — Recharts-il native support undu, extra plugin venda
        conversion steps kaanikkunnu (Visit → Signup → Verify → Activate → Subscribe)
    Pie Chart — <PieChart> + <Pie> — innerRadius={70} koduthu doughnut style aakkiyathu
        traffic source distribution kaanikkunnu
  Bar Chart — <BarChart> + <Bar> — monthly revenue trend, radius={[8,8,0,0]} vechu top rounded
  Line Chart — <LineChart> + <Line> — weekly active users trend, type="monotone" vechu smooth curve

  Ellaa chart-inum common aayi TOOLTIP_STYLE object use cheyyunnu (spread cheythu {...TOOLTIP_STYLE}),
  athu kondu design consistency ellaa 4 charts-ilum maintain aavunnu — repeat cheyyenda avashyam illa.


    /* packge  */                 {/* size */}

    // recharts                    ~95kb 

    { /* customization */ }

    /*
    Customization React-first aanu — CSS-in-JS style props (tick={{ fill, fontSize }}) vechu
    directly style cheyyam, config object memorize cheyyenda avashyam illa, JSX thanne
    documentation pole vaayikkam. Funnel chart pole chart types-inu native support undu,
    Chart.js-il pole vere plugin venda. Pakshe deeply custom/exotic chart types
    (radar-il complex overlays, custom canvas rendering) venenkil Ee Charts-ne apeksha kurach
    flexibility kuranju varum, since recharts SVG-based aanu, canvas alla — valare
    large datasets-il (thousands of points) performance kurayum.
    */