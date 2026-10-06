import { createFileRoute } from "@tanstack/react-router";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Beer,
  Coffee,
  Gift,
  Heart,
  Landmark,
  MapPin,
  Palette,
  ShoppingBag,
  TrainFront,
  Trees,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import monograma from "@/assets/monograma-carol-plinio.png.asset.json";
import igrejaAquarela from "@/assets/aquarela-igreja.png.asset.json";
import divisor from "@/assets/separador-1.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Carol & Plínio — 16 de outubro de 2027" },
      {
        name: "description",
        content:
          "Casamento de Carol e Plínio, 16 de outubro de 2027 às 16h, na Matriz de Santo Antônio em Tiradentes, Minas Gerais. Informações, hospedagem, dress code e RSVP.",
      },
      { property: "og:title", content: "Carol & Plínio — 16 de outubro de 2027" },
      {
        property: "og:description",
        content:
          "Vamos nos casar em Tiradentes! 16.10.2027 às 16h na Matriz de Santo Antônio.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const WEDDING_DATE = new Date("2027-10-16T16:00:00-03:00");

const NAV = [
  { label: "Sejam bem-vindos", href: "#boas-vindas" },
  { label: "O Dia", href: "#o-dia" },
  { label: "Tiradentes", href: "#tiradentes" },
  { label: "Fim de semana", href: "#fim-de-semana" },
  { label: "Hospedagem", href: "#hospedagem" },
  { label: "Dress Code", href: "#dress-code" },
  { label: "RSVP", href: "#rsvp" },
];

type WeekendItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
};

const WEEKEND_DAYS: Record<
  "sexta" | "sabado" | "domingo",
  { eyebrow: string; intro: string; items: WeekendItem[] }
> = {
  sexta: {
    eyebrow: "Chegue, desacelere e conheça a cidade.",
    intro:
      "Tiradentes é daquelas cidades que pedem para ser exploradas sem pressa. Aproveite a sexta-feira para caminhar pelo Centro Histórico, conhecer as lojinhas, ateliês e casarões e descobrir os cantinhos da cidade.",
    items: [
      {
        title: "Para começar o dia",
        description:
          "Se chegar cedo, algumas boas opções para um café são Jane's Apple, Vertentes Café e Torra, Marcas Mineiras ou Casa do Sino. Para algo mais simples e bem mineiro, vale também passar em uma das padarias tradicionais da cidade.",
        icon: Coffee,
      },
      {
        title: "Arte & história",
        description:
          "Reserve algumas horas para conhecer o Museu de Sant'Ana, o Museu da Liturgia ou entrar nas galerias e ateliês espalhados pelo centro.",
        icon: Palette,
      },
      {
        title: "Passeio pelo centro",
        description:
          "Depois, é hora de andar sem roteiro: Rua Direita, Largo das Forras, Rua da Câmara e as pequenas lojas de artesanato e design.",
        icon: ShoppingBag,
      },
      {
        title: "À noite",
        description:
          "Escolha um restaurante para um jantar especial ou aproveite um dos bares da cidade para tomar um vinho, uma cerveja artesanal ou um drink.",
        icon: Wine,
      },
    ],
  },
  sabado: {
    eyebrow: "Uma manhã tranquila antes do nosso grande momento. ♡",
    intro:
      "A manhã de sábado é livre para aproveitar Tiradentes com calma — mas recomendamos não programar muita coisa. O ideal é curtir a cidade, almoçar cedo e reservar a tarde para se arrumar.",
    items: [
      {
        title: "Café da manhã",
        description:
          "Aproveite o café da manhã da pousada ou experimente algum dos cafés da cidade. Jane's Apple, Padaria Padre Toledo, Marcas Mineiras e Vertentes Café e Torra são algumas opções para colocar na lista.",
        icon: Coffee,
      },
      {
        title: "Uma manhã para passear",
        description:
          "Uma caminhada pelo Centro Histórico, algumas comprinhas ou uma visita rápida a um museu já são suficientes para aproveitar a manhã.",
        icon: Trees,
      },
      {
        title: "Almoço",
        description:
          "Escolha um almoço leve e sem pressa — afinal, o compromisso mais importante do dia começa às 16h.",
        icon: UtensilsCrossed,
      },
      {
        title: "16h — Nosso casamento",
        description:
          "Matriz de Santo Antônio. Depois da cerimônia, seguimos para uma recepção em restaurante, para celebrar juntos, brindar e aproveitar a noite com calma.",
        icon: Heart,
        highlight: true,
      },
    ],
  },
  domingo: {
    eyebrow: "Um último café, um último passeio e até a próxima.",
    intro: "Depois do nosso casamento, o domingo é perfeito para desacelerar.",
    items: [
      {
        title: "Café da manhã",
        description:
          "Aproveite o café da manhã da pousada ou descubra mais um café da cidade. Se quiser algo rápido e bem mineiro, vale experimentar um pão de queijo ou um doce tradicional antes de pegar a estrada.",
        icon: Coffee,
      },
      {
        title: "Maria Fumaça",
        description:
          "Para quem tiver algumas horas disponíveis, o passeio de Maria Fumaça entre Tiradentes e São João del-Rei é uma das experiências clássicas da região.",
        icon: TrainFront,
      },
      {
        title: "Ou... Bichinho",
        description:
          "Outra opção é pegar a estrada até Bichinho, um pequeno distrito conhecido pelos ateliês, artesanato, restaurantes e pela produção de peças mineiras.",
        icon: Palette,
      },
      {
        title: "Almoço de despedida",
        description:
          "Antes de voltar para casa, aproveite para fazer aquele último almoço mineiro sem pressa.",
        icon: UtensilsCrossed,
      },
    ],
  },
};

