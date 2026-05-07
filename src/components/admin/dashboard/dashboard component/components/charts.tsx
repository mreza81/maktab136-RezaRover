"use client";

import ReactECharts from "echarts-for-react";

export default function ChartsBox({ type }: { type: "line" | "pie" }) {
	const lineOption = {
		title: { text: "فروش ماهانه", left: "center" },
		tooltip: { trigger: "axis" },
		xAxis: {
			type: "category",
			data: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
		},
		yAxis: { type: "value" },
		series: [
			{
				type: "line",
				data: [120, 200, 150, 80, 70, 110],
				smooth: true,
				areaStyle: { color: "rgba(84,112,198,0.2)" },
			},
		],
	};

	const pieOption = {
		title: { text: "سهم محصولات", left: "center" },
		legend: { bottom: "0%", left: "center" },
		series: [
			{
				type: "pie",
				radius: "55%",
				data: [
					{ value: 40, name: "محصول A" },
					{ value: 25, name: "محصول B" },
					{ value: 20, name: "محصول C" },
					{ value: 15, name: "محصول D" },
				],
			},
		],
	};

	const option = type === "line" ? lineOption : pieOption;

	return (
		<div className="w-full h-full">
			<ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
		</div>
	);
}
