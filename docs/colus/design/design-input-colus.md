# Design Input — COLUS / EduCore

> **Estado:** DIREÇÃO DA LANDING EM DESENVOLVIMENTO  
> **Data:** 2026-10-01  
> **Objetivo:** recolher decisões de experiência e personalização antes do início do código.

---

## 1. Princípio

A arquitetura técnica já está suficientemente definida.

Agora precisamos desenhar o **COLUS como produto vivido**, não apenas como sistema funcional.

A regra é:

> **Não fazer “Páscoa com outra cor”.**

O COLUS deve ter identidade, ritmo, hierarquia e experiência próprias.

---

# 2. Primeira impressão

Definir:

- o que deve aparecer quando alguém abre o sistema;
- que mensagem o produto deve transmitir nos primeiros 10 segundos;
- se a primeira experiência deve parecer mais institucional, moderna, tecnológica, familiar, premium, académica ou outra;
- o que deve distinguir imediatamente o COLUS de outras implementações EduCore.

---

# 3. Landing pública

Decidir:

- hero;
- mensagem principal;
- imagens;
- provas institucionais;
- secções;
- destaque a família;
- destaque a tecnologia;
- destaque a atividades;
- CTA principal;
- acesso ao portal.

---

# 4. Login

Decidir:

- estrutura visual;
- branding;
- mensagem;
- seleção de perfil ou login único;
- se deve existir demo mode;
- o que é visível antes da autenticação.

---

# 5. Dashboard principal

Definir o que deve transmitir primeiro.

Possíveis eixos:

- controlo;
- tranquilidade;
- desempenho;
- família;
- atividade escolar;
- financeiro;
- risco;
- comunicação.

---

# 6. Perfis

## Direção

Definir:

- KPIs;
- alertas;
- decisões;
- visão académica;
- visão financeira;
- auditoria;
- relatórios.

## Encarregado

Definir:

- educandos;
- presença;
- notas;
- calendário;
- comunicados;
- pagamentos;
- documentos;
- autorizações;
- notificações.

## Professor

Definir:

- turmas;
- horário;
- presença;
- avaliações;
- notas;
- conteúdos;
- comunicação.

## Secretaria

Definir:

- admissões;
- matrículas;
- alunos;
- documentos;
- turmas;
- regularidade.

## Pedagogia

Definir:

- acompanhamento;
- risco;
- aprovações;
- professores;
- avaliações;
- relatórios.

## Financeiro

Definir:

- obrigações;
- pagamentos;
- validação;
- recibos;
- saldos;
- relatórios.

## Aluno

Definir se entra no MVP e, se sim:

- notas;
- horários;
- conteúdos;
- avaliações;
- notificações;
- finanças;
- comunicação.

---

# 7. Módulos P0

Precisamos fechar quais módulos têm de estar impecáveis na primeira apresentação.

Critério:

> poucos módulos, mas suficientemente bons para parecer um produto pensado para o COLUS.

---

# 8. Módulos ocultos

Algumas capacidades podem existir na base, mas não precisam aparecer no MVP.

Definir:

- o que fica invisível;
- o que aparece como “em breve”;
- o que não deve ser mostrado de todo.

---

# 9. Narrativa da demo

Precisamos escolher uma história.

Exemplo:

```text
Secretaria cria/acompanha aluno
→ Professor marca presença
→ Encarregado recebe visibilidade
→ Pedagogia acompanha
→ Financeiro atualiza estado
→ Direção vê impacto
```

A história final deve ser específica para o COLUS.

---

# 10. Identidade visual

Definir:

- cores;
- tipografia;
- densidade;
- bordas;
- ícones;
- estilo de cards;
- fotografia;
- uso de espaços;
- tom institucional;
- mobile experience.

A identidade deve respeitar sinais públicos do COLUS, mas não precisa reproduzir literalmente o Instagram.

---

# 11. Diferenciação COLUS

Pergunta central:

> **Se alguém abrir COLUS e Páscoa lado a lado, o que deve fazer perceber imediatamente que foram desenhados para instituições diferentes?**

Responder através de:

- estrutura;
- layout;
- prioridades;
- conteúdo;
- jornadas;
- módulos;
- linguagem;
- identidade.

---

# 12. Primeiro contacto

Definir exatamente o que será aberto na apresentação.

Possibilidades:

- landing;
- login;
- dashboard da direção;
- portal do encarregado;
- fluxo cross-role.

A primeira tela é parte da estratégia comercial.

---

# 13. Definition of Done do MVP

