// FastComet cPanel "Setup Node.js App" startup file (Phusion Passenger).
// Passenger requires a CommonJS entry; it sets PORT, which Nitro's
// node-server runtime listens on by default, so this loader is all we need.
// The Nitro build output (.output/server/index.mjs) is self-contained —
// no node_modules are required at runtime.
import("./.output/server/index.mjs");
