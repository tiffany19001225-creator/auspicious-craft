/* ==========================================================================
   Auspicious Craft — Data Layer
   Real product catalogue (217 items) with real product photos.
   ========================================================================== */

const BRAND = {
  name: 'Auspicious Craft',
  tagline: 'Direct Factory · Nativity & Religious Crafts',
  email: 'auspicious@vip.163.com',
  phone: '0768-2505557',
  address: 'Chaozhou, Guangdong, China',
  whatsapp: '0768-2505557'
};

/* Chinese material name → English material name */
const MATERIAL_EN = {
  '陶瓷木质': 'Ceramic & Wood', '树脂': 'Resin', '陶瓷': 'Ceramic', '木质': 'Wood',
  '塑料': 'Plastic', '树脂木质': 'Resin & Wood', '木质塑料': 'Wood & Plastic',
  '树脂木质塑料': 'Resin, Wood & Plastic', 'PVC': 'PVC', '纸质': 'Paper', '植绒': 'Flocked'
};

const CATEGORIES = [
  { key: 'nativity', name: 'Nativity Sets', nameZh: '圣诞马槽人物套装', blurb: 'Ceramic, wood & resin nativity scenes.', blurbZh: '陶瓷、木质与树脂圣诞马槽人物场景。' },
  { key: 'ornament', name: 'Christmas Ornaments', nameZh: '圣诞装饰摆件', blurb: 'Festive figures & ornaments.', blurbZh: '节日人物与装饰摆件。' },
  { key: 'tree', name: 'Christmas Tree Decorations', nameZh: '圣诞树配件', blurb: 'Miniature trees & accessories.', blurbZh: '迷你圣诞树与配件。' },
  { key: 'mat', name: 'Flocked Scenery Mats', nameZh: '植绒场景草皮垫', blurb: 'Scenery mats & flocked bases.', blurbZh: '场景草皮与植绒底座。' }
];

function hasLED(f) { return f.indexOf('LED') !== -1; }

function buildNameEn(r) {
  var matEn = MATERIAL_EN[r[1]] || '';
  var cat = r[6];
  if (cat === 'nativity') return (matEn === 'Wood' ? 'Wooden' : matEn) + (hasLED(r[7]) ? ' LED' : '') + ' Nativity Set';
  if (cat === 'tree') return 'Christmas Tree Decoration';
  if (cat === 'mat') return 'Flocked Scenery Mat';
  return 'Christmas Ornament';
}

function buildNameZh(r) {
  var matZh = r[1], cat = r[6];
  if (cat === 'nativity') return matZh + (hasLED(r[7]) ? 'LED' : '') + '圣诞马槽人物' + (r[3] ? r[3] + '件套' : '摆件');
  if (cat === 'tree') return '圣诞树配件/装饰';
  if (cat === 'mat') return '植绒场景草皮垫';
  return '圣诞装饰摆件';
}

function buildDescZh(r) {
  var parts = [];
  if (r[1]) parts.push('精选' + r[1] + '材质');
  if (r[7]) parts.push('具备' + r[7]);
  var cat = r[6];
  if (cat === 'nativity') parts.push(r[3] ? r[3] + '件套马槽人物套装' : '马槽人物摆件');
  else if (cat === 'tree') parts.push('圣诞树装饰配件');
  else if (cat === 'mat') parts.push('场景草皮/植绒垫');
  else parts.push('圣诞装饰摆件');
  parts.push('做工精致', '适合圣诞节日陈列布置');
  return parts.join('，');
}

function buildDescEn(r) {
  var matEn = MATERIAL_EN[r[1]] || '';
  var cat = r[6];
  if (cat === 'nativity') {
    var led = hasLED(r[7]) ? ' with warm LED lighting' : '';
    var pc = r[3] ? r[3] + '-piece ' : '';
    return 'Exquisitely crafted ' + (matEn ? matEn.toLowerCase() + ' ' : '') + pc + 'nativity set' + led + ', finely made for festive Christmas display and decoration.';
  }
  if (cat === 'tree') return 'Christmas tree decoration accessory, finely made for festive display.';
  if (cat === 'mat') return 'Flocked scenery mat, finely made for Christmas display.';
  return 'Christmas ornament' + (matEn ? ' crafted in ' + matEn.toLowerCase() : '') + ', finely made for festive display and decoration.';
}