O MVP estará pronto para apresentação quando:

- identidade COLUS for convincente;
- P0 estiver funcional;
- cenário principal funcionar de ponta a ponta;
- dados simulados forem consistentes;
- cross-role refletir o mesmo estado;
- Super Admin estiver coerente com a plataforma RIGHTWARE;
- não houver referências visíveis ao Páscoa;
- não houver claims técnicos falsos;
- demo puder ser feita sem explicar bugs ou placeholders críticos;
- reset da demo funcionar;
- experiência mobile principal estiver aceitável;
- deployment estiver estável.

---

# 14. Ordem da próxima conversa

Para evitar desenhar tudo ao mesmo tempo, fechar nesta ordem:

1. visão geral e primeira impressão;
2. landing;
3. dashboard da direção;
4. experiência do encarregado;
5. professor;
6. secretaria/pedagogia;
7. financeiro;
8. aluno;
9. Super Admin;
10. narrativa final da demo;
11. módulos ocultos;
12. Definition of Done final.


---

# 15. Progresso — Landing

Fechado até agora:

- landing como experiência pública independente;
- nenhuma ligação pública ao portal;
- direção criativa;
- auditoria visual;
- identidade visual preliminar;
- arquitetura de conteúdo;
- wireframe estrutural V0.1 em `landing-colus-wireframe.drawio`.

A landing ainda precisa de crítica/revisão antes de seguir para design visual final.


---

# 16. Aprovação — abertura da Landing

Em 2026-10-01 foi aprovada a direção da abertura da landing COLUS:

- intro morph-driven;
- símbolo COLUS como origem da interação;
- Book Open / Book Aperture;
- Light Device como halo/reveal;
- Radial System com uso funcional controlado;
- scroll nativo;
- composição distinta para desktop e mobile;
- Hero como estado final do morph.

Referências:

- `landing/conceito-interacao-abertura-colus.md`
- `landing/landing-colus-master.drawio` — abertura no início do canvas
- `landing/hero-direction-colus.md`

Este ponto deixa de estar em exploração e pode avançar para high-fidelity.


---

# 17. High-Fidelity iniciado

A landing entrou em high-fidelity visual.

Artefactos atuais:

- `landing/high-fidelity-direction-colus.md`
- `landing/landing-colus-master.drawio`

Decisões de trabalho atuais:

- Warm Paper `#FFF8EF`;
- Deep Ink `#071A2A`;
- Orange observado `#F18136`;
- Deep Blue observado `#0C5898`;
- Bright Blue observado `#2899EF`;
- Manrope para interface/body;
- Newsreader para momentos editoriais;
- Hero final assimétrico;
- Book Aperture como memória geométrica do símbolo;
- mobile tratado como composição própria;
- Manifesto como desaceleração visual após o morph.

Estas decisões ainda são high-fidelity V0.1 e podem ser refinadas sem alterar a coreografia morph já aprovada.


---

# 18. High-Fidelity V0.2 — Hero Assembly + Manifesto

Foi detalhada a passagem:

```text
Book Aperture
→ Hero Assembly
→ pausa de leitura
→ Open To Meaning
→ Manifesto
```

Decisões atuais:

- Axis do símbolo origina o kicker institucional;
- headline entra em dois comportamentos tipográficos distintos;
- header completa-se apenas no final da montagem;
- Hero mantém uma pausa curta antes da saída;
- Hero → Manifesto usa Open Book Bridge;
- media mantém continuidade de container/crop;
- Deep Ink evolui para Warm Paper sem wipe reto;
- Manifesto reduz drasticamente a intensidade de branding/motion;
- mobile possui composição e transição próprias.

Referências:

- `landing/high-fidelity-direction-colus.md` — V0.2;
- `landing/landing-colus-master.drawio` — V0.2.

Próximo foco:

> **APRENDER EM MOVIMENTO — Descobrir + Criar**


---

# 19. High-Fidelity V0.3 — Aprender em Movimento

Foi definida a primeira grande narrativa de conteúdo depois do Manifesto:

> **APRENDER EM MOVIMENTO**

Estrutura:

- **01 / Descobrir**
- **02 / Criar**

Direção principal:

- Learning Trail nasce do node residual do Manifesto;
- desktop usa sticky editorial media stage;
- Descobrir começa com uma imagem dominante;
- transição Blue → Orange conduz à fase Criar;
- Criar usa layered media composition, sem cards iguais;
- brand intensity média;
- Light Device praticamente ausente;
- mobile usa narrativa vertical, sem sticky longo;
- saída expande o Trail para preparar Futuro & Tecnologia.

