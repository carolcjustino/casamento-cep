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
- Retain asset pointers and the integrity manifest, and ignore newly generated media; platform snapshots may already track binaries, so inspect actual tracking before claiming Git exclusion or synchronization.