function buildHighlights(r) {
  var matEn = MATERIAL_EN[r[1]] || '';
  var h = [];
  if (hasLED(r[7])) h.push('LED light');
  if (r[7].indexOf('木屋') !== -1) h.push('Manger / House');
  if (r[7].indexOf('人物') !== -1) h.push('Figures');
  if (r[7].indexOf('动物') !== -1) h.push('Animal figures');
  if (r[3] && r[6] === 'nativity') h.push(r[3] + '-piece set');
  if (matEn) h.push(matEn);
  return h.length ? h.slice(0, 3) : ['Handcrafted', 'Festive decor'];
}

function expand(r) {
  return {
    id: r[0], model: r[0],
    name: buildNameEn(r), nameZh: buildNameZh(r),
    category: r[6],
    material: MATERIAL_EN[r[1]] || 'Mixed material', materialZh: r[1],
    sizeLabel: r[2], sizeCm: parseFloat(r[2]) || 0,
    pieces: r[3] || null, packing: r[4] + ' / CTN',
    image: 'images/' + r[0] + '.' + r[5],
    description: buildDescEn(r), descriptionZh: buildDescZh(r),
    highlights: buildHighlights(r),
    priceMin: null, priceMax: null, moq: null,
    finish: 'Handcrafted', leadTime: 'Contact for lead time', includes: null
  };
}

