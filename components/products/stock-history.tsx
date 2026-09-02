type StockHistoryProps = {
  movements: {
    id: string;
    type: string;
    quantity: string;
    stockAfter: string;
    notes: string | null;
    createdAt: Date;
  }[];
  unit: string;
};

export function StockHistory({ movements, unit }: StockHistoryProps) {
  return (
    <div className="mt-8 rounded-lg border">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">Stock History</h2>
        <p className="text-sm text-muted-foreground">
          A record of stock adjustments for this product.
        </p>
      </div>

      {movements.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          No stock movements yet.
        </div>
      ) : (
        <div className="divide-y">
          {movements.map((movement) => (
            <div
              key={movement.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div>
                <p className="font-medium">Stock Adjustment</p>

                {movement.notes && (
                  <p className="text-sm text-muted-foreground">
                    {movement.notes}
                  </p>
                )}

                <p className="text-sm text-muted-foreground">
                  {movement.createdAt.toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {Number(movement.quantity) > 0 ? "+" : ""}
                  {Number(movement.quantity).toString()} {unit}
                </p>

                <p className="text-sm text-muted-foreground">
                  Stock after: {Number(movement.stockAfter).toString()} {unit}
                </p>

                {Number(movement.quantity) !== 0 && (
                  <p className="text-xs text-muted-foreground">
                    Changed by {Number(movement.quantity) > 0 ? "+" : ""}
                    {Number(movement.quantity).toString()} {unit}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
