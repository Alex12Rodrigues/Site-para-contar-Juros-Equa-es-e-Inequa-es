# Aplicativo com Cálculos do Winston

Aplicação web desenvolvida com HTML, CSS e JavaScript para facilitar cálculos de matemática financeira e álgebra.

O objetivo do projeto é deixar os cálculos mais simples de entender, com interface organizada, interativa e didática.

## Acesso online

- Site publicado no novo domínio: https://appdowinston.gamer.gd/
- Esse domínio é mutável, então possa ter outro rs rs.

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
- Função do 1º grau
- Função do 2º grau
- Inequação do 1º grau
- Inequação do 2º grau
- Conjuntos
- Domínio e Imagem
- Histórico de cálculos

Além dos resultados em texto, o sistema usa gráficos didáticos nas telas em que a visualização ajuda a interpretação matemática.

## Como o usuário deve usar

### 1. Abrir a tela desejada
Na barra superior, escolha o tipo de cálculo que deseja fazer.

### 2. Preencher os campos
Digite os valores pedidos em cada campo.

- Nos campos numéricos, informe apenas números.
- Nos campos de seleção, escolha uma unidade válida, como dia, mês ou ano.
- Em várias telas há exemplos rápidos para preencher automaticamente os dados.

### 3. Calcular
Clique no botão correspondente:

- Calcular para juros e funções
- Resolver para equações e inequações
- Gerar para domínio e imagem

### 4. Ler o resultado
O resultado aparece logo abaixo dos botões, com mensagens de erro claras caso algum dado esteja incorreto.

Quando aplicável, o sistema exibe gráfico junto do resultado.

### 5. Usar o histórico
Na aba Histórico, você pode:

- ver operações anteriores
- limpar o histórico
- clicar em Recriar para voltar ao módulo, preencher os mesmos dados e recalcular automaticamente

## Passo a passo das telas de juros

### Juros compostos
A fórmula usada é:

$$M = C(1 + i)^t$$

Onde:

- M = montante final
- C = capital inicial
- i = taxa em decimal
- t = número de períodos

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Capital inicial | Valor inicial investido | Número >= 0 | 1500.00 |
| Taxa de juros (%) | Percentual por período | Número >= 0 | 1.8 |
| Unidade da taxa | Período da taxa (dia/mês/ano) | Obrigatório | Mês |
| Tempo de cálculo | Quantidade de períodos | Número >= 0 | 12 |
| Unidade do tempo | Período do tempo (dia/mês/ano) | Obrigatório | Mês |

#### Funcionamento:
O sistema converte automaticamente as unidades quando taxa e tempo estão em períodos diferentes.

#### Exemplos rápidos:
- Investimento 12 meses: R$ 2.500 com 1,2% ao mês por 12 meses
- Ciclo curto diário: R$ 1.500 com 0,15% ao dia por 45 dias

### Juros simples
A fórmula usada é:

$$J = C \cdot i \cdot t$$
$$M = C + J$$

Onde:

- J = juros acumulados
- M = montante final
- C = capital inicial
- i = taxa em decimal
- t = número de períodos

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Capital inicial | Valor inicial investido | Número >= 0 | 1800.00 |
| Taxa de juros (%) | Percentual por período | Número >= 0 | 2.0 |
| Unidade da taxa | Período da taxa (dia/mês/ano) | Obrigatório | Mês |
| Tempo de cálculo | Quantidade de períodos | Número >= 0 | 6 |
| Unidade do tempo | Período do tempo (dia/mês/ano) | Obrigatório | Mês |

#### Funcionamento:
Diferente dos juros compostos, o crescimento é linear. A conversão de unidades funciona da mesma forma.

#### Exemplos rápidos:
- Empréstimo 6 meses: R$ 1.800 com 2% ao mês por 6 meses
- Aplicação anual: R$ 5.000 com 10% ao ano por 1 ano

## Passo a passo das telas de equações

