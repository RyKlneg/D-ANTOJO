export interface Product {
  id: number;
  name: string;
  price: string;
  slicePrice: string;
  image: string;
  curiosity: string;
  category: 'Pasteles' | 'Panadería' | 'Galletas' | 'Postres';
}

export const products: Product[] = [
  // PASTELES
  { id: 1, name: 'Pastel de Chocolate', price: '$450 MXN', slicePrice: '$65 MXN', image: '/images/Cho.png', curiosity: 'Hecho con cacao 70%, nuestro favorito absoluto desde 1998.', category: 'Pasteles' },
  { id: 2, name: 'Cheesecake Clásico', price: '$380 MXN', slicePrice: '$55 MXN', image: '/images/Clo.png', curiosity: 'Receta secreta de Nueva York con un toque cítrico artesanal.', category: 'Pasteles' },
  { id: 3, name: 'Tarta de Frutas', price: '$420 MXN', slicePrice: '$50 MXN', image: '/images/Tarta.png', curiosity: 'Fruta fresca de temporada seleccionada diariamente para ti.', category: 'Pasteles' },
  { id: 4, name: 'Pastel de Zanahoria', price: '$390 MXN', slicePrice: '$45 MXN', image: '/images/PayL.png', curiosity: 'Nuestra receta familiar tiene más de 15 especias secretas.', category: 'Pasteles' },
  { id: 5, name: 'Red Velvet', price: '$480 MXN', slicePrice: '$70 MXN', image: '/images/Hous.png', curiosity: 'Su color rojizo se logra con un proceso de fermentación natural.', category: 'Pasteles' },
  { id: 6, name: 'Mil Hojas', price: '$440 MXN', slicePrice: '$60 MXN', image: '/images/Cho.png', curiosity: 'Capas de hojaldre hechas a mano durante 48 horas.', category: 'Pasteles' },
  { id: 7, name: 'Pastel de Tres Leches', price: '$400 MXN', slicePrice: '$55 MXN', image: '/images/Clo.png', curiosity: 'Remojado en una mezcla de leches secreta de la casa.', category: 'Pasteles' },
  { id: 8, name: 'Ópera', price: '$520 MXN', slicePrice: '$75 MXN', image: '/images/Tarta.png', curiosity: 'Elegancia francesa con café de Veracruz y ganache de chocolate.', category: 'Pasteles' },
  
  // PANADERIA
  { id: 9, name: 'Concha de Vainilla', price: '$25 MXN', slicePrice: '-', image: '/images/PayL.png', curiosity: 'Harina de autor y mantequilla pura, esponjosas por 12 horas.', category: 'Panadería' },
  { id: 10, name: 'Croissant Francés', price: '$35 MXN', slicePrice: '-', image: '/images/Pay.png', curiosity: 'Capas finas logradas con técnica tradicional parisina.', category: 'Panadería' },
  { id: 11, name: 'Pan de Muerto (Temporada)', price: '$45 MXN', slicePrice: '-', image: '/images/Cho.png', curiosity: 'Aromatizado con azahar natural y ralladura de naranja.', category: 'Panadería' },
  { id: 12, name: 'Danesa de Frutas', price: '$32 MXN', slicePrice: '-', image: '/images/Clo.png', curiosity: 'Masa hojaldrada rellena de crema pastelera casera.', category: 'Panadería' },
  { id: 13, name: 'Bolillo de Masa Madre', price: '$12 MXN', slicePrice: '-', image: '/images/Tarta.png', curiosity: 'Fermentación de 24 horas para una corteza crujiente.', category: 'Panadería' },
  { id: 14, name: 'Chocolatín', price: '$38 MXN', slicePrice: '-', image: '/images/PayL.png', curiosity: 'Relleno de bastones de chocolate semi-amargo belga.', category: 'Panadería' },
  { id: 15, name: 'Mantecada de Nuez', price: '$22 MXN', slicePrice: '-', image: '/images/Pay.png', curiosity: 'Receta de la abuela con nuez pecana seleccionada.', category: 'Panadería' },

  // GALLETAS
  { id: 16, name: 'Chispas de Chocolate', price: '$18 MXN', slicePrice: '-', image: '/images/Hous.png', curiosity: 'Trozo de chocolate que se funde en cada mordida.', category: 'Galletas' },
  { id: 17, name: 'Macarons Surtidos', price: '$120 MXN', slicePrice: '-', image: '/images/Cho.png', curiosity: 'Harina de almendra fina y rellenos de sabores naturales.', category: 'Galletas' },
  { id: 18, name: 'Polvorón de Nuez', price: '$15 MXN', slicePrice: '-', image: '/images/Clo.png', curiosity: 'Se deshacen en la boca, hechos con mantequilla artesanal.', category: 'Galletas' },
  { id: 19, name: 'Galleta de Avena y Arándano', price: '$20 MXN', slicePrice: '-', image: '/images/Tarta.png', curiosity: 'Opción saludable con granos enteros y fruta seca.', category: 'Galletas' },
  { id: 20, name: 'Alfajor Maicena', price: '$28 MXN', slicePrice: '-', image: '/images/PayL.png', curiosity: 'Relleno de dulce de leche casero y coco rallado.', category: 'Galletas' },
  { id: 21, name: 'Galleta de Jengibre', price: '$25 MXN', slicePrice: '-', image: '/images/Pay.png', curiosity: 'Masa especiada con jengibre fresco y miel orgánica.', category: 'Galletas' },

  // POSTRES
  { id: 22, name: 'Tiramisú Individual', price: '$85 MXN', slicePrice: '-', image: '/images/Pay.png', curiosity: 'El balance perfecto entre mascarpone y café expreso.', category: 'Postres' },
  { id: 23, name: 'Flan Napolitano', price: '$65 MXN', slicePrice: '-', image: '/images/Cho.png', curiosity: 'Cremoso y bañado en caramelo ámbar hecho a mano.', category: 'Postres' },
  { id: 24, name: 'Mousse de Maracuyá', price: '$75 MXN', slicePrice: '-', image: '/images/Clo.png', curiosity: 'Fruta tropical fresca para un final refrescante.', category: 'Postres' },
  { id: 25, name: 'Carlota de Limón', price: '$55 MXN', slicePrice: '-', image: '/images/Tarta.png', curiosity: 'Postre frío clásico con un toque de limón real.', category: 'Postres' },
  { id: 26, name: 'Profiteroles (3 pzas)', price: '$90 MXN', slicePrice: '-', image: '/images/PayL.png', curiosity: 'Rellenos de crema y bañados en hilos de chocolate.', category: 'Postres' },
  { id: 27, name: 'Gelatina de Leche con Frutos Rojos', price: '$45 MXN', slicePrice: '-', image: '/images/Pay.png', curiosity: 'Suabidada con un toque de vainilla de Papantla.', category: 'Postres' },
  { id: 28, name: 'Brownie de Chocolate y Avellana', price: '$40 MXN', slicePrice: '-', image: '/images/Hous.png', curiosity: 'Húmedo y denso, con trozos de avellana tostada.', category: 'Postres' },
  { id: 29, name: 'Pay de Queso con Zarzamora', price: '$70 MXN', slicePrice: '-', image: '/images/Cho.png', curiosity: 'Base de galleta crujiente y mermelada natural.', category: 'Postres' },
  { id: 30, name: 'Strudel de Manzana', price: '$68 MXN', slicePrice: '-', image: '/images/Clo.png', curiosity: 'Manzanas caramelizadas con canela en hojaldre fino.', category: 'Postres' },
];
