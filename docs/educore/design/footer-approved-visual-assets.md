# EduCore + RIGHTWARE — registo dos assets visuais do Footer

> **Origem:** duas imagens de referência fornecidas diretamente pelo utilizador em 2026-10-15.  
> **Decisão existente:** `docs/educore/design/footer-standard.md`.  
> **Contexto:** Footer EduCore/RIGHTWARE na landing COLUS, variante **Dark**.  
> **Estado:** imagens originais arquivadas no Google Drive; recortes e versões adequadas de logótipos individuais **a preparar antes da inclusão no bundle frontend**.

## Referências principais no Drive

Pasta: [EDUCORE - COLUS - ASSETS FOOTER](https://drive.google.com/drive/folders/1p4cMsQK7ULo05PPHSRsrCzGW9Zd3VRaJ)

- [EduCore and Rightware Product Logos.png](https://drive.google.com/file/d/1l1lZC9gLvnKDb4TvTkoXCA06aVGjhnjo/view) — composição original com marca EduCore e assinatura RIGHTWARE Product.
- [EduCore Light and Dark Footer Designs.png](https://drive.google.com/file/d/1u0JiTFrB_fay-rk2Y_bSEurnOO7VGu4J/view) — referência da arquitetura visual Light/Dark; no COLUS utilizar **Dark**.

Os dois originais estão em [03 — Referências Light e Dark](https://drive.google.com/drive/folders/1oiUU6_79rLqcpOX0fz1pSg57KBPw6njI).

## Organização por identidade

- [01 — EduCore](https://drive.google.com/drive/folders/1Z5pBfyjXzJc0CQdtmnUiFnR3u5aRfvv4): cópia da composição original para servir de fonte de referência do logo EduCore. **Não é ainda um logo individual recortado e otimizado.**
- [02 — RIGHTWARE](https://drive.google.com/drive/folders/1gxr7_bAYP2htGynfFSX_M0bj75g51168): cópia da composição original para o lockup RIGHTWARE do Footer. **Não é ainda um lockup individual recortado e otimizado.**
- [03 — Referências Light e Dark](https://drive.google.com/drive/folders/1oiUU6_79rLqcpOX0fz1pSg57KBPw6njI): originais enviados nesta conversa.

## Gate de implementação

1. Extrair os logótipos **sem redesenhar, reinterpretar ou modificar elementos da marca**, com separação adequada e transparência de fundo.
2. A versão Dark deve manter o contraste observado na referência aprovada (logótipos claros em fundo escuro). A composição com cores escuras pode não ser adequada diretamente ao footer escuro.
3. Inserir assets finais locais no frontend e referenciá-los a partir de `ContactFooter.tsx`.
4. Validar alinhamento, escala e legibilidade em desktop/mobile e reexecutar Design QA.
5. Preservar `IntroHeroSection.tsx`, o vídeo, a máscara e demais assets protegidos do Hero COLUS.

**Não considerar os dois critérios MISSING do Footer resolvidos só porque as imagens foram arquivadas no Drive.**
