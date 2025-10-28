// // import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

// // export type CartItem = {
// //   id: string;
// //   name: string;
// //   price: number;
// //   image?: string;
// //   quantity: number;
// // };

// // type CartContextValue = {
// //   items: CartItem[];
// //   itemCount: number; // total quantity across items
// //   addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
// //   removeItem: (id: string) => void;
// //   updateQuantity: (id: string, quantity: number) => void;
// //   clear: () => void;
// // };

// // const CartContext = createContext<CartContextValue | undefined>(undefined);

// // const STORAGE_KEY = "cart";

// // export function CartProvider({ children }: { children: ReactNode }) {
// //   const [items, setItems] = useState<CartItem[]>(() => {
// //     try {
// //       const raw = localStorage.getItem(STORAGE_KEY);
// //       return raw ? (JSON.parse(raw) as CartItem[]) : [];
// //     } catch {
// //       return [];
// //     }
// //   });

// //   useEffect(() => {
// //     try {
// //       localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
// //     } catch {
// //       // ignore persistence errors
// //     }
// //   }, [items]);

// //   const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
// //     setItems((prev) => {
// //       const index = prev.findIndex((i) => i.id === item.id);
// //       if (index >= 0) {
// //         const updated = [...prev];
// //         updated[index] = { ...updated[index], quantity: updated[index].quantity + quantity };
// //         return updated;
// //       }
// //       return [...prev, { ...item, quantity }];
// //     });
// //   };

// //   const removeItem: CartContextValue["removeItem"] = (id) => {
// //     setItems((prev) => prev.filter((i) => i.id !== id));
// //   };

// //   const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity) => {
// //     setItems((prev) =>
// //       prev
// //         .map((i) => (i.id === id ? { ...i, quantity } : i))
// //         .filter((i) => i.quantity > 0)
// //     );
// //   };

// //   const clear = () => setItems([]);

// //   const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

// //   const value: CartContextValue = useMemo(
// //     () => ({ items, itemCount, addItem, removeItem, updateQuantity, clear }),
// //     [items, itemCount]
// //   );

// //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // }

// // export function useCart() {
// //   const ctx = useContext(CartContext);
// //   if (!ctx) throw new Error("useCart must be used within a CartProvider");
// //   return ctx;
// // }


// import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
// import { useToast as useToaster } from "@/hooks/use-toast";

// export type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   image?: string;
//   quantity: number;
// };

// type CartContextValue = {
//   items: CartItem[];
//   itemCount: number; // total quantity across items
//   addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clear: () => void;
// };

// const CartContext = createContext<CartContextValue | undefined>(undefined);

// const STORAGE_KEY = "cart";

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       return raw ? (JSON.parse(raw) as CartItem[]) : [];
//     } catch {
//       return [];
//     }
//   });
//   const { toast } = useToaster();

//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//     } catch {
//       // ignore persistence errors
//     }
//   }, [items]);

//   const addToCart: CartContextValue["addToCart"] = (item, quantity = 1) => {
//     setItems((prev) => {
//       const index = prev.findIndex((i) => i.id === item.id);
//       if (index >= 0) {
//         const updated = [...prev];
//         updated[index] = { ...updated[index], quantity: updated[index].quantity + quantity };
//         // Show success toast
//         toast({
//           title: "Added to cart!",
//           description: `${item.name} quantity updated to ${updated[index].quantity}`,
//           variant: "success",
//         });
//         return updated;
//       }
//       // Show success toast
//       toast({
//         title: "Added to cart!",
//         description: `${item.name} added to your cart`,
//         variant: "success",
//       });
//       return [...prev, { ...item, quantity }];
//     });
//   };

//   const removeItem: CartContextValue["removeItem"] = (id) => {
//     const itemToRemove = items.find(i => i.id === id);
//     setItems((prev) => prev.filter((i) => i.id !== id));
//     // Show success toast when item is removed
//     if (itemToRemove) {
//       toast({
//         title: "Removed from cart",
//         description: `${itemToRemove.name} removed from your cart`,
//         variant: "default",
//       });
//     }
//   };

//   const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity) => {
//     setItems((prev) =>
//       prev
//         .map((i) => (i.id === id ? { ...i, quantity } : i))
//         .filter((i) => i.quantity > 0)
//     );
//   };

//   const clear = () => setItems([]);

//   const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

//   const value: CartContextValue = useMemo(
//     () => ({ items, itemCount, addToCart, removeItem, updateQuantity, clear }),
//     [items, itemCount]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used within a CartProvider");
//   return ctx;
// }
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useMaterialToast } from "@/hooks/useMaterialToast";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number; // total quantity across items
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const { toast } = useMaterialToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore persistence errors
    }
  }, [items]);

  const addToCart: CartContextValue["addToCart"] = (item, quantity = 1) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + quantity };
        // Show success toast
        toast({
          title: "Added to cart!",
          description: `${item.name} quantity updated to ${updated[index].quantity}`,
          variant: "success",
        });
        return updated;
      }
      // Show success toast
      toast({
        title: "Added to cart!",
        description: `${item.name} added to your cart`,
        variant: "success",
      });
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    const itemToRemove = items.find(i => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    // Show success toast with undo action when item is removed
    if (itemToRemove) {
      toast({
        title: "Removed from cart",
        description: `${itemToRemove.name} removed from your cart`,
        variant: "default",
        action: {
          label: "Undo",
          onClick: () => {
            setItems((prev) => [...prev, itemToRemove]);
            toast({
              title: "Item restored",
              description: `${itemToRemove.name} added back to cart`,
              variant: "success",
              duration: 3000,
            });
          },
        },
      });
    }
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, quantity) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value: CartContextValue = useMemo(
    () => ({ items, itemCount, addToCart, removeItem, updateQuantity, clear }),
    [items, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}