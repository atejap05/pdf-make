import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const geraPDF = folhaObj => {
  // seta pdfMake para trabalhar com fontes custumizadas
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  pdfMake.fonts = {
    LiberationSerif: {
      normal: "LiberationSerif-Regular.ttf",
      bold: "LiberationSerif-Bold.ttf",
      italics: "LiberationSerif-Italic.ttf",
      bolditalics: "LiberationSerif-BoldItalic.ttf",
    },
  };

  /** Definicoes do layout da table (linhas) */
  const layout = {
    vLineColor: "#012030",
    hLineColor: "#012030",
    hLineWidth: function (i, node) {
      return 0.75;
    },
    vLineWidth: function (i, node) {
      return 0.75;
    },
  };

  const convertToPdfMakerUnit = inUnit => {
    return inUnit * 71.729;
  };

  const margin = convertToPdfMakerUnit(0.4);
  const fontSizeSubHeader = 11;

  const { head, body } = folhaObj;

  // header content
  const reportTitle = [
    {
      style: "tableExample",
      margin: [margin, margin, margin, 0],
      layout: layout,
      table: {
        widths: [convertToPdfMakerUnit(4.79), convertToPdfMakerUnit(2.54)], // total width = 586
        body: [
          [
            {
              border: [true, true, false, false],
              fontSize: 16,
              text: head.headInfo.orgao.ministerio,
            },
            {
              border: [true, true, true, false],
              fontSize: 16,

              alignment: "center",
              text: "Folha de Frequência",
            },
          ],
          [
            {
              border: [true, false, false, true],
              fontSize: 16,
              text: head.headInfo.orgao.secretaria,
            },
            {
              alignment: "center",
              bold: true,
              fontSize: 16,
              border: [true, false, true, true],
              text:
                `${head.headInfo.dataReferencia.mes}` +
                `${head.headInfo.dataReferencia.ano}`,
            },
          ],
          [
            {
              colSpan: 2,
              alignment: "center",
              fontSize: 11,
              border: [false, false, false, true],
              text:
                `Folha impressa em ${head.dadosImpressao.data} ` +
                `às ${head.dadosImpressao.horario} pelo usuário matrícula: ` +
                `${head.dadosImpressao.matricula} - Código de homologação: ` +
                `${head.dadosImpressao.codHomologacao}`,
            },
          ],
          [
            {
              border: [true, true, false, false],
              alignment: "center",
              fontSize: 16,
              italics: true,
              text: `${head.pessoalInfo.nome}`,
            },
            {
              margin: [60, 5, 0, 0],
              fontSize: fontSizeSubHeader,
              border: [false, true, true, false],
              text: `CPF: ${head.pessoalInfo.cpf}`,
            },
          ],
          [
            {
              border: [true, false, false, false],
              fontSize: fontSizeSubHeader,
              text: `Cargo: ${head.pessoalInfo.cargo}`,
            },
            {
              margin: [60, 0, 0, 0],
              border: [false, false, true, false],
              fontSize: fontSizeSubHeader,
              text: `Siape: ${head.pessoalInfo.siape}`,
            },
          ],
          [
            {
              border: [true, false, false, false],
              fontSize: fontSizeSubHeader,
              text: `Unidade de Exercício: ${head.pessoalInfo.unidadeExercicio}`,
            },
            {
              margin: [60, 0, 0, 0],
              border: [false, false, true, false],
              fontSize: fontSizeSubHeader,
              text: `SiapeÚnico: ${head.pessoalInfo.siapeUnico}`,
            },
          ],
          [
            {
              border: [true, false, false, false],
              fontSize: fontSizeSubHeader,
              text: `Setor de Exercício: ${head.pessoalInfo.setorExercicio}`,
            },
            {
              margin: [60, 0, 0, 0],
              border: [false, false, true, false],
              fontSize: fontSizeSubHeader,
              text: `SiapeCad: ${head.pessoalInfo.siapeCad}`,
            },
          ],
          [
            {
              border: [true, false, false, false],
              fontSize: fontSizeSubHeader,
              text: `Unidade de Localização Física: ${head.pessoalInfo.localizacaoFisica.unidade}`,
            },
            {
              margin: [60, 0, 0, 0],
              border: [false, false, true, false],
              fontSize: fontSizeSubHeader,
              text: `Telefone:  ${head.pessoalInfo.telefone}`,
            },
          ],
          [
            {
              border: [true, false, false, true],
              fontSize: fontSizeSubHeader,
              text:
                `Município de Localização Física: ` +
                `${head.pessoalInfo.localizacaoFisica.municipio}-` +
                `${head.pessoalInfo.localizacaoFisica.endereco}`,
            },
            {
              margin: [60, 0, 0, 0],
              border: [false, false, true, true],
              fontSize: fontSizeSubHeader,
              text:
                `Pav: ${head.pessoalInfo.localizacaoFisica.complemento.pav} ` +
                `Sala:  ${head.pessoalInfo.localizacaoFisica.complemento.sala}`,
            },
          ],
          [
            {
              border: [false, false, false, false],
              colSpan: 2,
              fontSize: 11,
              alignment: "center",
              text: `${head.jornadaTrabalho.jornada}`,
            },
          ],
        ],
      },
    },
  ];

  const bodyRows = body.map(row => {
    return [
      {
        text: String(row.dia).padStart(2, "0"),
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.entradaManha,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.saidaManha,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.entradaTarde,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.saidaTarde,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.assinaturaOcorrencia,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.horas,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.compensacao,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
      {
        text: row.abono,
        fontSize: 10,
        alignment: "center",
        // margin: [0, 2, 0, 2],
      },
    ];
  });

  //main content
  const details = [
    {
      table: {
        widths: [20, 40, 40, 40, 40, 177, 35, 35, 35],
        body: [
          [
            {
              alignment: "center",
              text: "Dia",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Entrada",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Saída",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Entrada",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Saída",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Assinatura/Ocorrência",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Hora",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Comp.",
              style: "tableHeader",
              fontSize: 12,
            },
            {
              alignment: "center",
              text: "Abono",
              style: "tableHeader",
              fontSize: 12,
            },
          ],
          ...bodyRows,
        ],
      },
    },
  ];

  // footer content
  const rodape = (currentPage, pageCount) => {
    return [
      {
        text: `${currentPage} of ${pageCount}`,
        fontSize: 9,
        alignment: "right",
        margin: [0, 0, 0, 0],
      },
    ];
  };

  const docDefinitions = {
    defaultStyle: { font: "LiberationSerif", color: "#012030" },
    pageSize: "A4",
    // left, top, right, bottom
    pageMargins: [margin, convertToPdfMakerUnit(3.08), margin, margin],

    header: [reportTitle],
    content: [details],
    // footer: rodape,
    footer: [],
  };

  pdfMake.createPdf(docDefinitions).open();
};

export default geraPDF;
