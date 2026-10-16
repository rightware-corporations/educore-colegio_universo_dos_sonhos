# QA — Orientação do vídeo Ciência — 2026-10-16

## Diagnóstico

O `COLUS-FUTURO-CIENCIA-VID-001.mp4` original tem frames físicos `720×720`, SAR/DAR `1:1`, 24 fps e **não contém** `rotation` metadata nem display matrix. Os frames extraídos em `0,5 s`, `2,0 s` e `4,0 s` mostram as pessoas lateralizadas. Portanto, a causa é a orientação dos pixels codificados, não o viewport nem uma transformação CSS do layout.

A rotação anti-horária de 90° (`transpose=2`) foi comparada visualmente com as alternativas horário e 180°. A alternativa anti-horária deixa as pessoas de pé e com a cabeça para cima nos momentos inicial, intermédio e final.

## Solução

Foi criada uma cópia normalizada, sem alterar o original:

- `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4`
- H.264, `720×720`, SAR/DAR `1:1`, 24 fps, CRF 18
- Metadata de rotação explicitamente zero
- Sem transformação CSS e sem zoom adicional
- Poster aprovado mantido como fallback

## Validação no browser

Desktop, em `/?motionQA=1#futuro`:

- Scene 03 ativa numa única Scene Window.
- `videoWidth=720`, `videoHeight=720`, `readyState=4` no carregamento inicial.
- `muted=true`, `playsInline=true`, `loop=true`, `paused=false` durante a cena.
- `transform: none` no elemento `<video>`.
- `currentTime` observado em aproximadamente `0,5 s`, `9,5 s` e `17,5 s`; os três frames permanecem visualmente verticais.
- Ao sair da cena, o IntersectionObserver pausou o vídeo (`paused=true`).
- O texto da cena permaneceu legível e sem crop grave dos rostos.

A validação foi feita no browser sandbox; a captura disponível corresponde ao viewport desktop de `1280×1100`. A execução do fluxo mobile dedicado fica pendente de uma sessão com emulação de viewport móvel.

## Evidências

- `before-raw/`: frames do MP4 original, lateralizados.
- `after-normalized/`: frames do novo MP4, já corrigidos.
- `desktop/`: três capturas do browser durante a reprodução, em momentos distintos.

## Aprovação COLUS — 2026-10-16

**Estado: APROVADO visualmente pelo responsável do projeto para desktop/Edge — Cena 03 / Ciência.**

Após a correção implementada pelo Manus e revista no Edge, o responsável do projeto confirmou na conversa, com captura da cena, que a orientação e a composição estão corretas: «já está validado a cena 3 [...] tem o formato correto, aprovado».

Verificações documentais adicionais: o original `COLUS-FUTURO-CIENCIA-VID-001.mp4` permanece no GitHub, o novo `COLUS-FUTURO-CIENCIA-VID-001-upright.mp4` está presente e o lock do vídeo Hero original permanece intacto.

**Limites desta aprovação:** cobre orientação e enquadramento desktop da Cena 03, em conjunto com os testes de playback documentados acima. Emulação mobile, comparação automática com screenshots baseline e validação integral de Motion QA para toda a landing **continuam pendentes**.

A branch `fix/colus-science-video-orientation` encontra-se idêntica à `main` no commit `087eccd272a74ae40ecb2028fedb34eb8a8f7de3` (já integrado). Não efetuar novo merge.
