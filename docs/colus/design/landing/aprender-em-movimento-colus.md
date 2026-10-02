# Aprender em Movimento — High-Fidelity Direction

> **Estado:** HIGH-FIDELITY V0.1 — EM DESENVOLVIMENTO  
> **Data:** 2026-10-02  
> **Escopo:** primeira grande narrativa de conteúdo após o Manifesto.  
> **Base:** Descobrir + Criar, investigação pública COLUS e sistema visual aprovado.
>
> Ainda não é código.

---

## 1. Objetivo

Depois da abertura intensa e do Manifesto silencioso, a landing precisa voltar a ganhar energia.

Não queremos voltar ao padrão “foto → texto → cards → outra foto”.

> **Não é uma grelha de atividades. É uma narrativa viva de descoberta e criação.**

---

# 2. Estrutura narrativa

**Aprender em Movimento**

01 — **DESCOBRIR**  
curiosidade / exploração / experiência

02 — **CRIAR**  
transformar conhecimento em expressão / solução / capacidade

Os dois momentos pertencem à mesma experiência. Não são duas secções independentes.

---

# 3. Conceito visual — Learning Trail

Usar um **eixo vivo** que nasce do pequeno node laranja deixado pelo Manifesto.

Esse eixo:

- entra na secção;
- percorre o espaço;
- toca media;
- ativa labels;
- muda de direção;
- conduz Descobrir → Criar.

Não é uma timeline empresarial. É uma trajetória editorial.

---

# 4. Entrada a partir do Manifesto

O Manifesto termina com Warm Paper, fotografia editorial, um único node laranja e muito espaço.

Ao continuar o scroll:

1. o node desloca-se ligeiramente;
2. deixa uma linha fina;
3. a linha alonga-se;
4. surge o label **APRENDER EM MOVIMENTO**;
5. o primeiro grande media começa a entrar.

Assim, a secção nasce de algo que já estava presente.

---

# 5. Desktop — estrutura geral

Stage aproximado: 190–230vh, com viewport sticky de 100vh e scroll nativo.

Grid conceptual:

- esquerda, 4 colunas → número, headline e copy;
- centro/direita, 7–8 colunas → media stage;
- margem/edge → Learning Trail + contextual nodes.

---

# 6. Momento 01 — Descobrir

Atmosfera:

- Warm White;
- Ink Text;
- Brand Blue discreto;
- fotografia protagonista.

Label:

> **01 / DESCOBRIR**

Headline de trabalho:

> **O conhecimento ganha vida quando existe espaço para explorar.**

Nada de parágrafo institucional longo.

Conteúdo visual suportado pela investigação:

- visitas;
- ambiente;
- aprendizagem prática;
- matemática aplicada;
- descoberta fora da rotina.

---

# 7. Media — Descobrir

O media stage começa com **uma imagem grande**, não mosaico.

O Learning Trail toca o media num ponto específico. Nesse momento surge uma pequena legenda editorial, não um card.

Exemplo de placeholder:

> **Aprender fora da sala**

Sem inventar instituição, data ou número.

Progressão:

- Frame A → uma imagem domina;
- Frame B → abre espaço para uma segunda vista/detalhe;
- Frame C → a segunda imagem cresce enquanto a primeira perde escala;
- Frame D → prepara a passagem para Criar.

Não usar carousel controls. O scroll é a progressão narrativa.

---

# 8. Transição Descobrir → Criar

O Learning Trail:

- chega ao fim do primeiro media;
- curva-se;
- muda de Brand Blue para Brand Orange;
- cruza o eixo visual da secção;
- ativa o número 02.

Ao mesmo tempo:

- o media de exploração perde escala;
- uma nova composição começa a sobrepor-se;
- o fundo aquece ligeiramente.

Leitura:

> **descobrir → transformar → criar**

---

# 9. Momento 02 — Criar

Label:

> **02 / CRIAR**

Headline de trabalho:

> **Conhecimento, expressão e tecnologia encontram novas formas de ganhar vida.**

Conteúdo visual suportado:

- engenharia;
- TIC;
- ciência;
- arte;
- dança;
- línguas.

Não apresentar isto como catálogo curricular.

---

# 10. Media — Criar

Aqui a composição pode ficar mais rica sem virar uma grelha.

Direção:

