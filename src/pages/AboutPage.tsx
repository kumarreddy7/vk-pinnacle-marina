import { Eye, Target, Award, CheckCircle2, CalendarCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Reveal } from '../components/Reveal';
import { useEnquiry } from '../context/EnquiryContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function AboutPage() {
  useDocumentTitle(
    `About Us | ${COMPANY_INFO.shortName}`,
    'Learn about VK Pinnacle — our vision, mission, core values, and leadership team in Machilipatnam.'
  );

  const { openEnquiry } = useEnquiry();

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Banner */}
      <section className="bg-[#0F3D2E] text-white py-16">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C69C6D]">
            About {COMPANY_INFO.shortName}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
            Building Places. Creating Possibilities.
          </h1>
          <p className="text-stone-200 mt-4 max-w-3xl text-base sm:text-lg leading-relaxed">
            {COMPANY_INFO.name} is a real estate development company focused on creating MUDA-approved
            property opportunities for families and investors in Machilipatnam. We aim to make
            project information transparent and provide dedicated guidance from first enquiry to
            spot registration.
          </p>
        </Reveal>
      </section>

      {/* Story + Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden">
        <Reveal direction="right" className="lg:col-span-6">
          <img
            src="./images/hero-township.jpg"
            alt="VK Pinnacle Marina Layout Machilipatnam"
            className="rounded-2xl shadow-lg w-full h-80 sm:h-96 object-cover"
          />
        </Reveal>
        <Reveal direction="left" delay={100} className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
            Our Story & Commitment
          </span>
          <h2 className="font-display text-3xl font-bold text-[#0F3D2E]">
            Master-Planned Communities Built on Trust
          </h2>
          <p className="text-stone-600 leading-relaxed">
            Flagship development <strong>MARINA by VK Pinnacle</strong> (LP NO:
            1101_0009_LP_MTM_2026) brings 57 Vaastu-planned residential and commercial plots just
            600 metres from the 12-Lane Port Highway to Machilipatnam Port.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Every layout is backed by clear MUDA approvals, 40 ft & 30 ft BT roads with 6 ft
            walking tracks, underground drainage, solar LED lighting, and spot registration with
            bank loan support from leading banks.
          </p>
          <button
            onClick={() => openEnquiry({ mode: 'site-visit' })}
            className="inline-flex items-center gap-2 bg-[#0F3D2E] hover:bg-[#16523E] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#C69C6D]" />
            <span>Schedule a Site Visit</span>
          </button>
        </Reveal>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white border-y border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0}>
            <div className="h-full bg-[#FAF8F5] rounded-2xl p-8 border border-stone-200 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#0F3D2E] text-[#C69C6D] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">Our Vision</h2>
              <p className="text-stone-600 leading-relaxed">
                To create well-planned property communities along the Machilipatnam Port corridor
                that support comfortable living and long-term value.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full bg-[#FAF8F5] rounded-2xl p-8 border border-stone-200 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#0F3D2E] text-[#C69C6D] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0F3D2E]">Our Mission</h2>
              <p className="text-stone-600 leading-relaxed">
                To develop and deliver MUDA-approved projects with a customer-focused approach,
                clear documentation, and dependable on-ground infrastructure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
            Our Principles
          </span>
          <h2 className="font-display text-3xl font-bold text-[#0F3D2E] mt-1">Core Values</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_INFO.values.map((val, idx) => (
            <Reveal key={val.title} delay={idx * 80}>
              <div className="h-full bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                <CheckCircle2 className="w-6 h-6 text-[#1E6B52]" />
                <h3 className="font-display text-lg font-bold text-[#0F3D2E]">{val.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{val.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white border-t border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AD8253]">
              Leadership
            </span>
            <h2 className="font-display text-3xl font-bold text-[#0F3D2E] mt-1">
              Guided by Experience
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {COMPANY_INFO.team.map((member, idx) => (
              <Reveal key={member.name} delay={idx * 90}>
                <div className="h-full bg-[#FAF8F5] rounded-2xl p-7 border border-stone-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#0F3D2E] text-[#C69C6D] flex items-center justify-center font-display text-xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F3D2E]">{member.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#AD8253] mt-0.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
