export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  image: string
  content: Section[]
}

export interface Section {
  type: 'intro' | 'h2' | 'p' | 'tip' | 'list'
  text?: string
  items?: string[]
}

export const articles: Article[] = [
  {
    slug: 'rituels-beaute-ocean',
    title: "5 rituels beauté inspirés de l'océan",
    excerpt:
      "L'eau de mer, le sel, les algues… La mer regorge de trésors pour notre peau. Découvrez 5 rituels beauté inspirés de l'océan pour retrouver une peau lumineuse et ressourcée.",
    category: 'Soins naturels',
    readTime: '5 min',
    publishedAt: '28 août 2026',
    image: '/images/blog-1.jpg',
    content: [
      {
        type: 'intro',
        text: "La mer a toujours été une source d'inspiration pour les femmes du monde entier. Son eau chargée en minéraux, ses algues bienfaisantes, son sel purifiant… Voici 5 rituels beauté que vous pouvez reproduire chez vous pour offrir à votre peau tout le bénéfice de l'océan.",
      },
      { type: 'h2', text: '1. Le gommage au sel marin' },
      {
        type: 'p',
        text: "Mélangez 3 cuillères à soupe de gros sel marin avec 2 cuillères à soupe d'huile de coco fondue et quelques gouttes d'huile essentielle de lavande. Appliquez en cercles doux sur le corps sous la douche. Le sel élimine les cellules mortes, l'huile nourrit — résultat : une peau douce comme un galet poli par la mer.",
      },
      { type: 'h2', text: "2. Le masque aux algues purifiant" },
      {
        type: 'p',
        text: "Les algues marines sont riches en iode, magnésium et antioxydants. Diluez une cuillère de poudre d'algues spiruline ou chlorelle avec de l'eau de rose jusqu'à obtenir une pâte. Appliquez 10 minutes sur le visage. Rincez à l'eau tiède. Le teint est immédiatement plus unifié.",
      },
      { type: 'h2', text: "3. Le bain de pieds reminéralisant" },
      {
        type: 'p',
        text: "Faites chauffer un grand bain de pieds avec 4 cuillères de sel de mer, quelques gouttes d'huile essentielle de menthe poivrée et de la camomille séchée. Laissez tremper 15 minutes. Ce rituel détend, élimine les toxines et laisse les pieds parfaitement doux.",
      },
      {
        type: 'tip',
        text: "💡 Astuce DILYA : conservez votre gommage au sel dans un pot en verre hermétique jusqu'à 4 semaines. Il fera un cadeau parfait pour vos proches !",
      },
      { type: 'h2', text: "4. Le brume visage à l'eau de mer" },
      {
        type: 'p',
        text: "Remplissez un petit vaporisateur d'eau minérale et ajoutez une pincée de sel marin fin. Agitez et vaporisez sur le visage tout au long de la journée. Ce geste simple hydrate, fixe le maquillage et rappelle immédiatement la sensation d'embruns marins.",
      },
      { type: 'h2', text: "5. Le soin cheveux aux minéraux marins" },
      {
        type: 'p',
        text: "Mélangez de l'eau salée avec de l'huile d'argan et une cuillère d'aloe vera. Appliquez sur vos cheveux humides avant de les coiffer. Le sel texturise naturellement, l'argan nourrit et l'aloe vera hydrate. Résultat : des cheveux de plage sublimes, même à Paris.",
      },
      {
        type: 'list',
        text: 'Ce qu\'il vous faut pour commencer :',
        items: [
          'Gros sel marin non raffiné',
          'Huile de coco vierge',
          'Poudre d\'algues (spiruline ou chlorelle)',
          'Eau de rose naturelle',
          'Huile essentielle de lavande ou menthe',
          'Huile d\'argan',
          'Aloe vera pur',
        ],
      },
    ],
  },
  {
    slug: 'bienfaits-savon-noir',
    title: 'Les bienfaits du savon noir',
    excerpt:
      "Utilisé depuis des siècles dans les hammams d'Afrique du Nord, le savon noir est un véritable trésor de beauté. Découvrez pourquoi ce produit naturel mérite une place d'honneur dans votre routine.",
    category: 'Savon & Hammam',
    readTime: '4 min',
    publishedAt: '20 août 2026',
    image: '/images/blog-2.jpg',
    content: [
      {
        type: 'intro',
        text: "Le savon noir, ou « beldi » en arabe, est un produit de beauté ancestral originaire du Maghreb. Fabriqué à partir d'olives fermentées et d'huile d'olive, il est utilisé depuis des siècles dans les rituels du hammam. Voici tout ce que vous devez savoir sur ce trésor beauté.",
      },
      { type: 'h2', text: 'Qu\'est-ce que le savon noir ?' },
      {
        type: 'p',
        text: "Le savon noir est obtenu par la saponification d'olives noires fermentées et d'huile d'olive. Sa texture est pâteuse, sa couleur va du brun foncé au noir. Contrairement aux savons classiques, il n'est pas solide : on le prélève à la main ou à la spatule.",
      },
      { type: 'h2', text: 'Ses propriétés exceptionnelles' },
      {
        type: 'list',
        text: 'Le savon noir est reconnu pour :',
        items: [
          'Exfolier en douceur les cellules mortes',
          'Purifier en profondeur les pores',
          'Nourrir la peau grâce à l\'huile d\'olive',
          'Hydrater sans agresser',
          'Convenir à tous les types de peau, même sensibles',
          'Être 100% naturel, vegan et sans conservateurs',
        ],
      },
      { type: 'h2', text: 'Comment l\'utiliser correctement ?' },
      {
        type: 'p',
        text: "Commencez par vous humidifier abondamment sous une douche chaude pour ouvrir les pores. Appliquez le savon noir en fine couche sur tout le corps et laissez poser 5 à 10 minutes. Utilisez ensuite un kessa (gant de crin) pour frotter en mouvements circulaires. Vous verrez les cellules mortes rouler — c'est normal et très satisfaisant !",
      },
      {
        type: 'tip',
        text: "💡 Conseil DILYA : pour un résultat hammam authentique, réalisez ce rituel une fois par semaine. Terminez toujours par une huile de corps ou du beurre de karité pour sceller l'hydratation.",
      },
      { type: 'h2', text: 'Pour qui est-il recommandé ?' },
      {
        type: 'p',
        text: "Le savon noir convient à tous — femmes, hommes, enfants dès 3 ans. Il est particulièrement apprécié des peaux sèches, ternes ou à tendance acnéique. Les personnes souffrant d'eczéma ou de psoriasis l'utilisent également, toujours en consultation avec leur dermatologue.",
      },
      { type: 'h2', text: 'Le savon noir DILYA' },
      {
        type: 'p',
        text: "Chez DILYA, nous proposons un savon noir artisanal sourcé directement auprès de productrices marocaines. Il est fabriqué selon la méthode traditionnelle, enrichi à l'huile d'eucalyptus pour une sensation fraîche et purifiante. Sans colorants, sans parfums artificiels, sans SLS.",
      },
    ],
  },
  {
    slug: 'choisir-son-bracelet',
    title: 'Comment choisir son bracelet ?',
    excerpt:
      "Bracelet en or, en argent, en perles ou en fil ? Choisir un bracelet n'est pas anodin. Il raconte quelque chose de vous. Voici notre guide complet pour trouver le modèle qui vous ressemble vraiment.",
    category: 'Bijoux & Style',
    readTime: '6 min',
    publishedAt: '10 août 2026',
    image: '/images/blog-3.jpg',
    content: [
      {
        type: 'intro',
        text: "Un bracelet, c'est bien plus qu'un accessoire. C'est un talisman, un souvenir de voyage, un cadeau d'amour ou simplement l'expression de votre personnalité. Mais face à l'immensité des choix disponibles, comment trouver le vôtre ? On vous guide.",
      },
      { type: 'h2', text: 'Étape 1 : Définir votre style' },
      {
        type: 'list',
        text: 'Il existe 5 grands profils de porteuses de bracelets :',
        items: [
          'La Minimaliste — elle aime les chaînes fines, les anneaux discrets, l\'or jaune 18 carats',
          'La Bohème — elle collectionne les bracelets en perles naturelles, bois ou coquillages',
          'La Romantique — elle opte pour les breloques, les cœurs, les initiales gravées',
          'La Sportive — elle préfère les bracelets en silicone, joncs larges ou cordon résistant',
          'L\'Audacieuse — elle n\'a pas peur d\'empiler, de mélanger les matières et les couleurs',
        ],
      },
      { type: 'h2', text: 'Étape 2 : Choisir la matière' },
      {
        type: 'p',
        text: "L'or jaune apporte chaleur et sophistication. L'argent 925 est polyvalent et résiste bien au quotidien. Les perles d'eau douce donnent une touche précieuse et romantique. Le laiton doré est accessible et tendance. Les fils wax ou brodés sont colorés et ethniques.",
      },
      {
        type: 'tip',
        text: "💡 Astuce DILYA : si vous avez la peau dorée ou foncée, l'or jaune et les tons chauds (terracotta, miel, turquoise) subliment particulièrement votre carnation.",
      },
      { type: 'h2', text: 'Étape 3 : Bien mesurer son poignet' },
      {
        type: 'p',
        text: "Utilisez un mètre ruban ou un fil pour mesurer votre poignet. Ajoutez 1 à 1,5 cm pour un bracelet ajusté, 2 à 3 cm pour un port décontracté. La plupart de nos bracelets DILYA sont réglables grâce à leur fermoir coulissant.",
      },
      { type: 'h2', text: 'L\'art du stacking (l\'empilement)' },
      {
        type: 'p',
        text: "Le secret d'un beau stack de bracelets ? Variez les textures (fin/épais, brillant/mat), restez dans une palette de 2-3 couleurs max, et alternez les longueurs. Commencez par votre pièce signature (votre bracelet préféré), puis ajoutez les compléments autour.",
      },
      {
        type: 'list',
        text: 'Nos combinaisons DILYA préférées :',
        items: [
          'Chaîne fine dorée + bracelet perles blanches + fil beige',
          'Jonc argenté + manchette gravée + perles irisées',
          'Bracelet coquillage + fil tressé turquoise + charm étoile',
        ],
      },
      { type: 'h2', text: 'Entretenir ses bracelets' },
      {
        type: 'p',
        text: "Évitez le contact avec l'eau, les parfums et la crème solaire. Rangez chaque bracelet séparément dans un pochon en tissu pour éviter les rayures. Nettoyez vos bijoux en argent avec un chiffon doux légèrement humide. Pour l'or plaqué, séchez immédiatement après contact avec l'eau.",
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
