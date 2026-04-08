# Aplicativo com Cálculos do Winston

Aplicação web desenvolvida com HTML, CSS e JavaScript para facilitar cálculos de matemática financeira e álgebra.

O objetivo do projeto é deixar os cálculos mais simples de entender, com uma interface organizada, interativa e didática.

## Acesso online

- Site publicado no InfinityFree: https://appdowinston.gamer.gd/

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

O usuário informa:

- capital inicial
- taxa de juros
- unidade da taxa
- tempo de cálculo
- unidade do tempo

O sistema converte automaticamente as unidades quando necessário.

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

A lógica é a mesma dos juros compostos quanto à escolha de unidade, mas o cálculo é linear.

## Passo a passo das telas de equações

### Equação do 1º grau
Forma geral:

$$ax + b = 0$$

O sistema calcula:

$$x = \frac{-b}{a}$$

Regras:

- `a` não pode ser zero
- `b` pode ser qualquer número real

### Equação do 2º grau
Forma geral:

$$ax^2 + bx + c = 0$$

O sistema calcula o delta:

$$\Delta = b^2 - 4ac$$

Depois, encontra as raízes reais com a fórmula de Bhaskara quando existem.

Regras:

- `a` não pode ser zero
- se `\Delta < 0`, não existem raízes reais
- se `\Delta = 0`, existe uma raiz real dupla

## Passo a passo das inequações

### Inequação do 1º grau
Forma geral:

$$ax + b > 0$$

O sistema isola `x` e inverte o sinal quando `a` é negativo.

### Inequação do 2º grau
Forma geral:

$$ax^2 + bx + c > 0$$

O sistema analisa o delta e o sinal de `a` para informar o intervalo de solução.

## Conjuntos

A tela de conjuntos permite calcular operações entre dois conjuntos A e B.

### Operações disponíveis:

- **União (A ∪ B)**: todos os elementos que pertencem a A ou a B ou a ambos
- **Interseção (A ∩ B)**: apenas elementos que pertencem a A e a B simultaneamente
- **Diferença (A - B)**: elementos que estão em A mas não em B
- **Diferença (B - A)**: elementos que estão em B mas não em A
- **Diferença Simétrica (A ∆ B)**: elementos que estão em A ou B, mas não em ambos

### Como usar:
Informe os elementos separados por vírgula (ex.: `1, 2, 3`) e escolha a operação desejada.

## Domínio e Imagem

A tela exibe um gráfico cartesiano interativo que representa visualmente as regiões de domínio (eixo x) e imagem (eixo y).

### Como usar:
1. Informe o intervalo mínimo e máximo para x (domínio)
2. Informe o intervalo mínimo e máximo para y (imagem)
3. Escolha se cada limite é aberto (< >) ou fechado (≤ ≥)
4. Clique em **Gerar** para visualizar no gráfico

O resultado mostra a notação de conjuntos (ex.: `{x ∈ ℝ | -2 ≤ x ≤ 3}`) e uma representação visual em cores.

## Histórico de cálculos

A aba **Histórico** registra automaticamente todos os cálculos realizados durante a sessão. Você pode:
- Consultar operações anteriores
- Limpar o histórico quando necessário

## Requisitos do projeto

- Navegador moderno
- Editor de código, se quiser alterar os arquivos
- Conexão com a internet apenas para carregar as fontes externas do layout

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript

## Estrutura dos arquivos

- `index.html`: estrutura da interface
- `style.css`: aparência, responsividade e estilo visual
- `script.js`: lógica dos cálculos e interações

## Como executar localmente

### Opção 1: clonar do GitHub com Git (recomendado)
1. Copie a URL do repositório no GitHub (botão **Code**).
2. Abra o terminal (PowerShell, Prompt de Comando ou terminal do VS Code).
3. Navegue até a pasta onde deseja salvar o projeto:

	```bash
	cd caminho/da/sua/pasta
	```

4. Clone o repositório:

	```bash
	git clone URL_DO_REPOSITORIO
	```

5. Entre na pasta criada:

	```bash
	cd NOME_DO_REPOSITORIO
	```

6. Abra o arquivo `index.html` com dois cliques, ou arraste-o para o navegador.

### Opção 2: baixar ZIP do GitHub (sem Git)
1. No GitHub, clique em **Code** > **Download ZIP**.
2. Extraia o arquivo ZIP no seu computador.
3. Abra a pasta extraída.
4. Dê dois cliques em `index.html` para abrir no navegador.

### Opção 3: executar pelo VS Code com Live Server
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server** (se ainda não tiver).
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.
5. O projeto abrirá no navegador com recarregamento automático a cada alteração.

### Verificação rápida após abrir
1. Teste a troca entre as abas (juros, equações e inequações).
2. Preencha os campos e clique em **Calcular** ou **Resolver**.
3. Confira se os resultados aparecem e se o botão **Limpar** funciona.
4. Teste também no celular (ou no modo responsivo do navegador).

## Observações importantes

- O projeto é uma aplicação front-end, então não precisa de banco de dados.
- A lógica dos cálculos está em JavaScript puro.
- As telas de juros têm explicações e exemplos rápidos para facilitar o uso.
- O sistema mostra mensagens claras quando o usuário tenta preencher algo inválido.

## Autor

Projeto desenvolvido por Alex12Rodrigues.
