# Hero Direction — Landing COLUS

> **Estado:** APROVADO COMO ESTADO FINAL DO MORPH  
> **Versão:** 0.1  
> **Data:** 2026-10-01  
> **Escopo:** primeira dobra da landing pública COLUS.
>
> **Regra:** ainda não é implementação nem design pixel-perfect.

---

## 1. Objetivo do Hero

O Hero deve cumprir três funções nos primeiros segundos:

1. **parar o visitante**;
2. **fazer o COLUS reconhecer-se na experiência**;
3. **estabelecer a linguagem visual do resto da landing**.

A primeira impressão deve ser:

> **moderna, cinematográfica, humana, ambiciosa e claramente COLUS.**

---

# 2. Conceito

## Nome interno

> **LUZ QUE ABRE O FUTURO**

Deriva diretamente do símbolo observado:

- livro aberto;
- forma de luz/lâmpada;
- pontos/radiais;
- ideia de conhecimento que se expande.

O Hero não deve mostrar esses elementos de forma literal em excesso.

Deve transformá-los em:

- halo;
- abertura;
- luz;
- expansão;
- ritmo.

---

# 3. Estrutura Desktop

## Viewport

Altura:
- entre 92vh e 100vh;
- mínimo visual confortável em ecrãs menores.

## Media

Vídeo/fotografia full-bleed.

### Preferência
Vídeo curto, silencioso, com cortes entre:

- experiência prática;
- tecnologia;
- ciência/engenharia;
- arte/cultura;
- comunidade/família;
- desporto;
- interação aluno-professor.

### Regra
O vídeo deve parecer **vida escolar real**, não institucional encenada.

---

# 4. Composição

## Header

Sobreposto ao Hero.

### Esquerda
Mark COLUS ou marca compacta.

### Centro / direita
- O Colégio
- Experiência
- Futuro
- Comunidade
- Contactos

### Extrema direita
> **Marcar uma visita**

### Estado inicial
Transparente.

### Estado após scroll
Warm white / blur / contraste alto.

---

# 5. Conteúdo do Hero

## Kicker

> **COLÉGIO UNIVERSO DOS SONHOS**

Pequeno, tracking amplo, institucional.

## Headline

> **Juntos Tornamos**  
> **Sonhos Em Realidade**

Mensagem pública já observada.

## Supporting line — working copy

> Uma experiência de aprendizagem que desperta curiosidade, confiança e visão de futuro.

### Nota
Copy de trabalho. Validar antes de produção.

## CTA principal

> **Descobrir o COLUS**

Função:
scroll para o Manifesto.

## CTA secundário

> Marcar uma visita →

Link textual ou botão de baixo peso visual.

---

# 6. Posicionamento

## Desktop

Conteúdo:
- lower-left;
- largura controlada;
- baseline forte;
- espaço generoso à esquerda e em baixo.

Não centralizar.

### Motivo
A composição assimétrica dá:
- mais carácter editorial;
- mais sofisticação;
- mais espaço para o media respirar.

---

# 7. Overlay

Não usar um overlay escuro uniforme em toda a imagem.

Preferir:

- gradiente localizado atrás do texto;
- vignette suave;
- máscara luminosa;
- contraste adaptativo.

### Objetivo
Preservar a fotografia/vídeo.

---

# 8. Brand Devices no Hero

## Light Device
Principal.

Usar como halo/energia subtil atrás do conteúdo ou numa zona do frame.

## Radial Dot System
Muito reduzido.

Poucos pontos, espaçados, parcialmente visíveis.

## Open Book Device
Não dentro do Hero.

Usar principalmente na **transição Hero → Manifesto**.

## Mark
Pequeno no header.

---

# 9. Transição para o Manifesto

A base do Hero não termina numa linha reta rígida.

Proposta:

> **Open Book Transition**

Uma curva dupla muito subtil inspirada na abertura do livro.

### Comportamento

À medida que o utilizador começa a fazer scroll:

- a curva sobe;
- o Hero recua;
- a superfície warm-white do Manifesto entra;
- o halo desaparece;
- o header ganha fundo claro.

### Resultado
A própria marca explica a transição.

---

# 10. Motion storyboard

## Estado 0 — carregamento
Fundo/media já visível.

Nada de splash longo na landing pública.

## Estado 1 — 0–300ms
Mark/header aparece por fade.

## Estado 2 — 250–700ms
Kicker e headline revelam por máscara/clip vertical.

