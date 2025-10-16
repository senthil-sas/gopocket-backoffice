// Permit importing packages that don't expose types cleanly (like vuex in some setups)
declare module 'vuex';

// Allow importing local JS modules from TS files without individual .d.ts files
declare module '*.js';