const FAVORITES: WeekendItem[] = [
  {
    title: "Para tomar café",
    description:
      "Jane's Apple — café e bolos deliciosos em ambiente charmoso. Vertentes Café e Torra — café especial. Marcas Mineiras — café e lembranças. Casa do Sino — ambiente charmoso. Padaria Padre Toledo e Padaria Mister Pão — opções simples e tradicionais.",
    icon: Coffee,
  },
  {
    title: "Arte & história",
    description:
      "Museu de Sant'Ana, Museu da Liturgia, galerias e ateliês do Centro Histórico e um passeio pelo conjunto arquitetônico de Tiradentes.",
    icon: Landmark,
  },
  {
    title: "Para jantar",
    description:
      "Tiradentes tem uma gastronomia muito forte e vale fazer reserva com antecedência. Entre os restaurantes com boas avaliações estão Tragaluz, O Provençal, Angatu e Restaurante Esplendor.",
    icon: UtensilsCrossed,
  },
  {
    title: "Cerveja ou drink",
    description:
      "Para algo mais descontraído, vale conhecer 50 Tons de Malte, Duquim ou algum dos bares ao redor do Centro Histórico.",
    icon: Beer,
  },
  {
    title: "Para comprar",
    description:
      "A melhor dica é caminhar pelo centro e entrar nas lojas de decoração, artesanato e peças de artistas locais que chamarem sua atenção.",
    icon: ShoppingBag,
  },
];

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    return {
      dias: Math.floor(diff / 86400000),
      horas: Math.floor((diff / 3600000) % 24),
      minutos: Math.floor((diff / 60000) % 60),
      segundos: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Divisor({ className = "" }: { className?: string }) {
  return (
    <img
      src={divisor.url}
      alt=""
      aria-hidden
      loading="lazy"
      width={1200}
      height={180}
      className={`mx-auto w-80 max-w-[90%] md:w-[28rem] ${className}`}
    />
  );
}

function SectionTitle({ title, script }: { title: string; script?: string }) {
  return (
    <div className="text-center">
      {script && (
        <p className="font-script text-3xl text-primary md:text-4xl">{script}</p>
      )}
      <h2 className="mt-1 font-title text-2xl font-medium tracking-wide text-cafe md:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-24 bg-primary/60" />
    </div>
  );
}

function WeekendItemCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="group flex gap-4 border-b border-border py-6 transition-colors duration-300">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-title text-xl text-cafe">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">
          {description}
        </p>
      </div>
    </article>
  );
}

function WeekendFeaturedCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="relative overflow-hidden border-y border-primary/60 bg-primary/[0.08] px-6 py-8 text-center md:px-12 md:py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/60 bg-background/60 text-primary">
          <Icon aria-hidden="true" size={26} strokeWidth={1.3} />
        </div>
        <h3 className="mt-5 font-title text-2xl text-cafe md:text-3xl">{title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-primary">
          <MapPin aria-hidden="true" size={14} /> Matriz de Santo Antônio · Tiradentes, MG
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">
          {description}
        </p>
      </div>
    </article>
  );
}

