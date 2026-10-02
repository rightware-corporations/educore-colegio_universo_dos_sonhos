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
- `landing/intro-morph-colus.drawio`
- `landing/hero-direction-colus.md`

Este ponto deixa de estar em exploração e pode avançar para high-fidelity.


---

# 17. High-Fidelity iniciado

A landing entrou em high-fidelity visual.

Artefactos atuais:

- `landing/high-fidelity-direction-colus.md`
- `landing/landing-colus-hifi.drawio`

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
- `landing/landing-colus-hifi.drawio` — V0.2.

Próximo foco:

> **APRENDER EM MOVIMENTO — Descobrir + Criar**
