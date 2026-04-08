# Aplicativo com Cálculos do Winston

Aplicação web desenvolvida com HTML, CSS e JavaScript para facilitar cálculos de matemática financeira e álgebra.

O objetivo do projeto é deixar os cálculos mais simples de entender, com uma interface organizada, interativa e didática.

## Acesso online

- Site publicado no InfinityFree: https://appdowinston.gamer.gd/

## Índice

Para filtrar por algum dos campos abaixo, aperte Ctrl + F e pesquise por:

- O que o projeto faz
- Como o usuário deve usar
- Passo a passo das telas de juros
- Passo a passo das telas de equações
- Passo a passo das inequações
- Conjuntos
- Domínio e Imagem
- Histórico de cálculos
- Requisitos do projeto
- Tecnologias usadas
- Como executar localmente
- Observações importantes

## O que o projeto faz

O sistema possui as seguintes telas:

- Juros Compostos
- Juros Simples
- Equação do 1º grau
- Equação do 2º grau
- Inequação do 1º grau
- Inequação do 2º grau
- Conjuntos
- Domínio e Imagem (com gráfico interativo)
- Histórico de cálculos

## Como o usuário deve usar

### 1. Abrir a tela desejada
Na barra superior, escolha o tipo de cálculo que deseja fazer.

### 2. Preencher os campos
Digite os valores pedidos em cada campo.

- Nos campos numéricos, o usuário deve informar apenas números.
- Nos campos de seleção, deve escolher uma unidade válida, como dia, mês ou ano.
- Os campos de juros mostram explicações e exemplos rápidos para orientar o preenchimento.

### 3. Calcular
Clique no botão correspondente:

- `Calcular` para juros
- `Resolver` para equações e inequações

### 4. Ler o resultado
O resultado aparece logo abaixo dos botões, com mensagens de erro claras caso algum dado esteja incorreto.

Alguns resultados são acompanhados de gráficos para melhor visualização da solução (Domínio e Imagem exibe um gráfico cartesiano interativo).

### 5. Consultar histórico
Na aba **Histórico**, você pode ver um registro de todos os cálculos realizados durante a sessão.

## Passo a passo das telas de juros

### Juros compostos
A fórmula usada é:

$$M = C(1 + i)^t$$

Onde:

- `M` = montante final
- `C` = capital inicial
- `i` = taxa em decimal
- `t` = número de períodos

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Capital inicial** | Valor inicial investido | Número ≥ 0 | 1500.00 |
| **Taxa de juros (%)** | Percentual por período | Número ≥ 0 | 1.8 |
| **Unidade da taxa** | Período da taxa (dia/mês/ano) | Obrigatório | Mês |
| **Tempo de cálculo** | Quantidade de períodos | Número ≥ 0 | 12 |
| **Unidade do tempo** | Período do tempo (dia/mês/ano) | Obrigatório | Mês |

#### Funcionamento:
O sistema converte automaticamente as unidades quando a taxa e o tempo estão em períodos diferentes. Por exemplo, se informar taxa em mês e tempo em ano, o aplicativo faz a conversão necessária para aplicar a fórmula corretamente.

#### Exemplos rápidos:
- **Investimento 12 meses**: R$ 2.500 com 1,2% ao mês por 12 meses
- **Ciclo curto diário**: R$ 1.500 com 0,15% ao dia por 45 dias

### Juros simples
A fórmula usada é:

$$J = C \cdot i \cdot t$$
$$M = C + J$$

Onde:

- `J` = juros acumulados
- `M` = montante final
- `C` = capital inicial
- `i` = taxa em decimal
- `t` = número de períodos

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Capital inicial** | Valor inicial investido | Número ≥ 0 | 1800.00 |
| **Taxa de juros (%)** | Percentual por período | Número ≥ 0 | 2.0 |
| **Unidade da taxa** | Período da taxa (dia/mês/ano) | Obrigatório | Mês |
| **Tempo de cálculo** | Quantidade de períodos | Número ≥ 0 | 6 |
| **Unidade do tempo** | Período do tempo (dia/mês/ano) | Obrigatório | Mês |

#### Funcionamento:
Diferente dos juros compostos, o crescimento é linear. A conversão de unidades funciona da mesma forma.

#### Exemplos rápidos:
- **Empréstimo 6 meses**: R$ 1.800 com 2% ao mês por 6 meses
- **Aplicação anual**: R$ 5.000 com 10% ao ano por 1 ano

## Passo a passo das telas de equações

### Equação do 1º grau
Forma geral:

$$ax + b = 0$$

O sistema calcula:

