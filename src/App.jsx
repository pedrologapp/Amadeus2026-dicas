import { useState, useEffect, useRef, useCallback } from "react";
import {
  ClipboardList,
  Clock,
  DoorOpen,
  Shirt,
  GraduationCap,
  FileText,
  Users,
  Bus,
  ChevronUp,
  BookOpen,
  Home,
  AlertTriangle,
  Menu,
  X,
  ShieldCheck,
  Scale,
  Pencil,
  CalendarCheck,
  HeartHandshake,
} from "lucide-react";

/* ─── logo ─── */
import logo from "./assets/logo.png";

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */
const NAV = [
  { id: "objetivos", label: "Objetivos", icon: ClipboardList },
  { id: "horarios", label: "Horários", icon: Clock },
  { id: "saida", label: "Saída", icon: DoorOpen },
  { id: "fardamento", label: "Fardamento", icon: Shirt },
  { id: "aluno", label: "O Aluno", icon: GraduationCap },
  { id: "avaliacao", label: "Avaliação", icon: FileText },
  { id: "pais", label: "Pais", icon: Users },
  { id: "transporte", label: "Transporte", icon: Bus },
];

/* ══════════════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

/* ══════════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ══════════════════════════════════════════════════════════════════ */
function Highlight({ children, variant = "info" }) {
  const colors = {
    info: { bg: "#EFF6FF", border: "#3B82F6", color: "#1E3A5F" },
    warn: { bg: "#FEF3C7", border: "#F59E0B", color: "#78350F" },
    danger: { bg: "#FEF2F2", border: "#EF4444", color: "#991B1B" },
  };
  const c = colors[variant];
  return (
    <div
      style={{
        background: c.bg,
        borderLeft: `4px solid ${c.border}`,
        borderRadius: "0 10px 10px 0",
        padding: "0.85rem 1.1rem",
        margin: "0.75rem 0",
        fontSize: "0.92rem",
        lineHeight: 1.7,
        color: c.color,
      }}
    >
      {children}
    </div>
  );
}

function SectionCard({ id, icon: Icon, title, children, index }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      id={id}
      style={{
        scrollMarginTop: 80,
        marginBottom: "2.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.55s ${index * 0.06}s cubic-bezier(.22,1,.36,1), transform 0.55s ${index * 0.06}s cubic-bezier(.22,1,.36,1)`,
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1rem",
          paddingBottom: "0.7rem",
          borderBottom: "2px solid #1E40AF",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg,#1E40AF,#3B82F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(30,64,175,0.25)",
          }}
        >
          <Icon size={22} color="#fff" strokeWidth={2} />
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#1E3A5F",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      {/* card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "1.6rem",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(30,64,175,0.09)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)")}
      >
        {children}
      </div>
    </section>
  );
}

