import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import monograma from "@/assets/monograma-carol-plinio.png.asset.json";
import igrejaFoto from "@/assets/tiradentes.jpg.asset.json";
import igrejaIlustracao from "@/assets/igreja-ilustracao.png";
import divisor from "@/assets/divisor-ornamental.png.asset.json";

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
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const WEDDING_DATE = new Date("2027-10-16T16:00:00-03:00");

const NAV = [
  { label: "Sejam bem-vindos", href: "#boas-vindas" },
  { label: "O Dia", href: "#o-dia" },
  { label: "Tiradentes", href: "#tiradentes" },
  { label: "Hospedagem", href: "#hospedagem" },
  { label: "Dress Code", href: "#dress-code" },
  { label: "RSVP", href: "#rsvp" },
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
      width={1600}
      height={300}
      className={`mx-auto w-72 max-w-full md:w-96 ${className}`}
    />
  );
}

function SectionTitle({ title, script }: { title: string; script?: string }) {
  return (
    <div className="text-center">
      {script && (
        <p className="font-script text-3xl text-primary md:text-4xl">{script}</p>
      )}
      <h2 className="mt-1 font-title text-2xl font-medium uppercase tracking-[0.2em] text-cafe md:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-24 bg-primary/60" />
    </div>
  );
}

function Index() {
  const { dias, horas, minutos, segundos } = useCountdown();

  return (
    <div className="min-h-screen bg-background font-serif text-foreground">
      {/* Header */}
      <header className="border-b border-border">
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
      <section className="px-4 pt-16 text-center md:pt-24">
        <h1 className="font-title text-5xl leading-tight text-cafe md:text-7xl">
          Carol &amp; Plínio
        </h1>
        <p className="mt-6 text-lg tracking-[0.4em] text-cafe md:text-xl">
          16 . 10 . 2027
        </p>
        <img
          src={igrejaIlustracao}
          alt="Ilustração em gravura da Matriz de Santo Antônio, em Tiradentes"
          width={1408}
          height={1008}
          className="mx-auto mt-10 w-full max-w-2xl [mask-image:radial-gradient(ellipse_75%_80%_at_center,black_60%,transparent_100%)]"
        />
      </section>

      {/* Boas-vindas */}
      <section id="boas-vindas" className="mx-auto max-w-2xl scroll-mt-8 px-6 py-20 text-center">
        <SectionTitle script="Seja bem-vindo!" title="Boas-vindas" />
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
          <p>É uma alegria enorme ter você aqui.</p>
          <p>
            Somos Carol e Plínio, e Deus nos presenteou com uma história construída
            com leveza, parceria, muito amor e fé.
          </p>
          <p>
            Criamos este espaço para compartilhar um pouco dessa fase tão especial:
            detalhes importantes, informações, programações, novidades e tudo o que
            estamos preparando com muito carinho para o nosso grande dia — na
            histórica e encantadora Tiradentes, em Minas Gerais.
          </p>
          <p className="text-primary">Obrigada por fazer parte da nossa história.</p>
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
              Após a cerimônia, celebraremos juntos em Tiradentes.
            </p>
            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
              Local e horário em breve.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-base text-muted-foreground">
          Pedimos que cheguem com antecedência: a cerimônia começará pontualmente às 16h.
        </p>
      </section>

      {/* Tiradentes */}
      <section id="tiradentes" className="scroll-mt-8 bg-oliva/10 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle script="Onde tudo acontece" title="Tiradentes" />
          <div className="mt-10 overflow-hidden border border-border">
            <img
              src={igrejaFoto.url}
              alt="Vista aérea de Tiradentes ao entardecer, com a Matriz de Santo Antônio iluminada"
              loading="lazy"
              width={1920}
              height={1080}
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
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-foreground/90">
            Traje esporte fino. Lembrando que a cerimônia acontece em uma igreja
            histórica com ruas de pedra — recomendamos sapatos confortáveis para
            caminhar pelas ladeiras de Tiradentes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              { classe: "bg-amarelo-palha", n: "Palha" },
              { classe: "bg-amarelo-manteiga", n: "Manteiga" },
              { classe: "bg-amarelo-mel", n: "Mel" },
              { classe: "bg-amarelo-ocre", n: "Ocre" },
              { classe: "bg-amarelo-mostarda", n: "Mostarda" },
              { classe: "bg-amarelo-dourado", n: "Dourado" },
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