/* Compact rows: [id, materialZh, size, pieces, perCtn, ext, category, featuresZh] */
const RAW = [
  ['AUS22001','陶瓷木质','30X10X18.5CM',8,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS22002','陶瓷木质','30X10X19.5CM',9,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS22003','陶瓷木质','40X16X25CM',10,6,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS22005','陶瓷木质','29.5X12X19.5CM',8,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS22006','陶瓷木质','30X12X20CM',9,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS22016','陶瓷木质','42X16X25.5CM',10,4,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS22017','陶瓷木质','42X16X26.5CM',10,4,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS27009','陶瓷木质','30X10X19.5CM',0,12,'jpeg','nativity','带LED灯、人物塑像'],
  ['AUS27010','陶瓷木质','30X10X19.5CM',0,12,'jpeg','nativity','带LED灯、人物塑像'],
  ['AUS27011','陶瓷木质','30X10X19.5CM',0,12,'jpeg','nativity','带LED灯、人物塑像'],
  ['AUS27012','陶瓷木质','30X10X19.5CM',0,12,'jpeg','nativity','带LED灯、人物塑像'],
  ['AUS27013','陶瓷木质','35X12X20.5CM',0,8,'jpeg','nativity','带LED灯、人物塑像'],
  ['AUS27014','陶瓷木质','35X12X22CM',0,8,'jpeg','nativity','带LED灯、人物塑像'],
  ['7005PM','树脂','30X12X20CM',10,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS189007','树脂','40.5X16X25CM',11,6,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS25083','树脂','35X14X23CM',9,8,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS221394','树脂','25X9X8CM',9,16,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS25228','陶瓷','30X10X20.5CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS25022','陶瓷木质','17.5X7.5X12CM',6,24,'jpeg','nativity','人物塑像'],
  ['AUS25023','陶瓷木质','17.5X7.5X12CM',6,24,'jpeg','nativity','人物塑像'],
  ['AUS25024','陶瓷木质','17.5X7.5X12CM',6,24,'jpeg','nativity','人物塑像'],
  ['AUS25025','陶瓷木质','17.5X7.5X12CM',6,24,'jpeg','nativity','人物塑像'],
  ['AUS25026','陶瓷木质','30X10X20CM',8,12,'jpeg','nativity','人物塑像'],
  ['AUS25027','陶瓷木质','30X10X20CM',8,12,'jpeg','nativity','人物塑像'],
  ['AUS25028','陶瓷木质','30X10X20CM',8,12,'jpeg','nativity','人物塑像'],
  ['AUS25029','陶瓷木质','30X10X20CM',8,12,'jpeg','nativity','人物塑像'],
  ['AUSG24035','陶瓷木质','29.5X10X20CM',8,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24036','陶瓷木质','29.5X10X20CM',9,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24037','陶瓷木质','29.5X10X20CM',9,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24038','陶瓷木质','29.5X10X20CM',9,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24039','陶瓷木质','29.5X10X20CM',8,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24040','陶瓷木质','29.5X10X20CM',8,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24041','陶瓷木质','29.5X10X20CM',8,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24042','陶瓷木质','29.5X10X20CM',9,12,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24043','陶瓷木质','39.5X17.5X27CM',10,6,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS24044','陶瓷木质','39.5X17.5X27CM',10,6,'jpeg','nativity','带LED灯、带马槽/木屋、人物塑像'],
  ['AUS23045','陶瓷木质','40X14.5X27CM',9,4,'jpeg','nativity','人物塑像'],
  ['AUS23046','陶瓷木质','14.8X8.2X12CM',3,36,'jpeg','nativity','人物塑像'],
  ['AUS23047','陶瓷木质','14.8X8.2X12CM',3,36,'jpeg','nativity','人物塑像'],
  ['AUS23048','陶瓷木质','20.5X8.5X14.5CM',6,24,'jpeg','nativity','人物塑像'],
  ['AUS23049','陶瓷木质','20.5X8.5X14.5CM',6,24,'jpeg','nativity','人物塑像'],
  ['AUS23050','陶瓷木质','25X12.5X20.5CM',7,12,'jpeg','nativity','人物塑像'],
  ['AUS23051','陶瓷木质','25X12.5X20.5CM',7,12,'jpeg','nativity','人物塑像'],
  ['AUS23052','陶瓷木质','32X17X23CM',7,6,'jpeg','nativity','人物塑像'],
  ['AUS23053','陶瓷木质','32X17X23CM',7,6,'jpeg','nativity','人物塑像'],
  ['AUS23054','陶瓷木质','40X14.5X27CM',9,4,'jpeg','nativity','人物塑像'],
  ['AUS27901','塑料','H5.5X3.5CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27902','塑料','H3.5X4CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27903','塑料','H7CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27904','塑料','H8.5X10CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27905','塑料','H4.7X6CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27906','塑料','H4.5X6.5CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27907','塑料','H6.5X4.5CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27908','塑料','D5XH4.5CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27909','塑料','H7.3CM',0,144,'jpeg','tree','塑料小树配件'],
  ['AUS27910','纸质','15X15CM',0,144,'jpeg','mat',''],
  ['AUS27912','植绒','30X20CM',0,144,'png','mat',''],
  ['AUS27913','','30X20CM',0,144,'png','ornament',''],
  ['AUS27914','植绒','30X30CM',0,144,'png','mat',''],
  ['AUS27915','塑料','H8.5CM',0,144,'png','tree','塑料小树配件'],
  ['AUS27916','塑料','H11.5CM',0,144,'png','tree','塑料小树配件'],
  ['MIK9910-6B','','H5CM,6PCS',0,100,'png','ornament',''],
  ['T116A','','未标注',0,144,'png','ornament',''],
  ['JT4021','','H5+7.5+10CM',0,100,'png','ornament',''],
  ['JT4022','','H5CM,6PCS',0,100,'png','ornament',''],
  ['9963','','H15CM',0,48,'png','ornament',''],
  ['MIK18','','H12CM',0,50,'png','ornament',''],
  ['MUK17','','H10CM',0,84,'png','ornament',''],
  ['AUS10183','PVC','未标注',0,16,'jpeg','ornament',''],
  ['T1086','','H10CM',0,84,'png','ornament',''],
  ['773A-30X20','','30X20CM',0,50,'png','ornament',''],
  ['TX01-30X20','','30X20CM',0,50,'png','ornament',''],
  ['12089','','40X90CM',0,24,'jpeg','ornament',''],
  ['TX01','','50X70CM',0,60,'jpeg','ornament',''],
  ['TX105','','35X45CM',0,144,'jpeg','ornament',''],
  ['TX02','','50X70CM',0,60,'jpeg','ornament',''],
  ['TX03','','50X70CM',0,60,'jpeg','ornament',''],
  ['TX09','','50X70CM',0,60,'jpeg','ornament',''],
  ['7733A','','50X70CM',0,60,'jpeg','ornament',''],
  ['86338','','50X70CM',0,60,'jpeg','ornament',''],
  ['86341','','50X70CM',0,60,'jpeg','ornament',''],
  ['86344','','50X70CM',0,60,'jpeg','ornament',''],
  ['86345','','50X70CM',0,60,'jpeg','ornament',''],
  ['86346','','50X70CM',0,60,'jpeg','ornament',''],
  ['86347','','50X70CM,RED GRASS',0,60,'jpeg','ornament',''],
  ['86348','','50X70CM',0,60,'jpeg','ornament',''],
  ['86351','','50X70CM',0,60,'jpeg','ornament',''],
  ['86353','','50X70CM',0,60,'jpeg','ornament',''],
  ['86520','纸质','50X70CM',0,60,'jpeg','mat',''],
  ['86562','','50X70CM',0,60,'jpeg','ornament',''],
  ['87000','','50X70CM',0,60,'jpeg','ornament',''],
  ['87001','','50X70CM',0,60,'jpeg','ornament',''],
  ['AUS26023','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26024','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26025','陶瓷木质','20X8.5X17CM',6,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26026','陶瓷木质','20X8.5X17CM',6,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26027','陶瓷木质','20X8.5X17CM',5,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26028','陶瓷木质','20X8.5X17CM',5,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26029','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26030','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26031','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS26032','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['PE6880A','木质','25X13X20CM',0,12,'jpeg','nativity','带马槽/木屋'],
  ['PE6880B','木质','25X13X20CM',0,12,'jpeg','nativity','带马槽/木屋'],
  ['PE6881A','木质','32X18X23CM',0,8,'jpeg','nativity','带马槽/木屋'],
  ['PE6881B','木质','32X18X23CM',0,8,'jpeg','nativity','带马槽/木屋'],
  ['PN37','木质','42X18.5X30CM',0,6,'jpeg','nativity','带马槽/木屋'],
  ['AUS22009','木质','30X12X20CM',0,12,'jpeg','nativity','带马槽/木屋'],
  ['AUS22010','木质','40X20.5X25.5CM',0,4,'jpeg','nativity','带马槽/木屋'],
  ['AUS22011','木质','29.5X12X19.5CM',0,12,'jpeg','nativity','带马槽/木屋'],
  ['X0606P','木质','40X21X24CM',0,4,'jpeg','ornament','带LED灯'],
  ['AUS21068','木质','10X6.2X12.8CM',0,48,'jpeg','nativity','带马槽/木屋'],
  ['AUS21043','陶瓷木质','30X10X20CM',9,12,'jpeg','nativity','带马槽/木屋、人物塑像'],
  ['AUS27001','树脂木质','15X10X10.5CM',0,24,'jpeg','ornament',''],
  ['AUS27002','树脂木质','15X10X10.5CM',0,24,'jpeg','ornament',''],
  ['AUS27003','树脂木质','15X10X9.5CM',0,24,'jpeg','ornament',''],
  ['AUS27004','树脂木质','15X10X9.5CM',0,24,'jpeg','ornament',''],
  ['AUS27005','树脂木质','15X10X9.5CM',0,24,'jpeg','ornament',''],
  ['AUS27006','树脂木质','15X10X10CM',0,24,'jpeg','ornament',''],
  ['AUS27007','树脂木质','12.5X8.2X7.5CM',0,24,'jpeg','ornament',''],
  ['AUS27008','树脂木质','12.5X8.2X7.5CM',0,24,'jpeg','ornament',''],
  ['AUS27015','树脂木质','16.5X13X10.5CM',0,12,'jpeg','ornament',''],
  ['AUS27016','树脂木质','16.5X13X11CM',0,12,'jpeg','ornament',''],
  ['AUS27017','树脂木质','16X11.5X11CM',0,12,'jpeg','ornament','带LED灯'],
  ['AUS27018','树脂木质','16X11.5X11CM',0,12,'jpeg','ornament','带LED灯'],
  ['AUS27019','树脂木质','16X11.5X11CM',0,12,'jpeg','ornament','带LED灯'],
  ['AUS27020','树脂木质','16X11.5X11CM',0,12,'jpeg','ornament','带LED灯'],
  ['AUS27021','木质塑料','10-11X10CM',0,24,'jpeg','ornament',''],
  ['AUS27022','木质塑料','10-11X10CM',0,24,'jpeg','ornament',''],
  ['AUS27023','木质塑料','10-11X10CM',0,24,'jpeg','ornament',''],
  ['AUS27024','木质塑料','10-11X9.5CM',0,24,'jpeg','ornament',''],
  ['AUS27025','木质塑料','18X11X8.5CM',0,12,'jpeg','ornament',''],
  ['AUS27026','木质塑料','18X11X8.5CM',0,12,'jpeg','ornament',''],
  ['AUS27027','木质塑料','18X11X8.5CM',0,12,'jpeg','ornament',''],
  ['AUS27028','木质塑料','18X11X8.5CM',0,12,'jpeg','ornament',''],
  ['AUS25030','树脂木质','17.5X8X11CM',0,36,'jpeg','ornament',''],
  ['AUS25031','树脂木质','17.5X8X12CM',0,36,'jpeg','ornament',''],
  ['AUS25001','树脂木质','12x12x10.5CM',0,24,'jpeg','ornament',''],
  ['AUS25002','树脂木质','12x12x10.5CM',0,24,'jpeg','ornament',''],
  ['AUS25003','树脂木质','12x12x10.5CM',0,24,'jpeg','ornament',''],
  ['AUS25004','树脂木质','12x12x10.5CM',0,24,'jpeg','ornament',''],
  ['AUS25006','树脂木质','12x12x9.5CM',0,24,'jpeg','ornament',''],
  ['AUS25007','树脂木质','16X11.5X10.5CM',0,12,'jpeg','ornament',''],
  ['AUS25008','树脂木质','16X11.5X9CM',0,12,'jpeg','ornament',''],
  ['AUS25009','树脂木质','16X11.5X9.5CM',0,12,'jpeg','ornament',''],
  ['AUS24071','树脂木质','15X10X9.5CM',0,36,'jpeg','ornament',''],
  ['AUS24073','树脂木质','14.5X9X6CM',0,36,'jpeg','ornament',''],
  ['AUS24074','树脂木质','14.5X9X11CM',0,36,'jpeg','ornament',''],
  ['AUS23004','木质','9X5X9.5CM',0,96,'jpeg','ornament',''],
  ['AUS23008','木质','6.5X5X5CM',0,96,'jpeg','ornament',''],
  ['AUS23017','木质','6-7X8.5CM',0,48,'jpeg','ornament',''],
  ['AUS23044','木质','7X7X10CM',0,48,'jpeg','ornament',''],
  ['AUS22037','树脂木质','14.5X9.3X10.5CM',0,24,'jpeg','ornament',''],
  ['AUS22038','树脂木质','14.5X9.3X10.5CM',0,24,'jpeg','ornament',''],
  ['AUS22039','树脂木质','14.5X9.3X10.5CM',0,24,'jpeg','ornament',''],
  ['AUS22041','树脂木质','14.5X9.3X7CM',0,24,'jpeg','ornament',''],
  ['AUS22042','树脂木质','14.5X9.3X7CM',0,24,'jpeg','ornament',''],
  ['AUS22047','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS22048','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS22049','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS22050','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS25038','树脂木质','19.5X15.5X16.5CM',0,12,'jpeg','ornament',''],
  ['AUS25039','树脂木质','19.5X15.5X16.5CM',0,12,'jpeg','ornament',''],
  ['AUS23009','木质塑料','15X15X7CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS230010','木质塑料','15X15X7CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23011','木质塑料','15X15X7CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23012','木质塑料','15X15X7CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23013','树脂木质塑料','15X9X8CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23014','树脂木质','15X9X8CM',0,24,'jpeg','ornament',''],
  ['AUS23015','树脂木质塑料','15X9X8CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23016','树脂木质','15X9X8CM',0,24,'jpeg','ornament',''],
  ['AUS23032','树脂木质塑料','14X8.5X7CM',0,36,'jpeg','ornament','动物摆件'],
  ['AUS23033','树脂木质塑料','14X8.5X7CM',0,36,'jpeg','ornament','动物摆件'],
  ['AUS23034','树脂木质塑料','14X8.5X7CM',0,36,'jpeg','ornament','动物摆件'],
  ['AUS23035','树脂木质塑料','14X8.5X7CM',0,36,'jpeg','ornament','动物摆件'],
  ['AUS23036','树脂木质塑料','15X10X9CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23038','树脂木质塑料','15X10X9CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23039','树脂木质塑料','22X11X10CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23040','树脂木质塑料','15X10X9CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23037','树脂木质塑料','15X10X11CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23041','树脂木质塑料','15X10X9CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23042','树脂木质塑料','22X11X9CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS23043','树脂木质塑料','15X10X9CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS2634','','100G',0,96,'png','ornament',''],
  ['AUS26100','','50G',0,96,'png','ornament',''],
  ['AUS2524A','','100G',0,96,'jpeg','ornament',''],
  ['AUS2524B','','100G',0,96,'jpeg','ornament',''],
  ['AUS25322','','100G',0,96,'jpeg','ornament',''],
  ['AUS26091','','30G',0,96,'jpeg','ornament',''],
  ['AUS26092','','未标注',0,96,'png','ornament',''],
  ['AUS180057','','未标注',0,48,'jpeg','ornament',''],
  ['74506','','未标注',0,108,'png','ornament',''],
  ['74507','','未标注',0,108,'png','ornament',''],
  ['74508','','未标注',0,216,'png','ornament',''],
  ['74509','','未标注',0,216,'png','ornament',''],
  ['74510','','未标注',0,216,'png','ornament',''],
  ['74511','','未标注',0,216,'png','ornament',''],
  ['74514','','未标注',0,108,'png','ornament',''],
  ['AUS27100','树脂木质','19X15X13CM',0,12,'jpeg','ornament',''],
  ['AUS27101','树脂木质','19X15X15CM',0,12,'jpeg','ornament',''],
  ['AUS27102','树脂木质','19X15X16CM',0,12,'jpeg','ornament',''],
  ['AUS27103','树脂木质','19X15X13CM',0,12,'jpeg','ornament',''],
  ['AUS27104','树脂木质塑料','12.5X8X6CM',0,36,'jpeg','ornament',''],
  ['AUS27105','树脂木质','12.5X8X6CM',0,36,'jpeg','ornament',''],
  ['AUS27106','树脂木质','12.5X8X6.5CM',0,36,'jpeg','ornament',''],
  ['AUS27107','木质塑料','12.5X8X8.5CM',0,36,'jpeg','ornament',''],
  ['AUS27108','树脂木质','15.5X10X10.5CM',0,24,'jpeg','ornament','带LED灯'],
  ['AUS27109','树脂木质','15.5X10X8CM',0,24,'jpeg','ornament','带LED灯'],
  ['AUS27110','树脂木质','15.5X10X8.5CM',0,24,'jpeg','ornament','带LED灯'],
  ['AUS27111','树脂木质塑料','13X8.5X8CM',0,24,'jpeg','ornament','动物摆件'],
  ['AUS27112','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS27113','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS27114','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS27115','树脂木质','18X11X11.5CM',0,12,'jpeg','ornament',''],
  ['AUS162254A','木质塑料','H10.5CM',0,144,'jpeg','tree','木质+塑料树'],
  ['AUS162254B','木质塑料','H15CM',0,144,'jpeg','tree','木质+塑料树'],
  ['AUS162254C','木质塑料','H20CM',0,96,'jpeg','tree','木质+塑料树']
];

const PRODUCTS = RAW.map(expand);

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
function prodText(p, field) {
  if (currentLang() === 'zh' && p[field + 'Zh']) return p[field + 'Zh'];
  return p[field];
}
function catText(c, field) {
  if (currentLang() === 'zh' && c[field + 'Zh']) return c[field + 'Zh'];
  return c[field];
}
function formatPriceRange(p) {
  return t('product.priceOnRequest');
}
function getProductById(id) {
  return PRODUCTS.find(function (p) { return p.id === id; }) || PRODUCTS[0];
}
function getRelatedProducts(product, limit) {
  var same = PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; });
  var others = PRODUCTS.filter(function (p) { return p.category !== product.category && p.id !== product.id; });
  return same.concat(others).slice(0, limit || 4);
}
function categoryName(key) {
  var c = CATEGORIES.find(function (x) { return x.key === key; });
  return c ? c.name : key;
}
