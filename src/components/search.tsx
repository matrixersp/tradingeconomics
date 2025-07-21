import React, { useState, useEffect, useCallback } from "react";
import { SearchIcon, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void | Promise<void>;
  defaultValue?: string;
  debounceDelay?: number;
  showClearButton?: boolean;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  inputProps?: React.ComponentProps<typeof Input>;
}

const Search = ({
  placeholder = "Search...",
  onSearch,
  defaultValue = "",
  debounceDelay = 300,
  showClearButton = true,
  isLoading = false,
  className = "",
  disabled = false,
  autoFocus = false,
  inputProps = {},
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(defaultValue);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, debounceDelay);

  // Effect to handle debounced search
  useEffect(() => {
    onSearch?.(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  // Handle clear search
  const handleClear = useCallback(() => {
    setSearchTerm("");
    onSearch?.("");
  }, [onSearch]);

  // Handle key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClear();
      }
    },
    [handleClear],
  );

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="pl-10 pr-10"
          disabled={disabled}
          autoFocus={autoFocus}
          {...inputProps}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400 mr-1" />
          )}
          {showClearButton && searchTerm && !isLoading && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={handleClear}
              disabled={disabled}
              type="button"
              // aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Search };
