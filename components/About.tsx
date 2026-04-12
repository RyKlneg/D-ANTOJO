import ScrollReveal from './ScrollReveal'
import Counter from './Counter'

export default function About() {
  return (
    <section
      id="nosotros"
      className="py-24 bg-dantojo-cream transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-dantojo-gold/10 rounded-full blur-3xl group-hover:bg-dantojo-gold/20 transition-colors duration-700" />
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/Fra.jpg"
                  alt="Nuestra historia"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:pl-12">
              <h2 className="text-4xl lg:text-5xl font-display font-medium text-dantojo-dark mb-6">
                NUESTRA HISTORIA
              </h2>
              <div className="space-y-6 text-dantojo-coffee text-lg leading-relaxed">
                <p>
                  Desde 1995, en D'Antojo hemos transformado ingredientes simples en obras maestras de la repostería. Nuestra pasión nació del deseo de crear momentos memorables a través del sabor.
                </p>
                <p>
                  Cada pastel, galleta y postre que sale de nuestra cocina lleva consigo años de tradición, técnica perfeccionada y, sobre todo, mucho corazón.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-display font-bold text-dantojo-gold">
                      <Counter value={25} suffix="+" />
                    </p>
                    <p className="text-sm uppercase tracking-wider">Años de Tradición</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold text-dantojo-gold">
                      <Counter value={100} suffix="k" />
                    </p>
                    <p className="text-sm uppercase tracking-wider">Clientes Felices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
