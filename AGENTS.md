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

- Materialize original CDN media into public/images and public/fonts with scripts/prepare-media.mjs before dev/build; SHA-256 verification preserves originals and makes self-hosted output independent of Lovable asset routing.
- Keep generated media out of Git and retain the asset pointers plus media manifest as the source of truth; this follows workspace media storage requirements while allowing static deployment files to be reproduced.
