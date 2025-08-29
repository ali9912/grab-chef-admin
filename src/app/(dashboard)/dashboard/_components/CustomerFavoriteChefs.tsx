'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import DownArrowButton from "./DownArrowButton";
import { useState } from "react";

interface FavoriteChef {
  chefId: string;
  chefName: string;
  chefProfilePicture: string;
  orderCount: number;
  percentage: number;
}

interface CustomerFavoriteChefsProps {
  customerFavoriteChefs: FavoriteChef[];
}

const CustomerFavoriteChefs = ({ customerFavoriteChefs }: CustomerFavoriteChefsProps) => {

  // Prepare data for donut chart
  const chartData = customerFavoriteChefs.map((chef: FavoriteChef, index: number) => ({
    name: chef.chefName,
    value: chef.percentage,
    color: index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#ef4444',
  }));

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const [showAllChefs, setShowAllChefs] = useState(false);

  if (customerFavoriteChefs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer's Favourite Chef</CardTitle>
          <CardDescription>No favorite chefs data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-gray-500">
            No data to display
          </div>
        </CardContent>
      </Card>
    );
  }

  const customerFavoriteChefsToDisplay = showAllChefs ? customerFavoriteChefs : customerFavoriteChefs.slice(0, 3);

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-bold">Customer's Favourite Chefs</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Donut Chart */}
        <div className="flex justify-center">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}%`, 
                  props.payload.name
                ]}
                labelStyle={{ color: '#666' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chef List with Progress Bars */}
        <div className="space-y-4">
            {customerFavoriteChefsToDisplay.map((chef: FavoriteChef, index: number) => (
            <div key={chef.chefId} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {chef.chefName} ({chef.percentage}%)
                </span>
                <span className="text-sm text-gray-600">{chef.orderCount}</span>
              </div>
              <Progress 
                value={chef.percentage} 
                className="h-2 rounded-full"
                style={{
                  '--progress-color': COLORS[index % COLORS.length]
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <DownArrowButton onClick={() => setShowAllChefs(!showAllChefs)} active={showAllChefs} />
    </Card>
  );
};

export default CustomerFavoriteChefs;
