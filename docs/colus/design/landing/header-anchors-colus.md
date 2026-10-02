# Header + Anchors — Global System

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Estado:** CONSOLIDAÇÃO HIGH-FIDELITY  
> **Âmbito:** header público da landing COLUS, desktop + mobile, do Intro ao Footer.

---

## 1. Objetivo

Fechar um único comportamento de Header para toda a landing.

O Header deve:
- nascer organicamente do Intro Morph;
- adaptar-se a fundos claros/escuros;
- não competir com os signature moments;
- permitir navegação clara por âncoras;
- manter o Portal/Login completamente fora da landing pública;
- desaparecer antes do Footer.

---

# 2. Navegação pública — versão final

```text
[MARK COLUS]

O Colégio
Experiência
Futuro
Comunidade
Contactos

[ Marcar uma visita ]
```

Não incluir:
- Portal;
- Login;
- Área reservada;
- EduCore;
- RIGHTWARE.

EduCore/RIGHTWARE aparecem apenas no Footer global já definido.

---

# 3. Anchor map

| Item | ID | Destino |
|---|---|---|
| O Colégio | `#o-colegio` | Manifesto |
| Experiência | `#experiencia` | Aprender em Movimento |
| Futuro | `#futuro` | Futuro & Tecnologia |
| Comunidade | `#comunidade` | Pertencer |
| Contactos | `#contactos` | Convite Final / contacto público |
| Marcar uma visita | `#contactos` | Convite Final, com foco na ação de visita |

Não criar itens de menu para:
- Vida COLUS;
- Transformar;
- Depoimentos.

Essas secções fazem parte da narrativa e não precisam aumentar a densidade do Header.

---

# 4. Active state

O active state não deve tentar classificar todas as secções intermediárias.

Regra:
- ativa o item quando o respetivo anchor section entra na zona dominante do viewport;
- em secções narrativas sem anchor próprio, o active indicator pode desaparecer;
- não forçar `Experiência` ou `Futuro` a permanecer ativo quando a associação não é inequívoca.

Visual:
- pequeno underline/segmento;
- ou pequeno node Orange;
- nunca pill grande em cada item.

---

# 5. Estados globais do Header

## H0 — Intro / Splash

Faixa:
> início → antes do Hero Assembly.

Estado:
- Header completo invisível;
- o próprio mark grande do Intro é a identidade;
- nenhum nav duplicado sobre o Splash.

---

## H1 — Header Assembly

Durante o final do Intro Morph:

```text
compact mark
→ nav links
→ CTA
```

O Header nasce como consequência do morph.

Não fazer um Header aparecer inteiro por fade independente.

---

## H2 — Hero / Transparent Dark

No Hero estabilizado:
- `position: fixed`;
- fundo transparente;
- texto Warm White;
- mark compacto;
- CTA pequeno;
- sem blur forte.

Altura de trabalho desktop:
> **80px**

---

## H3 — Light Sticky

Usado sobre:
- Manifesto;
- Aprender em Movimento;
- Vida COLUS;
- Pertencer;
- Convite Final.

Tratamento:
- Warm White / ~90%;
- backdrop blur moderado;
- texto Deep Ink;
- border inferior quase invisível;
- Orange apenas para active/CTA.

Altura de trabalho:
> **68–72px**

---

## H4 — Dark Sticky

Usado sobre:
- Futuro & Tecnologia;
- Transformar;
- Depoimentos quando a superfície for Deep Ink.

Tratamento:
- Deep Ink translúcido;
- texto Warm White;
- blur moderado;
- Orange para active/CTA;
- sem glassmorphism ornamental.

Altura:
> **68–72px**

---

## H5 — Footer Exit

Quando o Footer começa a entrar:
- Header recolhe;
- não fica sticky sobre o Footer;
- Footer assume a assinatura EduCore/RIGHTWARE sem competição com a marca COLUS.

---

# 6. Auto-hide

Depois do Hero:

### Scroll down
Header pode recolher após deslocamento intencional.

### Scroll up
Header regressa rapidamente.

### Nunca esconder quando
- menu mobile está aberto;
- foco de teclado está dentro do Header;
- utilizador acabou de clicar num anchor;
- a página está no início;
- Convite Final está ativo e a pessoa interage com os CTAs.

Valores de implementação de trabalho:
- hide threshold: ~16px de scroll descendente consistente;
- show threshold: ~8px ascendente;
- transition: 220–300ms;
- sem bounce.

