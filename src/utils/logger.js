const isDev = process.env.NODE_ENV === "development";

const log = {
  info: (...args) => {
    if (isDev) console.info("[INFO]", ...args);
  },
  warn: (...args) => {
    if (isDev) console.warn("[WARN]", ...args);
  },
  error: (...args) => {
    console.error("[ERROR]", ...args);
  },
};

export default log;