> **Layered Media Composition**

Uma peça principal + duas peças secundárias.

As peças podem representar experiências diferentes, mas o layout deve parecer editorial, não dashboard.

Micro-labels possíveis:

- Engenharia
- TIC
- Ciência
- Arte
- Línguas
- Expressão

Regras:

- máximo 2–3 simultâneos;
- ligados a nodes;
- desaparecem quando deixam de ter função;
- nada de nuvem de tags.

---

# 11. Brand devices

Intensidade de marca: **MÉDIA**.

Usar:

- Axis / Trail como device principal;
- Radial Nodes funcionais e pontuais;
- Open Book apenas como memória em masks/crop.

Não usar:

- halo grande;
- mark completo;
- splash language;
- radiais em órbita.

A abertura já fez isso.

---

# 12. Cor e tipografia

## Descobrir

Warm White + Deep Ink + COLUS Blue + Orange pontual.

## Transição

Learning Trail muda Blue → Orange.

## Criar

Warm Paper + Deep Ink + Orange mais presente + Bright Blue em pequenos acentos.

Tipografia:

- labels/números → Manrope uppercase, tracking amplo;
- headlines → Manrope 600–700;
- Newsreader deixa de ser protagonista nesta secção.

O Manifesto acabou de usar linguagem editorial/serif. Aqui recuperamos energia e precisão.

---

# 13. Motion

Learning Trail:
- SVG path progress controlado por scroll.

Media:
- scale;
- translate;
- clip/mask;
- crossfade mínimo.

Texto:
- labels por mask;
- copy com pequenas entradas verticais.

Evitar:

- parallax pesado;
- rotação gratuita;
- cards a voar;
- tilt 3D;
- scroll horizontal obrigatório.

Criar três momentos legíveis:

**Descobrir estabiliza → transição curta → Criar estabiliza.**

---

# 14. Mobile

No mobile, remover o sticky storytelling longo.

A composição passa a ser vertical:

**APRENDER EM MOVIMENTO**  
↓  
● 01 DESCOBRIR  
↓  
media grande  
↓  
copy  
↓  
detalhe secundário  
↓  
Learning Trail muda Blue → Orange  
↓  
● 02 CRIAR  
↓  
media principal  
↓  
media secundário  
↓  
copy

O Learning Trail vira uma linha vertical simples.

Vantagens:

- natural para polegar;
- legível;
- mantém identidade;
- não depende de pinning longo;
- melhor performance.

No mobile:

- Descobrir → uma grande imagem + um detalhe secundário;
- Criar → uma imagem grande + uma segunda parcialmente deslocada;
- máximo uma pequena peça complementar.

Nada de três colunas comprimidas.

---

# 15. Acessibilidade e performance

Sem motion, a narrativa continua inteligível na ordem:

**01 Descobrir → media → copy → 02 Criar → media → copy.**

O Trail é decorativo; labels importantes permanecem em HTML real.

Performance:

- responsive sources;
- media otimizado;
- sticky desktop sem listeners excessivos;
- SVG simples;
- evitar canvas;
- não carregar todas as imagens em resolução máxima no início.

---

# 16. Saída para Futuro & Tecnologia

Criar termina com maior presença de Brand Orange e Bright Blue.

O Learning Trail continua e, no final:

- deixa de ser uma linha fina;
- expande ligeiramente;
- entra num plano Deep Blue;
- Futuro & Tecnologia assume.

Fluxo:

**CRIAR → energia → linha expande → DEEP BLUE → FUTURO & TECNOLOGIA**

Assim evitamos um corte seco.

---

# 17. Critério de aprovação

A secção passa se:

- não parece galeria;
- Descobrir e Criar parecem a mesma jornada;
- media domina;
- texto continua legível;
- motion tem função;
- Learning Trail nasce organicamente do Manifesto;
- a saída prepara Futuro & Tecnologia;
- mobile funciona sem depender do desktop;
- nenhuma atividade não suportada é apresentada como facto.

---

# 18. Decisão V0.1

> **Learning Trail + sticky editorial media stage no desktop + narrativa vertical no mobile.**

A próxima revisão visual deve mostrar:

- entrada a partir do Manifesto;
- Descobrir estabilizado;
- transição;
- Criar estabilizado;
- saída para Futuro & Tecnologia.
