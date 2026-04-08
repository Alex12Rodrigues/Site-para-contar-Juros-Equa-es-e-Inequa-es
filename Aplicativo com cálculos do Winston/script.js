const tabButtons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".panel");
const activeModuleText = byId("moduloAtivo");

const calculatorsByPanel = {
  "juros-compostos": calcularJurosCompostos,
  "juros-simples": calcularJurosSimples,
  "equacao-primeiro": resolverEquacaoPrimeiro,
  "equacao-segundo": resolverEquacaoSegundo,
  "inequacao-primeiro": resolverInequacaoPrimeiro,
  "inequacao-segundo": resolverInequacaoSegundo,
  "conjuntos": calcularConjuntos,
  "dominio-imagem": gerarDominioImagem
};

const HISTORY_KEY = "winston_calculos_historico";
let historicoCalculos = [];

function showPanel(panelId) {
  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });

  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === panelId);
    btn.setAttribute("aria-selected", btn.dataset.tab === panelId ? "true" : "false");
  });

  const activeButton = [...tabButtons].find((btn) => btn.dataset.tab === panelId);

  if (activeButton && activeModuleText) {
    activeModuleText.textContent = activeButton.textContent;
  }
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showPanel(btn.dataset.tab);
  });

  btn.addEventListener("keydown", (event) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];

    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const buttons = [...tabButtons];
    const currentIndex = buttons.indexOf(btn);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % buttons.length;
    }

    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = buttons.length - 1;
    }

    buttons[nextIndex].focus();
    showPanel(buttons[nextIndex].dataset.tab);
  });
});

function byId(id) {
  return document.getElementById(id);
}

function toNumber(id) {
  return Number.parseFloat(byId(id).value);
}

function toText(id) {
  return byId(id).value;
}

function print(targetId, message) {
  const output = byId(targetId);
  output.textContent = message;

  if (message.startsWith("Informe") || message.startsWith("Preencha")) {
    output.classList.add("error");
  } else {
    output.classList.remove("error");
  }
}

function addHistoryEntry(modulo, descricao) {
  historicoCalculos.unshift({
    modulo,
    descricao,
    quando: new Date().toLocaleString("pt-BR")
  });

  historicoCalculos = historicoCalculos.slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historicoCalculos));
  renderHistorico();
}

function renderHistorico() {
  const list = byId("historicoLista");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  if (historicoCalculos.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "history-empty";
    emptyItem.textContent = "Ainda não há contas registradas.";
    list.appendChild(emptyItem);
    return;
  }

  historicoCalculos.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = `[${item.quando}] ${item.modulo}: ${item.descricao}`;
    list.appendChild(li);
  });
}

function loadHistorico() {
  const raw = localStorage.getItem(HISTORY_KEY);

  if (!raw) {
    historicoCalculos = [];
    renderHistorico();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    historicoCalculos = Array.isArray(parsed) ? parsed : [];
  } catch {
    historicoCalculos = [];
  }

  renderHistorico();
}

function limparHistorico() {
  historicoCalculos = [];
  localStorage.removeItem(HISTORY_KEY);
  renderHistorico();
}

function isInvalidNumber(value) {
  return Number.isNaN(value) || !Number.isFinite(value);
}

function isValidInterestUnit(unit) {
  return unit === "dia" || unit === "mes" || unit === "ano";
}

function money(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function periodToDays(unit) {
  if (!isValidInterestUnit(unit)) {
    return null;
  }

  if (unit === "dia") {
    return 1;
  }

  if (unit === "mes") {
    return 30;
  }

  return 360;
}

function convertPeriods(value, fromUnit, toUnit) {
  const fromDays = periodToDays(fromUnit);
  const toDays = periodToDays(toUnit);

  if (fromDays === null || toDays === null) {
    return null;
  }

  const valueInDays = value * fromDays;
  return valueInDays / toDays;
}

function isSafeResult(value) {
  return Number.isFinite(value) && Math.abs(value) < Number.MAX_VALUE;
}

function formatNumber(value, maxDecimals = 6) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals
  });
}

function nomeUnidade(valor, singular, plural) {
  return Math.abs(valor) === 1 ? singular : plural;
}

