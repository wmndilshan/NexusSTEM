import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockBadgeProps {
  stock: number;
  isPreorder?: boolean;
}

export function StockBadge({ stock, isPreorder }: StockBadgeProps) {
  if (isPreorder) {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-medium">
        Preorder
      </Badge>
    );
  }

  if (stock === 0) {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">
        Out of Stock
      </Badge>
    );
  }

  if (stock < 10) {
    return (
      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-medium">
        Low Stock: {stock} left
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
      In Stock
    </Badge>
  );
}
