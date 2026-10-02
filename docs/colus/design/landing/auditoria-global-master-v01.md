# Auditoria Global — Landing COLUS Master

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Âmbito:** revisão global do `landing-colus-master.drawio` antes da consolidação high-fidelity final.  
> **Estado:** AUDITORIA — não altera ainda o master.

---

## 1. Objetivo

Verificar se a landing funciona como **uma única experiência contínua**, e não apenas como uma coleção de boas secções isoladas.

A revisão cobre:
- ritmo global;
- intensidade visual;
- repetição de devices;
- continuidade de motion;
- coerência tipográfica;
- header/nav;
- CTAs;
- desktop/mobile;
- conteúdo ainda provisório;
- preparação para implementação.

---

# 2. Diagnóstico global

A narrativa principal está coerente e tem uma progressão emocional clara:

```text
MARCA / REVELAÇÃO
→ PROPÓSITO
→ DESCOBERTA / CRIAÇÃO
→ FUTURO
→ VIDA REAL
→ COMUNIDADE
→ CONFIANÇA / PROTAGONISMO
→ VOZ HUMANA
→ CONVITE
→ ASSINATURA EDUCORE / RIGHTWARE
```

O problema principal já não é arquitetura de secções.

O risco agora é **excesso de sistemas visuais/motion com intensidade semelhante**.

Se todos os devices forem executados com força máxima, a landing pode parecer uma demonstração de motion design em vez de uma experiência institucional premium.

---

# 3. O que deve permanecer

## Abertura Morph

É o momento assinatura mais forte da landing.

Deve continuar a ter a maior sofisticação de motion.

## Hero → Manifesto

A desaceleração após a abertura funciona como contraste correto.

## Futuro & Tecnologia

É o segundo grande pico visual.

## Vida COLUS

A redução de branding e o protagonismo da fotografia são importantes para impedir fadiga visual.

## Depoimentos → Convite

A desaceleração final está coerente.

## Footer

O Footer global EduCore / RIGHTWARE funciona como assinatura de produto e separa corretamente cliente, plataforma e empresa.

---

# 4. P0 — pontos a fechar antes de implementação

## P0.1 — Hierarquia global de motion

Existem atualmente vários sistemas:
- Intro Morph;
- Open To Meaning;
- Learning Trail;
- Signal Field;
- Living Reel;
- Community Ring;
- Rise Field;
- Horizon Node;
- Return to Light.

Todos fazem sentido isoladamente, mas não podem ter a mesma intensidade.

### Regra recomendada

**NÍVEL A — assinatura / high motion**
- Intro Morph;
- Futuro & Tecnologia.

**NÍVEL B — motion narrativo médio**
- Hero → Manifesto;
- Aprender em Movimento;
- Transformar.

**NÍVEL C — motion subtil**
- Vida COLUS;
- Pertencer;
- Depoimentos;
- Convite Final.

Resultado esperado:

> menos efeitos diferentes percebidos, mais sensação de um único sistema.

---

## P0.2 — Sistema global do Header

O Header nasce no Hero e depois atravessa secções claras e escuras.

Falta fechar uma tabela única de estados para toda a landing.

Necessário definir:
- transparent / dark hero;
- warm sticky;
- comportamento sobre Futuro & Tecnologia;
- comportamento sobre Transformar;
- retorno a light;
- estado no Convite;
- desaparece ou permanece antes do Footer;
- active anchor states.

Sem isso, a implementação pode introduzir mudanças de header inconsistentes entre secções.

---

## P0.3 — Mapeamento da navegação

Header previsto:
- O Colégio;
- Experiência;
- Futuro;
- Comunidade;
- Contactos.

É necessário mapear cada item para âncoras reais:

```text
O Colégio    → Manifesto
Experiência  → Aprender em Movimento / Vida COLUS
Futuro       → Futuro & Tecnologia
Comunidade   → Pertencer
Contactos    → Convite Final
```

Definir ainda:
- qual secção recebe o anchor quando existem duas candidatas;
- comportamento de active state;
- offset por causa do sticky header.

---

## P0.4 — Duração global / scroll budget

O master contém várias secções com stages longos.

Risco:
> experiência excelente isoladamente, mas longa demais em sequência.

Antes de implementar, fechar um **scroll budget**.

Direção recomendada:
- Intro Morph: pode ser longo;
- Hero/Manifesto: médio;
- Aprender: médio;
- Futuro: longo;
- Vida: médio;
- Pertencer: curto/médio;
- Transformar: médio;
- Depoimentos: curto;
- Convite: curto.

Não transformar todas as secções em 160–280vh reais.

Alguns valores atuais devem ser tratados como storyboard, não como obrigação de implementação.

---

## P0.5 — Copy ainda provisória

Há várias headlines de trabalho.

Antes de implementação, classificá-las como:
- **LOCKED**;
- **WORKING**;
- **PLACEHOLDER**.

