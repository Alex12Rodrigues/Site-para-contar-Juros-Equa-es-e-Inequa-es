# Aplicativo com Cálculos do Winston

Aplicação web desenvolvida com HTML, CSS e JavaScript para facilitar cálculos de matemática financeira e álgebra.

O objetivo do projeto é deixar os cálculos mais simples de entender, com uma interface organizada, interativa e didática.

## Acesso online

- Site publicado no InfinityFree: https://appdowinston.gamer.gd/

## O que o projeto faz

O sistema possui as seguintes telas:

- Juros compostos
- Juros simples
- Equação do 1º grau
- Equação do 2º grau
- Inequação do 1º grau
- Inequação do 2º grau

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

### Opção 1: abrir direto no navegador
1. Baixe ou clone o projeto.
2. Abra a pasta no computador.
3. Dê dois cliques em `index.html`.
4. O projeto será aberto no navegador.

### Opção 2: abrir pelo VS Code
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Escolha a opção para abrir no navegador, ou use uma extensão como Live Server.

## Como publicar no GitHub

### 1. Criar o repositório
1. Entre na sua conta do GitHub.
2. Crie um repositório novo.
3. Dê um nome ao projeto.
4. Envie os arquivos `index.html`, `style.css`, `script.js` e `README.md`.

### 2. Conferir se o README está completo
Verifique se o README explica:

- o que o projeto faz
- como executar
- como funciona cada tela
- onde acessar a versão online

### 3. Atualizar depois de mudanças
Sempre que alterar o projeto:

1. Faça as alterações locais
2. Atualize os arquivos no GitHub
3. Confirme se a versão publicada continua funcionando

## Como publicar no InfinityFree

### 1. Preparar os arquivos
Deixe na raiz do site somente os arquivos do projeto:

- `index.html`
- `style.css`
- `script.js`

Se houver pastas extras, confira se elas realmente são necessárias.

### 2. Enviar para o servidor
1. Acesse o painel do InfinityFree.
2. Abra o Gerenciador de Arquivos ou envie por FTP.
3. Coloque os arquivos dentro da pasta pública do site, normalmente `htdocs` ou equivalente.
4. Garanta que o arquivo principal seja `index.html`.

### 3. Testar no navegador
1. Abra o endereço do site.
2. Verifique se a página carrega.
3. Teste todos os botões e cálculos.
4. Confirme se o layout aparece corretamente no celular e no computador.

## Observações importantes

- O projeto é uma aplicação front-end, então não precisa de banco de dados.
- A lógica dos cálculos está em JavaScript puro.
- As telas de juros têm explicações e exemplos rápidos para facilitar o uso.
- O sistema mostra mensagens claras quando o usuário tenta preencher algo inválido.

## Dica para apresentação
Se o professor abrir o site, você pode explicar assim:

- o sistema recebe os valores do usuário
- valida os dados antes de calcular
- converte as unidades quando necessário
- mostra o resultado e uma explicação para facilitar o entendimento

## Autor

Projeto desenvolvido por Alex12Rodrigues.