Referências:

- `landing/aprender-em-movimento-colus.md`
- `landing/high-fidelity-direction-colus.md` — V0.3
- `landing/landing-colus-master.drawio` — V0.3

Próximo foco:

> **FUTURO & TECNOLOGIA — secção assinatura**


---

# 20. Consolidação Draw.io

A landing passa a ter um único ficheiro visual canónico:

> `landing/landing-colus-master.drawio`

Objetivo:

- abrir apenas um ficheiro;
- acompanhar a experiência desde a abertura até ao footer;
- manter páginas internas para detalhe sem fragmentar o projeto;
- preservar a abertura Morph aprovada dentro do mesmo artefacto;
- continuar todas as próximas secções no mesmo master.

Os antigos Draw.io separados foram arquivados e deixam de fazer parte do fluxo ativo.


---

# 21. High-Fidelity V0.5 — Futuro & Tecnologia

Foi definida a secção assinatura:

> **O futuro também se aprende.**

Conceito:

> **Signal Field**

Estrutura:

- 01 / TIC;
- 02 / Engenharia;
- 03 / Ciência;
- 04 / Segurança Digital.

Decisões:

- quatro cenas, não quatro cards;
- stage Deep Blue / Deep Ink;
- Scene Window transformável;
- Signal Field contínuo;
- Light Device retorna com função de conexão;
- sem estética SaaS, HUD, neon ou sci-fi genérico;
- mobile usa cenas verticais, sem sticky longo;
- saída humaniza a experiência e prepara Vida COLUS;
- nenhum claim de equipamento, laboratório, certificação ou parceria sem validação.

Referências:

- `landing/futuro-tecnologia-colus.md`
- `landing/landing-colus-master.drawio` — bloco Futuro & Tecnologia
- `landing/high-fidelity-direction-colus.md` — V0.5

Próximo foco:

> **VIDA COLUS**


---

# 22. High-Fidelity V0.6 — Vida COLUS

Foi definida a experiência editorial:

> **VIDA COLUS**

Conceito:

> **Living Reel**

Estrutura:

- Imersão;
- Ritmo;
- Presença.

Decisões:

- fotoensaio vivo, não galeria;
- fotografia protagonista;
- 1 media principal + 1 secundário + 1 detalhe no máximo;
- Story Markers substituem nodes tecnológicos;
- branding low / medium-low;
- sem masonry;
- mobile usa narrativa vertical própria;
- último frame humano prepara a secção Pertencer.

Referências:

- `landing/vida-colus.md`
- `landing/landing-colus-master.drawio` — bloco Vida COLUS
- `landing/high-fidelity-direction-colus.md` — V0.6

Próximo foco:

> **PERTENCER — Família & Comunidade**


---

# 23. Master convertido para canvas contínuo

A estrutura multipage foi substituída por um **único canvas contínuo**.

O `landing/landing-colus-master.drawio` contém fisicamente, em sequência vertical:

- Abertura Morph;
- Hero + Manifesto;
- Aprender em Movimento;
- Futuro & Tecnologia;
- Vida COLUS;
- espaço reservado para Pertencer → Transformar → Depoimentos → Convite → Footer;
- apêndice visual de tokens/componentes.

Objetivo:

> abrir um único ficheiro e acompanhar todo o desenho da landing sem trocar de páginas internas.


---

# 24. High-Fidelity V0.7 — Pertencer

Foi definida a secção:

> **PERTENCER — Família & Comunidade**

Conceito:

> **Community Ring**

Decisões:

- o anel humano do símbolo COLUS passa a ter uso explícito;
- a secção não usa layout genérico de “família + texto”;
- Acompanhar → Participar → Crescer juntos formam relações editoriais, não cards;
- ring incompleto liga media e conteúdo;
- mobile usa curva lateral vertical;
- saída abre o ring e transforma-o num eixo para Transformar.

Referências:

- `landing/pertencer-colus.md`
- `landing/sistema-identidade-visual-colus.md`
- `landing/landing-colus-master.drawio` — bloco Pertencer
- `landing/high-fidelity-direction-colus.md` — V0.7

Próximo foco:

> **TRANSFORMAR**


---

# 25. High-Fidelity V0.8 — Transformar

Foi definida a secção:

> **TRANSFORMAR**

Conceito:

> **Rise Field**

Estrutura:

- 01 / Expressar;
- 02 / Construir;
- 03 / Avançar.

