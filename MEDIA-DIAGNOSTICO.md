# Diagnóstico de imagens e publicação na Vercel

## Causa

As quatro imagens exibidas e a fonte TAN Pearl usavam caminhos `/__l5e/assets-v1/...`, atendidos pela infraestrutura da Lovable, não pela Vercel. Os `.asset.json` no GitHub são referências ao armazenamento, não imagens. No domínio da Vercel esses caminhos não encontram os arquivos.

## Inventário

| Uso | Referência anterior em src/assets | Novo caminho estático |
| --- | --- | --- |
| Monograma, topo e RSVP | `monograma-carol-plinio.png.asset.json` | `/images/monograma-carol-plinio.png` |
| Aquarela, fundo do início | `aquarela.webp.asset.json` | `/images/aquarela.webp` |
| Foto do casal, O fio vermelho | `casal-carol-plinio.jpg.asset.json` | `/images/casal-carol-plinio.jpg` |
| Separador, duas ocorrências | `separador-1.png.asset.json` | `/images/separador-1.webp` |
| TAN Pearl, títulos | `tan-pearl.otf.asset.json` | `/fonts/TAN-PEARL-Regular.otf` |
| Ícone da aba / Apple touch icon | Arquivo local existente | `/favicon.png`, sem mudança |

O separador é WebP apesar da extensão `.png` no envio: somente o nome servido mudou. Nenhuma imagem foi recriada ou recomprimida. Dimensões, classes, molduras, suavizações, efeitos, cores, animações, tipografia e conteúdo não foram alterados.

Os arquivos enviados foram identificados e seus tamanhos e SHA-256 conferidos contra os originais do armazenamento. Existem quatro arquivos de imagem reais e uma fonte preparados em `public`, não apenas referências.

Não há galerias ou fotos externas em uso. Ícones Lucide e o fio vermelho são SVGs produzidos pelo código. Cormorant Garamond e Pinyon Script continuam em Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`), sem mudança. Wedy e pousadas são links, não fontes de imagens.

## Arquivos antigos preservados

`aquarela-igreja.png.asset.json`, `aquarela-igreja-2.png.asset.json`, `divisor-ornamental.png.asset.json`, `monograma.png.asset.json` e `divisor-botanico.png` não estão em uso. Não foram removidos ou reintroduzidos.

## Inclusão na publicação e limitação

A preparação reproduzível é `scripts/prepare-media.mjs`, executado antes de `dev`, `build` e `build:dev`. Ele recupera os cinco originais para `public/images` e `public/fonts`, verifica tamanho e SHA-256 e interrompe a compilação se faltar um original ou se ele estiver diferente. Os caminhos respeitam exatamente maiúsculas e minúsculas.

Scripts, manifesto e caminhos corrigidos ficam no código sincronizado. Foram adicionados `.gitignore` às pastas geradas para respeitar a política de mídias do ambiente. Contudo, a inspeção final com `git ls-files` mostrou que os cinco binários já aparecem no snapshot versionado gerenciado pela plataforma; regras de ignore não removem arquivos já versionados. Não foi possível confirmar o envio desse snapshot ao GitHub. Os arquivos de `public` são incluídos nos estáticos pelo Vite. Depois da publicação, o navegador carrega as mídias do próprio site. Se as cópias locais estiverem presentes e íntegras, não há download; **sem elas, uma nova compilação depende dos originais no CDN da Lovable.** Não exclua esses assets.

Para tornar o repositório completamente independente, copie manualmente os originais para os caminhos acima fora deste ambiente, remova `public/images/.gitignore` e `public/fonts/.gitignore` e inclua os binários no GitHub. O script aceita cópias locais com SHA-256 correto e não tenta baixá-las novamente.

## Ações manuais

1. Confirme no GitHub a sincronização destas alterações; este agente não pode consultar o estado da integração.
2. Na Vercel use `bun run build` ou `npm run build`, e não `vite build` diretamente, para executar a preparação.
3. Republique e abra os cinco novos caminhos da tabela e `/favicon.png` no domínio da Vercel.

Nenhum original necessário está faltando. Não foi fornecida a URL da implantação na Vercel; sua publicação real e configuração não foram verificadas. O servidor atual usa alvo Cloudflare em `vite.config.ts`; o adaptador não foi alterado, pois esta correção é limitada às mídias.

## Verificação realizada

- Recuperação dos cinco originais em uma pasta limpa, com tamanho e SHA-256 corretos.
- HTTP 200 e conteúdo idêntico ao original nos cinco caminhos novos e no favicon local.
- Todas as seis ocorrências de imagens carregadas no navegador em computador e celular; TAN Pearl carregada.
- Capturas confirmaram a aquarela, o monograma e a moldura da foto preservados.
- Verificação automática do projeto sem erros de compilação no registro consultado.
- Permanece um aviso preexistente da contagem regressiva ao abrir a página, independente das imagens; não foi alterado nesta correção.