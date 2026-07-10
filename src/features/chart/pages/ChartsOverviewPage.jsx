import React from "react";
import { Link } from "react-router-dom";

const CHART_LIBRARIES = [
  {
    id: "recharts",
    label: "Recharts Demo",
    path: "/charts/recharts",
  },
  {
    id: "nivo",
    label: "Nivo Demo",
    path: "/charts/nivo",
  },
  {
    id: "apexcharts",
    label: "ApexCharts Demo",
    path: "/charts/apexcharts",
  },
  {
    id: "chartjs",
    label: "Chart.js Demo",
    path: "/charts/chartjs",
  },
  {
    id: "echarts",
    label: "ECharts Demo",
    path: "/charts/echarts",
  },
  {
    id: "ant-design-charts",
    label: "Ant Design Charts Demo",
    path: "/charts/ant-design-charts",
  },
];

export default function ChartsOverviewPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] p-8 text-slate-800">
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-lg font-semibold text-slate-900">
            Chart Library Comparison
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Evaluate multiple React charting libraries through reusable demo
            implementations for common business visualization patterns,
            including Funnel, Pie, Bar, and Line charts.
          </p>
        </header>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {CHART_LIBRARIES.map((library) => (
            <Link
              key={library.id}
              to={library.path}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              {library.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
════════════════════════════════════════════════════════════════
  CHART LIBRARY COMPARISON — OVERVIEW
════════════════════════════════════════════════════════════════

  ─────────────────────────────────────────────────────────────
  1. Chart.js (react-chartjs-2)
  ─────────────────────────────────────────────────────────────
  What      → Canvas-based, config-object API, oldest and most
              widely used charting library in the JS ecosystem.
  Good for  → Simple dashboards, standard chart types (bar, line,
              pie) — quick to set up, huge community/docs.
  Why/Why not → Funnel native aayi illa, plugin (chartjs-chart-funnel)
              venam. CSS directly canvas-il apply cheyyaan pattilla,
              options API vechu mathrame style cheyyam. Deeply custom
              interactions venenkil limitations varum.

  ─────────────────────────────────────────────────────────────
  2. Recharts
  ─────────────────────────────────────────────────────────────
  What      → SVG-based, fully component-driven (JSX composition,
              config object alla) — React-first feel aanu.
  Good for  → React devs-inu most natural aayi thonnunna API,
              readable JSX, native Funnel support.
  Why/Why not → SVG based aayathu kondu valare large datasets
              (thousands of points) performance kurayum. Exotic/
              deeply custom chart types-inu ECharts-ne apeksha
              flexibility kuranju varum.

  ─────────────────────────────────────────────────────────────
  3. ECharts (echarts-for-react)
  ─────────────────────────────────────────────────────────────
  What      → Canvas/SVG hybrid, single large config object API,
              Apache-backed, enterprise-grade, 20+ chart types.
  Good for  → Advanced dashboards, deep customization (animation,
              emphasis states, gradients), large datasets, maps/
              radar/sankey/heatmap pole exotic chart types venenkil.
  Why/Why not → Config valare verbose aanu (oru bar chart-inu polum
              50+ lines venam). Bundle size valuthanu (~450kb).
              Steeper learning curve, property naming chart-inu
              chart vyathyasam undu.

  ─────────────────────────────────────────────────────────────
  4. Nivo (@nivo/bar, @nivo/pie, @nivo/line, @nivo/funnel)
  ─────────────────────────────────────────────────────────────
  What      → SVG-based, component-driven pole Recharts, pakshe
              oroo chart type-um separate npm package aayi varum.
  Good for  → Out-of-the-box visual polish (motion, corner radius,
              shape blending) — Chart.js/Recharts-ne apekshichitt
              "designed" aayi thonnum. Full custom React tooltip
              (JSX) support.
  Why/Why not → Oroo chart-inum vere package venam (multiple charts
              use cheyyumbol bundle size add aavum). Tooltip callback
              shape oroo chart-inum vere aanu ({ point } vs { datum }
              vs { part } vs { id, value, indexValue }) — learning
              curve kuracha koodum.

  ─────────────────────────────────────────────────────────────
  5. ApexCharts (react-apexcharts)
  ─────────────────────────────────────────────────────────────
  What      → SVG-based, single universal <Chart> component,
              series + options split cheytha config API.
  Good for  → Dashboard/KPI-style charts, built-in zoom/pan,
              export toolbar, animations, gradients — polished
              out of the box.
  Why/Why not → Native Funnel chart type illa — horizontal bar
              chart-ne isFunnel: true flag vechu "hack" cheythaanu
              funnel undakkunnath, athu true funnel alla. Bundle
              size moderate-large aanu (~140kb).

  ─────────────────────────────────────────────────────────────
  6. Ant Design Charts (@ant-design/charts)
  ─────────────────────────────────────────────────────────────
  What      → AntV (G2) ecosystem-inte mukalil, config object
              spread cheythu component-il pass cheyyunna API —
              config-first, pakshe Chart.js/ECharts-ne apeksha
              flatter shape (xField/yField/style/axis/tooltip).
  Good for  → Ant Design based admin panels-umayi visually
              consistent aavan, business dashboards, native
              Funnel support.
  Why/Why not → Full JSX composition Recharts pole illa — children
              aayi <XAxis>, <Tooltip> vekkan pattilla, ella config
              oru single object-il thanne venam. Highly custom/
              unusual layouts venenkil flexibility kuranju varum.

*/
