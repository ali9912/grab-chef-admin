import { getData } from "@/api/api";
import { urls } from "@/api/urls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MostOrderedDishes = () => {
  
  const [dishesData, setDishesData] = useState({
    mostOrderedDishes: [],
    mostPopularCuisines: []
  });

  const getMenuInsight = async () => {
    try {
      const data = await getData(urls.dashboard.getMenuInsight)
      console.log(data,'---menu insight')
      setDishesData(data)
    } catch (error:any) {
      console.log(error)
        toast(error?.message);
    }
  }

  useEffect(() => {
    getMenuInsight()
  }, []);

  const totalOrders = dishesData?.mostOrderedDishes?.reduce((acc:any, curr:any) => acc + curr.orders, 0)

  const tags = dishesData?.mostPopularCuisines
    ?.filter((item:any) => item.cuisine && item.orders > 0)

  const topTags = tags.slice(0,5)
  const otherTags = tags.slice(5)

  if (tags.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Most Ordered Dishes</CardTitle>
        <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {topTags.map((dish:any) => (
          <div key={dish?.itemName || 'NA'} className="space-y-2">
            <Progress value={(dish?.orders / totalOrders) * 100 || 0} className="h-2" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">#{dish.cuisine}</span>
              <span className="text-xs text-muted-foreground">{dish.orders} times</span>
            </div>
          </div>
        ))}
        {otherTags.length > 0 && <>
          <p className="text-lg">Other Tags</p>
          <div className="flex flex-wrap gap-3">
            {
              otherTags?.map((tag:any,i:any) => (
                <p key={i} className="text-base w-fit text-red-400 border border-red-400 rounded-3xl px-3 py-2">{tag.cuisine}</p>
              ))
            }
          </div>
        </>}
      </CardContent>
    </Card>
  );
};

export default MostOrderedDishes