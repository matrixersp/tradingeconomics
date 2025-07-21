import {
  Building2,
  Calendar,
  Globe,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IStockData } from "@/types/stock-data";

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "SEK" ? "SEK" : "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatMarketCap = (marketCap: number) => {
  const billion = marketCap / 1000000000;
  return `${billion.toFixed(1)}B`;
};

const getChangeColor = (change: number) => {
  return change >= 0 ? "text-green-600" : "text-red-600";
};

const getChangeIcon = (change: number) => {
  return change >= 0 ? (
    <TrendingUp className="w-4 h-4" />
  ) : (
    <TrendingDown className="w-4 h-4" />
  );
};

type StockPanelProps = {
  stocksData: IStockData[];
};

const StockPanel = ({ stocksData }: StockPanelProps) => {
  const totalMarketCap = stocksData.reduce(
    (sum, stock) => sum + stock.MarketCap,
    0,
  );

  const avgYearlyPerformance =
    stocksData.reduce((sum, stock) => sum + stock.YearlyPercentualChange, 0) /
    stocksData.length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Globe className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            {stocksData[0]?.Country} Stock Market Overview
          </h1>
        </div>
        <p className="text-gray-600">
          Major {stocksData[0]?.Country} Companies Performance Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Total Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {stocksData.length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Listed Securities</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Combined Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              ${formatMarketCap(totalMarketCap)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Total Value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Avg. Yearly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getChangeColor(avgYearlyPerformance)}`}
            >
              {avgYearlyPerformance.toFixed(2)}%
            </div>
            <p className="text-xs text-gray-600 mt-1">12-Month Average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stocksData.map((stock, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {stock.Name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{stock.Symbol}</p>
                </div>
                <Badge
                  variant={stock.state === "CLOSED" ? "secondary" : "default"}
                >
                  {stock.state}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  {formatCurrency(stock.Last, stock.unit)}
                </span>
                <div
                  className={`flex items-center gap-1 ${getChangeColor(stock.DailyChange)}`}
                >
                  {getChangeIcon(stock.DailyChange)}
                  <span className="font-semibold">
                    {stock.DailyPercentualChange.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Market Cap:</span>
                  <div className="font-semibold">
                    ${formatMarketCap(stock.MarketCap)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Day Range:</span>
                  <div className="font-semibold">
                    {formatCurrency(stock.day_low, stock.unit)} -{" "}
                    {formatCurrency(stock.day_high, stock.unit)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs border-t pt-3">
                <div className="text-center">
                  <div className="text-gray-500 mb-1">Weekly</div>
                  <div
                    className={`font-semibold ${getChangeColor(stock.WeeklyPercentualChange)}`}
                  >
                    {stock.WeeklyPercentualChange.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500 mb-1">Monthly</div>
                  <div
                    className={`font-semibold ${getChangeColor(stock.MonthlyPercentualChange)}`}
                  >
                    {stock.MonthlyPercentualChange.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500 mb-1">Yearly</div>
                  <div
                    className={`font-semibold ${getChangeColor(stock.YearlyPercentualChange)}`}
                  >
                    {stock.YearlyPercentualChange.toFixed(2)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        Last updated: {new Date(stocksData[0]?.LastUpdate).toLocaleString()}
      </div>
    </div>
  );
};

export { StockPanel };