function SubTitle({ icon: Icon, children }) {
  return (
    <h3
      style={{
        fontWeight: 700,
        fontSize: "0.96rem",
        color: "#1E40AF",
        margin: "1.5rem 0 0.6rem",
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
      }}
    >
      <span
        style={{
          width: 4,
          height: 20,
          background: "linear-gradient(to bottom,#3B82F6,#93C5FD)",
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </h3>
  );
}

function OL({ children }) {
  return (
    <ol
      style={{
        paddingLeft: "1.4rem",
        margin: 0,
        listStyleType: "decimal",
      }}
    >
      {children}
    </ol>
  );
}

function LI({ children }) {
  return (
    <li
      style={{
        marginBottom: "0.55rem",
        paddingLeft: "0.25rem",
        fontSize: "0.93rem",
        lineHeight: 1.75,
        color: "#334155",
      }}
    >
      {children}
    </li>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════════ */
export default function App() {
  const scrollY = useScrollY();
  const [mobileNav, setMobileNav] = useState(false);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  }, []);

  const showTop = scrollY > 500;

  return (
    <div
      style={{
        fontFamily: "'Nunito Sans', sans-serif",
        background: "#F1F5F9",
        color: "#1E293B",
        lineHeight: 1.7,
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Google Fonts ── */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap"
      />

      {/* ═══════ HERO ═══════ */}
      <header
        style={{
          background: "linear-gradient(160deg, #0F172A 0%, #1E3A5F 40%, #1E40AF 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "3rem 1.5rem 4.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 15% 85%, rgba(59,130,246,0.2) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(147,197,253,0.1) 0%, transparent 40%)",
          }}
        />
        {/* grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* wave bottom */}
        <div
          style={{
            position: "absolute",
            bottom: -2,
            left: 0,
            right: 0,
            height: 48,
            background: "#F1F5F9",
            clipPath: "ellipse(55% 100% at 50% 100%)",
          }}
        />

        {/* logo */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 1.2rem",
            border: "3px solid rgba(255,255,255,0.25)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeDown 0.6s ease both",
          }}
        >
          <img
            src={logo}
            alt="Logo do Colégio"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "0.3rem 1rem",
            borderRadius: 50,
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            animation: "fadeDown 0.6s 0.1s ease both",
          }}
        >
          Ano Letivo 2026
        </span>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.9rem, 5vw, 3.1rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            margin: "0 0 0.7rem",
            animation: "fadeDown 0.6s 0.15s ease both",
          }}
        >
          Agenda Escolar — Diretrizes
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            opacity: 0.8,
            maxWidth: 500,
            margin: "0 auto",
            animation: "fadeDown 0.6s 0.25s ease both",
          }}
        >
          Guia de normas e orientações para alunos, pais e responsáveis.
        </p>
      </header>

      {/* ═══════ NAV ═══════ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid #E2E8F0",
          boxShadow: scrollY > 10 ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Desktop */}
        <div
          style={{
            maxWidth: 920,
            margin: "0 auto",
            display: "flex",
            gap: "0.2rem",
            overflowX: "auto",
            padding: "0.55rem 1rem",
            scrollbarWidth: "none",
          }}
          className="hide-mobile"
        >
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  whiteSpace: "nowrap",
                  padding: "0.4rem 0.8rem",
                  borderRadius: 8,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#475569",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1E40AF";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#475569";
                }}
              >
                <Icon size={15} strokeWidth={2} />
                {n.label}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <div className="show-mobile" style={{ padding: "0.5rem 1rem", display: "none" }}>
          <button
            onClick={() => setMobileNav(!mobileNav)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1E40AF",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: "0.88rem",
            }}
          >
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
            Navegação
          </button>
          {mobileNav && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, paddingBottom: 4 }}>
              {NAV.map((n) => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    onClick={() => scrollTo(n.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "0.35rem 0.7rem",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#fff",
                      background: "#1E40AF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <Icon size={14} />
                    {n.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* ═══════ CONTENT ═══════ */}
      <main style={{ maxWidth: 840, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>

        {/* OBJETIVOS */}
        <SectionCard id="objetivos" icon={ClipboardList} title="Objetivos deste Guia" index={0}>
          <OL>
            <LI>Fornecer aos alunos as principais informações sobre as atividades escolares.</LI>
            <LI>Divulgar os critérios de aprovação e frequência.</LI>
            <LI>Servir como canal de comunicação oficial entre a Escola e os Pais/Responsáveis.</LI>
            <LI>Estabelecer normas de convivência e funções dos setores do Colégio.</LI>
          </OL>
        </SectionCard>

        {/* HORÁRIOS */}
        <SectionCard id="horarios" icon={Clock} title="A — Horário de Entrada" index={1}>
          <OL>
            <LI>No horário <strong>MATUTINO</strong>, a escola será aberta às <strong>6h45</strong>.</LI>
            <LI>No horário <strong>VESPERTINO</strong>, a escola abrirá às <strong>12h45</strong>.</LI>
            <LI>Ser pontual na chegada e dirigir-se à sala de aula no 1º toque.</LI>
            <LI>A tolerância após o 1º toque é de apenas <strong>15 minutos</strong>.</LI>
            <LI><strong>Anos Finais (F2):</strong> Após a tolerância, o aluno só poderá entrar no 2º horário. Em dias de avaliação, só poderá entrar após o intervalo (do 1º ao 3º horário estarão em momento de avaliação).</LI>
            <LI>Caso o aluno chegue atrasado por <strong>3 vezes</strong>, os pais ou responsáveis serão convidados a comparecer à coordenação.</LI>
          </OL>
        </SectionCard>

        {/* SAÍDA */}
        <SectionCard id="saida" icon={DoorOpen} title="B — Saída" index={2}>
          <OL>
            <LI><strong>Solicitação:</strong> Toda saída antecipada deve ser solicitada por telefone ou por escrito na agenda (apresentada à Coordenação/Direção antes do início das atividades).</LI>
            <LI><strong>Identificação:</strong> É obrigatória a apresentação da Carteira de Identificação para a liberação do aluno.</LI>
            <LI>
              <strong>Saída Desacompanhada:</strong>
              <Highlight variant="info">
                <strong>1º Esquecimento:</strong> Notificação na agenda e liberação mediante ligação aos pais.<br />
                <strong>Reincidência:</strong> Só será liberado com a presença do responsável.<br />
                <strong>Extravio:</strong> Taxa de <strong>R$ 20,00</strong> para emissão da 2ª via.
              </Highlight>
            </LI>
          </OL>
        </SectionCard>

        {/* FARDAMENTO */}
        <SectionCard id="fardamento" icon={Shirt} title="C — Fardamento" index={3}>
          <OL>
            <LI><strong>Obrigatório:</strong> Uso do fardamento completo em todas as atividades.</LI>
            <LI><strong>Vedações:</strong> Proibido o uso de bermudas, shorts, calções, chinelos ou sandálias.</LI>
            <LI><strong>Calçados:</strong> Devem seguir as cores da escola — <strong>preto, azul, branco ou cinza</strong>.</LI>
            <LI><strong>Descaracterização:</strong> Proibido o uso de camisetas de eventos ou adornos que descaracterizem o uniforme. O descumprimento gera notificação na agenda.</LI>
          </OL>
        </SectionCard>

        {/* O ALUNO */}
        <SectionCard id="aluno" icon={GraduationCap} title="D — O Aluno" index={4}>
          <SubTitle icon={ShieldCheck}>I — Deveres</SubTitle>
          <OL>
            <LI>Ter sempre o material escolar exigido para cada disciplina e cumprir as tarefas diárias.</LI>
            <LI>Manter o comportamento conveniente no colégio e fora dele.</LI>
            <LI>Acatar a autoridade do Diretor, professores e funcionários e tratá-los com respeito.</LI>
            <LI>Tratar os colegas com respeito.</LI>
            <LI>A escola não se responsabiliza pela perda de quaisquer objetos dos alunos, inclusive celulares e livros didáticos, cabendo ao aluno e seus responsáveis a responsabilidade por eles.</LI>
            <LI>Zelar pela limpeza e conservação das instalações, dependências e materiais do estabelecimento.</LI>
          </OL>

          <SubTitle icon={HeartHandshake}>II — Direitos</SubTitle>
          <OL>
            <LI>Ser respeitado na sua individualidade por todos da escola.</LI>
            <LI>Encaminhar problemas referentes à Escola para a Equipe Técnica para análise e resolução.</LI>
            <LI>Apresentar sugestões à Direção para melhoria da Escola.</LI>
            <LI>Procurar a secretaria e outros serviços da Escola quando necessitar, no intervalo ou em horário vago.</LI>
          </OL>

          <SubTitle icon={Scale}>III — Sanções Aplicáveis</SubTitle>
          <p style={{ marginBottom: "0.5rem", fontSize: "0.93rem", color: "#475569" }}>
            Caracteriza-se como falta ou ocorrência negativa o descumprimento de qualquer item referente aos deveres do aluno ou aspectos vedados.
          </p>
          <OL>
            <LI>Advertência verbal.</LI>
            <LI>Advertência escrita.</LI>
            <LI>Afastamento de determinadas aulas.</LI>
            <LI>Afastamento temporário da sala de aula.</LI>
            <LI>Termo de compromisso entre pais/aluno e Escola.</LI>
            <LI>Remanejamento de turma.</LI>
            <LI>O aluno flagrado depredando a escola ou material pagará o dano.</LI>
          </OL>
          <Highlight variant="danger">
            <span style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                Proibido o uso de celular (Lei Nº 11.674) e demonstrações excessivas de carícias (beijos/abraços) uniformizado. Danos ao patrimônio devem ser ressarcidos.
              </span>
            </span>
          </Highlight>

          <SubTitle icon={Pencil}>Orientações de Estudo — Em Sala</SubTitle>
          <OL>
            <LI>Pedir esclarecimentos sempre que necessário.</LI>
            <LI>Ficar atento às perguntas e respostas dadas pelo professor.</LI>
            <LI>Fazer anotações em classe e copiar o esquema dado pelo professor.</LI>
            <LI>Fazer os exercícios de classe, solicitando ajuda do professor.</LI>
          </OL>

          <SubTitle icon={Home}>Orientações de Estudo — Em Casa</SubTitle>
          <OL>
            <LI>Realizar diariamente as tarefas em local adequado, que permita disposição e concentração.</LI>
            <LI>Ter um horário estabelecido para estudar.</LI>
            <LI>Manter em ordem o material escolar.</LI>
            <LI>Dividir o tempo de maneira a realizar as tarefas e revisar assuntos apresentados no dia.</LI>
            <LI>Anotar dúvidas para esclarecê-las com os professores na próxima aula.</LI>
            <LI>Não deixar acumular conteúdos, pois exigirá um esforço maior, além de cansar ou desestimular.</LI>
          </OL>
          <Highlight variant="warn">
            <span style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                <strong>Atenção:</strong> A Equipe Docente não orienta nenhum aluno a fazer trabalhos em grupo fora da escola ou em casa de colegas.
              </span>
            </span>
          </Highlight>
        </SectionCard>

        {/* AVALIAÇÃO */}
        <SectionCard id="avaliacao" icon={FileText} title="E — Avaliação" index={5}>
          <OL>
            <LI>Os alunos serão informados dos horários de avaliações, bem como eventuais mudanças.</LI>
            <LI>Em todos os processos de avaliação, os <strong>aspectos qualitativos preponderão sobre os quantitativos</strong>.</LI>
            <LI>A verificação do rendimento escolar abrangerá: conhecimento, participação, pontualidade e atividades.</LI>
            <LI>O aluno será considerado <strong>aprovado</strong> se obtiver <strong>média anual igual ou superior a 7,0</strong> em todas as disciplinas.</LI>
            <LI>Trabalhos <strong>não poderão ser impressos na escola</strong> e deverão ser entregues na data determinada pelo professor.</LI>
            <LI>A entrega de trabalhos só poderá acontecer no horário de aula em que o aluno estuda <strong>e no dia que o professor determinar</strong>.</LI>
            <LI>Faltando testes, provas e desafios (KIDS ou TEENS), o aluno fará reposição caso apresente <strong>atestado médico</strong> ou pague uma taxa de <strong>R$ 20,00</strong> no prazo determinado pela instituição.</LI>
            <LI>Ao faltar trabalhos, o aluno só fará reposição mediante <strong>atestado médico</strong>.</LI>
          </OL>

          <SubTitle icon={BookOpen}>Recuperação</SubTitle>
          <p style={{ fontSize: "0.93rem", color: "#475569" }}>
            A recuperação é feita anualmente. Após os 4 bimestres, o aluno terá direito a realizar a prova de recuperação.
          </p>

          <SubTitle icon={CalendarCheck}>Frequência</SubTitle>
          <Highlight variant="danger">
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>O aluno deve comparecer a no mínimo <strong>75%</strong> das aulas ministradas.</span>
            </span>
          </Highlight>
        </SectionCard>

        {/* PAIS */}
        <SectionCard id="pais" icon={Users} title="F — Aos Pais ou Responsáveis" index={6}>
          <SubTitle>Anuidade</SubTitle>
          <p style={{ marginBottom: "0.7rem", fontSize: "0.93rem", color: "#475569" }}>
            Os pais são os primeiros interessados na educação dos seus filhos. A Direção e a Coordenação estão sempre prontos a recebê-los. Os responsáveis deverão assumir o compromisso de <strong>pagar em dia a mensalidade escolar</strong>.
          </p>

          <OL>
            <LI><strong>Acompanhamento:</strong> Verificar diariamente a agenda e utilizar o <strong>Classroom</strong> (do 3º ao 9º ano) ou a <strong>Agenda Edu</strong> para comunicação com os professores. (1º e 2º anos não possuem Classroom.)</LI>
            <LI><strong>Saúde:</strong> Não enviar o aluno doente à escola. Administrar medicamentos apenas com receita médica e autorização escrita entregues na secretaria.</LI>
            <LI><strong>Acesso:</strong> Proibida a entrada de pais em sala de aula ou interrupção de professores durante o horário letivo. Agende reuniões via secretaria.</LI>
            <LI>Comparecer às reuniões de pais marcadas pela escola.</LI>
            <LI>Comparecer à escola sempre que for solicitado.</LI>
            <LI>Evitar conversar com os professores em horário de aula.</LI>
            <LI>
              Procurar a Coordenação ou a Direção quando:
              <Highlight variant="info">
                — Surgir alguma dúvida.<br />
                — Surgir algum problema (nunca deixe acumular).<br />
                — Tiver sugestões ou críticas construtivas.
              </Highlight>
            </LI>
          </OL>

          <SubTitle>Plantão Pedagógico</SubTitle>
          <Highlight variant="danger">
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>O boletim será entregue <strong>exclusivamente ao responsável pela matrícula</strong>.</span>
            </span>
          </Highlight>
        </SectionCard>

        {/* TRANSPORTE */}
        <SectionCard id="transporte" icon={Bus} title="G — Transporte Escolar" index={7}>
          <p style={{ fontSize: "0.93rem", color: "#475569" }}>
            A escola fica isenta da responsabilidade pelo transporte escolar, ficando sob responsabilidade dos pais e responsáveis.
          </p>
        </SectionCard>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer
        style={{
          textAlign: "center",
          padding: "2.5rem 1.5rem",
          background: "linear-gradient(160deg, #0F172A, #1E3A5F)",
          color: "rgba(255,255,255,0.65)",
          fontSize: "0.85rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -2,
            left: 0,
            right: 0,
            height: 44,
            background: "#F1F5F9",
            clipPath: "ellipse(55% 100% at 50% 0%)",
          }}
        />
        <strong
          style={{
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            display: "block",
            marginBottom: 4,
          }}
        >
          São Gonçalo do Amarante — RN
        </strong>
        <p style={{ margin: 0 }}>Agenda Escolar 2026 · Publicado em 23/02/2026</p>
      </footer>

      {/* ═══════ SCROLL TO TOP ═══════ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1E40AF, #3B82F6)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(30,64,175,0.35)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          transition: "opacity 0.3s, transform 0.3s",
          pointerEvents: showTop ? "auto" : "none",
          zIndex: 99,
        }}
      >
        <ChevronUp size={22} />
      </button>

      {/* ═══════ GLOBAL STYLES ═══════ */}
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        ol li::marker {
          color: #1E40AF;
          font-weight: 700;
        }

        /* scrollbar hide for nav */
        .hide-mobile::-webkit-scrollbar { display: none; }
        .hide-mobile { scrollbar-width: none; }

        /* responsive swap */
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }

        @media print {
          nav, button[aria-label="Voltar ao topo"] { display: none !important; }
          header::after, footer > div:first-child { display: none; }
          section { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}




































