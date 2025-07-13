export interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  titleEs: string;
  image: string;
  practiceAreas: string[];
  languages: string[];
  education: Array<{
    institution: string;
    degree: string;
    year?: string;
  }>;
  barAdmissions: Array<{
    state: string;
    year?: string;
    description?: string;
  }>;
  associations: Array<{
    name: string;
    role?: string;
    years?: string;
  }>;
  bio: string;
  bioEs: string;
  militaryService?: {
    branch: string;
    years: string;
    awards?: string[];
    role?: string;
  };
  email?: string;
  phone?: string;
  offices?: string[];
  specialAchievements?: string[];
}

export const attorneys: Attorney[] = [
  {
    id: 'william-vasquez',
    name: 'William J. Vásquez',
    slug: 'william-vasquez',
    title: 'Attorney and Founder',
    titleEs: 'Director Ejecutivo y Abogado Principal',
    image: '/william-vasquez-cutout.png',
    practiceAreas: [
      'Immigration Law',
      'Criminal Defense',
      'Federal Criminal Defense',
      'Traffic Violations',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'North Carolina Central University School of Law',
        degree: 'J.D. | Juris Doctor',
        year: '2011',
      },
      {
        institution: 'Campbell University',
        degree: 'B.S. | Computer Science',
        year: '2007',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
        year: '2011',
      },
      {
        state: 'Federal Courts',
        description: '4th, 5th and 11th Circuits',
        year: '2011',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
        years: '2011 - Present',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member in Good Standing',
        years: 'Since 2011',
      },
    ],
    militaryService: {
      branch: 'U.S. Air Force',
      years: '2000-2007',
      role: 'Spanish Linguist, Defense Intelligence Agency',
      awards: ['Joint Service Achievement Medal (2005)', 'Operation Enduring Freedom Veteran'],
    },
    bio: `William Vásquez is a native of Queens, NY and a decorated U.S. Air Force veteran. After serving as a Spanish linguist for the Defense Intelligence Agency during Operation Enduring Freedom, he pursued his legal education, earning his J.D. from North Carolina Central University School of Law. With over a decade of legal experience, William specializes in immigration law and criminal defense, bringing military discipline and bilingual expertise to every case. His motto "YO PELEO POR TI™" reflects his commitment to fighting for his clients' rights with the same dedication he showed serving his country.`,
    bioEs: `William Vásquez es nativo de Queens, NY y un veterano condecorado de la Fuerza Aérea de EE.UU. Después de servir como lingüista de español para la Agencia de Inteligencia de Defensa durante la Operación Libertad Duradera, prosiguió su educación legal, obteniendo su J.D. de la Facultad de Derecho de la Universidad Central de Carolina del Norte. Con más de una década de experiencia legal, William se especializa en ley de inmigración y defensa criminal, aportando disciplina militar y experiencia bilingüe a cada caso. Su lema "YO PELEO POR TI™" refleja su compromiso de luchar por los derechos de sus clientes con la misma dedicación que mostró sirviendo a su país.`,
    specialAchievements: [
      'Joint Service Achievement Medal recipient',
      'Operation Enduring Freedom veteran',
      'Founded Vasquez Law Firm to serve immigrant communities',
      '35+ years of combined legal experience with the firm',
    ],
    offices: ['Charlotte', 'Raleigh', 'Smithfield'],
  },
  {
    id: 'kelly-vega',
    name: 'Kelly Vega',
    slug: 'kelly-vega',
    title: 'Immigration Attorney',
    titleEs: 'Abogada de Inmigración',
    image: '/images/attorneys/kelly-vega.jpg',
    practiceAreas: [
      'Immigration Law',
      'Family-Based Immigration',
      'Deportation Defense',
      'VAWA Cases',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Kelly Vega is a dedicated immigration attorney who fights tirelessly for her clients' rights. She specializes in family-based immigration, deportation defense, and VAWA cases. Her compassionate approach and deep understanding of immigration law make her an invaluable advocate for immigrant families navigating the complex U.S. immigration system.`,
    bioEs: `Kelly Vega es una abogada de inmigración dedicada que lucha incansablemente por los derechos de sus clientes. Se especializa en inmigración familiar, defensa contra deportación y casos de VAWA. Su enfoque compasivo y profundo conocimiento de la ley de inmigración la convierten en una defensora invaluable para las familias inmigrantes que navegan el complejo sistema de inmigración de EE.UU.`,
    offices: ['Charlotte', 'Raleigh'],
  },
  {
    id: 'rebecca-sommer',
    name: 'Rebecca Sommer',
    slug: 'rebecca-sommer',
    title: 'Criminal Defense Attorney',
    titleEs: 'Abogada de Defensa Penal',
    image: '/images/attorneys/rebecca-sommer.jpg',
    practiceAreas: [
      'Criminal Defense',
      'DWI/DUI Defense',
      'Drug Charges',
      'Federal Criminal Defense',
    ],
    languages: ['English'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
      {
        name: 'National Association of Criminal Defense Lawyers',
        role: 'Member',
      },
    ],
    bio: `Rebecca Sommer is an experienced criminal defense attorney who provides aggressive representation for clients facing criminal charges. With expertise in DWI/DUI defense, drug charges, and federal criminal cases, she fights to protect her clients' rights and freedom. Her strategic approach and courtroom experience make her a formidable advocate in the criminal justice system.`,
    bioEs: `Rebecca Sommer es una abogada experimentada en defensa penal que proporciona representación agresiva para clientes que enfrentan cargos criminales. Con experiencia en defensa de DWI/DUI, cargos de drogas y casos criminales federales, ella lucha para proteger los derechos y la libertad de sus clientes. Su enfoque estratégico y experiencia en la corte la convierten en una defensora formidable en el sistema de justicia penal.`,
    offices: ['Charlotte', 'Raleigh'],
  },
  {
    id: 'jillian-baucom',
    name: 'Jillian Baucom',
    slug: 'jillian-baucom',
    title: 'Immigration Attorney',
    titleEs: 'Abogada de Inmigración',
    image: '/images/attorneys/jillian-baucom.jpg',
    practiceAreas: [
      'Immigration Law',
      'Employment-Based Immigration',
      'Citizenship',
      'Green Cards',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Jillian Baucom focuses her practice on immigration law, with particular expertise in employment-based immigration and citizenship matters. She guides clients through the complex process of obtaining green cards, work visas, and U.S. citizenship. Her attention to detail and commitment to client success have helped countless individuals and families achieve their American dream.`,
    bioEs: `Jillian Baucom enfoca su práctica en la ley de inmigración, con experiencia particular en inmigración basada en empleo y asuntos de ciudadanía. Ella guía a los clientes a través del complejo proceso de obtener tarjetas verdes, visas de trabajo y ciudadanía estadounidense. Su atención al detalle y compromiso con el éxito del cliente han ayudado a innumerables individuos y familias a lograr su sueño americano.`,
    offices: ['Charlotte', 'Smithfield'],
  },
  {
    id: 'adrianna-ingram',
    name: 'Adrianna Ingram',
    slug: 'adrianna-ingram',
    title: 'Criminal Defense and Family Law Attorney',
    titleEs: 'Abogada de Defensa Penal y Derecho de Familia',
    image: '/images/attorneys/adrianna-ingram.jpg',
    practiceAreas: [
      'Criminal Defense',
      'Family Law',
      'Divorce',
      'Child Custody',
      'Domestic Violence',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
      {
        name: 'North Carolina Bar Association Family Law Section',
        role: 'Member',
      },
    ],
    bio: `Adrianna Ingram brings compassion and tenacity to her dual practice in criminal defense and family law. She understands that legal issues affecting families require both strength and sensitivity. Whether defending clients against criminal charges or guiding them through divorce and custody matters, Adrianna provides personalized attention and fierce advocacy.`,
    bioEs: `Adrianna Ingram aporta compasión y tenacidad a su práctica dual en defensa penal y derecho familiar. Ella entiende que los asuntos legales que afectan a las familias requieren tanto fuerza como sensibilidad. Ya sea defendiendo a clientes contra cargos criminales o guiándolos a través de asuntos de divorcio y custodia, Adrianna proporciona atención personalizada y defensa feroz.`,
    offices: ['Raleigh', 'Smithfield'],
  },
  {
    id: 'roselyn-torrellas',
    name: 'Roselyn V. Torrellas',
    slug: 'roselyn-torrellas',
    title: 'Immigration Attorney',
    titleEs: 'Abogada de Inmigración',
    image: '/images/attorneys/roselyn-torrellas.jpg',
    practiceAreas: ['Immigration Law', 'Asylum', 'U-Visas', 'DACA', 'Deportation Defense'],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Roselyn V. Torrellas is a passionate immigration attorney dedicated to protecting the rights of immigrants. She specializes in humanitarian immigration cases, including asylum, U-visas, and DACA applications. Her experience in deportation defense has helped keep families together and provide hope to those facing removal proceedings.`,
    bioEs: `Roselyn V. Torrellas es una abogada de inmigración apasionada dedicada a proteger los derechos de los inmigrantes. Se especializa en casos de inmigración humanitaria, incluyendo asilo, visas U y solicitudes de DACA. Su experiencia en defensa contra deportación ha ayudado a mantener unidas a las familias y brindar esperanza a quienes enfrentan procedimientos de remoción.`,
    offices: ['Charlotte', 'Orlando'],
  },
  {
    id: 'christopher-afanador',
    name: 'Christopher Afanador',
    slug: 'christopher-afanador',
    title: 'Immigration Attorney',
    titleEs: 'Abogado de Inmigración',
    image: '/images/attorneys/christopher-afanador.jpg',
    practiceAreas: [
      'Immigration Law',
      'Business Immigration',
      'H-1B Visas',
      'Green Cards',
      'Naturalization',
    ],
    languages: ['English', 'Spanish'],
    education: [
      {
        institution: 'Law School Name',
        degree: 'J.D. | Juris Doctor',
      },
    ],
    barAdmissions: [
      {
        state: 'North Carolina',
      },
    ],
    associations: [
      {
        name: 'American Immigration Lawyers Association (AILA)',
        role: 'Member',
      },
      {
        name: 'North Carolina State Bar',
        role: 'Member',
      },
    ],
    bio: `Christopher Afanador focuses on immigration law with particular expertise in business immigration matters. He assists employers and employees with H-1B visas, employment-based green cards, and other work authorization issues. His understanding of both business needs and immigration requirements makes him an effective advocate for corporate clients and skilled workers.`,
    bioEs: `Christopher Afanador se enfoca en la ley de inmigración con experiencia particular en asuntos de inmigración empresarial. Ayuda a empleadores y empleados con visas H-1B, tarjetas verdes basadas en empleo y otros asuntos de autorización de trabajo. Su comprensión tanto de las necesidades empresariales como de los requisitos de inmigración lo convierte en un defensor efectivo para clientes corporativos y trabajadores calificados.`,
    offices: ['Charlotte', 'Raleigh'],
  },
];

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return attorneys.find(attorney => attorney.slug === slug);
}

export function getAttorneysByOffice(office: string): Attorney[] {
  return attorneys.filter(attorney => attorney.offices?.includes(office));
}

export function getAttorneysByPracticeArea(area: string): Attorney[] {
  return attorneys.filter(attorney => attorney.practiceAreas.includes(area));
}