---

# 7. Theme switching

O Header não deve analisar pixels do vídeo/imagem para decidir cor.

Cada secção declara explicitamente um tema:

```text
data-header-theme='light'
data-header-theme='dark'
data-header-theme='transparent'
data-header-theme='hidden'
```

Isso torna o comportamento determinístico e testável.

Mapeamento de trabalho:

| Secção | Header theme |
|---|---|
| Intro Morph | hidden |
| Hero | transparent/dark |
| Manifesto | light |
| Aprender | light |
| Futuro & Tecnologia | dark |
| Vida COLUS | light |
| Pertencer | light |
| Transformar | dark |
| Depoimentos | dark |
| Convite Final | light |
| Footer | hidden |

---

# 8. Desktop layout

Working grid:
- outer gutter igual ao sistema global;
- mark à esquerda;
- nav centrado/direita;
- CTA no extremo direito.

Mark:
- compacto;
- não usar o logo completo com subtítulo longo;
- accessible label continua `Colégio Universo dos Sonhos`.

Nav gap:
- confortável;
- evitar excesso de tracking;
- labels curtos.

CTA:
> **Marcar uma visita**

É menor do que o CTA principal do Hero/Convite.

---

# 9. Mobile Header

Layout:

```text
[MARK]                           [MENU]
```

Altura:
> **60–64px**

Sem links horizontais comprimidos.

---

# 10. Mobile Menu

Direção:
- overlay/sheet de alta legibilidade;
- Warm Paper por defeito;
- mark no topo;
- cinco anchors em lista;
- CTA `Marcar uma visita`;
- sem Portal/Login;
- motion subtil.

Não transformar o menu mobile num segundo signature moment.

Um pequeno fragmento do Community Ring pode existir como assinatura discreta, mas não é obrigatório.

---

# 11. Anchor behavior

Usar âncoras reais e deep-linkáveis:

```text
#o-colegio
#experiencia
#futuro
#comunidade
#contactos
```

Regras:
- `scroll-margin-top` considera Header sticky;
- click usa smooth scroll apenas quando motion é permitido;
- com reduced motion, scroll direto;
- URL pode receber hash no clique;
- scroll passivo não deve encher o browser history;
- target heading recebe foco programático quando necessário para acessibilidade.

---

# 12. Active section detection

Implementação recomendada:
> **IntersectionObserver**, não listeners de scroll por item.

Zona dominante de trabalho:
- parte central/superior do viewport;
- tolerância para sticky sections;
- evitar flicker nas transições.

O active state é visual e `aria-current='location'` quando aplicável.

---

# 13. CTA behavior

## Header — Marcar uma visita

No demonstrador:
- conduz a `#contactos`;
- target principal é o Convite Final.

Em produção:
- pode abrir fluxo/modal/formulário ou agenda;
- apenas depois de validar o processo real do COLUS.

## Falar connosco

Destino fica para o passo de Contactos/CTA Destinations.

Não assumir WhatsApp, telefone, formulário ou email antes dessa validação.

---

# 14. Acessibilidade

Obrigatório:
- `<header>` e `<nav>` semânticos;
- skip link para conteúdo;
- focus visible;
- menu mobile com focus trap;
- Escape fecha menu;
- botão menu com `aria-expanded`;
- touch target mínimo ~44px;
- contraste adequado nos estados light/dark;
- reduced motion respeitado.

---

# 15. Z-index contract

Ordem conceptual:

```text
mobile menu / dialog
↑
header
↑
section overlays / labels
↑
media
↑
background devices
```

O Header não deve ficar atrás de media masks durante transitions.

---

# 16. Critério de aprovação

O sistema passa se:
- Header nasce do Intro e não parece elemento colado;
- apenas cinco anchors públicos;
- nenhuma referência pública a Portal/Login;
- light/dark switching é previsível;
- auto-hide não prejudica navegação;
- mobile menu é simples;
- anchor navigation é acessível;
- Header desaparece antes do Footer;
- CTA ainda não inventa processo operacional do COLUS.

---

# 17. Decisão V0.1

> **Hidden Intro → Assembled Hero Header → adaptive Light/Dark Sticky → Footer Exit.**

Anchor map:

> **O Colégio → Experiência → Futuro → Comunidade → Contactos**

Próximo passo:

> **SCROLL BUDGET GLOBAL**