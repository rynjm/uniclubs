import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: '0 5%', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'var(--primary-gradient)',
          filter: 'blur(150px)',
          opacity: 0.2,
          zIndex: -1,
          borderRadius: '50%'
        }} />

        <h1 style={{
          fontSize: '5rem',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-2px'
        }}>
          Unite. Innovate. <br />
          <span className="gradient-text">Lead the Future.</span>
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-muted)',
          maxWidth: '600px',
          marginBottom: '3rem',
          lineHeight: 1.6
        }}>
          The all-in-one platform for university clubs. Manage events, rack up achievements,
          and find sponsorships with AI-driven tools.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/clubs" className="glass-button" style={{
            background: 'var(--text-main)',
            color: 'black',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem'
          }}>
            Explore Clubs
          </Link>
          <Link href="/clubs/request" className="glass-button" style={{
            padding: '1rem 2.5rem',
            fontSize: '1.1rem'
          }}>
            Launch a Club
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '5rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          Why UniClubs?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { title: "Club Profiles", desc: "Showcase events, members, and achievements in one sleek page.", icon: "🏛️" },
            { title: "AI Idea Generator", desc: "Stuck? Let AI suggest the next big hackathon or workshop.", icon: "✨" },
            { title: "QR Ticketing", desc: "Seamless event check-ins with integrated scan & go technology.", icon: "🎟️" }
          ].map((feature, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2.5rem', transition: 'transform 0.3s' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
