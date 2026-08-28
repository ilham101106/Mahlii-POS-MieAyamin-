/* ==========================================================================
  MieAyamin POS - Shared Storage & State Library (js/storage.js)
  ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "mieayamin_pos_state_v4";

  const DEFAULT_MENU = [
  {
    "id": "ma-1",
    "name": "Mie Ayam Original",
    "cat": "mie_ayam",
    "price": 14000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie ayam bumbu semur khas gurih lezat."
  },
  {
    "id": "ma-2",
    "name": "Mie Ayam Bakso",
    "cat": "mie_ayam",
    "price": 17000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam disajikan dengan bakso sapi kenyal."
  },
  {
    "id": "ma-3",
    "name": "Mie Ayam Pangsit Basah",
    "cat": "mie_ayam",
    "price": 17000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam disajikan dengan pangsit rebus lembut."
  },
  {
    "id": "ma-4",
    "name": "Mie Ayam Pangsit Goreng",
    "cat": "mie_ayam",
    "price": 18000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam dengan pangsit goreng renyah."
  },
  {
    "id": "ma-5",
    "name": "Mie Ayam Ceker",
    "cat": "mie_ayam",
    "price": 18000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ayam topping ceker semur empuk meresap."
  },
  {
    "id": "ma-6",
    "name": "Mie Ayam Bakso Pangsit Basah",
    "cat": "mie_ayam",
    "price": 21000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam kombinasi bakso & pangsit basah."
  },
  {
    "id": "ma-7",
    "name": "Mie Ayam Bakso Pangsit Goreng",
    "cat": "mie_ayam",
    "price": 22000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam kombinasi bakso & pangsit goreng."
  },
  {
    "id": "ma-8",
    "name": "Mie Ayam Ceker Bakso",
    "cat": "mie_ayam",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ayam topping ceker empuk & bakso sapi."
  },
  {
    "id": "ma-9",
    "name": "Mie Ayam Ceker Pangsit Basah",
    "cat": "mie_ayam",
    "price": 21000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ayam ceker semur & pangsit basah."
  },
  {
    "id": "ma-10",
    "name": "Mie Ayam Ceker Pangsit Goreng",
    "cat": "mie_ayam",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ayam ceker empuk & pangsit goreng crispy."
  },
  {
    "id": "ma-11",
    "name": "Mie Ayam Bakso Urat",
    "cat": "mie_ayam",
    "price": 21000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam dengan bakso urat besar mantap."
  },
  {
    "id": "ma-12",
    "name": "Mie Ayam Komplit",
    "cat": "mie_ayam",
    "price": 25000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ayam komplit bakso + pangsit + ceker."
  },
  {
    "id": "my-1",
    "name": "Mie Yamin Original",
    "cat": "mie_yamin",
    "price": 16000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin bumbu manis gurih kecap spesial."
  },
  {
    "id": "my-2",
    "name": "Mie Yamin Bakso",
    "cat": "mie_yamin",
    "price": 20000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin manis topping bakso sapi."
  },
  {
    "id": "my-3",
    "name": "Mie Yamin Pangsit (Basah/Goreng)",
    "cat": "mie_yamin",
    "price": 20000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin manis dengan pangsit basah/goreng."
  },
  {
    "id": "my-4",
    "name": "Mie Yamin Pangsit Goreng",
    "cat": "mie_yamin",
    "price": 19000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin manis pangsit goreng renyah."
  },
  {
    "id": "my-5",
    "name": "Mie Yamin Ceker",
    "cat": "mie_yamin",
    "price": 20000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie yamin manis dengan ceker semur empuk."
  },
  {
    "id": "my-6",
    "name": "Mie Yamin + Keju",
    "cat": "mie_yamin",
    "price": 21000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin manis dengan taburan keju gurih melimpah."
  },
  {
    "id": "my-7",
    "name": "Mie Yamin Pangsit (B/G) + Keju",
    "cat": "mie_yamin",
    "price": 24000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin pangsit topping keju gurih."
  },
  {
    "id": "my-8",
    "name": "Mie Yamin Pangsit + Bakso",
    "cat": "mie_yamin",
    "price": 24000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie yamin manis dengan pangsit & bakso sapi."
  },
  {
    "id": "my-9",
    "name": "Mie Yamin Pangsit + Ceker",
    "cat": "mie_yamin",
    "price": 24000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie yamin manis dengan pangsit & ceker semur."
  },
  {
    "id": "my-10",
    "name": "Mie Yamin Ceker + Pangsit Goreng",
    "cat": "mie_yamin",
    "price": 24000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie yamin manis ceker & pangsit goreng."
  },
  {
    "id": "my-11",
    "name": "Mie Yamin Bakso + Keju",
    "cat": "mie_yamin",
    "price": 24000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin bakso dengan taburan keju parut."
  },
  {
    "id": "my-12",
    "name": "Mie Yamin Ceker + Keju",
    "cat": "mie_yamin",
    "price": 24000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie yamin ceker dengan taburan keju gurih."
  },
  {
    "id": "my-13",
    "name": "Mie Yamin Bakso Urat",
    "cat": "mie_yamin",
    "price": 23000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin dengan bakso urat berdaging."
  },
  {
    "id": "my-14",
    "name": "Mie Yamin Pangsit Bakso + Keju",
    "cat": "mie_yamin",
    "price": 29000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie yamin pangsit, bakso & keju parut."
  },
  {
    "id": "my-15",
    "name": "Mie Yamin Pangsit Ceker + Keju",
    "cat": "mie_yamin",
    "price": 29000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie yamin pangsit, ceker empuk & keju."
  },
  {
    "id": "my-16",
    "name": "Mie Yamin Komplit",
    "cat": "mie_yamin",
    "price": 27000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie yamin komplit bakso + pangsit + ceker."
  },
  {
    "id": "my-17",
    "name": "Mie Yamin Komplit + Keju",
    "cat": "mie_yamin",
    "price": 31000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie yamin komplit dengan taburan keju melimpah."
  },
  {
    "id": "mi-1",
    "name": "Mie Ijo Original",
    "cat": "mie_ijo",
    "price": 16000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie hijau alami organik lezat & sehat."
  },
  {
    "id": "mi-2",
    "name": "Mie Ijo Bakso",
    "cat": "mie_ijo",
    "price": 18000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo segar dengan bakso sapi kenyal."
  },
  {
    "id": "mi-3",
    "name": "Mie Ijo Bakso + Keju",
    "cat": "mie_ijo",
    "price": 23000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie ijo bakso dengan taburan keju parut."
  },
  {
    "id": "mi-4",
    "name": "Mie Ijo Pangsit Basah",
    "cat": "mie_ijo",
    "price": 18000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie ijo segar dengan pangsit basah."
  },
  {
    "id": "mi-5",
    "name": "Mie Ijo Pangsit Basah + Keju",
    "cat": "mie_ijo",
    "price": 23000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie ijo pangsit basah + keju parut."
  },
  {
    "id": "mi-6",
    "name": "Mie Ijo Ceker",
    "cat": "mie_ijo",
    "price": 19000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo segar dengan ceker semur empuk."
  },
  {
    "id": "mi-7",
    "name": "Mie Ijo Ceker + Keju",
    "cat": "mie_ijo",
    "price": 24000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker dengan keju parut melimpah."
  },
  {
    "id": "mi-8",
    "name": "Mie Ijo Pangsit Goreng",
    "cat": "mie_ijo",
    "price": 19000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie ijo dengan pangsit goreng crispy."
  },
  {
    "id": "mi-9",
    "name": "Mie Ijo Pangsit Goreng + Keju",
    "cat": "mie_ijo",
    "price": 24000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Mie ijo pangsit goreng + keju gurih."
  },
  {
    "id": "mi-10",
    "name": "Mie Ijo Pangsit Basah + Bakso",
    "cat": "mie_ijo",
    "price": 22000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo pangsit basah & bakso sapi."
  },
  {
    "id": "mi-11",
    "name": "Mie Ijo Pangsit Basah + Bakso + Keju",
    "cat": "mie_ijo",
    "price": 27000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo pangsit basah, bakso & keju."
  },
  {
    "id": "mi-12",
    "name": "Mie Ijo Bakso + Pangsit Goreng",
    "cat": "mie_ijo",
    "price": 22000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo bakso & pangsit goreng."
  },
  {
    "id": "mi-13",
    "name": "Mie Ijo Bakso + Pangsit Goreng + Keju",
    "cat": "mie_ijo",
    "price": 27000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo bakso, pangsit goreng & keju."
  },
  {
    "id": "mi-14",
    "name": "Mie Ijo Ceker + Bakso",
    "cat": "mie_ijo",
    "price": 23000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker semur & bakso sapi."
  },
  {
    "id": "mi-15",
    "name": "Mie Ijo Ceker + Bakso + Keju",
    "cat": "mie_ijo",
    "price": 28000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker, bakso & keju parut."
  },
  {
    "id": "mi-16",
    "name": "Mie Ijo Ceker + Pangsit Basah",
    "cat": "mie_ijo",
    "price": 23000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker semur & pangsit basah."
  },
  {
    "id": "mi-17",
    "name": "Mie Ijo Ceker + Pangsit Basah + Keju",
    "cat": "mie_ijo",
    "price": 28000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker, pangsit basah & keju."
  },
  {
    "id": "mi-18",
    "name": "Mie Ijo Ceker + Pangsit Goreng",
    "cat": "mie_ijo",
    "price": 23000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker & pangsit goreng renyah."
  },
  {
    "id": "mi-19",
    "name": "Mie Ijo Ceker + Pangsit Goreng + Keju",
    "cat": "mie_ijo",
    "price": 28000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie ijo ceker, pangsit goreng & keju."
  },
  {
    "id": "mi-20",
    "name": "Mie Ijo Komplit",
    "cat": "mie_ijo",
    "price": 26000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo komplit bakso + pangsit + ceker."
  },
  {
    "id": "mi-21",
    "name": "Mie Ijo Komplit + Keju",
    "cat": "mie_ijo",
    "price": 31000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Mie ijo komplit dengan keju melimpah."
  },
  {
    "id": "ms-1",
    "name": "Spicy Original",
    "cat": "mie_spicy",
    "price": 13000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie spicy bumbu pedas membara rempah."
  },
  {
    "id": "ms-2",
    "name": "Spicy Level 1",
    "cat": "mie_spicy",
    "price": 14000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie spicy pedas nikmat Level 1."
  },
  {
    "id": "ms-3",
    "name": "Spicy Level 2",
    "cat": "mie_spicy",
    "price": 17000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie spicy pedas mantap Level 2."
  },
  {
    "id": "ms-4",
    "name": "Spicy Level 3",
    "cat": "mie_spicy",
    "price": 19000,
    "image": "images/ceker_pedas.png",
    "desc": "Mie spicy pedas gila membara Level 3."
  },
  {
    "id": "ms-5",
    "name": "Spicy Bakso Level 1",
    "cat": "mie_spicy",
    "price": 18000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy bakso sapi pedas Level 1."
  },
  {
    "id": "ms-6",
    "name": "Spicy Bakso Level 2",
    "cat": "mie_spicy",
    "price": 20000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy bakso sapi pedas Level 2."
  },
  {
    "id": "ms-7",
    "name": "Spicy Bakso Level 3",
    "cat": "mie_spicy",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy bakso sapi pedas Level 3."
  },
  {
    "id": "ms-8",
    "name": "Spicy Ceker Level 1",
    "cat": "mie_spicy",
    "price": 18000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy ceker mercon pedas Level 1."
  },
  {
    "id": "ms-9",
    "name": "Spicy Ceker Level 2",
    "cat": "mie_spicy",
    "price": 20000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy ceker mercon pedas Level 2."
  },
  {
    "id": "ms-10",
    "name": "Spicy Ceker Level 3",
    "cat": "mie_spicy",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy ceker mercon pedas Level 3."
  },
  {
    "id": "ms-11",
    "name": "Spicy Pangsit (B/G) Level 1",
    "cat": "mie_spicy",
    "price": 18000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy pangsit basah/goreng Level 1."
  },
  {
    "id": "ms-12",
    "name": "Spicy Pangsit (B/G) Level 2",
    "cat": "mie_spicy",
    "price": 20000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy pangsit basah/goreng Level 2."
  },
  {
    "id": "ms-13",
    "name": "Spicy Pangsit (B/G) Level 3",
    "cat": "mie_spicy",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy pangsit basah/goreng Level 3."
  },
  {
    "id": "ms-14",
    "name": "Spicy Pangsit Bakso Level 1",
    "cat": "mie_spicy",
    "price": 23000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy pangsit & bakso Level 1."
  },
  {
    "id": "ms-15",
    "name": "Spicy Pangsit Bakso Level 2",
    "cat": "mie_spicy",
    "price": 25000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy pangsit & bakso Level 2."
  },
  {
    "id": "ms-16",
    "name": "Spicy Pangsit Bakso Level 3",
    "cat": "mie_spicy",
    "price": 27000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy pangsit & bakso Level 3."
  },
  {
    "id": "ms-17",
    "name": "Spicy Bakso Ceker Level 1",
    "cat": "mie_spicy",
    "price": 23000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy bakso & ceker Level 1."
  },
  {
    "id": "ms-18",
    "name": "Spicy Bakso Ceker Level 2",
    "cat": "mie_spicy",
    "price": 25000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy bakso & ceker Level 2."
  },
  {
    "id": "ms-19",
    "name": "Spicy Bakso Ceker Level 3",
    "cat": "mie_spicy",
    "price": 27000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy bakso & ceker Level 3."
  },
  {
    "id": "ms-20",
    "name": "Spicy Ceker Pangsit Level 1",
    "cat": "mie_spicy",
    "price": 23000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy ceker & pangsit Level 1."
  },
  {
    "id": "ms-21",
    "name": "Spicy Ceker Pangsit Level 2",
    "cat": "mie_spicy",
    "price": 25000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy ceker & pangsit Level 2."
  },
  {
    "id": "ms-22",
    "name": "Spicy Ceker Pangsit Level 3",
    "cat": "mie_spicy",
    "price": 27000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy ceker & pangsit Level 3."
  },
  {
    "id": "ms-23",
    "name": "Spicy Komplit Level 1",
    "cat": "mie_spicy",
    "price": 29000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy komplit bakso+pangsit+ceker Level 1."
  },
  {
    "id": "ms-24",
    "name": "Spicy Komplit Level 2",
    "cat": "mie_spicy",
    "price": 31000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy komplit bakso+pangsit+ceker Level 2."
  },
  {
    "id": "ms-25",
    "name": "Spicy Komplit Level 3",
    "cat": "mie_spicy",
    "price": 33000,
    "image": "images/ceker_pedas.png",
    "desc": "Spicy komplit bakso+pangsit+ceker Level 3."
  },
  {
    "id": "ms-26",
    "name": "Pangsit Chili Oil",
    "cat": "mie_spicy",
    "price": 17000,
    "image": "images/ceker_pedas.png",
    "desc": "Pangsit rebus disiram minyak cabe chili oil pedas gurih."
  },
  {
    "id": "kw-1",
    "name": "Kwetiaw Original",
    "cat": "kwetiaw",
    "price": 15000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Kwetiaw kenyal bumbu gurih khas."
  },
  {
    "id": "kw-2",
    "name": "Kwetiaw Bakso",
    "cat": "kwetiaw",
    "price": 19000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Kwetiaw kenyal dengan bakso sapi."
  },
  {
    "id": "kw-3",
    "name": "Kwetiaw Pangsit (Basah/Goreng)",
    "cat": "kwetiaw",
    "price": 19000,
    "image": "images/mie_yamin_manis.png",
    "desc": "Kwetiaw dengan pangsit basah/goreng."
  },
  {
    "id": "kw-4",
    "name": "Kwetiaw Ceker",
    "cat": "kwetiaw",
    "price": 19000,
    "image": "images/ceker_pedas.png",
    "desc": "Kwetiaw dengan ceker semur empuk."
  },
  {
    "id": "kw-5",
    "name": "Kwetiaw Bakso Pangsit (B/G)",
    "cat": "kwetiaw",
    "price": 22000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Kwetiaw bakso & pangsit basah/goreng."
  },
  {
    "id": "kw-6",
    "name": "Kwetiaw Ceker Pangsit (B/G)",
    "cat": "kwetiaw",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Kwetiaw ceker & pangsit basah/goreng."
  },
  {
    "id": "kw-7",
    "name": "Kwetiaw Bakso + Ceker",
    "cat": "kwetiaw",
    "price": 22000,
    "image": "images/ceker_pedas.png",
    "desc": "Kwetiaw bakso sapi & ceker semur."
  },
  {
    "id": "kw-8",
    "name": "Kwetiaw Komplit",
    "cat": "kwetiaw",
    "price": 24000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "Kwetiaw komplit bakso + pangsit + ceker."
  },
  {
    "id": "pt-1",
    "name": "Porsi Bakso Biasa",
    "cat": "porsi_tambahan",
    "price": 13000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "1 Porsi bakso sapi kuah kaldu gurih."
  },
  {
    "id": "pt-2",
    "name": "Porsi Bakso Urat",
    "cat": "porsi_tambahan",
    "price": 16000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "1 Porsi bakso urat besar berdaging."
  },
  {
    "id": "pt-3",
    "name": "Porsi Pangsit",
    "cat": "porsi_tambahan",
    "price": 17000,
    "image": "images/mie_yamin_manis.png",
    "desc": "1 Porsi pangsit basah/goreng gurih."
  },
  {
    "id": "pt-4",
    "name": "Porsi Ceker",
    "cat": "porsi_tambahan",
    "price": 15000,
    "image": "images/ceker_pedas.png",
    "desc": "1 Porsi ceker semur empuk meresap."
  },
  {
    "id": "pt-5",
    "name": "Porsi Bakso Pangsit/Goreng",
    "cat": "porsi_tambahan",
    "price": 20000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "1 Porsi bakso & pangsit."
  },
  {
    "id": "pt-6",
    "name": "Porsi Bakso Ceker",
    "cat": "porsi_tambahan",
    "price": 19000,
    "image": "images/ceker_pedas.png",
    "desc": "1 Porsi bakso & ceker semur."
  },
  {
    "id": "pt-7",
    "name": "Porsi Pangsit Ceker",
    "cat": "porsi_tambahan",
    "price": 19000,
    "image": "images/ceker_pedas.png",
    "desc": "1 Porsi pangsit & ceker semur."
  },
  {
    "id": "pt-8",
    "name": "Porsi Pangsit + Bakso + Ceker",
    "cat": "porsi_tambahan",
    "price": 20000,
    "image": "images/mie_ayam_komplit.png",
    "desc": "1 Porsi komplit pangsit + bakso + ceker."
  },
  {
    "id": "pt-9",
    "name": "Extra Topping (Pangsit/Bakso/Ceker)",
    "cat": "porsi_tambahan",
    "price": 3000,
    "image": "images/ceker_pedas.png",
    "desc": "Tambah topping satuan."
  },
  {
    "id": "min-1",
    "name": "Es Teh Manis",
    "cat": "minuman",
    "price": 5000,
    "image": "images/es_teh_jumbo.png",
    "desc": "Es teh manis segar."
  },
  {
    "id": "min-2",
    "name": "Es Teh Tawar",
    "cat": "minuman",
    "price": 3000,
    "image": "images/es_teh_jumbo.png",
    "desc": "Es teh tawar dingin segar."
  },
  {
    "id": "min-3",
    "name": "Teh Manis Hangat",
    "cat": "minuman",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80",
    "desc": "Teh manis hangat."
  },
  {
    "id": "min-4",
    "name": "Teh Tawar Hangat",
    "cat": "minuman",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80",
    "desc": "Teh tawar hangat pereda dahaga."
  },
  {
    "id": "min-5",
    "name": "Es Jeruk Peras",
    "cat": "minuman",
    "price": 7000,
    "image": "images/es_jeruk_peras.png",
    "desc": "Es jeruk peras asli."
  },
  {
    "id": "min-6",
    "name": "Jeruk Hangat",
    "cat": "minuman",
    "price": 6000,
    "image": "images/es_jeruk_peras.png",
    "desc": "Jeruk peras hangat manis."
  },
  {
    "id": "min-7",
    "name": "Teh Botol Sosro",
    "cat": "minuman",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    "desc": "Teh Botol Sosro dingin."
  },
  {
    "id": "min-8",
    "name": "Air Mineral (600ml)",
    "cat": "minuman",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=500&q=80",
    "desc": "Air mineral botol dingin."
  },
  {
    "id": "min-9",
    "name": "Es Susu",
    "cat": "minuman",
    "price": 8000,
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    "desc": "Es susu kental manis segar."
  },
  {
    "id": "min-10",
    "name": "Soda Susu",
    "cat": "minuman",
    "price": 12000,
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    "desc": "Soda susu gembira segar bertabur es."
  },
  {
    "id": "min-11",
    "name": "Es Campur",
    "cat": "minuman",
    "price": 15000,
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    "desc": "Es campur buah manis komplit."
  },
  {
    "id": "min-12",
    "name": "Es Campur Durian",
    "cat": "minuman",
    "price": 20000,
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    "desc": "Es campur topping buah durian asli manis."
  },
  {
    "id": "min-13",
    "name": "Sop Buah Komplit",
    "cat": "minuman",
    "price": 18000,
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
    "desc": "Sop buah komplit manis segar."
  },
  {
    "id": "jus-1",
    "name": "Jus Alpukat",
    "cat": "jus",
    "price": 12000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus alpukat kental manis."
  },
  {
    "id": "jus-2",
    "name": "Jus Durian",
    "cat": "jus",
    "price": 13000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus buah durian asli manis."
  },
  {
    "id": "jus-3",
    "name": "Jus Apel",
    "cat": "jus",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus apel segar bervitamin."
  },
  {
    "id": "jus-4",
    "name": "Jus Lemon",
    "cat": "jus",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus lemon peras segar."
  },
  {
    "id": "jus-5",
    "name": "Jus Jambu Biji",
    "cat": "jus",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus jambu biji merah kental."
  },
  {
    "id": "jus-6",
    "name": "Jus Nanas",
    "cat": "jus",
    "price": 9000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus nanas manis asam segar."
  },
  {
    "id": "jus-7",
    "name": "Jus Buah Naga",
    "cat": "jus",
    "price": 11000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus buah naga merah manis."
  },
  {
    "id": "jus-8",
    "name": "Jus Sirsak",
    "cat": "jus",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus sirsak segar alami."
  },
  {
    "id": "jus-9",
    "name": "Jus Jeruk",
    "cat": "jus",
    "price": 9000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus jeruk segar bervitamin C."
  },
  {
    "id": "jus-10",
    "name": "Jus Melon",
    "cat": "jus",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
    "desc": "Jus buah melon manis segar."
  }
];

  const DEFAULT_INGREDIENTS = {
    mie_basah: {
      name: "Mie Basah Organik",
      stock: 100,
      unit: "porsi",
      minStock: 20,
    },
    ayam_semur: {
      name: "Ayam Semur Cincang",
      stock: 80,
      unit: "porsi",
      minStock: 15,
    },
    bakso: { name: "Bakso Sapi Halus", stock: 150, unit: "pcs", minStock: 30 },
    pangsit: {
      name: "Pangsit Goreng/Rebus",
      stock: 120,
      unit: "pcs",
      minStock: 25,
    },
    ceker: { name: "Ceker Ayam Semur", stock: 60, unit: "pcs", minStock: 10 },
    teh: { name: "Daun Teh Spesial", stock: 200, unit: "porsi", minStock: 40 },
    teh_botol: {
      name: "Teh Botol Sosro",
      stock: 48,
      unit: "botol",
      minStock: 12,
    },
    teh_kotak: {
      name: "Teh Kotak Sosro",
      stock: 48,
      unit: "kotak",
      minStock: 12,
    },
    jeruk: { name: "Jeruk Peras Fresh", stock: 80, unit: "buah", minStock: 20 },
    air_mineral: {
      name: "Air Mineral 600ml",
      stock: 72,
      unit: "botol",
      minStock: 24,
    },
    es_batu: {
      name: "Es Batu Kristal",
      stock: 300,
      unit: "porsi",
      minStock: 50,
    },
    sirsak: {
      name: "Buah Sirsak Fresh",
      stock: 25,
      unit: "porsi",
      minStock: 5,
    },
    jambu: {
      name: "Buah Jambu Biji Merah",
      stock: 30,
      unit: "porsi",
      minStock: 5,
    },
    alpukat: {
      name: "Buah Alpukat Mentega",
      stock: 20,
      unit: "porsi",
      minStock: 5,
    },
    mangga: {
      name: "Buah Mangga Harum Manis",
      stock: 25,
      unit: "porsi",
      minStock: 5,
    },
    kerupuk: {
      name: "Kerupuk Kaleng/Rambak",
      stock: 100,
      unit: "pcs",
      minStock: 20,
    },
  };

  function loadState() {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Fallback check for v2 / v1 legacy key
        saved =
          localStorage.getItem("mieayamin_pos_state_v2") ||
          localStorage.getItem("mieayamin_pos_state");
      }
      if (!saved) return initializeDefaultState();

      const parsed = JSON.parse(saved);

      // Auto-purge legacy menu items (e.g. old Mie Ayam Jamur, legacy mie-1, etc.)
      const hasLegacyMenu = Array.isArray(parsed.customMenu) && parsed.customMenu.some(m => m.id.startsWith('mie-') || m.id === 'top-1' || m.id === 'samp-1' || (m.name && m.name.toLowerCase().includes('jamur')));
      if (hasLegacyMenu || !Array.isArray(parsed.customMenu) || parsed.customMenu.length < 50) {
        parsed.customMenu = JSON.parse(JSON.stringify(DEFAULT_MENU));
      }

      const todayStr = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (parsed.lastActiveDate && parsed.lastActiveDate !== todayStr) {
        // Auto-rollover day change: clear active drafts & old kitchen queue
        parsed.draftOrders = [];
        if (Array.isArray(parsed.kitchenOrders)) {
          parsed.kitchenOrders = parsed.kitchenOrders.filter(
            (o) => o.status === "Selesai",
          );
        }
      }

      // Re-save sanitized state to v4 key
      const newState = {
        role: parsed.role || "Kasir",
        lastActiveDate: todayStr,
        customMenu: parsed.customMenu,
        stock: parsed.stock || JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS)),
        cart: parsed.cart || [],
        draftOrders: parsed.draftOrders || [],
        orderType: parsed.orderType || "dinein",
        tableNo: parsed.tableNo || "Meja 01",
        customerName: parsed.customerName || "",
        discount: parsed.discount || 0,
        taxRate: parsed.taxRate || 0,
        kdsOrders: parsed.kdsOrders || generateInitialKdsOrders(),
        transactions: parsed.transactions || generateInitialTransactions(),
        closingReports: (parsed.closingReports && parsed.closingReports.length > 0) ? parsed.closingReports : generateInitialClosingReports(),
        feedbacks: parsed.feedbacks || generateInitialFeedbacks(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    } catch (e) {
      console.error("Error loading state:", e);
      return initializeDefaultState();
    }
  }

  function initializeDefaultState() {
    const initState = {
      role: "Kasir",
      customMenu: JSON.parse(JSON.stringify(DEFAULT_MENU)),
      stock: JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS)),
      cart: [],
      orderType: "dinein",
      tableNo: "Meja 01",
      customerName: "",
      discount: 0,
      taxRate: 0,
      kdsOrders: generateInitialKdsOrders(),
      transactions: generateInitialTransactions(),
      closingReports: generateInitialClosingReports(),
      feedbacks: generateInitialFeedbacks(),
    };
    saveState(initState);
    return initState;
  }

  function saveState(stateObj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (e) {
      console.error("Error saving state:", e);
    }
  }

  function generateInitialKdsOrders() {
    return [
      {
        id: "ORD-101",
        table: "Meja 02",
        customer: "Bpk. Ahmad",
        time: "12:15",
        type: "Dine-in",
        status: "Masuk",
        items: [
          {
            name: "Mie Ayam Yamin Manis",
            qty: 2,
            notesText: "Tanpa daun bawang",
          },
          { name: "Es Teh Manis Jumbo", qty: 2, notesText: "Es sedikit" },
        ],
      },
      {
        id: "ORD-102",
        table: "Meja 05",
        customer: "Ibu Siska",
        time: "12:22",
        type: "Dine-in",
        status: "Diproses",
        items: [
          {
            name: "Mie Ayam Komplit (Bakso + Pangsit)",
            qty: 1,
            notesText: "Kuah pisah",
          },
          { name: "Es Jeruk Peras Asli", qty: 1, notesText: "" },
        ],
      },
    ];
  }

  function generateInitialTransactions() {
    return [
      {
        id: "TRX-20260805-001",
        time: "11:30:15",
        date: "2026-08-05",
        type: "Dine-in",
        table: "Meja 01",
        customer: "Pak Budi",
        items: [
          {
            name: "Mie Ayam Yamin Manis",
            qty: 2,
            unitPrice: 15000,
            totalPrice: 30000,
            notesText: "",
          },
          {
            name: "Es Teh Manis Jumbo",
            qty: 2,
            unitPrice: 5000,
            totalPrice: 10000,
            notesText: "",
          },
        ],
        subtotal: 40000,
        tax: 0,
        discount: 0,
        total: 40000,
        method: "Tunai",
        given: 50000,
        change: 10000,
        status: "Lunas",
      },
      {
        id: "TRX-20260805-002",
        time: "12:05:40",
        date: "2026-08-05",
        type: "Bungkus",
        table: "-",
        customer: "Mba Rina",
        items: [
          {
            name: "Mie Ayam Jamur",
            qty: 1,
            unitPrice: 17000,
            totalPrice: 17000,
            notesText: "Pedas sedang",
          },
          {
            name: "Jus Alpukat",
            qty: 1,
            unitPrice: 12000,
            totalPrice: 12000,
            notesText: "",
          },
        ],
        subtotal: 29000,
        tax: 0,
        discount: 0,
        total: 29000,
        method: "QRIS",
        given: 29000,
        change: 0,
        status: "Lunas",
      },
    ];
  }

  function generateInitialFeedbacks() {
    return [
      {
        id: "FB-001",
        date: "05 Aug 2026 - 12:45",
        name: "Andi Saputra",
        rating: 5,
        review:
          "Mie yaminnya manisnya pas, ayam semurnya melimpah! Tempatnya bersih & pelayanan kasir ramah sekali.",
        table: "Meja 03",
      },
      {
        id: "FB-002",
        date: "05 Aug 2026 - 13:10",
        name: "Maya Indah",
        rating: 5,
        review:
          "Es jeruknya segar beneran dari jeruk asli. Pangsit gorengnya renyah garing!",
        table: "Meja 01",
      },
    ];
  }

  // --- UTILITY HELPERS ---
  function formatRp(num) {
    return "Rp " + (num || 0).toLocaleString("id-ID");
  }

  function formatDateTime(d = new Date()) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const dayName = days[d.getDay()];
    const dayDate = String(d.getDate()).padStart(2, "0");
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    const secs = String(d.getSeconds()).padStart(2, "0");

    return `${dayName}, ${dayDate} ${monthName} ${year} - ${hours}:${mins}:${secs}`;
  }

  function showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "danger") icon = "⚠️";
    if (type === "warning") icon = "🔔";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-msg">${message}</span>
      `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function startLiveClock(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const update = () => {
      el.textContent = formatDateTime();
    };
    update();
    setInterval(update, 1000);
  }

  function playChimeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start();
      osc1.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log("Audio playback prevented or unsupported:", e);
    }
  }

  function exportBackup() {
    try {
      const state = loadState();
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement("a");
      const today = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `backup_pos_mieayamin_${today}.json`,
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Backup data berhasil diunduh ke file JSON!", "success");
    } catch (err) {
      console.error(err);
      showToast("Gagal mengunduh backup data: " + err.message, "danger");
    }
  }

  function importBackup(jsonText, onSuccess) {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed || typeof parsed !== "object")
        throw new Error("Format file backup JSON tidak valid");
      saveState(parsed);
      showToast("Data berhasil dipulihkan (Restore Success)!", "success");
      if (typeof onSuccess === "function") onSuccess(parsed);
      setTimeout(() => location.reload(), 1000);
    } catch (err) {
      console.error(err);
      showToast("Gagal restore data: " + err.message, "danger");
    }
  }

  function generateInitialClosingReports() {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const d = new Date();
    const formattedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} (20.00)`;
    return [
      {
        id: 'CLS-1700000001',
        fullDateTime: formattedDate,
        date: d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: '20.00',
        cashier: 'Kasir Shift 1',
        totalOmset: 69000,
        expectedCash: 40000,
        actualCash: 40000,
        diff: 0,
        qrisTotal: 29000,
        transferTotal: 0,
        txCount: 2,
        totalItemsSold: 4,
        notes: 'Setoran lengkap & sesuai',
        status: 'Sesuai'
      }
    ];
  }

  function formatFullDateWithTime(d = new Date()) {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = d.getDate();
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${monthName} ${year} (${hours}.${mins})`;
  }

  // Export Storage API globally
  window.POSStorage = {
    STORAGE_KEY,
    DEFAULT_MENU,
    DEFAULT_INGREDIENTS,
    loadState,
    saveState,
    exportBackup,
    importBackup,
    formatRp,
    formatDateTime,
    formatFullDateWithTime,
    showToast,
    startLiveClock,
    playChimeSound,
  };
})(window);
