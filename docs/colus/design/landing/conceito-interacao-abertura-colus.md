# Conceito de Interação — Abertura Morph COLUS

> **Estado:** DIREÇÃO CRIATIVA / PRÉ-HIGH-FIDELITY  
> **Versão:** 0.1  
> **Data:** 2026-10-01  
> **Objetivo:** substituir a abertura convencional de “hero com foto/vídeo” por uma experiência de marca viva, scroll-driven e tecnicamente elegante.
>
> **Regra:** ainda não é código. Este documento define comportamento, narrativa e limites de implementação.

---

## 1. Diagnóstico

O wireframe anterior resolve estrutura, conteúdo e hierarquia, mas a abertura continua demasiado próxima do padrão:

```text
header
→ hero
→ foto/vídeo
→ headline
→ CTA
```

Isso é funcional, mas não é suficientemente distintivo para o COLUS.

A primeira experiência deve demonstrar:

- engenharia;
- domínio de motion;
- identidade proprietária;
- integração entre marca e interface;
- atenção à experiência;
- capacidade de fazer o sistema “nascer” da própria marca.

---

# 2. Nova decisão

A landing não começa com um splash separado e depois um hero.

Ela começa com uma **intro scene que é o próprio Hero em construção**.

> **Abertura = Brand Morph + Scroll Composition + Hero Reveal**

Isto evita uma animação decorativa antes do conteúdo.

A própria interação inicial constrói a primeira dobra.

---

# 3. Conceito

## Nome interno

> **FROM MARK TO WORLD**

ou, em português:

> **DA MARCA PARA A EXPERIÊNCIA**

A ideia é:

```text
símbolo COLUS
→ separa-se
→ abre-se
→ irradia
→ distribui elementos
→ revela media
→ constrói o Hero
```

O visitante vê literalmente a identidade transformar-se na interface.

---

# 4. Primeira cena — Brand Stage

## Estado inicial

Viewport praticamente limpo.

No centro:

- mark COLUS grande;
- sem wordmark completo;
- fundo warm-white ou deep blue, a testar;
- nenhum hero convencional ainda visível.

### Escala

O símbolo pode ocupar aproximadamente:

- 32–42% da largura útil desktop;
- 48–62% da largura mobile.

Deve parecer intencionalmente grande.

### Importante

Não é um splash de loading.

O utilizador já está **dentro da landing**.

---

# 5. Scroll como gatilho

Ao iniciar o scroll:

> o símbolo não desaparece — ele **morphs**.

O scroll controla uma progressão contínua.

### Não usar

- scroll-jacking;
- roda bloqueada;
- slides forçados;
- “next scene” artificial.

### Usar

- native scroll;
- `position: sticky`;
- transforms;
- opacity;
- SVG motion;
- progress mapping.

---

# 6. Sequência principal

## 0% — Mark íntegro

```text
[ MARK COLUS GRANDE ]
```

Estado:
- centrado;
- quase estático;
- micro breathing/halo muito discreto.

---

## 12–25% — O livro abre

O elemento de livro:

- expande lateralmente;
- torna-se uma curva maior;
- começa a criar a geometria da interface.

### Leitura

> conhecimento a abrir-se.

O livro pode deixar de parecer “ícone” e tornar-se:

- máscara;
- frame;
- transição;
- abertura para o media.

---

## 25–40% — A luz sobe

A forma central/lâmpada:

- desloca-se;
- cresce;
- ganha halo;
- começa a iluminar o espaço onde o Hero será revelado.

### Leitura

> ideia → visão.

---

## 35–55% — Os raios/pontos irradiam

Os elementos radiais:

- afastam-se do centro;
- distribuem-se pelo layout;
- alguns tornam-se elementos funcionais.

### Possíveis destinos

#### Decorative nodes
ficam como identidade visual.

#### Section navigation nodes
quatro pontos selecionados podem passar a representar:

- Descobrir;
- Criar;
- Pertencer;
- Transformar.

#### Interaction indicators
outros podem virar:
- scroll indicator;
- media markers;
- progress dots.

### Regra

Nem todos os pontos viram botões.

Isso criaria ruído.

Selecionar apenas 3–4 elementos funcionais.

---

## 50–70% — Media reveal

A curva do livro abre o espaço visual.

Por baixo aparece:

- vídeo;
- fotografia;
- composição multimédia.

### Importante

O media **não aparece simplesmente por fade**.

Ele é revelado pela própria geometria da marca.

Exemplos:

- mask abre como páginas;
- vídeo surge entre duas curvas;
- imagem escala enquanto a abertura aumenta.

---

## 65–85% — Hero components assemble

Entram progressivamente:

- kicker;
- headline;
- subtexto;
- CTA principal;
- header;
- elementos orbitais.

Mas não como “fade tudo ao mesmo tempo”.

### Ordem

```text
mark fragments settle
→ kicker
→ headline
→ supporting line
→ CTA
→ header/navigation
```

---

## 85–100% — Hero final

A experiência estabiliza.

Agora temos o Hero completo:

- media dominante;
- headline;
- CTA;
- header;
- brand devices nas posições finais.

O utilizador deixou de ver “um logo”.

Passou a ver:

> **um mundo visual construído a partir do logo.**

---

# 7. O símbolo não desaparece

Isto é importante.

Os componentes do símbolo tornam-se partes da interface.

### Exemplo conceptual

```text
LIVRO
→ mask/transição inferior

LUZ
→ halo atrás do media/headline

4 RAIOS
→ navigation nodes

OUTROS RAIOS
→ decoração / progress

AXIS
→ linha de storytelling
```

O símbolo é decomposto em função.

---

# 8. Radial Navigation

Uma proposta forte é escolher quatro pontos do sistema radial para representar:

