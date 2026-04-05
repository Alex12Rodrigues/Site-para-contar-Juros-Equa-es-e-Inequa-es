const tabButtons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".panel");
const activeModuleText = byId("moduloAtivo");

const calculatorsByPanel = {
  "juros-compostos": calcularJurosCompostos,
  "juros-simples": calcularJurosSimples,
  "equacao-primeiro": resolverEquacaoPrimeiro,
  "equacao-segundo": resolverEquacaoSegundo,
  "inequacao-primeiro": resolverInequacaoPrimeiro,
  "inequacao-segundo": resolverInequacaoSegundo
};

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
    atualizarExplicacaoJuros("composto");
    return;
  }

  if (kind === "composto" && example === "curto") {
    byId("capitalComposto").value = "1500";
    byId("taxaComposta").value = "0.15";
    byId("taxaCompostaUnidade").value = "dia";
    byId("tempoComposto").value = "45";
    byId("tempoCompostoUnidade").value = "dia";
    atualizarExplicacaoJuros("composto");
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
  }
}

function aplicarExemplo(kind, example) {
  preencherExemplo(kind, example);
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
    print(
      "saidaIneq2",
      a > 0 ? "Solução: todos os valores reais." : "Solução: conjunto vazio."
    );
    return;
  }

  const raiz1 = (-b - Math.sqrt(deltaCorrigido)) / (2 * a);
  const raiz2 = (-b + Math.sqrt(deltaCorrigido)) / (2 * a);

  if (deltaCorrigido === 0) {
    if (a > 0) {
      print("saidaIneq2", `Solução: x ≠ ${formatNumber(raiz1, 4)}.`);
    } else {
      print("saidaIneq2", "Solução: conjunto vazio.");
    }
    return;
  }

  if (a > 0) {
    print(
      "saidaIneq2",
      `Solução: x < ${formatNumber(raiz1, 4)} ou x > ${formatNumber(raiz2, 4)}.`
    );
  } else {
    print(
      "saidaIneq2",
      `Solução: ${formatNumber(raiz1, 4)} < x < ${formatNumber(raiz2, 4)}.`
    );
  }
}

byId("btnComposto").addEventListener("click", calcularJurosCompostos);
byId("btnSimples").addEventListener("click", calcularJurosSimples);
byId("btnEq1").addEventListener("click", resolverEquacaoPrimeiro);
byId("btnEq2").addEventListener("click", resolverEquacaoSegundo);
byId("btnIneq1").addEventListener("click", resolverInequacaoPrimeiro);
byId("btnIneq2").addEventListener("click", resolverInequacaoSegundo);

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
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".example-btn");

  if (!button) {
    return;
  }

  preencherExemplo(button.dataset.kind, button.dataset.example);
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
