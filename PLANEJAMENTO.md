# Planejamento — Migração do site Dr. Arlan Marques

> Documento de referência do projeto. Criado em 2026-09-12. Atualizar conforme
> decisões forem tomadas ou revertidas.

## 1. Contexto — como chegamos aqui

O Dr. Arlan tinha **3 propriedades web** hospedadas na Hostinger, sob domínios/
subdomínios diferentes:

1. **`lp.drarlanneuro.com`** — landing page de **enxaqueca**, construída em
   **React/Vite** (via Google AI Studio / "Antigravity"), com o código-fonte
   já presente nesta pasta (`website-dr-arlan/`). Deploy era feito subindo o
   HTML gerado direto na Hostinger.
2. **`drarlanneuro.com/neurocirurgiao`** — página sobre **cirurgias de
   coluna**, construída em **WordPress + Elementor**.
3. **`drarlanneuro.com/`** e **`drarlanneuro.com/bio`** — páginas com copy de
   **dores crônicas e agudas** (tratamento clínico, não cirúrgico), também em
   **WordPress + Elementor**.

A hospedagem Hostinger expirou (plano "Single") e a conta foi suspensa —
todos os domínios pararam de responder (`ERR_SSL_PROTOCOL_ERROR`). Antes de
perder acesso, foi feito o backup completo pela Hostinger:

- `u271861479.20260908195628.tar.gz` (103MB) — arquivos do site (WordPress
  completo + a pasta `lp/` com o HTML estático da landing page de enxaqueca).
- `u271861479_V2ann.20260908195628.sql.gz` (25MB comprimido / ~307MB
  descomprimido) — dump do banco de dados MySQL do WordPress.

**Decisão tomada:** migrar os 3 sites para um projeto único em React/Vite,
com deploy na **Vercel**, conectado a um repositório Git. Fim da dependência
da Hostinger/WordPress.

## 2. Como o conteúdo foi recuperado (auditoria de segurança dos dados)

Para não arriscar perder ou adulterar a copy original do WordPress (o
conteúdo Elementor fica serializado no banco, ilegível "no olho" a partir do
dump SQL bruto), foi montado um ambiente **WordPress local via Docker**:

1. Extraído o `.tar.gz` para `wp-restore/wp-data/` (arquivos do WordPress).
2. Subido `mysql:8.0` + `wordpress:php8.1-apache` via `docker-compose.yml`
   em `wp-restore/`.
3. Importado o `.sql.gz` no MySQL do container (recriado uma vez após um
   crash do Docker Desktop na primeira tentativa — segunda importação
   confirmada íntegra, 133 posts).
4. Ajustado `wp_options.siteurl`/`home` para `http://localhost:8080` (estava
   apontando para `https://drarlanneuro.com`, causando timeout/redirect
   loop).
5. Desativados os plugins de cache/otimização (LiteSpeed Cache, WebP
   Express, Hostinger Reach etc.) que quebravam o CSS e geravam erro
   "header too large" — mantido apenas o Elementor ativo, suficiente para
   renderizar o conteúdo fielmente.
6. As 3 páginas confirmadas renderizando com sucesso em `localhost:8080`:
   `/`, `/neurocirurgiao/`, `/bio/`.
7. HTML de cada página salvo em
   `../wp_content_extraido/{home,bio,neurocirurgiao}.html`.
8. Copy extraída manualmente e de forma fiel (sem paráfrase) para
   `../wp_content_extraido/copy-{home,bio,neurocirurgiao}.md`.

**Nenhum conteúdo foi perdido.** O ambiente Docker local pode ser desligado
a qualquer momento — os arquivos `.md` de copy e os `.html` extraídos já
capturam tudo que é necessário para a reconstrução.

## 3. Achado importante — slugs e títulos invertidos

No banco original, os `post_title` das páginas WordPress **não batem** com
a expectativa pelo slug:

