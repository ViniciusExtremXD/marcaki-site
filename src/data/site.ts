/*
 * Todo o conteúdo do site. Fatos tirados de marcaki.app (home, FAQ e página de exemplo, 17/11/2026).
 * Regra: nada de número, depoimento ou cliente inventado (ver README).
 */

export const SITE_URL = "https://marcaki.app/";

export const LINKS = {
  signup: "https://marcaki.app/conta/cadastro",
  login: "https://marcaki.app/conta/entrar",
  demo: "https://marcaki.app/t/salao-da-maria/agendar",
  privacy: "https://marcaki.app/privacidade",
  terms: "https://marcaki.app/termos",
  dataDeletion: "https://marcaki.app/exclusao-de-dados",
  maverick: "https://mavericksoftware.com.br/",
};

/*
 * Contato comercial: ainda não existe. Espaço reservado no rodapé (placeholder: true mostra o selo "em breve").
 * Quando houver, preencher e trocar placeholder para false.
 */
export const CONTACT = {
  placeholder: true,
  whatsappDisplay: "(00) 00000-0000",
  whatsappUrl: "",
  email: "contato@marcaki.app",
};

export const BRAND = {
  name: "Marcaki",
  signature: "Marcou, tá marcado.",
  promise: "Sua agenda cheia sem responder WhatsApp o dia inteiro",
  maker: "Maverick Software Solutions",
};

export const PRICE = {
  monthly: 49.9,
  yearly: 499,
  yearlyPerMonth: 41.58,
  trialDays: 14,
  freeMessages: 100,
};

/** Base do Vite (GitHub Pages usa /marcaki-site/). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

/* ───────────── Medição (só dataLayer; nenhuma tag no código). Ver TRACKING.md. ───────────── */

