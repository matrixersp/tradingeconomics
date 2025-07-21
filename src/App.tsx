import { useCallback, useState } from "react";
import "./App.css";
import { Search } from "@/components/search";
import axios from "@/lib/axios";
import { StockPanel } from "@/components/stocks-panel";
import { StocksPanelSkeleton } from "@/components/stocks-panel-skeleton";
import type { IStockData } from "./types/stock-data";

const DEFAULT_SEARCH_VALUE = "sweden";

function App() {
  const [stocksData, setStocksData] = useState<IStockData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setStocksData([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`/markets/search/${query}`);
      setStocksData(response.data?.slice(0, -1) ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-center">
        <Search
          placeholder="Search countries..."
          onSearch={handleSearch}
          defaultValue={DEFAULT_SEARCH_VALUE}
          debounceDelay={300}
          isLoading={isLoading}
          showClearButton
          autoFocus
          className="mb-4"
          inputProps={{
            "aria-label": "Search countries",
          }}
        />
      </div>
      {stocksData.length === 0 && !isLoading ? (
        <div className="text-center">
          <p className="text-gray-600">No results found</p>
        </div>
      ) : isLoading ? (
        <StocksPanelSkeleton />
      ) : (
        <StockPanel stocksData={stocksData} />
      )}
    </div>
  );
}

export default App;
