'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';

interface ApiMenuItem {
    itemName: string;
    images: string[];
    price: number;
    cuisineStyle: string;
    orders: number;
    chefName: string;
}

interface ApiResponse {
    mostOrderedDishes?: ApiMenuItem[];
}

const SalesSummary: React.FC = () => {
    const [data, setData] = useState<ApiResponse>({});
    const [loading, setLoading] = useState(true);

    const getSalesData = async () => {
        try {
            setLoading(true);
            const token = getCookie('token');
            const response = await axios.get(
                `${BASE_API_URL}/admin/get-menu-insights`,
                { headers: { Authorization: `Bearer ${token}` } },
            );
            setData(response.data);
            console.log(
                '===Sales Summary response.data===>',
                JSON.stringify(response.data, null, 1),
            );
        } catch (error) {
            console.log('ERROR', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSalesData();
    }, []);

    // Calculate sales metrics from API data
    const totalOrders = data?.mostOrderedDishes?.reduce((sum, item) => sum + item.orders, 0) || 0;
    const totalRevenue = data?.mostOrderedDishes?.reduce((sum, item) => sum + (item.price * item.orders), 0) || 0;
    
    // Calculate percentages for the chart
    const menuSoldPercentage = totalOrders > 0 ? Math.min(100, Math.round((totalOrders / 1000) * 100)) : 0; // Assuming 1000 is max
    const safePercentage = Math.round(totalRevenue * 0.2 / 1000); // 20% of revenue
    const midPercentage = Math.round(totalRevenue * 0.5 / 1000); // 50% of revenue

    const chartData = [
        { name: "Safe", value: safePercentage, fill: "#FACC15" },
        { name: "Mid", value: midPercentage, fill: "#FDBA74" },
        { name: "Menu Sold", value: menuSoldPercentage, fill: "#EF4444" }
    ];

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow w-full">
                <div className="w-full mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Sales Summary</h2>
                            <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                    </div>
                </div>
                <div className="w-full pl-4 flex gap-6">
                    <div className="w-2/5">
                        <div className="w-full h-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-2 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                <div>
                                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse mb-1"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow w-full">
            <div className="w-full mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Sales Summary</h2>
                        <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                </div>
            </div>

            <div className="w-full pl-4 flex gap-6">
                <div className="w-2/5">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadialBarChart
                            innerRadius="50%"
                            outerRadius="250%"
                            data={chartData}
                            startAngle={180}
                            endAngle={-180}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            {chartData.map((entry, index) => (
                                <RadialBar
                                    key={index}
                                    dataKey="value"
                                    background
                                    cornerRadius={40}
                                    data={[entry]}
                                />
                            ))}
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 rounded-full bg-red-500" />
                        <div>
                            <div className="text-lg font-bold text-black">{totalOrders.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Menu Sold</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 rounded-full bg-yellow-400" />
                        <div>
                            <div className="text-lg font-bold text-black">PKR {(totalRevenue * 0.2).toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Safe (20%)</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 rounded-full bg-yellow-300" />
                        <div>
                            <div className="text-lg font-bold text-black">PKR {(totalRevenue * 0.5).toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Mid (50%)</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 rounded-full bg-gray-400" />
                        <div>
                            <div className="text-lg font-bold text-black">PKR {totalRevenue.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Total Revenue</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesSummary;