| Slug (URL) | Título real no `<title>` | Conteúdo real |
|---|---|---|
| `/` (home) | "Dr Arlan Marques – Especialista em Dores Crônicas e Agudas" | Dores crônicas/agudas (tratamento clínico) |
| `/bio` | "Dr Arlan Neurocirurgião – Dr Arlan Marques" | **Idêntico ao `/` (home)** — mesma copy, seção por seção. Único ponto que muda é o número/mensagem de WhatsApp do header e do hero (versão voltada para quem vem do Instagram) |
| `/neurocirurgiao` | "Dr Arlan – Cirurgias em Manaus – Dr Arlan Marques" | Conteúdo próprio: cirurgia de coluna, hérnia de disco, depoimentos de pacientes |

Ou seja: **`/bio` não é uma página de biografia** — é uma cópia da home
adaptada para tráfego do Instagram. Isso faz sentido com o que você
descreveu (mesma copy, CTA diferente).

## 4. Achado importante — número de WhatsApp inconsistente

Nas 3 páginas, a maioria dos links de WhatsApp usa:

```
phone=559291989910   ← SEM o 9º dígito (11 dígitos, inválido para celular BR)
```

Só uma minoria dos links (o item "Agende através do WhatsApp" do bloco de
Contato, nas 3 páginas) usa o número correto:

```
phone=5592991989910  ← COM o 9º dígito (12 dígitos, correto)
```

**Validado com o cliente em 2026-09-12:** o número correto é
**`92 99198-9910`** (`5592991989910` em formato internacional). Na
reconstrução, todos os CTAs de WhatsApp das 3 páginas serão padronizados
para esse número.

## 5. Escopo da migração — o que muda e o que não muda

Conforme alinhado: **isto é uma migração de arquitetura, não um redesign.**

**NÃO muda:**
- Copy (textos, headlines, CTAs, depoimentos — inclusive erros de digitação
  nos depoimentos, que serão preservados como estão, salvo pedido contrário)
- Estrutura de seções e ordem em que aparecem
- Quantidade e conteúdo dos cards/blocos
- Informações de contato, credenciais, endereço

**Identidade visual:** as 3 páginas do site principal (home, neurocirurgião,
bio) usam tema **claro** como base (fundo branco, texto slate-900/700, azul
sky-600 como destaque), mas **alternando seções com as cores reais do site
WordPress original** — extraídas do CSS gerado pelo Elementor
(`wp-content/uploads/elementor/css/post-*.css`) via inspeção do WordPress
local, não estimadas:

| Cor | Hex | Uso no site original |
|---|---|---|
| `brand-navy` | `#112640` | Seções de destaque (Experiência, Sobre o Dr., Local, Depoimentos) |
| `brand-blue` | `#386FA3` | Bloco "Cada Paciente é Único" / doenças |
| `brand-accent` | `#3165AF` | Seção "Pós-graduação em tratamento da dor" |
| `brand-dark` | `#1C1F1E` | Seção de Contato/Mapa e rodapé |
| branco/neutro | `#FFFFFF` / `#F2F2F2` | Header, Procedimentos, Diagnóstico/Sintomas, Tratamentos |

Essas cores foram registradas em `tailwind.config` (`index.html`) como a
paleta `brand`.

**Atualização 2026-09-12:** a LP de enxaqueca (`EnxaquecaPage.tsx`) também
foi convertida para tema **claro**, a pedido do cliente — mantendo a mesma
estrutura, gradientes e sombras do design original, só invertendo para tons
claros (fundo branco/slate-50, texto escuro, os mesmos efeitos de blur/glow
em tons de azul claro). Não é mais dark. De quebra, foi corrigido nessa
página o mesmo bug do número de WhatsApp sem o 9º dígito (usando agora
`buildWhatsappLink` do `lib/whatsapp.ts`, como as outras páginas).

**Hero com imagem de fundo:** as 3 páginas do site principal também tinham,
no original, uma foto de fundo no Hero (`drarlan-bg2.webp`, com
`drarlan-mobile.webp` para telas pequenas) e um overlay em gradiente de
transparente para `#112640` (de cima para baixo), garantindo contraste do
texto branco. Isso foi replicado no componente `src/components/Hero.tsx`,
reutilizado pelas 3 páginas — só mudam título, descrição e CTA.

