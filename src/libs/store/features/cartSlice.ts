import { cartItem } from "@/types/cart";
import { RootState } from "../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@/libs/configs/config.helper";

type PromoCodeStatus = "idle" | "enabled" | "loading" | "applied" | "invalid";
type OrderStatus = "idle" | "loading" | "succeeded" | "failed";

interface CartState {
  currentCartItem: cartItem | null;
  localCartItems: cartItem[];
  promoCode: {
    currentPromoCode: string;
    promoCodeStatus: PromoCodeStatus;
  };
  order: {
    orderStatus: OrderStatus;
    orderError: string | null;
  };
}

const initialState: CartState = {
  currentCartItem: null,
  localCartItems: getLocalStorageItem("localCartItems", []) || [],
  promoCode: {
    currentPromoCode: "",
    promoCodeStatus: "idle",
  },
  order: {
    orderStatus: "idle",
    orderError: null,
  },
};

// ✅ Async Thunks
export const applyPromoCode = createAsyncThunk<
  PromoCodeStatus,
  string,
  { rejectValue: PromoCodeStatus }
>("promocode/checkPromoCode", async (code: string, {}) => {
  return new Promise<PromoCodeStatus>((resolve) => {
    setTimeout(() => {
      if (code.toLowerCase() === "future20") {
        resolve("applied");
      } else {
        resolve("invalid");
      }
    }, 1000);
  });
});

export const placeOrder = createAsyncThunk<
  unknown,
  cartItem[],
  { rejectValue: string }
>("cart/placeOrder", async (cartItems: cartItem[], { rejectWithValue }) => {
  try {
    const response = await fetch("/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });
    if (!response.ok) throw new Error("Order failed");
    return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return rejectWithValue("Order failed");
  }
});

// ✅ Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem(state, action: PayloadAction<cartItem | null>) {
      state.currentCartItem = action.payload;
    },
    addToLocalCartItem(state, action: PayloadAction<cartItem>) {
      const existing = state.localCartItems.find(
        (i) => i.uid === action.payload.uid
      );
      if (existing) {
        if (state.currentCartItem?.uid === action.payload.uid) {
          existing.quantity = state.currentCartItem.quantity;
        } else if (existing.quantity < existing.maxQuantity) {
          existing.quantity += 1;
        }
      } else {
        state.localCartItems.push({ ...action.payload });
      }
      setLocalStorageItem("localCartItems", state.localCartItems);
    },
    removeLocalCartItem(state, action: PayloadAction<string>) {
      state.localCartItems = state.localCartItems.filter(
        (i) => i.uid !== action.payload
      );
      setLocalStorageItem("localCartItems", state.localCartItems);
    },
    increaseLocalCartItemQuantity(state, action: PayloadAction<string>) {
      const item = state.localCartItems.find((i) => i.uid === action.payload);
      if (item && item.quantity < item.maxQuantity) {
        item.quantity += 1;
        setLocalStorageItem("localCartItems", state.localCartItems);
      }
    },
    decreaseLocalCartItemQuantity(state, action: PayloadAction<string>) {
      const item = state.localCartItems.find((i) => i.uid === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        setLocalStorageItem("localCartItems", state.localCartItems);
      }
    },
    clearLocalCartItems(state) {
      state.localCartItems = [];
      removeLocalStorageItem("localCartItems");
    },
    setPromoCodeStatus(state, action: PayloadAction<PromoCodeStatus>) {
      state.promoCode.promoCodeStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.order.orderStatus = "loading";
        state.order.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.order.orderStatus = "succeeded";
        state.localCartItems = [];
        removeLocalStorageItem("localCartItems");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.order.orderStatus = "failed";
        state.order.orderError = action.payload ?? "Unknown error";
      })
      .addCase(applyPromoCode.pending, (state) => {
        state.promoCode.promoCodeStatus = "loading";
      })
      .addCase(applyPromoCode.fulfilled, (state, action) => {
        state.promoCode.promoCodeStatus = action.payload;
      })
      .addCase(applyPromoCode.rejected, (state) => {
        state.promoCode.promoCodeStatus = "invalid";
      });
  },
});

export const {
  setCartItem,
  addToLocalCartItem,
  removeLocalCartItem,
  increaseLocalCartItemQuantity,
  decreaseLocalCartItemQuantity,
  clearLocalCartItems,
  setPromoCodeStatus,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectSubtotal = (state: RootState) =>
  state.cart.localCartItems.reduce(
    (sum: number, item: cartItem) => sum + item.currentPrice * item.quantity,
    0
  );

export const selectDiscount = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  return state.cart.promoCode.promoCodeStatus === "applied"
    ? subtotal * 0.2
    : 0;
};

export const selectTax = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const discount = selectDiscount(state);
  return (subtotal - discount) * 0.08;
};

export const selectShipping = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  return subtotal > 1000 ? 0 : 29.99;
};

export const selectTotal = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const discount = selectDiscount(state);
  const tax = selectTax(state);
  const shipping = selectShipping(state);
  return subtotal - discount + tax + shipping;
};