export function pushEvent(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export const NAV_LINKS = [
  { href: "#a-conta", label: "Faça a conta" },
  { href: "#solucao", label: "Como resolve" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#preco", label: "Preço" },
  { href: "#perguntas", label: "Perguntas" },
];

/* Serviços reais da página de exemplo (Salão da Maria). */
export const DEMO_BUSINESS = {
  name: "Salão da Maria",
  type: "Salão de beleza",
  tagline: "Escolha o serviço, o horário, e pronto.",
  services: [
    { name: "Coloração", duration: "2h", price: "R$ 180,00" },
    { name: "Corte feminino", duration: "1h", price: "R$ 90,00" },
    { name: "Corte masculino", duration: "30 min", price: "R$ 45,00" },
    { name: "Escova", duration: "45 min", price: "R$ 60,00" },
    { name: "Manicure", duration: "40 min", price: "R$ 45,00" },
  ],
};

/* O que a agenda no improviso custa (seção "A conta"). Sem número inventado: os valores vêm da calculadora, com os números do visitante. */
export const PAINS = [
  {
    id: "parado",
    title: "Atendimento parado",
    text: "Cada “tem horário?” tira você da cadeira: seca a mão, procura no caderno, responde. Várias vezes por dia.",
  },
  {
    id: "vazio",
    title: "Horário vazio",
    text: "O cliente esquece, não avisa, e aquele horário que podia ser de outra pessoa vira prejuízo.",
  },
  {
    id: "desiste",
    title: "Cliente que desiste",
    text: "Quem pergunta às 23h e só recebe resposta no dia seguinte muitas vezes já marcou em outro lugar.",
  },
];

/* Premissas da calculadora (ditas na própria seção). */
export const CALC = {
  weeksPerMonth: 4,
  workDaysPerMonth: 24, // 6 dias por semana
  minutesPerChat: 2,
  defaults: { ticket: 60, noShows: 3, chats: 15 },
};

export const CHAOS_MESSAGES = [
  { who: "Ana", text: "Oi, tem horário amanhã?", time: "09:12" },
  { who: "Carla", text: "Consegue me encaixar às 15h?", time: "09:14" },
  { who: "Ana", text: "E sábado de manhã?", time: "09:20" },
  { who: "Jéssica", text: "Quanto tá a escova?", time: "10:02" },
  { who: "Rafa", text: "Desculpa, não vou conseguir ir hoje", time: "10:41" },
  { who: "Carla", text: "??", time: "11:05" },
];

export const STEPS = [
  {
    n: "1",
    title: "Cadastre seu negócio",
    text: "Nome, tipo de negócio e o endereço da sua página. Leva um minuto.",
  },
  {
    n: "2",
    title: "Informe serviços e horários",
    text: "Cada serviço tem duração e preço. O horário de funcionamento define a grade que o cliente vê.",
  },
  {
    n: "3",
    title: "Compartilhe o link",
    text: "Coloque na bio do Instagram, no status do WhatsApp ou no cartão. O cliente agenda sozinho.",
  },
];

/* Como o Marcaki resolve: cada linha diz qual dor some e mostra o produto funcionando. */
export const SOLUTIONS = {
  selfBooking: {
    solves: ["Atendimento parado", "Cliente que desiste"],
    title: "Seu cliente marca sozinho, ==a qualquer hora.==",
    text: "Uma página de agendamento com o nome do seu negócio. O cliente escolhe o serviço, vê só os horários livres e marca com nome e telefone. Sem baixar aplicativo e sem esperar você responder.",
    gain: "Você atende sem interrupção, e quem quer marcar de madrugada marca com você.",
  },
  reminders: {
    solves: ["Horário vazio"],
    title: "Confirmação e lembrete no WhatsApp, ==sem você digitar.==",
    text: "Assim que marca, o cliente recebe a confirmação. Antes do horário, recebe o lembrete. Tudo automático, com 100 envios grátis por mês no plano.",
    gain: "Cliente lembrado não esquece, e o seu horário não fica parado à toa.",
  },
  agenda: {
    solves: ["Caderno", "Horário em dobro"],
    title: "Uma agenda que ==não dá furo.==",
    text: "A grade sai do seu expediente menos o que já está marcado, então ninguém marca no mesmo horário. Cada profissional tem a própria agenda, com horário próprio se precisar.",
    gain: "Você abre o celular e já sabe quem vem, quando e para quê.",
  },
};

export const EXTRAS = [
  { id: "pagina", title: "Página com o nome do seu negócio" },
  { id: "semapp", title: "Sem app e sem conta para o cliente" },
  { id: "suporte", title: "Suporte com IA e fila humana" },
  { id: "lgpd", title: "Dados protegidos pela LGPD" },
];

export type Audience = {
  id: string;
  label: string;
  title: string;
  text: string;
  services: string[];
  image: string;
  alt: string;
  inset: string;
  insetAlt: string;
};

/* Fotos: ver CREDITS.md. Os arquivos ficam em public/images (WebP em 3 larguras). */
export const AUDIENCES: Audience[] = [
  {
    id: "saloes",
    label: "Salões de beleza",
    title: "Enquanto você faz a escova, a agenda se preenche.",
    text: "Corte, coloração, escova e manicure, cada um com a duração certa. A cliente vê só o horário que cabe o serviço que ela escolheu.",
    services: ["Escova", "Coloração", "Corte", "Manicure"],
    image: "salao",
    alt: "Cabeleireira finalizando uma escova com secador e escova redonda",
    inset: "salao-manicure",
    insetAlt: "Manicure de luvas cuidando das unhas de uma cliente",
  },
  {
    id: "barbearias",
    label: "Barbearias",
    title: "Cliente fixo marca o próximo corte sem te chamar.",
    text: "Atendimento curto pede agenda rápida. Link na bio, o cliente marca de madrugada e você começa o dia sabendo quem vem, sem largar a máquina.",
    services: ["Corte", "Barba", "Sobrancelha", "Pezinho"],
    image: "barbearia",
    alt: "Barbeiro fazendo a barba de um cliente com navalha",
    inset: "barbearia-maquina",
    insetAlt: "Barbeiro fazendo o acabamento da nuca com máquina",
  },
  {
    id: "clinicas",
    label: "Clínicas de estética",
    title: "Cada procedimento no horário certo, com lembrete para ninguém faltar.",
    text: "Procedimento longo e horário vazio custam caro. Confirmação na hora e lembrete antes do horário ajudam a cliente a não esquecer.",
    services: ["Limpeza de pele", "Massagem", "Drenagem", "Design de sobrancelha"],
    image: "estetica",
    alt: "Mãos de massoterapeuta fazendo massagem nas costas de uma cliente, com luz de janela",
    inset: "estetica-facial",
    insetAlt: "Esteticista de luvas fazendo procedimento facial em uma cliente",
  },
];

export const INCLUDED = [
  "Página de agendamento com o nome do seu negócio",
  "Agenda por profissional",
  "Confirmação e lembrete por WhatsApp (100 grátis por mês)",
  "Agendamento sem conta para o cliente",
  "Suporte com triagem por IA",
  "Sem taxa de adesão e sem fidelidade",
];

export const FAQ = [
  {
    q: "Preciso saber mexer em tecnologia para usar o Marcaki?",
    a: "Não. Você cadastra o negócio, os serviços e o horário de funcionamento pelo celular, em menos de cinco minutos. Não tem instalação nem curva de aprendizado.",
  },
  {
    q: "Meu cliente precisa baixar aplicativo ou criar conta para agendar?",
    a: "Não. Ele abre o link da sua página no navegador do celular e agenda com nome e telefone. Criar conta é opcional, só para quem quer ver histórico e cancelar pelo site.",
  },
  {
    q: "Quanto custa depois do teste grátis?",
    a: "R$ 49,90 por mês, ou R$ 499 por ano (o equivalente a dois meses grátis). Plano único, sem taxa de adesão.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Não tem fidelidade nem multa — você testa 14 dias sem cartão de crédito e decide depois.",
  },
  {
    q: "O Marcaki funciona para um negócio com vários profissionais?",
    a: "Sim. Cada profissional tem a própria agenda, com horário próprio se for diferente do horário geral do negócio.",
  },
];

export const MARQUEE = ["Escova", "Corte", "Barba", "Coloração", "Manicure", "Limpeza de pele", "Massagem", "Sobrancelha", "Pedicure", "Hidratação", "Drenagem", "Pezinho"];
