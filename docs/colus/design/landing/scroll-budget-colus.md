# Scroll Budget — Landing COLUS

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Estado:** CONSOLIDAÇÃO HIGH-FIDELITY  
> **Objetivo:** limitar a duração global da landing sem perder os signature moments.

---

## 1. Princípio

Os valores usados nos storyboards anteriores descrevem espaço narrativo, não uma obrigação literal de implementação.

> **Scroll budget é um limite de ritmo, não uma altura rígida.**

A landing deve permitir:
- leitura;
- contemplação dos media;
- motion controlado;
- scroll rápido sem bloqueio;
- navegação por anchors;
- experiência completa em mobile.

Não usar:
- scroll-snap obrigatório;
- scroll-jacking;
- bloqueio de wheel/touch;
- animações que exigem esperar para continuar.

---

# 2. Budget global — desktop

Faixa alvo para a narrativa principal, sem contar a altura natural do Footer:

> **~1300–1580vh**

Zona preferida com 1–2 testemunhos:

> **~1400–1500vh**

Isto corresponde a uma landing longa/cinematográfica, mas ainda controlada.

---

# 3. Budget por bloco — desktop

| Bloco | Range | Preferido | Sticky / pinning |
|---|---:|---:|---|
| Intro Morph | 180–220vh | **200vh** | signature scrub |
| Hero + Manifesto | 150–180vh | **170vh** | bridge curto, sem pinning longo |
| Aprender em Movimento | 170–195vh | **185vh** | sticky editorial controlado |
| Futuro & Tecnologia | 210–240vh | **230vh** | signature sticky stage |
| Vida COLUS | 140–165vh | **155vh** | mostly natural |
| Pertencer | 115–140vh | **130vh** | natural / partial hold |
| Transformar | 150–175vh | **165vh** | narrative scrub moderado |
| Depoimentos | variável | **100–160vh** | sem carousel/pinning longo |
| Convite Final | 90–100vh | **95vh** | natural |
| Footer | conteúdo | **auto** | nenhum pinning |

---

# 4. Depoimentos — budget variável

O tamanho depende do número real de vozes autorizadas.

Desktop:

```text
1 voz  → ~100vh
2 vozes → ~130vh
3 vozes → ~160vh
```

Máximo recomendado:
> **3 vozes na landing principal.**

Se existirem mais testemunhos, devem ir para outra superfície/página e não alongar indefinidamente a home.

---

# 5. Mobile budget

No mobile, a prioridade é scroll vertical natural.

Faixa de trabalho preferida, sem Footer:

> **~1150–1300svh**

Com três testemunhos pode aproximar-se de:

> **~1350svh**

Budget por bloco:

| Bloco | Preferido mobile |
|---|---:|
| Intro Morph | **140–150svh** |
| Hero + Manifesto | **140–150svh** |
| Aprender em Movimento | **140–150svh** |
| Futuro & Tecnologia | **170–180svh** |
| Vida COLUS | **125–140svh** |
| Pertencer | **110–120svh** |
| Transformar | **130–145svh** |
| Depoimentos | **90svh + ~40svh por voz adicional** |
| Convite Final | **95–105svh** |
| Footer | **auto** |

Não replicar o tempo de pinning desktop no mobile.

---

# 6. Tablet

Tablet deve ficar entre desktop e mobile.

Regra de trabalho:
> **~80–85% do budget controlado de desktop.**

Reduzir prioritariamente:
- pinning;
- path length;
- número de media transforms;
- tempo de hold.

Não apenas escalar a largura.

---

# 7. Onde realmente usar sticky

## Sticky forte
- Intro Morph;
- Futuro & Tecnologia.

## Sticky moderado
- Aprender em Movimento;
- Transformar.

## Brief hold / partial
- Hero → Manifesto;
- Vida COLUS;
- Pertencer.

## Natural flow
- Depoimentos;
- Convite Final;
- Footer.

Esta regra evita que cada secção pareça prender o utilizador.

---

# 8. Tempo de leitura

Cada grande composição precisa estabilizar antes do próximo handoff.

Direção:
- signature moment: **20–35vh** de estado legível/estável;
- narrative moment: **15–25vh**;
- subtle moment: **10–20vh**.

Esses valores estão incluídos no budget da secção.

Não adicionar hold extra por cima do budget.

---

# 9. Fast-scroll contract

Se a pessoa fizer scroll rápido:
- os estados devem interpolar diretamente;
- nenhum frame pode exigir passagem obrigatória por todos os microestados;
- media deve chegar ao state final corretamente;
- Header theme deve atualizar sem atraso;
- anchors continuam funcionais;
- nenhuma animação deve bloquear o input.

> **O utilizador controla a velocidade da experiência.**

---

# 10. Anchor landing state

Ao navegar pelo Header para um anchor:
- aterrar num estado estável da secção;
- não aterrar no meio de um morph;
- respeitar `scroll-margin-top`;
- abrir a secção com headline/media imediatamente legíveis.

Exemplos:
- `#experiencia` → início estável de Aprender em Movimento;
- `#futuro` → headline de Futuro & Tecnologia antes da primeira cena;
- `#comunidade` → início de Pertencer;
- `#contactos` → Convite Final já legível.

---

# 11. Reduced motion budget

Com `prefers-reduced-motion: reduce`, reduzir também o comprimento de secções controladas por scroll.

Direção:
- Intro Morph → Hero direto: remover ~60–80vh;
- Aprender → natural flow: remover ~30–50vh;
- Futuro → cenas naturais: remover ~60–80vh;
- Transformar → natural flow: remover ~30–40vh.

Não deixar espaços vazios que só existiam para animação.

---

# 12. Performance / media budget

Scroll budget e media budget estão ligados.

Guardrails:
- um vídeo hero ativo por vez;
- pausar vídeo fora do viewport quando aplicável;
- lazy-load media abaixo da próxima grande secção;
- prefetch apenas o próximo signature moment;
- não manter múltiplos vídeos em decode durante stages longos.

---

# 13. Budget global preferido — referência

Com uma voz de depoimento:

```text
Intro                 200
Hero + Manifesto      170
Aprender              185
Futuro                230
Vida                  155
Pertencer             130
Transformar           165
Depoimentos           100
Convite                95
-------------------------
TOTAL                1430vh
+ Footer natural
```

Com três vozes:

> **~1490vh + Footer natural**

Estes totais são referências de calibração, não CSS hard-coded.

---

# 14. Critério de aprovação

O Scroll Budget passa se:
- Intro e Futuro continuam memoráveis;
- nenhuma secção secundária parece longa demais;
- no máximo quatro blocos usam sticky relevante;
- mobile não herda pinning longo;
- anchor clicks aterram em states legíveis;
- fast scroll funciona;
- reduced motion encurta o espaço de scroll;
- o Footer permanece natural.

---

# 15. Decisão V0.1

> **Desktop preferido ~1430–1490vh + Footer natural; mobile ~1150–1350svh + Footer natural.**

Próximo passo:

> **COPY STATUS — LOCKED / WORKING / PLACEHOLDER**