- Descobrir;
- Criar;
- Pertencer;
- Transformar.

### Desktop

Podem viver como pequenos nós ao lado do Hero ou em arco discreto.

Ao hover:

- expandem label;
- mostram pequeno hint;
- permitem scroll para a secção.

### Mobile

Não usar a mesma estrutura.

Converter para:

- progress dots;
- pequenas tabs;
- ou simplesmente remover.

### Regra

Tem de parecer parte da marca, não “menu secundário”.

---

# 9. Hero depois do Morph

Depois da transformação, o Hero continua vivo.

## Não fazer

```text
morph acaba
→ tudo fica completamente estático
```

## Fazer

Micro-comportamentos:

- halo reage levemente ao cursor;
- media pode ter depth mínimo;
- nodes têm micro-shift;
- headline pode responder subtilmente ao scroll;
- video inicia quando o reveal atinge threshold.

Tudo dentro de limites de performance.

---

# 10. Progressive Composition

A ideia de “lazy screens” deve ser tratada como:

> **progressive composition**

Não como conteúdo atrasado arbitrariamente.

### Princípio

Componentes entram quando passam a ter função narrativa.

Exemplo:

- não mostrar header completo no primeiro frame;
- ele só ganha função quando o mark começa a decompor;
- CTA só aparece quando o Hero já tem contexto;
- radial nav só aparece quando os pontos chegam à posição final.

---

# 11. Motion não é decoração

Cada movimento tem significado.

| Movimento | Significado |
|---|---|
| livro abre | conhecimento / possibilidade |
| luz sobe | ideia / visão |
| pontos irradiam | expansão / comunidade / caminhos |
| media aparece | experiência ganha forma |
| componentes montam | sistema torna-se utilizável |

Se um motion não servir narrativa ou função, remover.

---

# 12. Duração da experiência

Não medir em segundos rígidos.

Medir em scroll progress.

### Sugestão

Stage pinned durante aproximadamente:

- 160–220vh desktop;
- 120–160vh mobile.

### Objetivo

Permitir que o visitante controle a velocidade.

Não obrigar a esperar animação.

---

# 13. Primeira visita vs visitas seguintes

Não criar experiência cansativa.

### Opção recomendada

Como a transformação é scroll-driven:

- não bloqueia;
- pode ser atravessada rapidamente;
- não precisa de “skip intro”.

### Futuro

Se necessário:
- guardar preferência;
- encurtar motion em visitas recorrentes.

Não é prioridade agora.

---

# 14. Reduced Motion

Obrigatório.

Se `prefers-reduced-motion`:

- mostrar mark pequeno já na posição final;
- mostrar Hero montado;
- usar fade simples;
- remover morph longo;
- manter layout e conteúdo equivalentes.

---

# 15. Performance

A experiência deve parecer avançada sem ser pesada.

## Priorizar

- SVG;
- transform;
- opacity;
- clip-path/mask;
- CSS variables;
- GPU-friendly properties.

## Evitar

- layout recalculation constante;
- grandes canvas sem necessidade;
- dezenas de listeners;
- vídeo 4K;
- partículas em excesso.

---

# 16. Estratégia técnica futura

Sem escrever código ainda, a implementação pode seguir:

### React / TSX
estrutura e estados da experiência.

### SVG
mark separado em grupos:

- book;
- light;
- radial dots;
- axis.

### Framer Motion
adequado para:

- scroll progress;
- transforms;
- opacity;
- orchestration;
- reduced motion.

### CSS
- masks;
- gradients;
- layout;
- performance.

### Rive
avaliar apenas se o morph do símbolo exigir uma animação vetorial muito sofisticada e reutilizável.

Não introduzir Rive só por efeito.

---

# 17. Preparação do asset

O logo precisa ser preparado como asset técnico.

### Separar em grupos vetoriais

```text
COLUS_MARK
├── BOOK
├── LIGHT
├── RADIAL_GROUP
│   ├── DOT_01
│   ├── DOT_02
│   └── ...
└── AXIS
```

### Ferramenta recomendada

Inkscape ou equivalente para:

- limpar paths;
- separar grupos;
- normalizar viewBox;
- preparar SVG.

---

# 18. Media reveal

Duas opções principais.

## A. Book Mask Reveal — recomendada

O livro abre e revela o vídeo por dentro.

### Vantagem
É muito COLUS.

## B. Light Expansion Reveal

A luz/halo cresce e revela o vídeo.

### Vantagem
Mais cinematográfico.

### Direção

Combinar:

> Book controla geometria  
> Light controla atmosfera.

---

# 19. Hero visual final

Quando o morph termina:

```text
[transparent/sticky header]

              radial nodes

     MEDIA REVEALED / VIDEO

COLÉGIO UNIVERSO DOS SONHOS

Juntos Tornamos
Sonhos Em Realidade

[subtexto]

[Descobrir o COLUS]   Marcar uma visita →

open-book curve / transition
```

Mas agora tudo aquilo nasceu da própria marca.

---

# 20. Distinção face ao mercado

O objetivo não é:

> “ter mais animações que outros sites”.

É:

> **fazer a identidade do COLUS tornar-se a própria arquitetura da interação.**

Isso é o elemento realmente diferenciador.

---

# 21. Gate

Antes de high fidelity, ainda precisamos decidir:

- fundo inicial: warm-white ou deep-blue;
- mark inicial: símbolo inteiro ou versão simplificada;
- Book Mask vs Light Reveal;
- posição final dos radial nodes;
- quantos nodes funcionais;
- vídeo vs fotografia;
- tipografia de trabalho.

Depois disso, criar:

> `intro-morph-colus.drawio`

com storyboard completo.