function unidadePorExtenso(codigo, plural = false) {
  if (codigo === "dia") {
    return plural ? "dias" : "dia";
  }

  if (codigo === "mes") {
    return plural ? "meses" : "mês";
  }

  return plural ? "anos" : "ano";
}

function atualizarExplicacaoJuros(tipo) {
  const isComposto = tipo === "composto";
  const prefixo = isComposto ? "Composto" : "Simples";
  const capital = toNumber(`capital${prefixo}`);
  const taxaValor = toNumber(`taxa${prefixo}`);
  const tempo = toNumber(`tempo${prefixo}`);
  const taxaUnidade = toText(`taxa${prefixo}Unidade`);
  const tempoUnidade = toText(`tempo${prefixo}Unidade`);
  const saidaId = isComposto ? "explicaComposto" : "explicaSimples";

  if ([capital, taxaValor, tempo].some(isInvalidNumber) || capital < 0 || tempo < 0) {
    byId(saidaId).textContent = "Preencha os campos para visualizar o cenário antes de calcular.";
    return;
  }

  const periodos = convertPeriods(tempo, tempoUnidade, taxaUnidade);
    if (periodos === null) {
      byId(saidaId).textContent = "A unidade selecionada é inválida.";
      return;
    }
  const jurosTexto = isComposto ? "capitalização" : "acréscimo linear";
  const unidadeTaxa = unidadePorExtenso(taxaUnidade, false);
  const unidadeTempo = nomeUnidade(
    tempo,
    unidadePorExtenso(tempoUnidade, false),
    unidadePorExtenso(tempoUnidade, true)
  );

  byId(saidaId).textContent =
    `Você investe ${money(capital)} com taxa de ${formatNumber(taxaValor, 4)}% por ${unidadeTaxa}, ` +
    `durante ${formatNumber(tempo, 2)} ${unidadeTempo}. ` +
    `Isso equivale a ${formatNumber(periodos, 4)} período(s) da taxa, com ${jurosTexto}.`;
}

window.atualizarExplicacaoJuros = atualizarExplicacaoJuros;