**PODE mudar (ajuste mínimo):**
- Visual/CSS — cores, hover, componentização — para ficar consistente com o
  padrão de projeto Vite já usado (ex: RVF Odontologia), sem precisar clonar
  pixel a pixel o Elementor
- Correção do número de WhatsApp inconsistente (após validação)
- Otimizações de SEO/GEO/AEO nativas do React/Vite (meta tags, sitemap,
  performance) que o WordPress antigo não tinha bem configuradas

## 6. Arquitetura definida

- **1 repositório, 1 projeto Vite/React** com React Router.
- **1 deploy único na Vercel**, servindo **2 domínios**:
  - `drarlanneuro.com` → rotas `/`, `/neurocirurgiao`, `/bio`
  - `lp.drarlanneuro.com` → landing page de enxaqueca (conteúdo já existente
    em `App.tsx`/`index.html` deste projeto)
- Diferenciação entre os dois domínios feita por **detecção de hostname**
  em runtime (`window.location.hostname`): se for `lp.drarlanneuro.com`,
  renderiza só a LP de enxaqueca (sem header/menu das outras páginas); caso
  contrário, renderiza o site principal com as 3 rotas.

## 7. Checklist de execução

- [x] Backup confirmado íntegro (arquivos + banco)
- [x] WordPress restaurado localmente via Docker para conferência
- [x] Copy das 3 páginas WordPress extraída e revisada
      (`wp_content_extraido/copy-*.md`)
- [x] LP de enxaqueca (Vite) rodando localmente e conferida (`localhost:3000`)
- [x] Confirmar número de WhatsApp correto — `92 99198-9910`
- [ ] Definir estrutura de pastas/componentes do projeto (rotas + hostname
      routing)
- [ ] Migrar imagens usadas nas páginas WordPress (`wp-content/uploads/...`,
      já disponíveis em `wp-restore/wp-data/wp-content/uploads/`) para o
      projeto Vite (`public/images/`)
- [ ] Construir componentes das páginas `/`, `/neurocirurgiao`, `/bio` a
      partir da copy extraída (fidelidade de conteúdo, visual atualizado)
- [ ] Implementar detecção de hostname para `lp.drarlanneuro.com`
- [ ] Testar localmente as 4 URLs (3 rotas do domínio principal + a LP)
- [ ] Conectar ao repositório Git já criado pelo cliente:
      `https://github.com/resilisevennpro/website-drarlanmarques.git`
      (branch `main`, sem branches extras — conforme regra do cliente)
- [ ] Configurar projeto na Vercel apontando para esse repositório
- [ ] **Aguardar aprovação explícita antes de**: apontar DNS, fazer deploy
      em produção, ou desligar/remover o ambiente Docker de conferência
- [ ] Após ar no ar: cancelar/não renovar a hospedagem Hostinger (decisão do
      cliente, não assumir)

## 8. Notas técnicas para quem for codar

- As imagens originais estão em
  `wp-restore/wp-data/wp-content/uploads/2025/...` (alta resolução, `.webp`/
  `.png`/`.avif` conforme o card).
- O carrossel "Local de atendimento" (6 fotos da clínica) e o bloco de mapa
  (screenshot do Google Maps com link) se repetem **idênticos** nas 3
  páginas — dá pra ser um componente único reutilizado.
- O bloco "Sobre o Dr. Arlan Marques" (credenciais, CRM/RQE, bio curta,
  Instagram) também se repete idêntico nas 3 páginas — componente único.
- Rodapé idêntico nas 3 páginas — componente único.
- Os depoimentos (4, com erros de digitação preservados no original) existem
  **somente** na página `/neurocirurgiao`.
- A lista de "doenças tratadas" (12 itens, Aneurismas/Derrames/Epilepsia/
  etc.) existe **somente** em `/` e `/bio`.
