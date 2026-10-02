# Contactos + CTA Destinations — Landing COLUS

> **Versão:** V0.1  
> **Data:** 2026-10-02  
> **Estado:** CONSOLIDAÇÃO HIGH-FIDELITY  
> **Objetivo:** fechar onde aparecem os contactos públicos e o comportamento dos CTAs sem inventar um processo interno de marcação.

---

## 1. Princípio

A landing deve permitir contacto real sem fingir que existe um sistema de reservas, WhatsApp institucional, agenda ou formulário interno que não foi confirmado.

> **A interface pode organizar canais públicos; não deve inventar workflow operacional.**

---

# 2. Evidência pública disponível

## 2.1 Telefone principal

**PUBLICAMENTE CORROBORADO**

> **+258 84 700 0242**

Foi observado anteriormente nos canais públicos do projeto e continua listado em diretório público recente do COLUS.

Uso no demonstrador:
> **SIM**

Produção:
> **revalidar antes do go-live.**

---

## 2.2 Localização

**CORROBORADA ENTRE FONTES**

Apresentação pública curta:
> **Matola-Rio · KM 16**

Contexto legal:
> Chinonanquila “B”, Matola Rio, distrito de Boane.

Uso no demonstrador:
> **SIM — usar a forma curta `Matola-Rio · KM 16`.**

Não criar um pin exato/mapa de navegação sem validar coordenadas/localização operacional final.

---

## 2.3 Email

**OBSERVADO NO PERFIL PÚBLICO ANALISADO PELO PROJETO**

> **info@colus.ac.mz**

O email foi registado na Inteligência Operacional a partir do perfil Instagram observado.

Uso no demonstrador:
> **SIM, com estado `VERIFY_BEFORE_PRODUCTION`.**

Antes de outreach/go-live:
> confirmar novamente no canal oficial.

---

## 2.4 Instagram

**OBSERVADO NO PERFIL PÚBLICO ANALISADO PELO PROJETO**

> **@colus_mz**

Uso no demonstrador:
> **SIM, como social link.**

Produção:
> validar URL final.

---

## 2.5 Outros telefones observados anteriormente

A Inteligência Operacional registou também:
- +258 70 861 985;
- +258 84 700 0224.

Estado:
> **NÃO USAR NESTA VERSÃO DA LANDING.**

Motivo:
- não são necessários para a experiência;
- o número principal já está corroborado;
- evitar múltiplos canais antes de revalidação.

---

# 3. Onde ficam os contactos

Decisão:

> **os contactos COLUS pertencem ao Convite Final, não ao Footer EduCore / RIGHTWARE.**

O Footer mantém a assinatura global de produto.

O Convite Final recebe uma pequena camada utilitária depois dos CTAs:

```text
Marcar uma visita
Falar connosco →

info@colus.ac.mz
+258 84 700 0242
Matola-Rio · KM 16
@colus_mz
```

Visual:
- discreto;
- uma única linha no desktop quando houver espaço;
- 2×2 ou stack curto no mobile;
- sem parecer diretório de contactos.

---

# 4. CTA routing — Header

## Marcar uma visita

Destino no demonstrador:
> **`#contactos`**

Ação:
- scroll para o Convite Final;
- aterra no estado estável;
- não abre formulário automaticamente.

Motivo:
> o Header orienta; o Convite Final explica e apresenta o canal real.

---

# 5. CTA routing — Hero

## Descobrir o COLUS

Destino:
> **`#o-colegio`**

## Marcar uma visita →

Destino:
> **`#contactos`**

Sem modal e sem navegação externa durante a primeira dobra.

---

# 6. CTA routing — Convite Final

## Primário — Marcar uma visita

No demonstrador:
> **abre uma ação de email simples** para o email público observado.

Destino técnico de trabalho:

`mailto:info@colus.ac.mz?subject=Pedido%20de%20visita%20ao%20COLUS`

Importante:
- isto não afirma que o COLUS tenha um sistema formal de marcações;
- apenas inicia contacto no canal público observado;
- endereço deve ser revalidado antes de produção.

## Secundário — Falar connosco →

No demonstrador:
> **`tel:+258847000242`**

Motivo:
- número publicamente corroborado;
- ação direta;
- não inventa WhatsApp ou chat.

---

# 7. Contact strip

Após os CTAs, inserir:

### Email
> info@colus.ac.mz

### Telefone
> +258 84 700 0242

### Localização
> Matola-Rio · KM 16

### Instagram
> @colus_mz

Interações:
- email → `mailto:`;
- telefone → `tel:`;
- Instagram → link externo;
- localização → texto simples nesta fase.

Não abrir mapa até existir localização operacional final validada.

---

# 8. Desktop

Convite Final mantém o foco visual:
- headline;
- supporting copy;
- CTA principal;
- CTA secundário.

Contact strip entra abaixo com peso visual baixo.

Não adicionar formulário.

Não adicionar card de contacto.

---

# 9. Mobile

Ordem:

```text
headline
supporting copy
[ Marcar uma visita ]
Falar connosco →

Email
Telefone
Localização
Instagram
```

Regras:
- CTA principal quase full-width;
- telefone/email com touch target mínimo;
- contact strip em stack ou 2×2;
- sem QR code;
- sem map embed.

---

# 10. Estados de implementação

```text
+258 84 700 0242       → PUBLICLY_CORROBORATED
Matola-Rio · KM 16     → PUBLICLY_CORROBORATED
info@colus.ac.mz       → PUBLICLY_OBSERVED / VERIFY_BEFORE_PRODUCTION
@colus_mz              → PUBLICLY_OBSERVED / VERIFY_BEFORE_PRODUCTION
```

Os estados são internos e não aparecem para o visitante.

---

# 11. O que não fazer

Não implementar ainda:
- WhatsApp CTA;
- formulário que envia dados;
- calendário/booking;
- integração com Google Maps;
- chat;
- horário de atendimento como facto oficial;
- outros telefones;
- promessa de resposta;
- SLA.

---

# 12. Acessibilidade

- telefone legível e clicável;
- email legível e clicável;
- links externos identificáveis;
- não depender apenas de ícones;
- `aria-label` específico para social;
- foco visível;
- evitar `target=_blank` sem aviso acessível quando aplicável.

---

# 13. Gate

O sistema Contactos + CTA passa se:
- Header/Hero apontam para `#contactos`;
- Convite Final contém os canais públicos;
- primary CTA não finge booking;
- secondary CTA usa telefone corroborado;
- email/social ficam marcados internamente para revalidação;
- Footer continua global EduCore / RIGHTWARE;
- não existe WhatsApp/form/mapa inventado.

---

# 14. Decisão V0.1

> **Contactos COLUS no Convite Final + Header/Hero fazem anchor scroll + CTA final usa email/telefone públicos sem inventar workflow.**

Próximo passo:

> **TYPOGRAPHY + GRID RESPONSIVE SYSTEM**