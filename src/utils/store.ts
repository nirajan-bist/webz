import * as asyncStore from "@leapfrogtechnology/async-store";

export function getCurrentUser() {
  return store.get("user");
}

export const store = asyncStore;
