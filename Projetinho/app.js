document.addEventListener("DOMContentLoaded", function () {

  const formProvador = document.getElementById("form-provador");
  
  if (formProvador) {
    const inputTorax = document.getElementById("torax");
    const inputCintura = document.getElementById("cintura");
    const selectCaimento = document.getElementById("caimento");
    
    const painelResultado = document.getElementById("resultado-container");
    const badgeTamanho = document.getElementById("badge-tamanho");
    const textoJustificativa = document.getElementById("texto-justificativa");
    const alertaIncerteza = document.getElementById("alerta-incerteza");

    const medidasSalvas = JSON.parse(localStorage.getItem("fitlook_perfil"));
    if (medidasSalvas) {
      if (medidasSalvas.torax) inputTorax.value = medidasSalvas.torax;
      if (medidasSalvas.cintura) inputCintura.value = medidasSalvas.cintura;
    }

    formProvador.addEventListener("submit", function (event) {
      event.preventDefault();

      const torax = Number(inputTorax.value);
      const caimento = selectCaimento.value;

      let folga = 4;
      if (caimento === "justo") {
        folga = 1;
      } else if (caimento === "largo") {
        folga = 8;
      }

      const toraxDesejado = torax + folga;
      let tamanhoRecomendado = "";
      let alertaText = "";

      if (toraxDesejado <= 90) {
        tamanhoRecomendado = "P";
      } else if (toraxDesejado <= 98) {
        tamanhoRecomendado = "M";
      } else if (toraxDesejado <= 106) {
        tamanhoRecomendado = "G";
      } else {
        tamanhoRecomendado = "GG";
      }

      if (toraxDesejado === 90 || toraxDesejado === 98 || toraxDesejado === 106) {
        alertaText = "Suas medidas estão no limite entre tamanhos. Se prefere um ajuste mais solto, considere pedir um tamanho maior.";
      }

      badgeTamanho.textContent = tamanhoRecomendado;
      textoJustificativa.textContent = "Recomendamos o tamanho " + tamanhoRecomendado + " para a medida de tórax " + torax + "cm com caimento " + caimento + ".";

      if (alertaText !== "") {
        alertaIncerteza.textContent = alertaText;
        alertaIncerteza.classList.remove("hidden");
      } else {
        alertaIncerteza.classList.add("hidden");
      }

      painelResultado.classList.remove("hidden");
    });
  }

  const formConfiguracao = document.getElementById("form-configuracao");
  
  if (formConfiguracao) {
    const cfgAltura = document.getElementById("cfg-altura");
    const cfgPeso = document.getElementById("cfg-peso");
    const cfgTorax = document.getElementById("cfg-torax");
    const cfgCintura = document.getElementById("cfg-cintura");
    const msgSucesso = document.getElementById("mensagem-sucesso");

    const perfilSalvo = JSON.parse(localStorage.getItem("fitlook_perfil"));
    if (perfilSalvo) {
      if (perfilSalvo.altura) cfgAltura.value = perfilSalvo.altura;
      if (perfilSalvo.peso) cfgPeso.value = perfilSalvo.peso;
      if (perfilSalvo.torax) cfgTorax.value = perfilSalvo.torax;
      if (perfilSalvo.cintura) cfgCintura.value = perfilSalvo.cintura;
    }

    formConfiguracao.addEventListener("submit", function (event) {
      event.preventDefault();

      const perfil = {
        altura: cfgAltura.value,
        peso: cfgPeso.value,
        torax: cfgTorax.value,
        cintura: cfgCintura.value
      };

      localStorage.setItem("fitlook_perfil", JSON.stringify(perfil));
      msgSucesso.classList.remove("hidden");
    });
  }

});