## Estado 3 — 450–900ms
Supporting line e CTA entram com pequeno deslocamento.

## Estado 4 — 600–1100ms
Halo/radial chega à posição final.

## Scroll
Hero mantém estabilidade.

Não usar parallax forte.

---

# 11. Tipografia de trabalho

Ainda sem congelar família.

## Estrutura recomendada

### Headline
Display com forte personalidade.

Duas direções admissíveis:

**A. Sans editorial forte**
- moderna;
- direta;
- tecnológica;
- alta legibilidade.

**B. Serif contemporânea + sans**
- mais premium;
- mais aspiracional;
- diferencia mais do Páscoa.

### Decisão de trabalho

Para o Hero, testar primeiro:

> **Serif contemporânea para “Sonhos Em Realidade” + sans institucional para o restante**

mas apenas se o resultado continuar moderno.

Se a serif trouxer demasiado “colégio tradicional”, regressar a sans editorial.

---

# 12. Cor

## Texto
Branco ou warm-white sobre media.

## Accent
Brand Orange observado:
`#F18136`

## Deep contrast
Brand/Ink Blue:
`#0C5898` ou navy derivado.

## Bright Blue
Usar muito pouco no Hero.

### Regra
O Hero não deve parecer dividido em azul e laranja.

A cor vem de:
- luz;
- pequenos acentos;
- motion;
- CTA.

---

# 13. CTA

## Primário
Forma elegante, sólida.

Brand Orange ou warm-white, dependendo do frame.

### Não usar
dois botões pesados lado a lado.

## Secundário
link textual com seta.

---

# 14. Mobile

## Regra
Não reduzir o Hero desktop.

Criar composição própria.

### Estrutura
- media vertical;
- header minimal;
- headline em 3–4 linhas;
- CTA principal;
- CTA secundário abaixo;
- menos radial dots;
- Open Book Transition mais simples.

### Altura
100svh quando possível, com fallback seguro.

---

# 15. Performance

Vídeo:

- poster obrigatório;
- compressão agressiva sem perda visual grave;
- preload apenas metadata;
- formatos modernos quando possível;
- mobile pode receber vídeo menor ou imagem estática;
- respeitar save-data quando aplicável.

---

# 16. Acessibilidade

- contraste adequado;
- CTA acessível;
- headline sem texto embutido na imagem;
- prefers-reduced-motion;
- sem autoplay com som;
- vídeo não pode carregar informação essencial exclusiva.

---

# 17. O que NÃO colocar no Hero

- portal;
- login;
- dashboards;
- números não confirmados;
- estatísticas;
- cards;
- múltiplas badges;
- lista de módulos;
- “Powered by EduCore” em destaque;
- mockups do sistema;
- texto longo;
- quatro CTAs.

---

# 18. Critério de aprovação

O Hero está pronto para high fidelity quando:

- funciona com foto e com vídeo;
- a headline continua legível em diferentes frames;
- identidade COLUS é percebida sem repetir o logo completo;
- mobile mantém força;
- transição para Manifesto está clara;
- motion é curto e controlado;
- nenhuma referência ao portal aparece.

---

# 19. Decisão

Direção aprovada para wireframe detalhado:

> **Hero full-bleed + header overlay + conteúdo lower-left + Light Device subtil + CTA principal único + Open Book Transition.**


---

# 20. Evolução — Hero deixa de ser ponto de partida estático

A direção atual passa a ser:

```text
BRAND STAGE
→ MORPH DO SÍMBOLO
→ SCROLL COMPOSITION
→ MEDIA REVEAL
→ HERO ASSEMBLED
```

Portanto, o Hero descrito neste documento é agora o **estado final da primeira transformação**, não o primeiro frame da landing.

## Consequência

- mark começa grande;
- livro abre;
- luz sobe;
- radiais dispersam;
- alguns pontos tornam-se elementos funcionais;
- media é revelado pela geometria da marca;
- headline, CTA e header entram progressivamente;
- Hero final mantém a composição editorial já definida.

Referências principais:

- `conceito-interacao-abertura-colus.md`
- `intro-morph-colus.drawio`


---

# 21. Aprovação

O Hero deste documento permanece válido como **estado final da abertura morph-driven** e está aprovado nessa função.

Referência de interação aprovada:

- `conceito-interacao-abertura-colus.md`
- `intro-morph-colus.drawio` V0.3
