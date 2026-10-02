# Manus Brief — Asset Recollection Round 2

> **Objetivo:** completar apenas os gaps identificados após a auditoria da primeira recolha.  
> **Perfil:** https://www.instagram.com/colus_mz  
> **Pré-requisito:** usar uma sessão normal autenticada no Instagram. Não contornar mecanismos de acesso.

---

## Missão

A primeira recolha trouxe referências úteis via Facebook, mas não conseguiu aceder ao Instagram e quase todas as fotografias vieram como thumbnails 206×206.

Esta segunda ronda NÃO deve repetir download massivo.

Quero apenas os assets P0 abaixo, em maior resolução possível, preservando o original e o URL/post de origem.

---

# 1. HERO — CRITICAL

Selecionar **3 Reels/vídeos candidatos**.

Critérios:
- alunos reais em movimento;
- energia e escola viva;
- vários planos/profundidades;
- interação;
- qualidade cinematográfica;
- espaço negativo ou enquadramento que permita headline.

Entregar:
- vídeo original/highest quality acessível;
- 1 poster/frame forte por vídeo;
- URL do Reel/post;
- orientação e resolução;
- nota de por que é candidato Hero.

Não escolher apenas pelo tema.

---

# 2. BRAND / MARK — CRITICAL

Procurar:
- logo COLUS com maior resolução;
- PNG transparente;
- mark/símbolo isolado;
- aplicações de marca onde o símbolo apareça limpo;
- qualquer PDF/SVG oficial publicamente disponibilizado no perfil/link/website.

Não recriar nem vetorizar nesta etapa.

---

# 3. FUTURO & TECNOLOGIA — P0

## TIC / Segurança Digital

Procurar conteúdo de:
- Segurança nas TIC;
- INTIC;
- tecnologia/digital.

Selecionar 2–3 originais.

## Engenharia

Procurar:
- sessão/palestra de engenharia;
- Eng. Juma Cangy quando aplicável;
- engenheiras/profissionais;
- alunos em interação.

Selecionar 2–3 originais.

## Meninas nas TIC

Selecionar 1–2 imagens originais fortes.

Critério:
- protagonismo;
- confiança;
- contexto tecnológico.

---

# 4. PERTENCER / FAMÍLIA — P0

Procurar:
- Dia Internacional da Família;
- Dia do Desporto com pais/encarregados;
- aluno + adulto;
- família/comunidade em interação.

Selecionar 3–4 originais.

Evitar usar apenas fotografia de grupo posada.

---

# 5. APRENDER / DESCOBERTA EXTERNA — P0

Procurar especificamente:
- Museu de História Natural;
- Estação de Tratamento de Águas de Umbelúzi;
- visitas de estudo;
- aprendizagem fora da sala.

Selecionar 3–4 originais.

---

# 6. VIDA COLUS / EXPRESSÃO — P0/P1

Procurar:
- dança;
- Spelling Bee;
- Dia de África em ação;
- arte/performance;
- eventos escolares espontâneos.

Selecionar 4–6 originais com variedade.

---

# 7. TRANSFORMAR / AVANÇAR — P0

Selecionar 1–2 imagens humanas particularmente fortes com:
- confiança;
- protagonismo;
- descoberta;
- apresentação;
- tecnologia/engenharia/Spelling Bee quando possível.

---

# 8. RE-DOWNLOAD HIGH-RES DOS MOMENTOS JÁ IDENTIFICADOS

Na primeira ronda encontrámos bons thumbnails de ciência/prática.

Se encontrares os mesmos posts/momentos no Instagram, descarrega os originais/highest quality de:
- feira de ciências;
- alunos em experiências práticas;
- atividades de laboratório/experimento;
- treino/desporto em ação.

Não precisamos de todas as imagens do carrossel: escolher as melhores 1–2 por momento.

---

# 9. Não recolher

- testemunhos para inventar quotes;
- posters quando há fotografia/vídeo real;
- screenshots da UI;
- duplicados;
- fotografias quase iguais;
- conteúdo sem contexto identificável;
- WhatsApp/booking/contact flow.

---

# 10. Entrega

Adicionar os novos ficheiros numa pasta:

`colus-landing-assets-round2/`

Subpastas:
```text
00-brand/
01-hero/
02-aprender-descoberta/
03-futuro-tic/
04-futuro-engenharia/
05-futuro-meninas-tic/
06-vida-colus/
07-pertencer-familia/
08-transformar-avancar/
manifest/
```

Gerar:
- `assets-round2.csv`;
- `README.md`;
- `colus-landing-assets-round2.zip`.

Campos CSV:
`asset_id, section, source_post_url, local_filename, media_type, resolution, duration, orientation, priority, status, rights_status, notes`

Status inicial:
> `CANDIDATE`

Rights:
> `NEEDS_AUTHORIZATION` para media com pessoas, salvo asset oficial de marca.

---

# 11. Quantidade

Alvo:
> **18–28 novos assets no máximo**

Qualidade e cobertura dos gaps são mais importantes do que quantidade.

---

# 12. Critério de sucesso

A ronda só é considerada completa se trouxer:
- pelo menos 3 candidatos Hero em vídeo;
- pelo menos 1 asset TIC;
- pelo menos 1 asset Engenharia;
- pelo menos 1 asset Meninas nas TIC;
- pelo menos 2 assets Família/encarregados em interação;
- pelo menos 2 assets de visita/descoberta externa;
- versões high-res de pelo menos 3 bons momentos científicos já identificados.

Se algum destes itens não existir ou não estiver acessível, listar explicitamente como `NOT_FOUND` em vez de substituir por conteúdo genérico.