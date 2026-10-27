const STORAGE_KEY = 'chemistryLabProgress';

const elementCategories = {
  alkali: 'فلز قلوي',
  alkaline: 'فلز قلوي ترابي',
  transition: 'فلز انتقالي',
  'post-transition': 'فلز بعد انتقالي',
  metalloid: 'شبه فلز',
  nonmetal: 'لا فلز',
  halogen: 'هالوجين',
  noble: 'غاز نبيل',
  lanthanide: 'لانثانيدي',
  actinide: 'أكتينيدي'
};

const defaultProgress = {
  points: 0,
  seenElements: [],
  quizScore: 0
};

const elements = [
  { atomicNumber: 1, symbol: 'H', name: 'الهيدروجين', category: 'nonmetal', state: 'غاز', foundIn: 'الماء والنجوم والغازات الكونية', natureTags: ['🌌 الكون', '💧 الماء'], description: 'لا فلز خفيف يدخل في تكوين الماء والعديد من المركبات العضوية.' },
  { atomicNumber: 2, symbol: 'He', name: 'الهيليوم', category: 'noble', state: 'غاز', foundIn: 'النجوم والهواء', natureTags: ['🌌 الكون', '💨 الجو'], description: 'غاز نبيل خفيف يستخدم في التبريد والاختبارات العلمية من خلال خفة ذراته.' },
  { atomicNumber: 3, symbol: 'Li', name: 'الليثيوم', category: 'alkali', state: 'صلب', foundIn: 'صخور الجرانيت والمياه المعدنية', natureTags: ['🏔️ القشرة الأرضية', '💧 المياه'], description: 'فلز قلوي يستخدم في بطاريات الهاتف والهواتف المحمولة.' },
  { atomicNumber: 4, symbol: 'Be', name: 'البرليوم', category: 'alkaline', state: 'صلب', foundIn: 'صخور الجرانيت والمعادن', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر صلب مقاوم للحرارة ويستخدم في أغلفة بعض الأجهزة العلمية.' },
  { atomicNumber: 5, symbol: 'B', name: 'البورون', category: 'metalloid', state: 'صلب', foundIn: 'مناجم البوراكس والمعادن', natureTags: ['🏔️ القشرة الأرضية'], description: 'شبه فلز يستخدم في الزجاج والمعدنات ومواد النانو.' },
  { atomicNumber: 6, symbol: 'C', name: 'الكربون', category: 'nonmetal', state: 'صلب', foundIn: 'الكائنات الحية والفحم والرخام', natureTags: ['🌿 الكائنات الحية', '⛏️ الأرض'], description: 'أساس الحياة، يكوّن هياكل الكائنات الحية والمواد العضوية.' },
  { atomicNumber: 7, symbol: 'N', name: 'النيتروجين', category: 'nonmetal', state: 'غاز', foundIn: 'الهواء الجوي', natureTags: ['💨 الجو', '🌱 النبات'], description: 'يُشكل أكثر من 70% من الهواء ويشارك في تكوين البروتينات.' },
  { atomicNumber: 8, symbol: 'O', name: 'الأكسجين', category: 'nonmetal', state: 'غاز', foundIn: 'الهواء والماء', natureTags: ['💨 الجو', '💧 الماء'], description: 'أساس التنفس والحرق، ومكون أساسي للماء والهواء.' },
  { atomicNumber: 9, symbol: 'F', name: 'الفلور', category: 'halogen', state: 'غاز', foundIn: 'المياه المعدنية ومعادن الفلور', natureTags: ['💧 المياه', '🏔️ القشرة الأرضية'], description: 'هالوجين يستخدم في معجون الأسنان وبعض المنتجات الصناعية.' },
  { atomicNumber: 10, symbol: 'Ne', name: 'النيون', category: 'noble', state: 'غاز', foundIn: 'الهواء المعزول في بعض الأنوار', natureTags: ['💨 الجو'], description: 'غاز نبيل يضيء عند تمرير تيار كهربائي، ويستخدم في الإعلانات الضوئية.' },
  { atomicNumber: 11, symbol: 'Na', name: 'الصوديوم', category: 'alkali', state: 'صلب', foundIn: 'ملح الطعام والمياه المالحة', natureTags: ['💧 المحيطات', '🏔️ الأرض'], description: 'عنصر قلوي مهم في توازن السوائل والجسم، ويُستخدم في ملح الطعام.' },
  { atomicNumber: 12, symbol: 'Mg', name: 'المغنيسيوم', category: 'alkaline', state: 'صلب', foundIn: 'الحليب والمياه الجوفية والصخور', natureTags: ['🌿 الكائنات الحية', '💧 المياه'], description: 'يُستخدم في بناء جزيئات النبات والحيوان ويشارك في وظائف الجسم.' },
  { atomicNumber: 13, symbol: 'Al', name: 'الألمنيوم', category: 'post-transition', state: 'صلب', foundIn: 'أكاسيد الألومنيوم في الطين', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز خفيف ومقاوم للتآكل، يُستخدم في العبوات والأبواب والألواح.' },
  { atomicNumber: 14, symbol: 'Si', name: 'السيليكون', category: 'metalloid', state: 'صلب', foundIn: 'الرمل والزجاج', natureTags: ['🏖️ الرمال', '🧊 الزجاج'], description: 'شبه فلز أساسي في صناعة الإلكترونيات والزجاج والسيراميك.' },
  { atomicNumber: 15, symbol: 'P', name: 'الفوسفور', category: 'nonmetal', state: 'صلب', foundIn: 'المعادن والحمض النووي والرسوبيات', natureTags: ['🌿 الكائنات الحية', '🏔️ الأرض'], description: 'يُستخدم في إنتاج الطاقة في الخلايا وفي بعض الأسمدة.' },
  { atomicNumber: 16, symbol: 'S', name: 'الكبريت', category: 'nonmetal', state: 'صلب', foundIn: 'الينابيع والمواد البركانية', natureTags: ['🌋 البراكين', '🏔️ القشرة الأرضية'], description: 'عنصر متعدد الاستخدامات يتواجد في بعض المواد الطبيعية ويُستخدم في الصناعة.' },
  { atomicNumber: 17, symbol: 'Cl', name: 'الكلور', category: 'halogen', state: 'غاز', foundIn: 'ملح الطعام والمحيطات', natureTags: ['💧 المحيطات', '🏔️ الأرض'], description: 'هالوجين مهم في معالجة الماء وصناعة المواد الكيميائية.' },
  { atomicNumber: 18, symbol: 'Ar', name: 'الأرجون', category: 'noble', state: 'غاز', foundIn: 'الهواء', natureTags: ['💨 الجو'], description: 'غاز نبيل يَستخدم في المصابيح الكهربائية والمواد العزل.' },
  { atomicNumber: 19, symbol: 'K', name: 'البوتاسيوم', category: 'alkali', state: 'صلب', foundIn: 'الأرض والفواكه والخضار', natureTags: ['🌿 الكائنات الحية', '💧 التربة'], description: 'مهم لنمو النبات ووظائف الخلايا في جسم الإنسان.' },
  { atomicNumber: 20, symbol: 'Ca', name: 'الكالسيوم', category: 'alkaline', state: 'صلب', foundIn: 'العظام والحليب والرخام', natureTags: ['🌿 الكائنات الحية', '🏔️ الصخور'], description: 'يُشكل العظام والأسنان، ويُستخدم في الأسمنت والرخام.' },
  { atomicNumber: 21, symbol: 'Sc', name: 'السكانديوم', category: 'transition', state: 'صلب', foundIn: 'المعادن النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي نادر، يُستخدم في صناعة بعض السبائك الخفيفة القوية.' },
  { atomicNumber: 22, symbol: 'Ti', name: 'التيتانيوم', category: 'transition', state: 'صلب', foundIn: 'الركاز والمعدات الفضائية', natureTags: ['🚀 الفضاء', '🏔️ القشرة الأرضية'], description: 'فلز قوي وخفيف يُستخدم في الطائرات وأدوات الجراحة.' },
  { atomicNumber: 23, symbol: 'V', name: 'الفاناديوم', category: 'transition', state: 'صلب', foundIn: 'الفحم والفلزات', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي يساعد في صناعة الفولاذ المقاوم للصدأ.' },
  { atomicNumber: 24, symbol: 'Cr', name: 'الكروم', category: 'transition', state: 'صلب', foundIn: 'خام الكروميت', natureTags: ['🏔️ القشرة الأرضية'], description: 'يُستخدم في الطلاء والسبائك وفي صناعة الفولاذ.' },
  { atomicNumber: 25, symbol: 'Mn', name: 'المنغنيز', category: 'transition', state: 'صلب', foundIn: 'المعادن والأرض', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي يساهم في صناعة الفولاذ ومركباته في الجسم.' },
  { atomicNumber: 26, symbol: 'Fe', name: 'الحديد', category: 'transition', state: 'صلب', foundIn: 'الأرض والصلب', natureTags: ['🏔️ القشرة الأرضية', '⚙️ الصناعة'], description: 'المكون الرئيسي للصلب، وهو أساسي في صناعة المباني والأدوات.' },
  { atomicNumber: 27, symbol: 'Co', name: 'الكوبالت', category: 'transition', state: 'صلب', foundIn: 'خام الكوبالت', natureTags: ['🏔️ القشرة الأرضية'], description: 'يُستخدم في بطاريات الليثيوم وبعض السبائك الطبية.' },
  { atomicNumber: 28, symbol: 'Ni', name: 'النيكل', category: 'transition', state: 'صلب', foundIn: 'خام النيكل', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز مقاوم للتآكل ويستخدم في العملات والسبائك.' },
  { atomicNumber: 29, symbol: 'Cu', name: 'النحاس', category: 'transition', state: 'صلب', foundIn: 'خام النحاس', natureTags: ['⚙️ الصناعة', '🏔️ القشرة الأرضية'], description: 'معدن موصل جيد للكهرباء ويُستخدم في الأسلاك.' },
  { atomicNumber: 30, symbol: 'Zn', name: 'الزنك', category: 'transition', state: 'صلب', foundIn: 'خام الزنك', natureTags: ['🌿 الكائنات الحية', '🏔️ الأرض'], description: 'يُستخدم في سبائك الحديد وفي الوقاية من الأمراض.' },
  { atomicNumber: 31, symbol: 'Ga', name: 'الغاليوم', category: 'post-transition', state: 'صلب', foundIn: 'خامات البزموت والزنك', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز منخفض نقطة الانصهار يُستخدم في أشباه الموصلات.' },
  { atomicNumber: 32, symbol: 'Ge', name: 'الجرمانيوم', category: 'metalloid', state: 'صلب', foundIn: 'خام الزنك', natureTags: ['🏔️ القشرة الأرضية'], description: 'شبه فلز يستخدم في الإلكترونيات وأجهزة الاستشعار.' },
  { atomicNumber: 33, symbol: 'As', name: 'الزرنيخ', category: 'metalloid', state: 'صلب', foundIn: 'خام النحاس والزنك', natureTags: ['🏔️ القشرة الأرضية'], description: 'شبه فلز له استخدامات صناعية محدودة.' },
  { atomicNumber: 34, symbol: 'Se', name: 'السيلينيوم', category: 'nonmetal', state: 'صلب', foundIn: 'خام النحاس', natureTags: ['🏔️ القشرة الأرضية'], description: 'معدن لا فلزي يستخدم في الكوارتز وأجهزة الطاقة الشمسية.' },
  { atomicNumber: 35, symbol: 'Br', name: 'البروم', category: 'halogen', state: 'سائل', foundIn: 'مياه البحار والملح', natureTags: ['💧 المحيطات'], description: 'هالوجين سائل في درجة حرارة الغرفة ويُستخدم في صناعة المذيبات.' },
  { atomicNumber: 36, symbol: 'Kr', name: 'الكريبتون', category: 'noble', state: 'غاز', foundIn: 'الهواء', natureTags: ['💨 الجو'], description: 'غاز نبيل يُستخدم في المصابيح الضوئية وبعض الدوائر الدقيقة.' },
  { atomicNumber: 37, symbol: 'Rb', name: 'الروبيديوم', category: 'alkali', state: 'صلب', foundIn: 'المعادن النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز قلوي نادر يستعمل في بعض التطبيقات العلمية.' },
  { atomicNumber: 38, symbol: 'Sr', name: 'السترونشيوم', category: 'alkaline', state: 'صلب', foundIn: 'الصخور والمعادن', natureTags: ['🏔️ القشرة الأرضية'], description: 'يُستخدم في ألوان اللهب وبعض المواد البصرية.' },
  { atomicNumber: 39, symbol: 'Y', name: 'الإتريوم', category: 'transition', state: 'صلب', foundIn: 'المعادن النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي يُستخدم في بعض البلورات الإلكترونية.' },
  { atomicNumber: 40, symbol: 'Zr', name: 'الزركونيوم', category: 'transition', state: 'صلب', foundIn: 'خام الزركون', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز مقاوم للحرارة ويستخدم في النوى وفي صناعة العوازل.' },
  { atomicNumber: 41, symbol: 'Nb', name: 'النيوبيوم', category: 'transition', state: 'صلب', foundIn: 'الخام المعدني', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي يستخدم في السبائك الحرارية.' },
  { atomicNumber: 42, symbol: 'Mo', name: 'الموليبدينوم', category: 'transition', state: 'صلب', foundIn: 'خام الموليبدينيت', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز شديد المقاومة للحرارة ويستخدم في الصلب.' },
  { atomicNumber: 43, symbol: 'Tc', name: 'التكنيتيوم', category: 'transition', state: 'صلب', foundIn: 'في بعض النوى والأبحاث', natureTags: ['🔬 المختبر'], description: 'فلز مشع يستعمل طبيًا في تصوير الأعضاء داخل الجسم.' },
  { atomicNumber: 44, symbol: 'Ru', name: 'الروثينيوم', category: 'transition', state: 'صلب', foundIn: 'فلزات النبالة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي نادر يستخدم في المحركات والسبائك.' },
  { atomicNumber: 45, symbol: 'Rh', name: 'الروديوم', category: 'transition', state: 'صلب', foundIn: 'المعادن النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي يستخدم في المحولات والسبائك المسببة للوهج.' },
  { atomicNumber: 46, symbol: 'Pd', name: 'بالاديوم', category: 'transition', state: 'صلب', foundIn: 'المعادن النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'يستخدم في بعض المحولات والبطاريات ومواد التفاعل الكيميائي.' },
  { atomicNumber: 47, symbol: 'Ag', name: 'الفضة', category: 'transition', state: 'صلب', foundIn: 'خام الفضة', natureTags: ['🏔️ القشرة الأرضية', '💍 الحلي'], description: 'فلز لامع موصل جيد للحرارة والكهرباء ويستعمل في المجوهرات.' },
  { atomicNumber: 48, symbol: 'Cd', name: 'الكادميوم', category: 'transition', state: 'صلب', foundIn: 'خام الزنك', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز سام في بعض التطبيقات الصناعية، ويستخدم في بطاريات معينة.' },
  { atomicNumber: 49, symbol: 'In', name: 'الإنديوم', category: 'post-transition', state: 'صلب', foundIn: 'معادن الزنك', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز يستخدم في شاشات LCD والأجهزة الإلكترونية.' },
  { atomicNumber: 50, symbol: 'Sn', name: 'القصدير', category: 'post-transition', state: 'صلب', foundIn: 'خام القصدير', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز مستعمل في الطلاء وصناعة الحاويات والأواني.' },
  { atomicNumber: 51, symbol: 'Sb', name: 'الأنتيمون', category: 'metalloid', state: 'صلب', foundIn: 'معادن السرب', natureTags: ['🏔️ القشرة الأرضية'], description: 'شبه فلز يستخدم في بعض السبائك والمواد المقاومة للحريق.' },
  { atomicNumber: 52, symbol: 'Te', name: 'التيلوريوم', category: 'metalloid', state: 'صلب', foundIn: 'خام النحاس', natureTags: ['🏔️ القشرة الأرضية'], description: 'شبه فلز يستخدم في بعض الخلايا الشمسية والمحركات.' },
  { atomicNumber: 53, symbol: 'I', name: 'اليود', category: 'halogen', state: 'صلب', foundIn: 'المحيطات والبحار', natureTags: ['💧 المحيطات', '🌿 الكائنات الحية'], description: 'هالوجين مهم في وظيفة الغدة الدرقية ولحفظ الصحة.' },
  { atomicNumber: 54, symbol: 'Xe', name: 'الزينون', category: 'noble', state: 'غاز', foundIn: 'الهواء', natureTags: ['💨 الجو'], description: 'غاز نبيل يستخدم في مصابيح الليزر والأضواء المضيئة.' },
  { atomicNumber: 55, symbol: 'Cs', name: 'السيزيوم', category: 'alkali', state: 'صلب', foundIn: 'الصخور والمعادن', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز قلوي يستخدم في أدوات الساعة الذرية والأبحاث.' },
  { atomicNumber: 56, symbol: 'Ba', name: 'الباريوم', category: 'alkaline', state: 'صلب', foundIn: 'البارايت', natureTags: ['🏔️ القشرة الأرضية'], description: 'يُستخدم في بعض الأدوية والفحص الطبي والتصوير الشعاعي.' },
  { atomicNumber: 57, symbol: 'La', name: 'اللانثانوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'من عناصر اللانثانيدات، ومع وجوده في فلزات نادرة.' },
  { atomicNumber: 58, symbol: 'Ce', name: 'السيريوم', category: 'lanthanide', state: 'صلب', foundIn: 'الصخور النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'مستخدم في عوازل البترول وبعض مواد الإضاءة.' },
  { atomicNumber: 59, symbol: 'Pr', name: 'البراسيوديميوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر نادر في صناعة العدسات والبصريات.' },
  { atomicNumber: 60, symbol: 'Nd', name: 'النيوديميوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'يستخدم في مغناطيسات قوية وأجهزة الصوت.' },
  { atomicNumber: 61, symbol: 'Pm', name: 'البروميثيوم', category: 'lanthanide', state: 'صلب', foundIn: 'أبحاث نووية', natureTags: ['🔬 المختبر'], description: 'عنصر مشع نادر يستخدم في بعض المصادر الإشعاعية.' },
  { atomicNumber: 62, symbol: 'Sm', name: 'الساماريوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'يُستخدم في المغناطيسات والمواد الحرارية.' },
  { atomicNumber: 63, symbol: 'Eu', name: 'الأوروبيوم', category: 'lanthanide', state: 'صلب', foundIn: 'خام الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر مهم في شاشات LED وآلات التصوير.' },
  { atomicNumber: 64, symbol: 'Gd', name: 'الغادولينيوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'يستخدم في التصوير الطبي والعوازل المغناطيسية.' },
  { atomicNumber: 65, symbol: 'Tb', name: 'التيربيوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'مستخدم في الإضاءة وأجهزة الحاسوب المتقدمة.' },
  { atomicNumber: 66, symbol: 'Dy', name: 'الديسبروسيوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'مركباته تستعمل في مواد المغناطيس القوي.' },
  { atomicNumber: 67, symbol: 'Ho', name: 'الهولميوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'يُستخدم في الأجهزة الإلكترونية وبصريات الليزر.' },
  { atomicNumber: 68, symbol: 'Er', name: 'الإربيوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'يستخدم في عدسات الليزر ومقويات الإضاءة.' },
  { atomicNumber: 69, symbol: 'Tm', name: 'الثوليوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز نادر يدخل في بعض تطبيقات الليزر.' },
  { atomicNumber: 70, symbol: 'Yb', name: 'الإتيربيوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر مهم في الأجهزة الإلكترونية والإضاءة.' },
  { atomicNumber: 71, symbol: 'Lu', name: 'اللوتيشيوم', category: 'lanthanide', state: 'صلب', foundIn: 'معادن الأرض النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز نادر يُستخدم في بعض التطبيقات الصناعية والبحثية.' },
  { atomicNumber: 72, symbol: 'Hf', name: 'هافنيوم', category: 'transition', state: 'صلب', foundIn: 'زركونيا النادرة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز ثقيل مقاوم للحرارة ويُستخدم في الصناعة النووية.' },
  { atomicNumber: 73, symbol: 'Ta', name: 'التنتالوم', category: 'transition', state: 'صلب', foundIn: 'خام التنتاليت', natureTags: ['🏔️ القشرة الأرضية'], description: 'مقاوم للتآكل والحرارة، يُستخدم في الإلكترونيات.' },
  { atomicNumber: 74, symbol: 'W', name: 'التنجستن', category: 'transition', state: 'صلب', foundIn: 'خام التنجستن', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز شديد المقاومة للحرارة، يُستخدم في أسلاك المصابيح.' },
  { atomicNumber: 75, symbol: 'Re', name: 'الرينيوم', category: 'transition', state: 'صلب', foundIn: 'معادن النبالة', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز انتقالي نادر يمنح السبائك مقاومة للحرارة.' },
  { atomicNumber: 76, symbol: 'Os', name: 'الأوزميوم', category: 'transition', state: 'صلب', foundIn: 'خام البلاتين', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز شديد الكثافة يُستخدم في بعض الأطراف والسبائك.' },
  { atomicNumber: 77, symbol: 'Ir', name: 'الإيريديوم', category: 'transition', state: 'صلب', foundIn: 'معادن الاستكشاف', natureTags: ['🏔️ القشرة الأرضية'], description: 'مقاوم للحرارة والتآكل ويُستخدم في المواد عالية الأداء.' },
  { atomicNumber: 78, symbol: 'Pt', name: 'البلاتين', category: 'transition', state: 'صلب', foundIn: 'مناجم البلاتين', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز قيم يُستخدم في المحولات الكاتاليكية والمجوهرات.' },
  { atomicNumber: 79, symbol: 'Au', name: 'الذهب', category: 'transition', state: 'صلب', foundIn: 'الودائع المعدنية', natureTags: ['💰 المعادن', '🏔️ القشرة الأرضية'], description: 'فلز لامع وقيم، موصل جيد للتطبيقات الإلكترونية والمجوهرات.' },
  { atomicNumber: 80, symbol: 'Hg', name: 'الزئبق', category: 'transition', state: 'سائل', foundIn: 'خامات الزئبق', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز سائل في درجة حرارة الغرفة، ويستلزم الحذر في التعامل معه.' },
  { atomicNumber: 81, symbol: 'Tl', name: 'الثاليوم', category: 'post-transition', state: 'صلب', foundIn: 'خام الزنك', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز سام في بعض التطبيقات العلمية والتقنية.' },
  { atomicNumber: 82, symbol: 'Pb', name: 'الرصاص', category: 'post-transition', state: 'صلب', foundIn: 'خام الرصاص', natureTags: ['🏔️ القشرة الأرضية'], description: 'معدن ثقيل يستخدم في بعض البطاريات والتسقيف.' },
  { atomicNumber: 83, symbol: 'Bi', name: 'البزموت', category: 'post-transition', state: 'صلب', foundIn: 'خام الرصاص', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز لامع يستخدم في بعض السبائك والمعاجين الطبية.' },
  { atomicNumber: 84, symbol: 'Po', name: 'البولونيوم', category: 'post-transition', state: 'صلب', foundIn: 'الرسوبيات الطبيعية', natureTags: ['🏔️ القشرة الأرضية'], description: 'معدن مشع نادر، ويحتاج إلى التعامل الدقيق.' },
  { atomicNumber: 85, symbol: 'At', name: 'الأستاتين', category: 'halogen', state: 'صلب', foundIn: 'عناصر من أصل مشع', natureTags: ['🔬 المختبر'], description: 'هالوجين مشع نادر جدًا، ويُدَّرس غالبًا في المختبرات.' },
  { atomicNumber: 86, symbol: 'Rn', name: 'الرادون', category: 'noble', state: 'غاز', foundIn: 'الأرض والصخور', natureTags: ['🏔️ القشرة الأرضية', '💨 الجو'], description: 'غاز نبيل مشع، ويتراكم في بعض الأماكن تحت الأرض.' },
  { atomicNumber: 87, symbol: 'Fr', name: 'الفرانسيوم', category: 'alkali', state: 'صلب', foundIn: 'خامات اليورانيوم', natureTags: ['🏔️ القشرة الأرضية'], description: 'فلز قلوي مشع جدًا، نادر جدًا في الطبيعة.' },
  { atomicNumber: 88, symbol: 'Ra', name: 'الراديوم', category: 'alkaline', state: 'صلب', foundIn: 'خام اليورانيوم', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر مشع استخدم في الماضي في بعض التطبيقات الطبية.' },
  { atomicNumber: 89, symbol: 'Ac', name: 'الأكتينيوم', category: 'actinide', state: 'صلب', foundIn: 'خام اليورانيوم', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر أكتينيوم مشع، يُستخدم في بعض الدراسات النووية.' },
  { atomicNumber: 90, symbol: 'Th', name: 'الثوريوم', category: 'actinide', state: 'صلب', foundIn: 'خام الثوريوم', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر نووي مهم للبحوث وتقنيات الطاقة المستقبلية.' },
  { atomicNumber: 91, symbol: 'Pa', name: 'البروتكتينيوم', category: 'actinide', state: 'صلب', foundIn: 'خام اليورانيوم', natureTags: ['🏔️ القشرة الأرضية'], description: 'عنصر أكتينيوم مشع يدخل في دراسة الطاقة النووية.' },
  { atomicNumber: 92, symbol: 'U', name: 'اليورانيوم', category: 'actinide', state: 'صلب', foundIn: 'خام اليورانيوم', natureTags: ['🏔️ القشرة الأرضية', '⚡ الطاقة'], description: 'عنصر نووي أساسي في الطاقة والبحث العلمي.' },
  { atomicNumber: 93, symbol: 'Np', name: 'النبتونيوم', category: 'actinide', state: 'صلب', foundIn: 'التفاعلات النووية', natureTags: ['🔬 المختبر', '⚡ الطاقة'], description: 'عنصر أكتينيوم مشع يستعمل في الدراسات الذرية.' },
  { atomicNumber: 94, symbol: 'Pu', name: 'البلوتونيوم', category: 'actinide', state: 'صلب', foundIn: 'التفاعلات النووية', natureTags: ['⚡ الطاقة'], description: 'عنصر أكتينيوم شديد النشاط ويستخدم في بعض التطبيقات النووية.' },
  { atomicNumber: 95, symbol: 'Am', name: 'الأمريكيوم', category: 'actinide', state: 'صلب', foundIn: 'التفاعلات النووية', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم مشع، يُستخدم في بعض أجهزة القياس.' },
  { atomicNumber: 96, symbol: 'Cm', name: 'الكوريوم', category: 'actinide', state: 'صلب', foundIn: 'اختبارات نووية', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم مشع وموارد بحثية في العلوم الذرية.' },
  { atomicNumber: 97, symbol: 'Bk', name: 'البكريليوم', category: 'actinide', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم مشع نادر جدًا يُستخدم في البحث العلمي.' },
  { atomicNumber: 98, symbol: 'Cf', name: 'الكاليفورنيوم', category: 'actinide', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم مشع جدًا يستعمل في الدراسات النووية.' },
  { atomicNumber: 99, symbol: 'Es', name: 'الإينشتينيوم', category: 'actinide', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم صناعي نادر جدًا في المختبرات.' },
  { atomicNumber: 100, symbol: 'Fm', name: 'الفيرميوم', category: 'actinide', state: 'صلb', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم مشع جدًا، يستخدم في الأبحاث النووية.' },
  { atomicNumber: 101, symbol: 'Md', name: 'الميندليفيوم', category: 'actinide', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم نادر جدًا، يدرسه العلماء في المختبر.' },
  { atomicNumber: 102, symbol: 'No', name: 'النوبليوم', category: 'actinide', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم مشع يدرس في مختبرات الطاقة النووية.' },
  { atomicNumber: 103, symbol: 'Lr', name: 'لورنسيوم', category: 'actinide', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر أكتينيوم صناعي يُستخدم في البحث النظري والتجريبي.' },
  { atomicNumber: 104, symbol: 'Rf', name: 'رذرفورديوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر ثقيل صناعي من عناصر المجموعة الانتقالية.' },
  { atomicNumber: 105, symbol: 'Db', name: 'دوبنيوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي نادر جدًا في المختبرات.' },
  { atomicNumber: 106, symbol: 'Sg', name: 'سيبورجيوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي يُدرس في مختبرات الفيزياء النووية.' },
  { atomicNumber: 107, symbol: 'Bh', name: 'بوهروم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر مصطنع نادر جدًا يُستخدم في الأبحاث النووية.' },
  { atomicNumber: 108, symbol: 'Hs', name: 'هسيوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي شديد النشاط، يدرس في مختبرات الأبحاث.' },
  { atomicNumber: 109, symbol: 'Mt', name: 'مايتنريوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي يُستخدم في أبحاث التفاعلات الذرية.' },
  { atomicNumber: 110, symbol: 'Ds', name: 'دارمشتات', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي نادر جدًا يصنع في المختبرات.' },
  { atomicNumber: 111, symbol: 'Rg', name: 'رونتجينيوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي من الفلزات الثقيلة الدراسية.' },
  { atomicNumber: 112, symbol: 'Cn', name: 'كوبرنيكسيوم', category: 'transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي مُثبت في الأبحاث النووية الحديثة.' },
  { atomicNumber: 113, symbol: 'Nh', name: 'نيهون', category: 'post-transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي جديد في المجموعة بعد الانتقالية.' },
  { atomicNumber: 114, symbol: 'Fl', name: 'فليروفيوم', category: 'post-transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي من الفلزات الثقيلة يُدرَّس في المختبرات.' },
  { atomicNumber: '115', symbol: 'Mc', name: 'موسكوفيوم', category: 'post-transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر صناعي في المجموعة الثقيلة درس في المختبرات.' },
  { atomicNumber: 116, symbol: 'Lv', name: 'ليفرموريوم', category: 'post-transition', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'عنصر ثقيل صناعي يدرس في مختبرات الفيزياء النووية.' },
  { atomicNumber: 117, symbol: 'Ts', name: 'تنسين', category: 'halogen', state: 'صلب', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'هالوجين صناعي شديد النشاط ويُدرَس في الأبحاث الحديثة.' },
  { atomicNumber: 118, symbol: 'Og', name: 'أوغانيسون', category: 'noble', state: 'غاز', foundIn: 'المختبرات', natureTags: ['🔬 المختبر'], description: 'غاز نبيل صناعي في دراسة العناصر الثقيلة.' }
];

const quizQuestions = [
  {
    question: 'أي عنصر يكوّن النسبة الأكبر من الهواء الجوي حولنا؟',
    options: ['الأكسجين', 'النيتروجين', 'الكربون', 'الهيدروجين'],
    answer: 'النيتروجين',
    fact: 'يشكل غاز النيتروجين حوالي 78% من هواء الكرة الأرضية!'
  },
  {
    question: 'ما المركب المعروف بين الجميع باسم "ملح الطعام"؟',
    options: ['كلوريد الصوديوم (NaCl)', 'حمض الهيدروكلوريك', 'ثاني أكسيد الكربون', 'الأمونيا'],
    answer: 'كلوريد الصوديوم (NaCl)',
    fact: 'يتكون الملح من صوديوم وكلور ليتحول لمادة أمنة ومفيدة يومياً.'
  },
  {
    question: 'ما العنصر الخفيف جداً الذي نملأ به بالونات الحفلات لتطير عالياً؟',
    options: ['الهيليوم', 'الحديد', 'الذهب', 'الكالسيوم'],
    answer: 'الهيليوم',
    fact: 'الهيليوم غاز نبيل خفيف أقوى طفواً من الهواء الجوي!'
  },
  {
    question: 'أي عنصر يمثل المكون الأساسي لرمال الشواطئ وصناعة الزجاج؟',
    options: ['السيليكون', 'النيتروجين', 'المغنيسيوم', 'الكبريت'],
    answer: 'السيليكون',
    fact: 'عند صهر السيليكون مع الأكسجين بدرجة حرارة عالية ينتج الزجاج الشفاف.'
  },
  {
    question: 'ما العنصر الأساسي لبناء العظام والأسنان القوية في جسمك؟',
    options: ['الكالسيوم', 'الحديد', 'الزنك', 'الليثيوم'],
    answer: 'الكالسيوم',
    fact: 'الحليب والأجبان غنية بالكالسيوم الذي يقوي هيكلنا العظمي!'
  },
  {
    question: 'ما المادة البنية الحمراء التي تتكون على أسطح الحديد عند تعرضه للماء والهواء؟',
    options: ['صدأ الحديد (أكسيد الحديد)', 'الملح', 'الزجاج', 'الألمنيوم'],
    answer: 'صدأ الحديد (أكسيد الحديد)',
    fact: 'يتفاعل الحديد مع أكسجين الهواء والرطوبة ليتكون الصدأ!'
  },
  {
    question: 'أي عنصر يُضاف إلى معجون الأسنان لحمايتها من التسوس وتقويتها؟',
    options: ['الفلور', 'الذهب', 'النيون', 'البوتاسيوم'],
    answer: 'الفلور',
    fact: 'الفلور يساعد على حماية طبق المينا الخارجية للأسنان!'
  },
  {
    question: 'أي عنصر يُستخدم بشكل اساسي في بطاريات الهواتف الذكية والسيارات الكهربائية؟',
    options: ['الليثيوم', 'النحاس', 'الفضة', 'الرصاص'],
    answer: 'الليثيوم',
    fact: 'الليثيوم فلز خفيف جداً يحفظ الطاقة بفعالية عالية ممتازة.'
  },
  {
    question: 'ما الغاز الذي تنتجه النباتات أثناء النهار وتحتاجه الكائنات الحية للتنفس؟',
    options: ['الأكسجين', 'الأرجون', 'الهيليوم', 'الكلور'],
    answer: 'الأكسجين',
    fact: 'تقوم الأشجار بتحويل ثاني أكسيد الكربون إلى أكسجين نقي بنعمة الله.'
  },
  {
    question: 'أي غاز نبيل يضيء بألوان حمراء وبرتقالية جذابة في لوحات الإعلانات؟',
    options: ['النيون', 'الأكسجين', 'الهيدروجين', 'الكبريت'],
    answer: 'النيون',
    fact: 'غاز النيون يتوهج بشدة عند تمرير التيار الكهربائي فيه.'
  },
  {
    question: 'ما اسم الغاز الذي يخرج مع زفيرنا وتأخذه النباتات لصنع غذائها؟',
    options: ['ثاني أكسيد الكربون', 'الميثان', 'حمض الهيدروكلوريك', 'الأمونيا'],
    answer: 'ثاني أكسيد الكربون',
    fact: 'تسمى هذه العملية دورة التبادلي بين الكائنات والنباتات.'
  },
  {
    question: 'أي عنصر أحمر موصل ممتاز للكهرباء وتصنع منه الأسلاك الكهرلية بالمنازل؟',
    options: ['النحاس', 'السيليكون', 'الكبريت', 'الألمنيوم'],
    answer: 'النحاس',
    fact: 'النحاس ينقل الكهرباء بسلاسة وبأقل فقد للطاقة الحرارية.'
  },
  {
    question: 'ما الحمض الطبيعي القوي الموجود في المعدة ليساعد على هضم الطعام؟',
    options: ['حمض الهيدروكلوريك (HCl)', 'الماء', 'الميثان', 'كلوريد الفضة'],
    answer: 'حمض الهيدروكلوريك (HCl)',
    fact: 'تفرزه المعدة بطريقة آمنة لتفكيك الطعام وتسهيل امتصاصه.'
  },
  {
    question: 'ما العنصر النبيل الذي لا يصدأ ولا يتغير بريقه وتصنع منه المجوهرات القيمة؟',
    options: ['الذهب', 'الحديد', 'الصوديوم', 'الزنك'],
    answer: 'الذهب',
    fact: 'الذهب عنصر خامل كيميائياً لا يتأثر بالهواء أو الماء!'
  },
  {
    question: 'ما الصيغة الكيميائية للماء النقي؟',
    options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'],
    answer: 'H₂O',
    fact: 'تتكون كل جزيئة ماء من ذرتي هيدروجين وذرة أكسجين واحدة.'
  }
];

let selectedCategory = 'الكل';
let currentQuestion = 0;
let progress = loadProgress();

const elementGrid = document.getElementById('elementGrid');
const elementDetails = document.getElementById('elementDetails');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const metricPoints = document.getElementById('metricPoints');
const metricQuizScore = document.getElementById('metricQuizScore');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizCounter = document.getElementById('quizCounter');
const quizScoreView = document.getElementById('quizScoreView');

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...defaultProgress };

  try {
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      seenElements: Array.isArray(parsed.seenElements) ? parsed.seenElements : [],
    };
  } catch (error) {
    return { ...defaultProgress };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function renderStats() {
  const metricElements = document.getElementById('metricElements');
  const metricPoints = document.getElementById('metricPoints');
  const metricQuizScore = document.getElementById('metricQuizScore');

  if (metricElements) metricElements.textContent = elements.length;
  if (metricPoints) metricPoints.textContent = progress.points;
  if (metricQuizScore) metricQuizScore.textContent = progress.quizScore;
}

function buildFilters() {
  const categories = ['الكل', ...new Set(Object.values(elementCategories))];
  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-btn ${selectedCategory === category ? 'active' : ''}" data-category="${category}" type="button">
          ${category}
        </button>
      `
    )
    .join('');

  categoryFilters.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category;
      buildFilters();
      renderElements();
    });
  });
}

let currentViewMode = 'grid';

function getElementGridPos(atomicNumber) {
  if (atomicNumber === 1) return { row: 1, col: 1 };
  if (atomicNumber === 2) return { row: 1, col: 18 };

  if (atomicNumber >= 3 && atomicNumber <= 4) return { row: 2, col: atomicNumber - 2 };
  if (atomicNumber >= 5 && atomicNumber <= 10) return { row: 2, col: atomicNumber + 8 };

  if (atomicNumber >= 11 && atomicNumber <= 12) return { row: 3, col: atomicNumber - 10 };
  if (atomicNumber >= 13 && atomicNumber <= 18) return { row: 3, col: atomicNumber };

  if (atomicNumber >= 19 && atomicNumber <= 36) return { row: 4, col: atomicNumber - 18 };

  if (atomicNumber >= 37 && atomicNumber <= 54) return { row: 5, col: atomicNumber - 36 };

  if (atomicNumber >= 55 && atomicNumber <= 56) return { row: 6, col: atomicNumber - 54 };
  if (atomicNumber >= 57 && atomicNumber <= 71) return { row: 9, col: atomicNumber - 57 + 3 };
  if (atomicNumber >= 72 && atomicNumber <= 86) return { row: 6, col: atomicNumber - 72 + 3 };

  if (atomicNumber >= 87 && atomicNumber <= 88) return { row: 7, col: atomicNumber - 86 };
  if (atomicNumber >= 89 && atomicNumber <= 103) return { row: 10, col: atomicNumber - 89 + 3 };
  if (atomicNumber >= 104 && atomicNumber <= 118) return { row: 7, col: atomicNumber - 104 + 3 };

  return { row: 1, col: 1 };
}

function renderElements() {
  const target = searchInput.value.trim().toLowerCase();

  const filtered = elements.filter((element) => {
    const matchesCategory = selectedCategory === 'الكل' || elementCategories[element.category] === selectedCategory;
    const matchesQuery = !target || element.name.toLowerCase().includes(target) || element.symbol.toLowerCase().includes(target) || String(element.atomicNumber).includes(target);
    return matchesCategory && matchesQuery;
  });

  elementGrid.innerHTML = filtered
    .map((element) => {
      const gridPos = getElementGridPos(element.atomicNumber);
      const posStyle = `grid-row: ${gridPos.row}; grid-column: ${gridPos.col};`;

      return `
        <article class="element-card" data-symbol="${element.symbol}" style="${posStyle}" tabindex="0" title="${element.name} (${element.symbol})">
          <div class="atomic">#${element.atomicNumber}</div>
          <div class="element-symbol">${element.symbol}</div>
          <div class="element-name">${element.name}</div>
        </article>
      `;
    })
    .join('');

  elementGrid.querySelectorAll('.element-card').forEach((card) => {
    const symbol = card.dataset.symbol;
    const element = elements.find((item) => item.symbol === symbol);
    card.addEventListener('click', () => {
      elementGrid.querySelectorAll('.element-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      showElementDetails(element);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        elementGrid.querySelectorAll('.element-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        showElementDetails(element);
      }
    });
  });
}

function getStateColor(state) {
  const map = {
    'غاز': '#48b7d1',
    'سائل': '#5cb3ff',
    'صلب': '#7ecb5a',
    'صلب / غير متفاعل': '#7ecb5a'
  };
  return map[state] || '#8d9dbd';
}

function getElectronShells(atomicNumber) {
  if (atomicNumber <= 2) {
    return [atomicNumber];
  } else if (atomicNumber <= 10) {
    return [2, atomicNumber - 2];
  } else if (atomicNumber <= 18) {
    return [2, 8, atomicNumber - 10];
  } else if (atomicNumber <= 20) {
    return [2, 8, 8, atomicNumber - 18];
  }

  const capacities = [2, 8, 18, 32, 32, 18, 8];
  let remaining = atomicNumber;
  const shells = [];

  for (let cap of capacities) {
    if (remaining <= 0) break;
    if (remaining <= cap) {
      shells.push(remaining);
      remaining = 0;
    } else {
      shells.push(cap);
      remaining -= cap;
    }
  }
  return shells;
}

function drawBohrModel(element) {
  const atomicNumber = element.atomicNumber;
  const shells = getElectronShells(atomicNumber);
  const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
  const size = 280;
  const center = size / 2;
  const nucleusRadius = 24;
  const maxOrbitRadius = 125;
  const minOrbitRadius = 42;

  const shellCount = shells.length;
  const radiusStep = shellCount > 1 ? (maxOrbitRadius - minOrbitRadius) / (shellCount - 1) : 0;

  let svgOrbits = '';

  shells.forEach((electronCount, shellIndex) => {
    const radius = shellCount === 1 ? 75 : minOrbitRadius + shellIndex * radiusStep;
    const speedSec = 6 + shellIndex * 3.5;
    const direction = shellIndex % 2 === 0 ? 'normal' : 'reverse';

    let electronsSvg = '';
    for (let i = 0; i < electronCount; i++) {
      const angle = (2 * Math.PI * i) / electronCount;
      const ex = (center + radius * Math.cos(angle)).toFixed(1);
      const ey = (center + radius * Math.sin(angle)).toFixed(1);
      electronsSvg += `<circle cx="${ex}" cy="${ey}" r="5" class="bohr-electron" />`;
    }

    svgOrbits += `
      <circle cx="${center}" cy="${center}" r="${radius.toFixed(1)}" class="bohr-orbit" />
      <g class="bohr-shell-group" style="transform-origin: ${center}px ${center}px; animation-duration: ${speedSec}s; animation-direction: ${direction};">
        ${electronsSvg}
      </g>
    `;
  });

  const shellBreakdown = shells
    .map((cnt, idx) => `<span class="shell-pill" dir="ltr">مدار <b>${shellNames[idx]}</b>: ${cnt} e⁻</span>`)
    .join('');

  return `
    <div class="bohr-box">
      <div class="bohr-label">
        <span>⚛️ نموذج بور الذري (Bohr Model)</span>
        <small dir="ltr">Total e⁻: ${atomicNumber}</small>
      </div>

      <svg viewBox="0 0 ${size} ${size}" class="bohr-svg" aria-label="نموذج بور الذري التفاعلي">
        <defs>
          <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffb562" />
            <stop offset="65%" stop-color="#5d7cff" />
            <stop offset="100%" stop-color="#2b4de0" />
          </radialGradient>
        </defs>

        ${svgOrbits}

        <circle cx="${center}" cy="${center}" r="${nucleusRadius}" fill="url(#nucleusGlow)" class="bohr-nucleus" />
        <text x="${center}" y="${center - 3}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="800" fill="#ffffff" direction="ltr">${element.symbol}</text>
        <text x="${center}" y="${center + 9}" text-anchor="middle" dominant-baseline="middle" font-size="8.5" font-weight="700" fill="#ffebd6" direction="ltr">+${atomicNumber}p</text>
      </svg>

      <div class="bohr-shells-pills" dir="ltr">
        ${shellBreakdown}
      </div>
    </div>
  `;
}

function showElementDetails(element) {
  const seen = progress.seenElements.includes(element.symbol);
  if (!seen) {
    progress.seenElements.push(element.symbol);
    progress.points += 10;
    saveProgress();
    renderStats();
  }

  elementDetails.innerHTML = `
    <div class="detail-card wide-detail-card">
      <div class="detail-head">
        <div class="detail-symbol">${element.symbol}</div>
        <div>
          <h4>${element.name} (${element.symbol})</h4>
          <div class="detail-meta">
            <span class="meta-chip">العدد الذري: #${element.atomicNumber}</span>
            <span class="meta-chip">الفئة: ${elementCategories[element.category]}</span>
            <span class="meta-chip">الحالة: ${element.state}</span>
          </div>
        </div>
      </div>

      <div class="detail-body-grid">
        <div class="detail-bohr-col">
          ${drawBohrModel(element)}
        </div>
        <div class="detail-info-col">
          <p class="detail-desc">${element.description}</p>
          <ul class="detail-list">
            <li><strong>أين يوجد في الطبيعة:</strong> ${element.foundIn}</li>
            <li><strong>البيئة الطبيعية:</strong> ${element.natureTags.join(' ')}</li>
            <li><strong>التوزيع الإلكتروني:</strong> يحتوي على ${element.atomicNumber} بروتون في النواة وتدور حوله ${element.atomicNumber} إلكتروناً في المدارات.</li>
            <li><strong>الأهمية في حياتنا:</strong> مادة أساسية تدخل في تركيبة المواد المحيطة بنا والتطبيقات الحيوية والتقنية.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderQuiz() {
  const current = quizQuestions[currentQuestion];
  quizCounter.textContent = `السؤال ${currentQuestion + 1} من ${quizQuestions.length}`;
  quizScoreView.textContent = `النقاط: ${progress.quizScore}`;
  quizQuestion.textContent = current.question;

  quizOptions.innerHTML = current.options
    .map(
      (option) => `
        <button class="option-btn" type="button" data-option="${option}">${option}</button>
      `
    )
    .join('');

  quizOptions.querySelectorAll('.option-btn').forEach((button) => {
    button.addEventListener('click', () => handleQuizAnswer(button, current.answer, button.dataset.option, current.fact));
  });
}

function handleQuizAnswer(button, correctAnswer, selectedAnswer, factText) {
  const isCorrect = selectedAnswer === correctAnswer;

  quizOptions.querySelectorAll('.option-btn').forEach((optionButton) => {
    optionButton.disabled = true;
    optionButton.classList.toggle('correct', optionButton.dataset.option === correctAnswer);
    optionButton.classList.toggle('wrong', optionButton.dataset.option === selectedAnswer && !isCorrect);
  });

  let factBox = document.getElementById('quizFactBox');
  if (!factBox) {
    factBox = document.createElement('div');
    factBox.id = 'quizFactBox';
    factBox.className = 'quiz-fact-box';
    quizOptions.parentNode.appendChild(factBox);
  }

  factBox.innerHTML = `
    <div class="fact-content ${isCorrect ? 'fact-success' : 'fact-info'}">
      <strong>${isCorrect ? '✨ أحسنت! إجابة صحيحة' : '💡 الإجابة الصحيحة هي: ' + correctAnswer}</strong>
      <p>${factText || ''}</p>
    </div>
  `;

  if (isCorrect) {
    progress.quizScore += 10;
    saveProgress();
    renderStats();
  }

  setTimeout(() => {
    currentQuestion += 1;
    if (factBox) factBox.remove();
    if (currentQuestion < quizQuestions.length) {
      renderQuiz();
    } else {
      quizQuestion.textContent = '🎉 أحسنت يا بطل الكيمياء! أتممت جميع التحديات بنجاح!';
      quizOptions.innerHTML = '<button class="primary-btn" type="button" id="restartQuiz">إعادة التحدي من البداية</button>';
      const restartBtn = document.getElementById('restartQuiz');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          currentQuestion = 0;
          renderQuiz();
        });
      }
    }
  }, 2200);
}

searchInput.addEventListener('input', renderElements);

document.getElementById('resetProgress').addEventListener('click', () => {
  progress = { ...defaultProgress };
  localStorage.removeItem(STORAGE_KEY);
  renderStats();
  renderQuiz();
  renderElements();
  const firstCard = elementGrid.querySelector('[data-symbol="H"]');
  if (firstCard) firstCard.classList.add('selected');
  showElementDetails(elements[0]);
});

buildFilters();
renderElements();
renderStats();
renderQuiz();

const firstCard = elementGrid.querySelector('[data-symbol="H"]');
if (firstCard) firstCard.classList.add('selected');
showElementDetails(elements[0]);
