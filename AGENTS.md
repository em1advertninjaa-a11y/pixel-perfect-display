<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Build & self-hosting rules

- `vite.config.ts` sets `nitro: { preset: "node-server" }` for FastComet cPanel
  (Passenger) self-hosting. Lovable sandbox builds force `cloudflare-module`, so
  preview/publish are unaffected; only outside-sandbox builds emit `.output/`
  for Node. Why: the shared config only honors user nitro opts outside the sandbox.
- `app.cjs` is the Passenger startup file: it imports `./.output/server/index.mjs`
  and relies on Passenger's `PORT` (Nitro node-server listens on `PORT`).
  Build on the host (Node ^20.19 || >=22.12), not in the Lovable sandbox.
