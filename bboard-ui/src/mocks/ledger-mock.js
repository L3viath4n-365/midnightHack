// Complete mock for the ledger WASM to prevent initialization errors
// This creates a global 'Module' object that the WASM file expects

// Create the Module object with all properties that might be accessed
const Module = {
  __wbindgen_start: () => {},
  __wbindgen_init: () => {},
  __wbindgen_malloc: () => {},
  __wbindgen_free: () => {},
  __wbindgen_realloc: () => {},
};

// Ensure the global Module object exists before the WASM tries to access it
if (typeof window !== 'undefined') {
  window.Module = window.Module || Module;
}

// Export named functions to satisfy the WASM's import expectations
export const __wbindgen_start = Module.__wbindgen_start;
export const __wbindgen_init = Module.__wbindgen_init;

// Default export for the module
const ledgerMock = {
  __wbindgen_start,
  __wbindgen_init,
  Module,
};

export default ledgerMock;