Especialmente:
- supporting copy do Hero;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- Pertencer;
- Transformar;
- Depoimentos;
- Convite Final.

Depoimentos continuam obrigatoriamente placeholder até validação real.

---

## P0.6 — Contacto público

A arquitetura de conteúdo previa contacto/localização/email/redes no fecho.

O Convite Final atual possui:
- Marcar uma visita;
- Falar connosco.

Mas ainda não define onde aparecem:
- email;
- telefone;
- localização;
- destino concreto dos CTAs.

Como o Footer agora é global EduCore / RIGHTWARE, estes contactos COLUS não devem depender do Footer.

Precisamos decidir se ficam:
- no Convite Final;
- numa microfaixa entre Convite e Footer;
- ou dentro das ações/modal de contacto.

---

# 5. P1 — refinamentos high-fidelity

## P1.1 — Muitas headlines aspiracionais consecutivas

A landing usa várias frases fortes:
- O futuro também se aprende.;
- A escola acontece em movimento.;
- Crescer é uma jornada partilhada.;
- Quando a confiança cresce, novos caminhos tornam-se possíveis.;
- Venha conhecer de perto o Universo dos Sonhos.

Funcionam isoladamente.

Em sequência, é preciso evitar que cada secção pareça uma campanha diferente.

Recomendação:
- manter headline forte em cada secção;
- reduzir supporting copy e labels;
- não fazer todas as headlines com a mesma escala visual.

---

## P1.2 — Repetição de linha/node

Trail, Signal Field, Story Markers, Community Ring, Rise Axis e Horizon Node partem da mesma família.

Isto é positivo, mas deve parecer evolução do mesmo primitive.

Implementação recomendada:

> **1 primitive de Path + 1 primitive de Node + variantes contextuais.**

Não construir cada secção como sistema gráfico totalmente independente.

---

## P1.3 — Tipografia

Manrope + Newsreader está coerente.

Falta fechar:
- pesos exatos;
- fallback stack;
- escala final desktop/tablet/mobile;
- max-width de headlines;
- line-height final;
- onde Newsreader NÃO pode aparecer.

---

## P1.4 — Footer e mudança de linguagem

A landing COLUS está em português.

O Footer padrão fornecido usa labels e tagline em inglês.

Isto não é necessariamente um erro porque o Footer é assinatura global EduCore / RIGHTWARE.

Mas deve ser uma decisão explícita antes da produção:

> manter Footer global em inglês ou criar versão linguística do mesmo padrão sem alterar arquitetura/branding.

Não alterar automaticamente.

---

# 6. P1 — Mobile

O mobile foi pensado em praticamente todos os blocos, o que é positivo.

Falta fechar globalmente:
- breakpoint tablet;
- quando sticky é removido;
- duração máxima dos stages mobile;
- crop strategy para vídeo/foto;
- menu mobile;
- Footer mobile visual real;
- comportamento de CTA full-width;
- redução de radial/node density.

O Footer tem regra de responsividade, mas ainda não possui frame mobile high-fidelity equivalente aos restantes blocos.

---

# 7. P2 — conteúdo/assets que não bloqueiam esta auditoria

Ficam para Asset Plan:
- logo/mark vetorial oficial;
- media real por secção;
- vídeo do Hero;
- posters;
- testemunhos;
- nomes/contextos;
- contactos validados;
- social URLs;
- links legais/footer;
- destinos de navegação EduCore/RIGHTWARE.

---

# 8. Ritmo recomendado da experiência

```text
ALTO    Intro Morph
↓
MÉDIO   Hero
↓
BAIXO   Manifesto
↓
MÉDIO   Aprender em Movimento
↓
ALTO    Futuro & Tecnologia
↓
BAIXO   Vida COLUS
↓
BAIXO/MÉDIO Pertencer
↓
MÉDIO   Transformar
↓
BAIXO   Depoimentos
↓
BAIXO   Convite Final
↓
FIXO/UTILITÁRIO Footer
```

Este mapa deve orientar a consolidação high-fidelity.

---

# 9. Conclusão da auditoria V0.1

A arquitetura visual global é suficientemente forte para continuar.

Não recomendo redesenhar secções ou alterar a narrativa principal.

O próximo trabalho deve ser **consolidação**, não nova exploração.

Ordem proposta:

1. fechar motion hierarchy;
2. fechar Header + anchors;
3. fechar scroll budget;
4. fechar copy status;
5. fechar contactos/CTA destinations;
6. fechar typography/grid responsive;
7. consolidar o master;
8. depois fazer Asset Plan e Motion Spec técnico.

---

# 10. Gate

> **AUDITORIA GLOBAL V0.1 CONCLUÍDA**

Próximo passo:

> **CONSOLIDAÇÃO HIGH-FIDELITY — começar pela Motion Hierarchy global.**