Decisões:

- eixo herdado do Community Ring;
- Orange ganha intensidade sem virar bloco sólido;
- media continua humano e contextual;
- sem clichés de crescimento, foguetes ou setas;
- mobile usa axis lateral e progressão vertical;
- eixo final abre num horizonte;
- saída desacelera para Depoimentos.

Referências:

- `landing/transformar-colus.md`
- `landing/landing-colus-master.drawio` — bloco Transformar
- `landing/high-fidelity-direction-colus.md` — V0.8

Próximo foco:

> **DEPOIMENTOS**


---

# 26. High-Fidelity V0.9 — Depoimentos

Foi definida a secção:

> **DEPOIMENTOS**

Conceito:

> **Voice in Focus**

Decisões:

- uma voz de cada vez;
- sem cards, estrelas ou review widget;
- Horizon Node herda o horizonte de Transformar;
- media/retrato é opcional;
- mobile usa sequência vertical;
- sem auto-rotation;
- demonstrador usa placeholders explícitos até existirem testemunhos reais/autorizados;
- saída prepara o convite final.

Referências:

- `landing/depoimentos-colus.md`
- `landing/landing-colus-master.drawio` — bloco Depoimentos
- `landing/high-fidelity-direction-colus.md` — V0.9

Próximo foco:

> **CONVITE FINAL + FOOTER**


---

# 27. High-Fidelity V0.10 — Convite Final

Foi definido o fecho narrativo antes do Footer:

> **CONVITE FINAL**

Conceito:

> **Return to Light**

Decisões:

- Horizon Node de Depoimentos transforma-se em halo;
- Light Device regressa como proximidade;
- mark subtil;
- headline central;
- CTA principal: **Marcar uma visita**;
- CTA secundário: **Falar connosco →**;
- Open Book memory na base;
- sem media pesado;
- mobile possui fecho próprio;
- Portal/Login continuam ausentes;
- Footer não foi desenhado neste passo.

Referências:

- `landing/convite-final-colus.md`
- `landing/landing-colus-master.drawio` — bloco Convite Final
- `landing/high-fidelity-direction-colus.md` — V0.10

Próximo e último foco da landing:

> **FOOTER — integrar a definição já existente do utilizador**


---

# 28. High-Fidelity V0.11 — Footer integrado

O Footer definido pelo utilizador foi integrado sem reinvenção.

Fonte de padrão:

- `../../educore/design/footer-standard.md`

Aplicação COLUS:

- variante Dark;
- integrada depois do Convite Final;
- estrutura EduCore / RIGHTWARE preservada;
- sem substituir pelo logo COLUS;
- sem alterar colunas, lockup, social ou legal.

Referência visual:

- `landing/landing-colus-master.drawio` — bloco Footer

Com isto, a landing pública está definida do Intro Morph ao Footer.

Próximo gate:

> **REVISÃO GLOBAL / CONSOLIDAÇÃO ANTES DE IMPLEMENTAÇÃO**


### Regra final de Footer — COLUS

Linha legal aprovada:

> **© 2026 Colégio Universo dos Sonhos. Todos os direitos reservados.**  
> **Powered by EduCore · A RIGHTWARE Product**

Elementos de marca obrigatórios no Footer:

- logo EduCore;
- logo RIGHTWARE;
- relação explícita **A RIGHTWARE Product**.

A marca institucional COLUS é titular do copyright do site, enquanto EduCore/RIGHTWARE permanecem visíveis como assinatura da plataforma/produto.


---

# 29. Consolidação — Motion Hierarchy V0.1

Foi consolidado o sistema global de motion da landing.

Hierarquia:

- **Signature:** Intro Morph; Futuro & Tecnologia.
- **Narrative:** Hero → Manifesto; Aprender em Movimento; Transformar.
- **Subtle:** Vida COLUS; Pertencer; Depoimentos; Convite Final.
- **Static / Utility:** Footer.

Primitives globais:

- Path;
- Node;
- Mask;
- Light / Halo;
- Media Window.

Regra:

> **1 movimento dominante + 1 secundário + 1 micro-interação por viewport.**

Mobile reduz a intensidade para aproximadamente 50–60% do desktop.

Referências:

- `landing/motion-hierarchy-colus.md`
- `landing/landing-colus-master.drawio` — painel Motion Hierarchy
- `landing/high-fidelity-direction-colus.md` — V0.12

Próximo foco:

> **HEADER + ANCHORS GLOBAL SYSTEM**