$$x = \frac{-b}{a}$$

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Coeficiente a** | Multiplicador de x | Número ≠ 0 | 3 |
| **Coeficiente b** | Termo independente | Número real | -9 |

#### Validação:
- Se `a = 0`, o sistema retorna erro pois a equação não seria do 1º grau
- `b` pode ser positivo, negativo ou zero

#### Exemplos rápidos:
- **a=3 e b=-9**: Resolve 3x - 9 = 0
- **a=-2 e b=8**: Resolve -2x + 8 = 0

### Equação do 2º grau
Forma geral:

$$ax^2 + bx + c = 0$$

O sistema calcula o delta:

$$\Delta = b^2 - 4ac$$

Depois, encontra as raízes reais com a fórmula de Bhaskara quando existem:

$$x = \frac{-b \pm \sqrt{\Delta}}{2a}$$

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Coeficiente a** | Multiplicador de x² | Número ≠ 0 | 1 |
| **Coeficiente b** | Multiplicador de x | Número real | -5 |
| **Coeficiente c** | Termo independente | Número real | 6 |

#### Validação:
- Se `a = 0`, o sistema retorna erro (seria uma equação de 1º grau)
- Os coeficientes `b` e `c` podem ser qualquer número real
- O resultado depende do discriminante (Δ):
  - **Δ > 0**: duas raízes reais distintas
  - **Δ = 0**: uma raiz real dupla
  - **Δ < 0**: nenhuma raiz real

#### Exemplos rápidos:
- **x² - 5x + 6**: Possui duas raízes reais (2 e 3)
- **x² - 4x + 4**: Possui uma raiz dupla (2)

## Passo a passo das inequações

### Inequação do 1º grau
Forma geral:

$$ax + b > 0$$

O sistema isola `x` e inverte o sinal quando `a` é negativo para encontrar o intervalo de solução.

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Coeficiente a** | Multiplicador de x | Número ≠ 0 | -2 |
| **Coeficiente b** | Termo independente | Número real | 8 |

#### Funcionamento:
O resultado é um intervalo (x < valor ou x > valor) que indica quais números satisfazem a inequação. Quando `a` é negativo, o símbolo se inverte automaticamente.

#### Exemplos rápidos:
- **2x - 6 > 0**: Solução é x > 3
- **-3x + 9 > 0**: Solução é x < 3

### Inequação do 2º grau
Forma geral:

$$ax^2 + bx + c > 0$$

O sistema analisa o delta e o sinal de `a` para informar o intervalo de solução.

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Coeficiente a** | Multiplicador de x² | Número ≠ 0 | 1 |
| **Coeficiente b** | Multiplicador de x | Número real | -3 |
| **Coeficiente c** | Termo independente | Número real | -4 |

#### Funcionamento:
A solução depende da posição da parábola em relação ao eixo x:
- Se `a > 0` (parábola abre para cima), a solução é os intervalos fora das raízes
- Se `a < 0` (parábola abre para baixo), a solução é o intervalo entre as raízes
- Se não há raízes reais, analisa o sinal constante da expressão

#### Exemplos rápidos:
- **x² - 3x - 4 > 0**: Parábola abre para cima, solução é x < -1 ou x > 4
- **-x² + 5x - 6 > 0**: Parábola abre para baixo, solução é 2 < x < 3

## Conjuntos

A tela de conjuntos permite calcular operações entre dois conjuntos A e B.

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Conjunto A** | Elementos separados por vírgula | Texto com números/letras | 1, 2, 3 |
| **Conjunto B** | Elementos separados por vírgula | Texto com números/letras | 3, 4, 5 |
| **Operação** | Tipo de operação desejada | Lista de opções | União |

#### Nota sobre entrada:
- Os elementos devem ser separados por vírgula (`,`)
- Espaços em branco no início ou fim são ignorados automaticamente
- Pode conter números e letras

### Operações disponíveis:

- **União (A ∪ B)**: todos os elementos que pertencem a A ou a B ou a ambos
- **Interseção (A ∩ B)**: apenas elementos que pertencem a A e a B simultaneamente
- **Diferença (A - B)**: elementos que estão em A mas não em B
- **Diferença (B - A)**: elementos que estão em B mas não em A
- **Diferença Simétrica (A ∆ B)**: elementos que estão em A ou B, mas não em ambos

#### Exemplos de uso:
- A = {1, 2, 3} e B = {3, 4, 5}
  - União: {1, 2, 3, 4, 5}
  - Interseção: {3}
  - Diferença A - B: {1, 2}

## Domínio e Imagem

