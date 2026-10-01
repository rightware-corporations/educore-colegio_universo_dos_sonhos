# Documentação — EduCore / COLUS

A documentação deste repositório está separada por **nível de reutilização**.

```text
docs/
├── colus/
│   ├── inteligencia/
│   ├── arquitetura/
│   └── design/
│       └── landing/
├── educore/
│   └── arquitetura/
└── rightware/
    ├── frameworks/
    └── referencias/
```

## Regra de organização

### `docs/colus/`
Tudo o que é específico do **Colégio Universo dos Sonhos**:
investigação, hipóteses, arquitetura da implementação, direção visual, wireframes e decisões do MVP COLUS.

### `docs/educore/`
Decisões que pertencem ao **produto EduCore** e podem ser usadas por várias escolas, mas não são ainda frameworks genéricos da RIGHTWARE.

### `docs/rightware/frameworks/`
Frameworks, contratos e metodologias **genéricos/reutilizáveis da RIGHTWARE**. Não devem depender do COLUS.

### `docs/rightware/referencias/`
Auditorias, estudos e casos de referência que podem alimentar implementações futuras da RIGHTWARE. Não pertencem à documentação específica do COLUS.

## Regra futura

Antes de criar um documento novo, classificar:

```text
É específico do COLUS?
→ docs/colus/

É uma decisão do produto EduCore?
→ docs/educore/

É uma metodologia/framework reutilizável da RIGHTWARE?
→ docs/rightware/frameworks/

É um estudo/caso usado como referência futura?
→ docs/rightware/referencias/
```

A raiz do repositório não deve acumular documentos de trabalho.
