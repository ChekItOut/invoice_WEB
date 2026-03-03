/**
 * 검색 바 컴포넌트
 * 견적서 번호 또는 클라이언트명 검색
 */

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  const debouncedSearch = useDebouncedCallback(onSearch, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="relative">
      {/* 검색 아이콘 */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {/* 검색 입력 필드 */}
      <Input
        type="text"
        placeholder="견적서 번호 또는 클라이언트명 검색..."
        value={value}
        onChange={handleChange}
        className="pl-9"
      />
    </div>
  );
}