A tela exibe um gráfico cartesiano interativo que representa visualmente as regiões de domínio (eixo x) e imagem (eixo y).

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| **Valor mínimo de x** | Limite inferior do domínio | Número real | -2 |
| **Comparação à esquerda de x** | Intervalo incluir ou não o limite | Aberto (< >) ou Fechado (≤ ≥) | Fechado |
| **Comparação à direita de x** | Intervalo incluir ou não o limite | Aberto (< >) ou Fechado (≤ ≥) | Fechado |
| **Valor máximo de x** | Limite superior do domínio | Número real | 3 |
| **Valor mínimo de y** | Limite inferior da imagem | Número real | -1 |
| **Comparação à esquerda de y** | Intervalo incluir ou não o limite | Aberto (< >) ou Fechado (≤ ≥) | Fechado |
| **Comparação à direita de y** | Intervalo incluir ou não o limite | Aberto (< >) ou Fechado (≤ ≥) | Fechado |
| **Valor máximo de y** | Limite superior da imagem | Número real | 4 |

#### Funcionamento:
Após preencher todos os campos e clicar em **Gerar**, o aplicativo:
1. Exibe a região em um gráfico cartesiano com cores indicando o domínio (azul) e imagem (rosa)
2. Mostra a notação de intervalos em linguagem de conjuntos
3. Marca visualmente se os limites são abertos (círculos vazios) ou fechados (círculos preenchidos)

#### Exemplos:
- Domínio: -2 ≤ x ≤ 3, Imagem: -1 ≤ y ≤ 4
  - Notação: D = {x ∈ ℝ | -2 ≤ x ≤ 3} e Im = {y ∈ ℝ | -1 ≤ y ≤ 4}

## Histórico de cálculos

A aba **Histórico** registra automaticamente todos os cálculos realizados durante a sessão. 

#### Funcionalidades:
- **Registro automático**: cada cálculo é salvo com data/hora
- **Limite**: mantém os últimos cálculos (evita consumo excessivo de memória)
- **Limpeza**: botão para limpar todo o histórico quando necessário (não pode ser desfeita)



## Requisitos do projeto

### Requisitos de Sistema:
- **Navegador atualizado**: Chrome, Firefox, Safari, Edge ou qualquer navegador moderno (2020+)
- **Conexão com internet**: necessária apenas para carregar as fontes externas (Google Fonts)
- **Espaço em disco**: menos de 1 MB (apenas 3 arquivos)
- **Permissões**: nenhuma permissão especial necessária

### Requisitos para Desenvolvimento:
- **Editor de código** (opcional): VS Code, Sublime Text, Notepad++
- **Terminal / Linha de Comando**: PowerShell, Prompt de Comando ou Terminal do Linux/Mac
- **Git** (opcional): para clonar o repositório

## Tecnologias usadas

- **HTML5**: estrutura semântica da marcação
- **CSS3**: estilo visual, responsividade, layout flexbox
- **JavaScript (ES6+)**: lógica dos cálculos, interatividade e validação de dados

### Descrição detalhada:

- **index.html**: Contém toda a estrutura HTML da aplicação
  - 9 abas (seções) diferentes
  - Formulários com estrutura semântica
  - Labels, inputs, selects e buttons
  - Meta tags para cache-control e viewport

- **style.css**: Responsável por toda a aparência visual
  - Variáveis CSS (--bg-1, --accent, etc.)
  - Layout responsivo com media queries
  - Animações suaves (transitions)
  - Estilos para temas claro/auto adaptativos

- **script.js**: Contém toda a lógica matemática e interações
  - Funções de validação de entrada
  - Cálculos matemáticos (juros, equações, inequações)
  - Conversão automática de unidades
  - Gerenciamento do histórico
  - Manipulação do DOM (atualização de elementos)

## Como executar localmente

### ⚠ Pré-requisitos:
Antes de seguir, certifique-se de:
- [ ] Ter um navegador web instalado
- [ ] Ter uma pasta no computador onde deseja salvar o projeto
- [ ] Ter conexão com a internet (para carregar as fontes)

### Opção 1: Clonar do GitHub com Git (recomendado para desenvolvedores)

**Vantagens**: Recebe atualizações facilmente, mantém histórico de commits

**Passos**:

1. Verifique se tem Git instalado (abra terminal e digite):
   ```bash
   git --version
   ```
   Se não tiver, baixe em: https://git-scm.com/

2. Copie a URL do repositório:
   - Acesse https://github.com/Alex12Rodrigues/Site-para-contar-Juros-Equa-es-e-Inequa-es
   - Clique no botão verde **Code**
   - Copie a URL do HTTPS

3. Abra o terminal (PowerShell, Prompt de Comando ou Terminal):
   - **Windows**: pressione `Win + R`, digite `cmd` ou `powershell`
   - **Mac/Linux**: abra o Terminal regular

