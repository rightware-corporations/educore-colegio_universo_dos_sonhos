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
