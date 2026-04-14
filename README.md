# Aplicativo com Cálculos do Winston

Aplicação web educacional feita com HTML, CSS e JavaScript para apoiar estudos de matemática financeira e álgebra com foco didático.

## Acesso online

- Site publicado no InfinityFree: https://appdowinston.gamer.gd/

## Índice

- Visão geral
- Módulos disponíveis
- Gráficos por módulo
- Como usar
- Regras de validação
- Tecnologias
- Estrutura do projeto
- Executar localmente
- Publicar e atualizar no InfinityFree
- Solução de problemas
- Autor

## Visão geral

O projeto possui interface em abas, exemplos rápidos, explicações em tempo real, modo escuro e histórico de cálculos.

Os cálculos são processados no navegador, sem backend.

## Módulos disponíveis

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
- Histórico

## Gráficos por módulo

- Juros Compostos: curva de crescimento ao longo do tempo
- Juros Simples: linha de crescimento linear
- Equação do 2º grau: parábola com raízes e vértice
- Função do 2º grau: parábola com destaque para o ponto f(x)
- Inequação do 2º grau: parábola com região positiva destacada
- Conjuntos: diagrama de Venn conforme a operação
- Domínio e Imagem: gráfico cartesiano da faixa informada

## Como usar

1. Escolha um módulo na barra de abas.
2. Preencha os campos solicitados.
3. Use os botões de exemplo rápido, se desejar.
4. Clique em Calcular, Resolver ou Gerar.
5. Leia o resultado textual e, quando disponível, o gráfico.

## Regras de validação

- Campos numéricos aceitam valores reais.
- Nos módulos de juros:
  - capital e tempo devem ser maiores ou iguais a zero
  - taxa deve ser maior ou igual a zero
  - o sistema converte unidade de tempo e unidade da taxa automaticamente
- Em equações e inequações do 1º e 2º grau:
  - coeficiente a deve ser diferente de zero
- Em conjuntos:
  - entradas A e B devem conter pelo menos um elemento
- Em domínio e imagem:
  - mínimo não pode ser maior que máximo

## Tecnologias

- HTML5
- CSS3
- JavaScript ES6+
- SVG para os gráficos
- LocalStorage para tema e histórico

## Estrutura do projeto

- Aplicativo com cálculos do Winston/index.html: estrutura da interface
- Aplicativo com cálculos do Winston/style.css: tema, layout e responsividade
- Aplicativo com cálculos do Winston/script.js: cálculos, validações, histórico e gráficos

## Executar localmente

Opção simples:

1. Baixe ou clone o repositório.
2. Abra a pasta Aplicativo com cálculos do Winston.
3. Abra o arquivo index.html no navegador.

Opção recomendada para desenvolvimento:

1. Abra a pasta do projeto no VS Code.
2. Use Live Server ou outro servidor estático local.
3. Teste os módulos e verifique o histórico.

## Publicar e atualizar no InfinityFree

1. Envie os arquivos atualizados para a pasta pública do site.
2. Garanta que index.html, style.css e script.js foram substituídos.
3. Sempre que atualizar frontend, altere a versão em index.html nos parâmetros v dos arquivos CSS e JS.
4. Faça recarga forçada no navegador com Ctrl + F5.

Observação:

- O projeto já usa cache-busting por versão para reduzir efeito de cache antigo em hospedagem compartilhada.

## Solução de problemas

Se gráfico não aparecer:

1. Confirme se script.js novo foi enviado ao servidor.
2. Confirme se index.html está apontando para a versão atual de script.js e style.css.
3. Faça Ctrl + F5.
4. Abra o console do navegador e verifique erros de JavaScript.

Se os números do gráfico encostarem na borda:

- Atualize para a versão mais recente, que já aumenta as margens internas do SVG.

Se o exemplo rápido preencher mas não calcular:

- Clique no botão de ação do módulo após o preenchimento.

## Autor

- GitHub: https://github.com/Alex12Rodrigues
- Projeto criado para disciplina de Matemática e Programação Web
