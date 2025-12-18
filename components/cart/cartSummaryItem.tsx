import { TCartSummaryItem } from '@/types/cartTypes'
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Props = {
  item: TCartSummaryItem;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const CartSummaryItem = ({ item, checked, onCheckedChange }: Props) => {
  return (
    <div
      className="
        relative
        flex items-center gap-4
        border border-[#2E2B2F]/20
        rounded-lg p-4
        w-full sm:max-w-[90vw] md:max-w-[640px] lg:max-w-[720px]
      "
    >
      <Button
        type="button"
        variant="link"
        className="
          absolute top-1 right-4
          text-[#2E2B2F]
          text-sm
          px-0
        "
      >
        삭제
      </Button>
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(!!value)}
      />
      <img
        src={item.primaryUrl}
        alt={item.title}
        className="
          w-24 h-24
          rounded-md
          object-cover
          bg-gray-100
        "
      />

      <div className="flex flex-col gap-1 flex-1">
        <p className="text-base font-medium line-clamp-2">
          {item.title}
        </p>

        <p className="text-lg font-semibold">
          {item.price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}

export default CartSummaryItem