function WeekendCards({ items }: { items: WeekendItem[] }) {
  const featured = items.filter((item) => item.highlight);
  const regular = items.filter((item) => !item.highlight);

  const gridCols =
    regular.length === 3
      ? "md:grid-cols-3"
      : regular.length === 4
        ? "md:grid-cols-2"
        : "md:grid-cols-2";

  return (
    <div className="mt-8 space-y-8">
      {regular.length > 0 && (
        <div className={`grid gap-6 ${gridCols}`}>
          {regular.map((item) => (
            <WeekendItemCard key={item.title} {...item} />
          ))}
        </div>
      )}

      {featured.length > 0 && (
        <div className="space-y-6">
          {featured.map((item) => (
            <WeekendFeaturedCard key={item.title} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

function WeekendGuide() {
  const tabs = [
    ["sexta", "Sexta"],
    ["sabado", "Sábado"],
    ["domingo", "Domingo"],
    ["favoritos", "Favoritos"],
  ] as const;

  return (
    <Tabs.Root defaultValue="sexta" className="mt-10">
      <Tabs.List
        aria-label="Escolha um dia do fim de semana"
        className="mx-auto grid max-w-2xl grid-cols-2 border-y border-primary/40 sm:grid-cols-4"
      >
        {tabs.map(([value, label]) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="relative min-h-12 px-3 py-3 text-sm uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-cafe data-[state=active]:bg-primary/15 data-[state=active]:text-cafe data-[state=active]:after:absolute data-[state=active]:after:inset-x-4 data-[state=active]:after:bottom-0 data-[state=active]:after:h-px data-[state=active]:after:bg-primary"
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {(Object.entries(WEEKEND_DAYS) as [keyof typeof WEEKEND_DAYS, (typeof WEEKEND_DAYS)[keyof typeof WEEKEND_DAYS]][]).map(
        ([day, content]) => (
          <Tabs.Content
            key={day}
            value={day}
            className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 motion-reduce:animate-none"
          >
            <div className="mx-auto mt-10 max-w-2xl text-center">
              <p className="font-title text-2xl text-primary md:text-3xl">{content.eyebrow}</p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">{content.intro}</p>
            </div>
            <WeekendCards items={content.items} />
          </Tabs.Content>
        ),
      )}

      <Tabs.Content
        value="favoritos"
        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 motion-reduce:animate-none"
      >
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-title text-2xl text-primary md:text-3xl">
            Nossos cantinhos preferidos
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/90">
            Algumas sugestões para saborear, descobrir e levar um pedacinho de
            Tiradentes com você.
          </p>
        </div>
        <WeekendCards items={FAVORITES} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

function Index() {
  const { dias, horas, minutos, segundos } = useCountdown();

  return (
    <div className="min-h-screen bg-background font-serif text-foreground">
      {/* Topo com aquarela suave ao fundo */}
      <div className="relative overflow-hidden">
        <img
          src={igrejaAquarela.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16] mix-blend-multiply"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background"
        />
        <header className="relative border-b border-border/70">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-4 pt-6">
          <span className="text-xs uppercase tracking-[0.3em] text-cafe">Est</span>
          <img
            src={monograma.url}
            alt="Monograma C&P de Carol e Plínio"
            width={160}
            height={160}
            className="w-20 md:w-24"
          />
          <span className="text-xs uppercase tracking-[0.3em] text-cafe">16 Out</span>
        </div>
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.15em] text-cafe transition-colors hover:text-primary md:text-base"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

        {/* Hero */}
        <section className="relative px-4 pb-16 pt-16 text-center md:pb-24 md:pt-24">
        <h1 className="font-title text-5xl leading-tight text-cafe md:text-7xl">
          Carol &amp; Plínio
        </h1>
        <p className="mt-6 text-lg tracking-[0.4em] text-cafe md:text-xl">
          16 . 10 . 2027
        </p>
      </section>

      {/* Boas-vindas */}
      <section id="boas-vindas" className="mx-auto max-w-2xl scroll-mt-8 px-6 py-20 text-center">
        <SectionTitle script="Seja bem-vindo!" title="Boas-vindas" />
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
          <p>Que bom ter você por aqui! 🤍</p>
          <p>
            Se tem uma coisa que combina com a nossa história, é gostar de lugares
            que têm história para contar. A gente gosta de museus, de andar sem
            pressa por uma cidade nova, de descobrir seus cantinhos e,
            principalmente, de criar nossas próprias histórias pelo caminho.
          </p>
          <p>
            Por isso, Tiradentes não poderia ser um lugar qualquer para o nosso
            casamento. É uma cidade que sempre foi muito especial para nós e
            que, de diferentes formas, faz parte da nossa história.
          </p>
          <p>
            Agora, chegou a vez de escrever mais um capítulo por lá — dessa vez,
            cercados pelas pessoas que fazem parte da nossa vida e que queremos
            ter por perto nesse momento tão importante.
          </p>
          <p>
            Por aqui, vamos reunir tudo o que você precisa saber para o nosso
            grande dia: programação, informações, dicas para aproveitar
            Tiradentes e, claro, algumas novidades ao longo dessa contagem
            regressiva.
          </p>
          <p className="text-primary">
            Mal podemos esperar para viver esse dia com vocês.
            <br />
            Nos vemos em Tiradentes! ✨
          </p>
        </div>
        <Divisor className="mt-14" />
      </section>

      {/* Countdown */}
      <section className="bg-secondary/60 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-script text-3xl text-primary md:text-4xl">Contagem regressiva</p>
          <div className="mt-8 grid grid-cols-4 gap-2 md:gap-6">
            {[
              { v: dias, l: "dias" },
              { v: horas, l: "horas" },
              { v: minutos, l: "minutos" },
              { v: segundos, l: "segundos" },
            ].map((u) => (
              <div key={u.l} className="border border-primary/40 bg-card px-2 py-5 md:py-8">
                <p className="text-3xl font-medium tabular-nums text-cafe md:text-5xl">
                  {String(u.v).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:text-xs">
                  {u.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Dia */}
      <section id="o-dia" className="mx-auto max-w-3xl scroll-mt-8 px-6 py-20">
        <SectionTitle script="O grande dia" title="O Dia" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="border border-border bg-card p-8 text-center">
            <p className="font-title text-3xl text-primary">Cerimônia</p>
            <p className="mt-4 text-lg leading-relaxed">
              16 de outubro de 2027, às 16h
            </p>
            <p className="mt-2 text-lg leading-relaxed">
              Matriz de Santo Antônio
              <br />
              Largo da Matriz, Tiradentes — MG
            </p>
          </div>
          <div className="border border-border bg-card p-8 text-center">
            <p className="font-title text-3xl text-primary">Recepção</p>
            <p className="mt-4 text-lg leading-relaxed">
              Após a cerimônia, seguiremos para um restaurante em Tiradentes
              para celebrarmos juntos.
            </p>
            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
              Será um momento de boa comida, brinde e conversa. Local e horário em breve.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-base text-muted-foreground">
          Pedimos que cheguem às 15h30: a cerimônia começará pontualmente às 16h.
        </p>
      </section>

      {/* Tiradentes */}
      <section id="tiradentes" className="scroll-mt-8 bg-oliva/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle script="Onde tudo acontece" title="Tiradentes" />
          <div className="mt-10 overflow-hidden border border-border">
            <img
              src={igrejaAquarela.url}
              alt="Aquarela da Matriz de Santo Antônio em Tiradentes, pintada pelo noivo"
              loading="lazy"
              width={1289}
              height={974}
              className="h-auto w-full object-cover"
            />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-foreground/90">
            Uma das cidades históricas mais charmosas do Brasil, com suas ruas de
            pedra, casarios coloniais e a majestosa Matriz de Santo Antônio — o lugar
            que escolhemos para dizer "sim". Reservem um tempo para passear pelo
            centro histórico, visitar os ateliês e saborear a deliciosa cozinha
            mineira.
          </p>
        </div>
        <Divisor className="mt-14" />
      </section>

      {/* Fim de semana */}
      <section
        id="fim-de-semana"
        className="scroll-mt-8 overflow-hidden px-5 py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <SectionTitle script="Viva a cidade com a gente" title="Um fim de semana em Tiradentes" />
          <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-foreground/90">
            Preparamos um roteiro leve para vocês aproveitarem cada momento na
            cidade — antes e depois do nosso sim.
          </p>
          <WeekendGuide />
          <Divisor className="mt-14" />
        </div>
      </section>

      {/* Hospedagem */}
      <section id="hospedagem" className="mx-auto max-w-3xl scroll-mt-8 px-6 py-20">
        <SectionTitle script="Descanso & aconchego" title="Hospedagem" />
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-foreground/90">
          Tiradentes é cheia de pousadas charmosas no centro histórico. Como outubro
          é época de alta procura na cidade, recomendamos reservar com antecedência.
          Em breve publicaremos aqui uma lista de pousadas parceiras com condições
          especiais para nossos convidados.
        </p>
      </section>

      {/* Dress Code */}
      <section id="dress-code" className="scroll-mt-8 bg-secondary/60 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionTitle script="Trajes" title="Dress Code" />
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-center text-lg leading-relaxed text-foreground/90">
            <p>Para celebrar esse dia com a gente, sugerimos o traje esporte fino.</p>
            <p>
              Como nosso casamento acontece em Tiradentes, em uma igreja histórica e
              cercado pelas charmosas ruas de pedra da cidade, recomendamos escolher
              sapatos confortáveis, especialmente para quem pretende caminhar pelas
              ladeiras e pelo centro histórico.
            </p>
            <p>
              Em outubro, o clima costuma ser bastante agradável, com temperaturas que
              historicamente ficam em torno de 16 °C a 25 °C. Como a cerimônia será às
              16h e a temperatura pode cair ao longo da noite, vale considerar uma
              pashmina, echarpe, blazer ou outra peça leve para complementar o look.
            </p>
            <p>
              Outubro também marca o início de um período mais chuvoso em Tiradentes.
              Por isso, recomendamos estar preparado para uma eventual chuva — e,
              principalmente, escolher calçados que sejam confortáveis e seguros para
              as pedras das ruas históricas.
            </p>
            <p>
              Nosso conselho: venha elegante, mas confortável. Afinal, queremos que
              vocês aproveitem cada momento, caminhem, dancem e curtam Tiradentes com
              a gente.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              { classe: "bg-amarelo-manteiga", n: "Manteiga" },
              { classe: "bg-amarelo-mel", n: "Mel" },
              { classe: "bg-amarelo-ocre", n: "Ocre" },
              { classe: "bg-amarelo-mostarda", n: "Mostarda" },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <span
                  className={`block h-16 w-16 rounded-full border border-border ${s.classe}`}
                />
                <span className="mt-2 block max-w-20 text-xs text-muted-foreground">{s.n}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Cores das madrinhas — uma seleção de tons de amarelo para celebrar com alegria.
          </p>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="mx-auto max-w-2xl scroll-mt-8 px-6 py-20 text-center">
        <SectionTitle script="Confirme sua presença" title="RSVP" />
        <p className="mt-8 text-lg leading-relaxed text-foreground/90">
          Sua presença é o nosso maior presente. Em breve abriremos aqui a
          confirmação de presença — enquanto isso, salvem a data:
        </p>
        <p className="mt-6 font-script text-4xl text-primary md:text-5xl">16 . 10 . 2027</p>
        <div className="mt-10">
          <p className="text-lg leading-relaxed text-foreground/90">
            Para quem quiser nos presentear, nossa lista de presentes está na Wedy:
          </p>
          <a
            href="https://sites.wedy.com/casamento-carolina-e-plinio/lista-de-presentes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary px-8 py-3 font-title text-lg text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Gift className="h-5 w-5" aria-hidden />
            Lista de presentes
          </a>
          <p className="mt-3 text-sm text-muted-foreground">wedy.com/casamento-carolina-e-plinio</p>
        </div>
        <img
          src={monograma.url}
          alt="Monograma C&P de Carol e Plínio"
          loading="lazy"
          width={160}
          height={160}
          className="mx-auto mt-12 w-24"
        />

      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-10 text-center">
        <p className="font-title text-3xl text-primary">Carol &amp; Plínio</p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          16 de outubro de 2027 · Tiradentes, Minas Gerais
        </p>
      </footer>
    </div>
  );
}
