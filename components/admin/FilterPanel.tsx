/**
 * 필터 패널 컴포넌트
 * 상태별 필터링
 */

"use client";

import type { InvoiceStatus } from "@/lib/types/invoice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStatusLabel } from "@/lib/utils/invoice";

interface FilterPanelProps {
  onStatusChange: (status: InvoiceStatus | "all") => void;
}

// 상태 필터 옵션 목록
const statusOptions: Array<{ value: InvoiceStatus | "all"; label: string }> = [
  { value: "all", label: "전체 상태" },
  { value: "draft", label: getStatusLabel("draft") },
  { value: "issued", label: getStatusLabel("issued") },
  { value: "paid", label: getStatusLabel("paid") },
  { value: "cancelled", label: getStatusLabel("cancelled") },
];

export function FilterPanel({ onStatusChange }: FilterPanelProps) {
  return (
    <div className="flex gap-4">
      {/* 상태 필터 드롭다운 */}
      <Select
        onValueChange={(value) =>
          onStatusChange(value as InvoiceStatus | "all")
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="상태 필터" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