function preencherExemplo(kind, example) {
  if (kind === "composto" && example === "investimento") {
    byId("capitalComposto").value = "2500";
    byId("taxaComposta").value = "1.2";
    byId("taxaCompostaUnidade").value = "mes";
    byId("tempoComposto").value = "12";
    byId("tempoCompostoUnidade").value = "mes";
    byId("capitalComposto").dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  if (kind === "composto" && example === "curto") {
    byId("capitalComposto").value = "1500";
    byId("taxaComposta").value = "0.15";
    byId("taxaCompostaUnidade").value = "dia";
    byId("tempoComposto").value = "45";
    byId("tempoCompostoUnidade").value = "dia";
    byId("capitalComposto").dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  if (kind === "simples" && example === "emprestimo") {
    byId("capitalSimples").value = "1800";
    byId("taxaSimples").value = "2";
    byId("taxaSimplesUnidade").value = "mes";
    byId("tempoSimples").value = "6";
    byId("tempoSimplesUnidade").value = "mes";
    atualizarExplicacaoJuros("simples");
    return;
  }

  if (kind === "simples" && example === "anual") {
    byId("capitalSimples").value = "5000";
    byId("taxaSimples").value = "10";
    byId("taxaSimplesUnidade").value = "ano";
    byId("tempoSimples").value = "1";
    byId("tempoSimplesUnidade").value = "ano";
    atualizarExplicacaoJuros("simples");
    return;
  }

  if (kind === "eq1" && example === "basico") {
    byId("eq1a").value = "3";
    byId("eq1b").value = "-9";
    return;
  }

  if (kind === "eq1" && example === "negativo") {
    byId("eq1a").value = "-2";
    byId("eq1b").value = "8";
    return;
  }

  if (kind === "eq2" && example === "duas-raizes") {
    byId("eq2a").value = "1";
    byId("eq2b").value = "-5";
    byId("eq2c").value = "6";
    return;
  }

  if (kind === "eq2" && example === "raiz-dupla") {
    byId("eq2a").value = "1";
    byId("eq2b").value = "-4";
    byId("eq2c").value = "4";
    return;
  }

  if (kind === "ineq1" && example === "positivo") {
    byId("ineq1a").value = "2";
    byId("ineq1b").value = "-6";
    return;
  }

  if (kind === "ineq1" && example === "negativo") {
    byId("ineq1a").value = "-3";
    byId("ineq1b").value = "9";
    return;
  }

  if (kind === "ineq2" && example === "aberta") {
    byId("ineq2a").value = "1";
    byId("ineq2b").value = "-3";
    byId("ineq2c").value = "-4";
    return;
  }

  if (kind === "ineq2" && example === "fechada") {
    byId("ineq2a").value = "-1";
    byId("ineq2b").value = "5";
    byId("ineq2c").value = "-6";
    return;
  }

  if (kind === "conjuntos" && example === "uniao") {
    byId("setA").value = "1, 2, 3";
    byId("setB").value = "3, 4, 5";
    byId("setOperacao").value = "uniao";
    return;
  }

  if (kind === "conjuntos" && example === "intersecao") {
    byId("setA").value = "a, b, c";
    byId("setB").value = "b, c, d";
    byId("setOperacao").value = "intersecao";
    return;
  }

  if (kind === "dominio" && example === "intervalo1") {
    byId("domXMin").value = "-2";
    byId("domXCompEsq").value = "<=";
    byId("domXCompDir").value = "<=";
    byId("domXMax").value = "3";
    byId("domYMin").value = "-1";
    byId("domYCompEsq").value = "<=";
    byId("domYCompDir").value = "<=";
    byId("domYMax").value = "4";
    return;
  }

  if (kind === "dominio" && example === "intervalo2") {
    byId("domXMin").value = "0";
    byId("domXCompEsq").value = "<";
    byId("domXCompDir").value = "<=";
    byId("domXMax").value = "5";
    byId("domYMin").value = "-2";
    byId("domYCompEsq").value = "<=";
    byId("domYCompDir").value = "<";
    byId("domYMax").value = "2";
  }
}

function aplicarTextoExemplo(kind, example) {
  const textos = {
    "composto:investimento": "Você investe R$ 2.500,00 com taxa de 1,2% por mês, durante 12 meses. Isso equivale a 12 período(s) da taxa, com capitalização.",
    "composto:curto": "Você investe R$ 1.500,00 com taxa de 0,15% por dia, durante 45 dias. Isso equivale a 45 período(s) da taxa, com capitalização.",
    "simples:emprestimo": "Você investe R$ 1.800,00 com taxa de 2% por mês, durante 6 meses. Isso equivale a 6 período(s) da taxa, com acréscimo linear.",
    "simples:anual": "Você investe R$ 5.000,00 com taxa de 10% por ano, durante 1 ano. Isso equivale a 1 período(s) da taxa, com acréscimo linear.",
    "eq1:basico": "Exemplo carregado: 3x - 9 = 0. Ao resolver, você encontra x = 3.",
    "eq1:negativo": "Exemplo carregado: -2x + 8 = 0. Ao resolver, você encontra x = 4.",
    "eq2:duas-raizes": "Exemplo carregado: x² - 5x + 6 = 0. Delta positivo, com duas raízes reais.",
    "eq2:raiz-dupla": "Exemplo carregado: x² - 4x + 4 = 0. Delta zero, com raiz real dupla.",
    "ineq1:positivo": "Exemplo carregado: 2x - 6 > 0. Como a é positivo, a solução fica x > 3.",
    "ineq1:negativo": "Exemplo carregado: -3x + 9 > 0. Como a é negativo, o sinal inverte e a solução fica x < 3.",
    "ineq2:aberta": "Exemplo carregado: x² - 3x - 4 > 0. A parábola abre para cima e gera solução fora das raízes.",
    "ineq2:fechada": "Exemplo carregado: -x² + 5x - 6 > 0. A parábola abre para baixo e gera solução entre as raízes.",
    "conjuntos:uniao": "Exemplo carregado para união: A={1, 2, 3} e B={3, 4, 5}.",
    "conjuntos:intersecao": "Exemplo carregado para interseção: A={a, b, c} e B={b, c, d}.",
    "dominio:intervalo1": "Exemplo carregado: domínio e imagem com limites fechados (incluem os extremos).",
    "dominio:intervalo2": "Exemplo carregado: domínio e imagem com limites mistos (abertos e fechados)."
  };

  const alvoPorTipo = {
    composto: "explicaComposto",
    simples: "explicaSimples",
    eq1: "explicaEq1",
    eq2: "explicaEq2",
    ineq1: "explicaIneq1",
    ineq2: "explicaIneq2",
    conjuntos: "explicaConjuntos",
    dominio: "explicaDominio"
  };

  const alvoId = alvoPorTipo[kind];
  const saida = byId(alvoId);
  const texto = textos[`${kind}:${example}`];

  if (saida && texto) {
    saida.textContent = texto;
  }
}

function aplicarExemplo(kind, example) {
  preencherExemplo(kind, example);
  aplicarTextoExemplo(kind, example);
}

window.aplicarExemplo = aplicarExemplo;

function calcularJurosCompostos() {
  const capital = toNumber("capitalComposto");
  const taxa = toNumber("taxaComposta") / 100;
  const tempo = toNumber("tempoComposto");
  const taxaUnidade = toText("taxaCompostaUnidade");
  const tempoUnidade = toText("tempoCompostoUnidade");

  if ([capital, taxa, tempo].some(isInvalidNumber) || capital < 0 || tempo < 0) {
    print("saidaComposto", "Informe capital e tempo válidos (maiores ou iguais a zero). ");
    return;
  }

  const periodos = convertPeriods(tempo, tempoUnidade, taxaUnidade);
  if (periodos === null) {
    print("saidaComposto", "A unidade selecionada é inválida. Reabra a tela e tente novamente.");
    return;
  }

  const montante = capital * (1 + taxa) ** periodos;
  const juros = montante - capital;

  if (!isSafeResult(montante) || !isSafeResult(juros)) {
    print("saidaComposto", "O resultado ficou grande demais para exibir com segurança.");
    return;
  }

  print(
    "saidaComposto",
    `Períodos equivalentes: ${formatNumber(periodos, 4)} | Juros: ${money(juros)} | Montante: ${money(montante)}`
  );

  addHistoryEntry(
    "Juros Compostos",
    `Capital ${money(capital)}, taxa ${formatNumber(taxa * 100, 4)}%, tempo ${formatNumber(tempo, 4)} (${tempoUnidade}) -> Montante ${money(montante)}`
  );
}

function calcularJurosSimples() {
  const capital = toNumber("capitalSimples");
  const taxa = toNumber("taxaSimples") / 100;
  const tempo = toNumber("tempoSimples");
  const taxaUnidade = toText("taxaSimplesUnidade");
  const tempoUnidade = toText("tempoSimplesUnidade");

  if ([capital, taxa, tempo].some(isInvalidNumber) || capital < 0 || tempo < 0) {
    print("saidaSimples", "Informe capital e tempo válidos (maiores ou iguais a zero). ");
    return;
  }

  const periodos = convertPeriods(tempo, tempoUnidade, taxaUnidade);
  if (periodos === null) {
    print("saidaSimples", "A unidade selecionada é inválida. Reabra a tela e tente novamente.");
    return;
  }

  const juros = capital * taxa * periodos;
  const montante = capital + juros;

  if (!isSafeResult(montante) || !isSafeResult(juros)) {
    print("saidaSimples", "O resultado ficou grande demais para exibir com segurança.");
    return;
  }

  print(
    "saidaSimples",
    `Períodos equivalentes: ${formatNumber(periodos, 4)} | Juros: ${money(juros)} | Montante: ${money(montante)}`
  );

  addHistoryEntry(
    "Juros Simples",
    `Capital ${money(capital)}, taxa ${formatNumber(taxa * 100, 4)}%, tempo ${formatNumber(tempo, 4)} (${tempoUnidade}) -> Montante ${money(montante)}`
  );
}

function resolverEquacaoPrimeiro() {
  const a = toNumber("eq1a");
  const b = toNumber("eq1b");
  const epsilon = 1e-10;

  if (isInvalidNumber(a) || isInvalidNumber(b) || Math.abs(a) < epsilon) {
    print("saidaEq1", "Informe a e b válidos, com a diferente de zero.");
    return;
  }

  const x = -b / a;
  print("saidaEq1", `Solução: x = ${formatNumber(x)}`);
  addHistoryEntry("Equação 1º", `a=${formatNumber(a)}, b=${formatNumber(b)} -> x=${formatNumber(x)}`);
}

function resolverEquacaoSegundo() {
  const a = toNumber("eq2a");
  const b = toNumber("eq2b");
  const c = toNumber("eq2c");
  const epsilon = 1e-10;

  if ([a, b, c].some(isInvalidNumber) || Math.abs(a) < epsilon) {
    print("saidaEq2", "Informe a, b e c válidos, com a diferente de zero.");
    return;
  }

  const delta = b * b - 4 * a * c;
  const deltaCorrigido = Math.abs(delta) < epsilon ? 0 : delta;

  if (deltaCorrigido < 0) {
    print("saidaEq2", `Delta = ${formatNumber(deltaCorrigido)}. Não há raízes reais.`);
    return;
  }

  const x1 = (-b + Math.sqrt(deltaCorrigido)) / (2 * a);
  const x2 = (-b - Math.sqrt(deltaCorrigido)) / (2 * a);

  print(
    "saidaEq2",
    `Delta = ${formatNumber(deltaCorrigido)} | x1 = ${formatNumber(x1, 4)} | x2 = ${formatNumber(x2, 4)}`
  );

  addHistoryEntry(
    "Equação 2º",
    `a=${formatNumber(a)}, b=${formatNumber(b)}, c=${formatNumber(c)} -> x1=${formatNumber(x1, 4)}, x2=${formatNumber(x2, 4)}`
  );
}

function resolverInequacaoPrimeiro() {
  const a = toNumber("ineq1a");
  const b = toNumber("ineq1b");
  const epsilon = 1e-10;

  if (isInvalidNumber(a) || isInvalidNumber(b) || Math.abs(a) < epsilon) {
    print("saidaIneq1", "Informe a e b válidos, com a diferente de zero.");
    return;
  }

  const limite = -b / a;
  const sinal = a > 0 ? ">" : "<";

  print("saidaIneq1", `Solução: x ${sinal} ${formatNumber(limite, 4)}`);
  addHistoryEntry("Inequação 1º", `a=${formatNumber(a)}, b=${formatNumber(b)} -> x ${sinal} ${formatNumber(limite, 4)}`);
}

function resolverInequacaoSegundo() {
  const a = toNumber("ineq2a");
  const b = toNumber("ineq2b");
  const c = toNumber("ineq2c");
  const epsilon = 1e-10;

  if ([a, b, c].some(isInvalidNumber) || Math.abs(a) < epsilon) {
    print("saidaIneq2", "Informe a, b e c válidos, com a diferente de zero.");
    return;
  }

  const delta = b * b - 4 * a * c;
  const deltaCorrigido = Math.abs(delta) < epsilon ? 0 : delta;

  if (deltaCorrigido < 0) {
    const mensagem =
      a > 0 ? "Solução: todos os valores reais." : "Solução: conjunto vazio.";

    print(
      "saidaIneq2",
      mensagem
    );

    addHistoryEntry("Inequação 2º", `a=${formatNumber(a)}, b=${formatNumber(b)}, c=${formatNumber(c)} -> ${mensagem}`);
    return;
  }

  const raiz1 = (-b - Math.sqrt(deltaCorrigido)) / (2 * a);
  const raiz2 = (-b + Math.sqrt(deltaCorrigido)) / (2 * a);

  if (deltaCorrigido === 0) {
    if (a > 0) {
      const mensagem = `Solução: x ≠ ${formatNumber(raiz1, 4)}.`;
      print("saidaIneq2", mensagem);
      addHistoryEntry("Inequação 2º", `a=${formatNumber(a)}, b=${formatNumber(b)}, c=${formatNumber(c)} -> ${mensagem}`);
    } else {
      const mensagem = "Solução: conjunto vazio.";
      print("saidaIneq2", mensagem);
      addHistoryEntry("Inequação 2º", `a=${formatNumber(a)}, b=${formatNumber(b)}, c=${formatNumber(c)} -> ${mensagem}`);
    }
    return;
  }

  if (a > 0) {
    const mensagem =
      `Solução: x < ${formatNumber(raiz1, 4)} ou x > ${formatNumber(raiz2, 4)}.`;

    print(
      "saidaIneq2",
      mensagem
    );

    addHistoryEntry("Inequação 2º", `a=${formatNumber(a)}, b=${formatNumber(b)}, c=${formatNumber(c)} -> ${mensagem}`);
  } else {
    const mensagem =
      `Solução: ${formatNumber(raiz1, 4)} < x < ${formatNumber(raiz2, 4)}.`;

    print(
      "saidaIneq2",
      mensagem
    );

    addHistoryEntry("Inequação 2º", `a=${formatNumber(a)}, b=${formatNumber(b)}, c=${formatNumber(c)} -> ${mensagem}`);
  }
}

function parseSetMembers(raw) {
  const parts = raw
    .split(/[,;]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "");

  return [...new Set(parts)];
}

function formatSet(values) {
  return `{${values.join(", ")}}`;
}

function calcularConjuntos() {
  const a = parseSetMembers(toText("setA"));
  const b = parseSetMembers(toText("setB"));
  const operacao = toText("setOperacao");

  if (a.length === 0 || b.length === 0) {
    print("saidaConjuntos", "Informe elementos válidos para A e B.");
    return;
  }

  const setB = new Set(b);
  const setA = new Set(a);
  let resultado = [];
  let nomeOperacao = "";

  if (operacao === "uniao") {
    resultado = [...new Set([...a, ...b])];
    nomeOperacao = "A ∪ B";
  }

  if (operacao === "intersecao") {
    resultado = a.filter((item) => setB.has(item));
    nomeOperacao = "A ∩ B";
  }

  if (operacao === "diferencaAB") {
    resultado = a.filter((item) => !setB.has(item));
    nomeOperacao = "A - B";
  }

  if (operacao === "diferencaBA") {
    resultado = b.filter((item) => !setA.has(item));
    nomeOperacao = "B - A";
  }

  if (operacao === "simetrica") {
    resultado = [...a.filter((item) => !setB.has(item)), ...b.filter((item) => !setA.has(item))];
    nomeOperacao = "A △ B";
  }

  const saida = `${nomeOperacao} = ${formatSet(resultado)}`;
  print("saidaConjuntos", saida);
  addHistoryEntry("Conjuntos", `A=${formatSet(a)}, B=${formatSet(b)} -> ${saida}`);
}

function formatIntervalCondition(symbol, min, max, leftOp, rightOp) {
  const minFmt = formatNumber(min, 4);
  const maxFmt = formatNumber(max, 4);

  if (Math.abs(min - max) < 1e-10) {
    if (leftOp === "<=" && rightOp === "<=") {
      return `${symbol} = ${minFmt}`;
    }

    return "vazio";
  }

  return `${minFmt} ${leftOp} ${symbol} ${rightOp} ${maxFmt}`;
}

function criarGraficoCartesiano(xMin, xMax, yMin, yMax) {
  const padding = 40;
  const svgWidth = 400;
  const svgHeight = 400;
  const graphWidth = svgWidth - 2 * padding;
  const graphHeight = svgHeight - 2 * padding;

  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  const xStep = (xMax - xMin) / 6;
  const yStep = (yMax - yMin) / 6;

  const toSvgX = (x) => padding + ((x - xMin) / xRange) * graphWidth;
  const toSvgY = (y) => padding + graphHeight - ((y - yMin) / yRange) * graphHeight;

  let svgContent = `<svg width="${svgWidth}" height="${svgHeight}" style="border: 1px solid #ddd; margin: 10px 0; background: #fafafa;">`;

  svgContent += `<defs><style>
    .grid-line { stroke: #e0e0e0; stroke-width: 1; }
    .axis { stroke: #333; stroke-width: 2; }
    .tick { stroke: #666; stroke-width: 1; }
    .axis-label { font-size: 12px; fill: #333; }
    .point { fill: #ff7a30; r: 4; }
    .point-hover { r: 6; }
  </style></defs>`;

  for (let x = xMin; x <= xMax; x += xStep) {
    const sx = toSvgX(x);
    svgContent += `<line class="grid-line" x1="${sx}" y1="${padding}" x2="${sx}" y2="${svgHeight - padding}" />`;
  }

  for (let y = yMin; y <= yMax; y += yStep) {
    const sy = toSvgY(y);
    svgContent += `<line class="grid-line" x1="${padding}" y1="${sy}" x2="${svgWidth - padding}" y2="${sy}" />`;
  }

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  if (originX >= padding && originX <= svgWidth - padding) {
    svgContent += `<line class="axis" x1="${originX}" y1="${padding}" x2="${originX}" y2="${svgHeight - padding}" />`;
  }

  if (originY >= padding && originY <= svgHeight - padding) {
    svgContent += `<line class="axis" x1="${padding}" y1="${originY}" x2="${svgWidth - padding}" y2="${originY}" />`;
  }

  svgContent += `<line class="axis" x1="${padding}" y1="${padding}" x2="${padding}" y2="${svgHeight - padding}" />`;
  svgContent += `<line class="axis" x1="${padding}" y1="${svgHeight - padding}" x2="${svgWidth - padding}" y2="${svgHeight - padding}" />`;

  for (let x = xMin; x <= xMax; x += xStep) {
    const sx = toSvgX(x);
    svgContent += `<line class="tick" x1="${sx}" y1="${svgHeight - padding - 3}" x2="${sx}" y2="${svgHeight - padding + 3}" />`;
    svgContent += `<text class="axis-label" x="${sx}" y="${svgHeight - padding + 15}" text-anchor="middle">${formatNumber(x, 2)}</text>`;
  }

  for (let y = yMin; y <= yMax; y += yStep) {
    const sy = toSvgY(y);
    svgContent += `<line class="tick" x1="${padding - 3}" y1="${sy}" x2="${padding + 3}" y2="${sy}" />`;
    svgContent += `<text class="axis-label" x="${padding - 10}" y="${sy + 4}" text-anchor="end">${formatNumber(y, 2)}</text>`;
  }

  const points = [];
  let current = xMin;
  while (current <= xMax + 1e-10) {
    const x = current;
    const yVal = Math.sin(x * Math.PI / (xMax - xMin)) * (yMax - yMin) / 2 + (yMin + yMax) / 2;
    const y = Math.max(yMin, Math.min(yMax, yVal));
    points.push({ x, y });
    current += xStep / 3;
  }

  points.forEach((point) => {
    const sx = toSvgX(point.x);
    const sy = toSvgY(point.y);
    svgContent += `<circle class="point" cx="${sx}" cy="${sy}" data-x="${formatNumber(point.x, 2)}" data-y="${formatNumber(point.y, 2)}" title="x: ${formatNumber(point.x, 2)}, y: ${formatNumber(point.y, 2)}" />`;
  });

  svgContent += `<text class="axis-label" x="${svgWidth / 2}" y="${svgHeight - 5}" text-anchor="middle" style="font-size: 14px;">x</text>`;
  svgContent += `<text class="axis-label" x="15" y="${svgHeight / 2}" text-anchor="middle" style="font-size: 14px; transform: rotate(-90deg); transform-origin: 15px ${svgHeight / 2};">y</text>`;

  svgContent += `</svg>`;

  let tableContent = `<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    <thead style="background: #f0f0f0;">
      <tr style="border-bottom: 2px solid #ddd;">
        <th style="padding: 8px; text-align: left;">x</th>
        <th style="padding: 8px; text-align: left;">y</th>
      </tr>
    </thead>
    <tbody>`;

  points.slice(0, 8).forEach((point) => {
    tableContent += `<tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 6px;">${formatNumber(point.x, 3)}</td>
      <td style="padding: 6px;">${formatNumber(point.y, 3)}</td>
    </tr>`;
  });

  tableContent += `</tbody></table>`;

  return `<div style="margin-top: 15px;">${svgContent}${tableContent}</div>`;
}

function gerarDominioImagem() {
  const xMin = toNumber("domXMin");
  const xMax = toNumber("domXMax");
  const yMin = toNumber("domYMin");
  const yMax = toNumber("domYMax");

  if ([xMin, xMax, yMin, yMax].some(isInvalidNumber)) {
    print("saidaDominioImagem", "Informe valores válidos para x e y.");
    return;
  }

  if (xMin > xMax || yMin > yMax) {
    print("saidaDominioImagem", "O valor mínimo não pode ser maior que o máximo.");
    return;
  }

  const xLeft = toText("domXCompEsq");
  const xRight = toText("domXCompDir");
  const yLeft = toText("domYCompEsq");
  const yRight = toText("domYCompDir");

  const xCond = formatIntervalCondition("x", xMin, xMax, xLeft, xRight);
  const yCond = formatIntervalCondition("y", yMin, yMax, yLeft, yRight);

  const dominio = xCond === "vazio" ? "D = conjunto vazio" : `D = {x ∈ R | ${xCond}}`;
  const imagem = yCond === "vazio" ? "Im = conjunto vazio" : `Im = {y ∈ R | ${yCond}}`;
  const saida = `${dominio} | ${imagem}`;

  const grafico = criarGraficoCartesiano(xMin, xMax, yMin, yMax);
  const saidaCompleta = `<div>${saida}${grafico}</div>`;

  byId("saidaDominioImagem").innerHTML = saidaCompleta;
  addHistoryEntry("Domínio e Imagem", saida);
}

byId("btnComposto").addEventListener("click", calcularJurosCompostos);
byId("btnSimples").addEventListener("click", calcularJurosSimples);
byId("btnEq1").addEventListener("click", resolverEquacaoPrimeiro);
byId("btnEq2").addEventListener("click", resolverEquacaoSegundo);
byId("btnIneq1").addEventListener("click", resolverInequacaoPrimeiro);
byId("btnIneq2").addEventListener("click", resolverInequacaoSegundo);
byId("btnConjuntos").addEventListener("click", calcularConjuntos);
byId("btnDominioImagem").addEventListener("click", gerarDominioImagem);
byId("btnLimparHistorico").addEventListener("click", limparHistorico);

document.querySelectorAll(".clear-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = byId(button.dataset.panel);
    const output = byId(button.dataset.output);

    panel.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });

    panel.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0;
    });

    output.textContent = "";
    output.classList.remove("error");

    if (button.dataset.panel === "juros-compostos") {
      atualizarExplicacaoJuros("composto");
    }

    if (button.dataset.panel === "juros-simples") {
      atualizarExplicacaoJuros("simples");
    }

    const explicacoesPadrao = {
      "equacao-primeiro": "explicaEq1",
      "equacao-segundo": "explicaEq2",
      "inequacao-primeiro": "explicaIneq1",
      "inequacao-segundo": "explicaIneq2",
      conjuntos: "explicaConjuntos",
      "dominio-imagem": "explicaDominio"
    };

    const explicacaoId = explicacoesPadrao[button.dataset.panel];

    if (explicacaoId && byId(explicacaoId)) {
      byId(explicacaoId).textContent = "Preencha os campos para visualizar o cenário antes de calcular.";
    }
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".example-btn");

  if (!button) {
    return;
  }

  aplicarExemplo(button.dataset.kind, button.dataset.example);
});



["capitalComposto", "taxaComposta", "tempoComposto", "taxaCompostaUnidade", "tempoCompostoUnidade"].forEach((id) => {
  byId(id).addEventListener("input", () => {
    atualizarExplicacaoJuros("composto");
  });

  byId(id).addEventListener("change", () => {
    atualizarExplicacaoJuros("composto");
  });
});

["capitalSimples", "taxaSimples", "tempoSimples", "taxaSimplesUnidade", "tempoSimplesUnidade"].forEach((id) => {
  byId(id).addEventListener("input", () => {
    atualizarExplicacaoJuros("simples");
  });

  byId(id).addEventListener("change", () => {
    atualizarExplicacaoJuros("simples");
  });
});

document.querySelectorAll(".panel input, .panel select").forEach((field) => {
  field.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const panel = event.target.closest(".panel");
    const calculator = calculatorsByPanel[panel.id];

    if (calculator) {
      calculator();
    }
  });
});

showPanel("juros-compostos");
atualizarExplicacaoJuros("composto");
atualizarExplicacaoJuros("simples");
loadHistorico();