4. Navegue até a pasta onde deseja salvar:
   ```bash
   cd caminho/da/sua/pasta
   ```
   Exemplo:
   ```bash
   cd Desktop
   # ou
   cd C:/Users/SeuUsuario/Documents
   ```

5. Clone o repositório:
   ```bash
   git clone https://github.com/Alex12Rodrigues/Site-para-contar-Juros-Equa-es-e-Inequa-es.git
   ```

6. Entre na pasta criada:
   ```bash
   cd Site-para-contar-Juros-Equa-es-e-Inequa-es
   ```

7. Abra o arquivo `index.html`:
   - **Com dois cliques**: procure o arquivo `index.html` e dê dois cliques
   - **Arrastar para navegador**: arraste o arquivo para a janela do navegador aberto
   - **Linha de comando**:
     ```bash
     start index.html        # Windows
     open index.html         # Mac
     xdg-open index.html     # Linux
     ```

### Opção 2: Baixar ZIP do GitHub (sem Git - para usuários comuns)

**Vantagens**: Não precisa instalar Git, mais simples

**Passos**:

1. Acesse https://github.com/Alex12Rodrigues/Site-para-contar-Juros-Equa-es-e-Inequa-es

2. Clique no botão verde **Code**

3. Selecione **Download ZIP**

4. Após download, localize o arquivo `Site-para-contar-Juros-Equa-es-e-Inequa-es-main.zip` na pasta de Downloads

5. Clique com botão direito e escolha **Extrair tudo** (Windows) ou **Descompactar** (Mac)

6. Abra a pasta extraída

7. Procure o arquivo `index.html` dentro de:
   ```
   Site-para-contar-Juros-Equa-es-e-Inequa-es-main/
   └── Aplicativo com cálculos do Winston/
       └── index.html
   ```

8. Dê dois cliques em `index.html` para abrir no navegador

### Opção 3: Executar pelo VS Code com Live Server (para desenvolvedores)

**Vantagens**: Recarregamento automático, ferramentas de desenvolvedor

**Passos**:

1. Baixe o VS Code em: https://code.visualstudio.com/

2. Instale a extensão **Live Server**:
   - Abra VS Code
   - Vá para a aba de Extensões (ícone de blocos)
   - Pesquise por "Live Server"
   - Clique em instalar (deve ser de Ritwick Dey)

3. Abra a pasta do projeto no VS Code:
   - Arquivo → Abrir Pasta
   - Selecione a pasta baixada do projeto

4. Clique com botão direito em `index.html`

5. Escolha **Open with Live Server**

6. O navegador abrirá automaticamente em `http://localhost:5500/` com recarregamento ao vivo

### ✅ Verificação após abrir

Após abrir o aplicativo, teste:

1. **Navegação entre abas**:
   - Clique em cada aba (Juros Compostos, Equação 1º, etc.)
   - Deve trocar de seção sem erros

2. **Teste de um cálculo simples** (Juros Compostos):
   - Capital: `1000`
   - Taxa: `5`
   - Unidade da taxa: `Mês`
   - Tempo: `12`
   - Unidade do tempo: `Mês`
   - Clique em **Calcular**
   - Deve aparecer um resultado como: "Montante final: R$ 1.795,86"

3. **Teste da limpeza**:
   - Clique no botão **Limpar**
   - Os campos devem voltar ao vazio
   - O resultado deve desaparecer


## Observações importantes

- **Ambiente front-end**: O projeto é uma aplicação 100% frontend, sem servidor ou banco de dados. Todos os cálculos ocorrem no navegador do usuário
- **JavaScript Puro**: Não utiliza bibliotecas externas para lógica matemática (como jQuery ou React). Usa apenas vanilla JavaScript (ES6+)
- **Validação em tempo real**: O aplicativo valida entradas e mostra erros específicos quando há problemas
- **Responsividade**: Interface adaptável para celulares, tablets e computadores
- **Armazenamento temporário**: O histórico é armazenado na memória da sessão (limpa ao fechar a aba)
- **Acessibilidade**: Implementa ARIA labels e estrutura semântica para melhor navegação

## Fluxo de Funcionamento

```
Usuário preenche campos
       ↓
       └→ Se válido: continua
       ↓
Calcula resultado matemático
       ↓
Atualiza DOM com resultado
       ↓
Adiciona ao histórico
       ↓
Exibe ao usuário
```

## Autor

- GitHub: https://github.com/Alex12Rodrigues
- Projeto criado para disciplina de Matemática / Programação Web

---

- GitHub: https://github.com/Alex12Rodrigues