### Equação do 1º grau
Forma geral:

$$ax + b = 0$$

O sistema calcula:

$$x = \frac{-b}{a}$$

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Coeficiente a | Multiplicador de x | Número != 0 | 3 |
| Coeficiente b | Termo independente | Número real | -9 |

#### Validação:
- Se a = 0, o sistema retorna erro pois a equação não seria do 1º grau.
- b pode ser positivo, negativo ou zero.

#### Exemplos rápidos:
- a=3 e b=-9: resolve 3x - 9 = 0
- a=-2 e b=8: resolve -2x + 8 = 0

### Equação do 2º grau
Forma geral:

$$ax^2 + bx + c = 0$$

O sistema calcula o delta:

$$\Delta = b^2 - 4ac$$

Depois, encontra as raízes reais com Bhaskara quando existem:

$$x = \frac{-b \pm \sqrt{\Delta}}{2a}$$

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Coeficiente a | Multiplicador de x² | Número != 0 | 1 |
| Coeficiente b | Multiplicador de x | Número real | -5 |
| Coeficiente c | Termo independente | Número real | 6 |

#### Validação:
- Se a = 0, o sistema retorna erro.
- O resultado depende do discriminante:
  - Delta > 0: duas raízes reais distintas
  - Delta = 0: uma raiz real dupla
  - Delta < 0: nenhuma raiz real

#### Exemplos rápidos:
- x² - 5x + 6: duas raízes reais (2 e 3)
- x² - 4x + 4: raiz dupla (2)

## Passo a passo das inequações

### Inequação do 1º grau
Forma geral:

$$ax + b > 0$$

O sistema isola x e inverte o sinal quando a é negativo.

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Coeficiente a | Multiplicador de x | Número != 0 | -2 |
| Coeficiente b | Termo independente | Número real | 8 |

#### Funcionamento:
O resultado é um intervalo de solução (x < valor ou x > valor).

#### Exemplos rápidos:
- 2x - 6 > 0: solução x > 3
- -3x + 9 > 0: solução x < 3

### Inequação do 2º grau
Forma geral:

$$ax^2 + bx + c > 0$$

O sistema analisa o delta e o sinal de a para informar o intervalo de solução.

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Coeficiente a | Multiplicador de x² | Número != 0 | 1 |
| Coeficiente b | Multiplicador de x | Número real | -3 |
| Coeficiente c | Termo independente | Número real | -4 |

#### Funcionamento:
- Se a > 0, a solução fica fora das raízes.
- Se a < 0, a solução fica entre as raízes.
- Se não houver raízes reais, analisa o sinal constante da expressão.

#### Exemplos rápidos:
- x² - 3x - 4 > 0: x < -1 ou x > 4
- -x² + 5x - 6 > 0: 2 < x < 3

## Conjuntos

A tela de conjuntos permite calcular operações entre dois conjuntos A e B.

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Conjunto A | Elementos separados por vírgula | Texto com números/letras | 1, 2, 3 |
| Conjunto B | Elementos separados por vírgula | Texto com números/letras | 3, 4, 5 |
| Operação | Tipo de operação desejada | Lista de opções | União |

#### Nota sobre entrada:
- Os elementos devem ser separados por vírgula.
- Espaços extras no início ou fim são ignorados.
- Pode conter números e letras.

### Operações disponíveis:

- União (A U B)
- Interseção (A ∩ B)
- Diferença (A - B)
- Diferença (B - A)
- Diferença simétrica (A △ B)

#### Exemplos de uso:
- A = {1, 2, 3} e B = {3, 4, 5}
  - União: {1, 2, 3, 4, 5}
  - Interseção: {3}
  - Diferença A - B: {1, 2}

## Domínio e Imagem

A tela exibe um gráfico cartesiano que representa visualmente as regiões de domínio (x) e imagem (y).

#### Campos de entrada:

| Campo | Descrição | Validação | Exemplo |
|-------|-----------|-----------|---------|
| Valor mínimo de x | Limite inferior do domínio | Número real | -2 |
| Comparação à esquerda de x | Inclui ou não o limite | <= ou < | <= |
| Comparação à direita de x | Inclui ou não o limite | <= ou < | <= |
| Valor máximo de x | Limite superior do domínio | Número real | 3 |
| Valor mínimo de y | Limite inferior da imagem | Número real | -1 |
| Comparação à esquerda de y | Inclui ou não o limite | <= ou < | <= |
| Comparação à direita de y | Inclui ou não o limite | <= ou < | <= |
| Valor máximo de y | Limite superior da imagem | Número real | 4 |

#### Funcionamento:
Após clicar em Gerar, o aplicativo:
1. monta o gráfico cartesiano
2. mostra domínio e imagem em linguagem de conjuntos
3. atualiza o resultado na própria tela

## Histórico de cálculos

A aba Histórico registra automaticamente os cálculos realizados.

#### Funcionalidades:
- Registro automático com data e hora
- Limite de itens para evitar crescimento indefinido
- Limpar histórico com botão dedicado
- Recriar cálculo: botão por item que restaura os campos e recalcula

Observação:
- Itens muito antigos podem não ter dados completos para recriação, dependendo da versão em que foram salvos.

## Requisitos do projeto

### Requisitos de Sistema:
- Navegador atualizado: Chrome, Firefox, Safari, Edge ou equivalente moderno
- Conexão com internet: necessária apenas para carregar fontes externas
- Espaço em disco: baixo, projeto leve de frontend

### Requisitos para Desenvolvimento:
- Editor de código (opcional): VS Code, Sublime Text, Notepad++
- Terminal: PowerShell, Prompt de Comando, Bash, Terminal Linux/Mac
- Git (opcional): para clonar e versionar

## Tecnologias usadas

- HTML5: estrutura da interface
- CSS3: visual, responsividade e temas
- JavaScript ES6+: lógica de cálculo e interação
- SVG: gráficos matemáticos
- LocalStorage: tema e histórico

### Estrutura dos arquivos

- index.html: estrutura semântica das telas e abas
- style.css: tema claro/escuro, responsividade e aparência
- script.js: cálculo, validação, histórico, gráficos e recriação

## Como executar localmente

### Opcao 1: Clonar do GitHub com Git

1. Verifique se o Git está instalado:

   git --version

2. Clone o repositório:

   git clone https://github.com/Alex12Rodrigues/Site-para-contar-Juros-Equa-es-e-Inequa-es.gitgit

3. Entre na pasta do projeto.
4. Abra index.html no navegador.

### Opcao 2: Baixar ZIP do GitHub

1. Acesse o repositório no GitHub.
2. Clique em Code > Download ZIP.
3. Extraia o arquivo ZIP.
4. Abra index.html na pasta Aplicativo com cálculos do Winston.

### Opcao 3: VS Code com Live Server

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão Live Server.
3. Clique com o botão direito em index.html.
4. Selecione Open with Live Server.

### Verificação após abrir

1. Navegue entre as abas e confirme a troca de telas.
2. Execute um cálculo em Juros Compostos e valide o resultado.
3. Teste Limpar e depois Recriar no Histórico.
4. Troque entre tema claro e escuro com resultado já exibido, confirmando que o gráfico permanece consistente.

## Observações importantes

- Projeto 100% frontend: sem backend e sem banco de dados.
- Cálculos feitos no navegador.
- O sistema valida entradas e mostra mensagens de erro quando necessário.
- O histórico é persistido no localStorage.
- O tema escolhido também é salvo no navegador.
- Ao trocar de tema, o módulo ativo é recalculado para evitar inconsistências gráficas.
- A publicação no InfinityFree usa cache-busting por versão em index.html.

## Autor

- Alex Rodrigues de Oliveira